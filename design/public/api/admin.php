<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
session_start();

function admin_max_failed_attempts(): int
{
    return max(1, (int) env_value('ADMIN_MAX_FAILED_ATTEMPTS', '5'));
}

function admin_ban_minutes(): int
{
    return max(1, (int) env_value('ADMIN_BAN_MINUTES', '15'));
}

function verify_admin_recaptcha(string $token): bool
{
    $result = verify_recaptcha_token($token);
    if (!$result['ok']) {
        error_log('Admin reCAPTCHA failed: ' . implode(',', $result['errors'] ?? []));
    }

    return $result['ok'];
}

function admin_table(): string
{
    return table_name('admin_users');
}

function normalize_username(string $username): string
{
    return strtolower(trim($username));
}

function create_id(string $prefix): string
{
    try {
        return $prefix . '-' . bin2hex(random_bytes(12));
    } catch (Throwable $error) {
        return $prefix . '-' . time() . '-' . mt_rand(1000, 9999);
    }
}

function public_user(array $user): array
{
    return [
        'id' => (string) $user['id'],
        'username' => (string) $user['username'],
        'displayName' => (string) $user['display_name'],
        'role' => (string) $user['role'],
        'active' => (bool) $user['active'],
        'createdAt' => (string) $user['created_at'],
        'updatedAt' => (string) $user['updated_at'],
        'lastLoginAt' => $user['last_login_at'] ? (string) $user['last_login_at'] : null,
    ];
}

function ensure_seed_admin(PDO $pdo): void
{
    $table = admin_table();
    $count = (int) $pdo->query("SELECT COUNT(*) FROM `{$table}`")->fetchColumn();
    if ($count > 0) {
        return;
    }

    $seedPassword = env_value('ADMIN_SEED_PASSWORD');
    if ($seedPassword === '') {
        return;
    }

    $username = normalize_username(env_value('ADMIN_SEED_USERNAME', 'admin'));
    $displayName = env_value('ADMIN_SEED_DISPLAY_NAME', 'Administrator');
    $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `username`, `display_name`, `password_hash`, `role`, `active`) VALUES (:id, :username, :display_name, :password_hash, 'admin', 1)");
    $statement->execute([
        ':id' => create_id('user'),
        ':username' => $username,
        ':display_name' => $displayName,
        ':password_hash' => password_hash($seedPassword, PASSWORD_DEFAULT),
    ]);
}

function find_admin_user(PDO $pdo, string $username): ?array
{
    $table = admin_table();
    $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `username` = :username LIMIT 1");
    $statement->execute([':username' => normalize_username($username)]);
    $user = $statement->fetch();
    return is_array($user) ? $user : null;
}

function is_user_banned(array $user): bool
{
    if (empty($user['banned_until'])) {
        return false;
    }

    return strtotime((string) $user['banned_until']) > time();
}

function register_failed_login(PDO $pdo, string $username, ?array $user): array
{
    if (!$user) {
        return ['remainingAttempts' => max(admin_max_failed_attempts() - 1, 0)];
    }

    $failedCount = ((int) $user['failed_count']) + 1;
    $bannedUntil = null;
    if ($failedCount >= admin_max_failed_attempts()) {
        $bannedUntil = gmdate('Y-m-d H:i:s', time() + admin_ban_minutes() * 60);
    }

    $table = admin_table();
    $statement = $pdo->prepare("UPDATE `{$table}` SET `failed_count` = :failed_count, `banned_until` = :banned_until, `last_failed_at` = UTC_TIMESTAMP() WHERE `id` = :id");
    $statement->execute([
        ':failed_count' => $failedCount,
        ':banned_until' => $bannedUntil,
        ':id' => $user['id'],
    ]);

    return [
        'bannedUntil' => $bannedUntil,
        'remainingAttempts' => max(admin_max_failed_attempts() - $failedCount, 0),
    ];
}

function login_success(PDO $pdo, array $user): array
{
    $table = admin_table();
    $statement = $pdo->prepare("UPDATE `{$table}` SET `failed_count` = 0, `banned_until` = NULL, `last_login_at` = UTC_TIMESTAMP() WHERE `id` = :id");
    $statement->execute([':id' => $user['id']]);

    $fresh = find_admin_user($pdo, (string) $user['username']) ?: $user;
    $_SESSION['admin_user_id'] = (string) $fresh['id'];
    $_SESSION['admin_role'] = (string) $fresh['role'];

    return public_user($fresh);
}

function current_session_user(PDO $pdo): ?array
{
    $userId = $_SESSION['admin_user_id'] ?? '';
    if (!is_string($userId) || $userId === '') {
        return null;
    }

    $table = admin_table();
    $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `id` = :id AND `active` = 1 LIMIT 1");
    $statement->execute([':id' => $userId]);
    $user = $statement->fetch();
    return is_array($user) ? public_user($user) : null;
}

function session_user_row(PDO $pdo): array
{
    $userId = $_SESSION['admin_user_id'] ?? '';
    if (!is_string($userId) || $userId === '') {
        json_response(401, ['ok' => false, 'message' => 'Autentificare necesară.']);
    }

    $table = admin_table();
    $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `id` = :id AND `active` = 1 LIMIT 1");
    $statement->execute([':id' => $userId]);
    $user = $statement->fetch();
    if (!is_array($user)) {
        $_SESSION = [];
        session_destroy();
        json_response(401, ['ok' => false, 'message' => 'Sesiunea a expirat.']);
    }

    return $user;
}

function require_admin_role(PDO $pdo): array
{
    $user = session_user_row($pdo);
    if ((string) $user['role'] !== 'admin') {
        json_response(403, ['ok' => false, 'message' => 'Doar administratorii pot efectua această operațiune.']);
    }

    return $user;
}

function list_admin_users(PDO $pdo): array
{
    $table = admin_table();
    $statement = $pdo->query("SELECT * FROM `{$table}` ORDER BY `created_at` ASC");
    return array_map('public_user', $statement->fetchAll());
}

function active_admin_count(PDO $pdo): int
{
    $table = admin_table();
    return (int) $pdo->query("SELECT COUNT(*) FROM `{$table}` WHERE `role` = 'admin' AND `active` = 1")->fetchColumn();
}

function find_admin_user_by_id(PDO $pdo, string $id): ?array
{
    $table = admin_table();
    $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `id` = :id LIMIT 1");
    $statement->execute([':id' => $id]);
    $user = $statement->fetch();
    return is_array($user) ? $user : null;
}

function admin_bool($value): int
{
    return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
}

function contact_message_row(array $row): array
{
    $name = trim((string) ($row['name'] ?? ''));
    if ($name === '') {
        $name = trim((string) ($row['first_name'] ?? '') . ' ' . (string) ($row['last_name'] ?? ''));
    }
    if ($name === '') {
        $name = (string) ($row['email'] ?: $row['phone'] ?: 'Contact website');
    }

    return [
        'id' => (string) $row['id'],
        'name' => $name,
        'email' => (string) ($row['email'] ?? ''),
        'phone' => (string) ($row['phone'] ?? ''),
        'message' => (string) ($row['message'] ?? ''),
        'status' => (string) ($row['status'] ?? 'new') === 'read' ? 'read' : 'new',
        'createdAt' => (string) $row['created_at'],
    ];
}

function list_contact_messages(PDO $pdo): array
{
    $table = table_name('contact_messages');
    $statement = $pdo->query("SELECT * FROM `{$table}` ORDER BY `created_at` DESC LIMIT 500");
    return array_map('contact_message_row', $statement->fetchAll());
}

$pdo = database();
if ($pdo === null) {
    json_response(503, ['ok' => false, 'message' => 'Admin server nu este configurat.']);
}

ensure_seed_admin($pdo);

$action = $_GET['action'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'session') {
    $user = current_session_user($pdo);
    json_response(200, ['ok' => true, 'user' => $user]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'admin-data') {
    $currentUser = session_user_row($pdo);
    $users = (string) $currentUser['role'] === 'admin' ? list_admin_users($pdo) : [public_user($currentUser)];
    json_response(200, [
        'ok' => true,
        'user' => public_user($currentUser),
        'users' => $users,
        'messages' => list_contact_messages($pdo),
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST');
    json_response(405, ['ok' => false, 'message' => 'Metoda nu este permisă.']);
}

$data = read_json_body();
$action = string_field($data, 'action') ?: $action;

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    json_response(200, ['ok' => true]);
}

if ($action !== 'login') {
    if ($action === 'create-user') {
        require_admin_role($pdo);
        $input = $data['user'] ?? [];
        if (!is_array($input)) {
            json_response(422, ['ok' => false, 'message' => 'Utilizatorul nu este valid.']);
        }

        $username = normalize_username(string_field($input, 'username'));
        $displayName = string_field($input, 'displayName') ?: $username;
        $password = string_field($input, 'pin');
        $role = string_field($input, 'role') === 'admin' ? 'admin' : 'editor';
        if (strlen($username) < 3 || strlen($password) < 4) {
            json_response(422, ['ok' => false, 'message' => 'Utilizatorul trebuie să aibă minimum 3 caractere, iar parola minimum 4.']);
        }

        if (find_admin_user($pdo, $username)) {
            json_response(409, ['ok' => false, 'message' => 'Există deja un utilizator cu acest nume.']);
        }

        $table = admin_table();
        $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `username`, `display_name`, `password_hash`, `role`, `active`) VALUES (:id, :username, :display_name, :password_hash, :role, 1)");
        $statement->execute([
            ':id' => create_id('user'),
            ':username' => $username,
            ':display_name' => $displayName,
            ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ':role' => $role,
        ]);

        json_response(200, ['ok' => true, 'users' => list_admin_users($pdo)]);
    }

    if ($action === 'update-user') {
        require_admin_role($pdo);
        $input = $data['user'] ?? [];
        if (!is_array($input)) {
            json_response(422, ['ok' => false, 'message' => 'Utilizatorul nu este valid.']);
        }

        $id = string_field($input, 'id');
        $target = find_admin_user_by_id($pdo, $id);
        if (!$target) {
            json_response(404, ['ok' => false, 'message' => 'Utilizatorul nu există.']);
        }

        $nextRole = string_field($input, 'role') === 'admin' ? 'admin' : 'editor';
        $nextActive = array_key_exists('active', $input) ? admin_bool($input['active']) : (int) $target['active'];
        if ((string) $target['role'] === 'admin' && (int) $target['active'] === 1 && ($nextRole !== 'admin' || $nextActive !== 1) && active_admin_count($pdo) <= 1) {
            json_response(422, ['ok' => false, 'message' => 'Trebuie să rămână cel puțin un administrator activ.']);
        }

        $displayName = string_field($input, 'displayName') ?: (string) $target['display_name'];
        $table = admin_table();
        $statement = $pdo->prepare("UPDATE `{$table}` SET `display_name` = :display_name, `role` = :role, `active` = :active, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
        $statement->execute([
            ':display_name' => $displayName,
            ':role' => $nextRole,
            ':active' => $nextActive,
            ':id' => $id,
        ]);

        $password = string_field($input, 'pin');
        if ($password !== '') {
            if (strlen($password) < 4) {
                json_response(422, ['ok' => false, 'message' => 'Parola trebuie să aibă minimum 4 caractere.']);
            }

            $statement = $pdo->prepare("UPDATE `{$table}` SET `password_hash` = :password_hash, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
            $statement->execute([':password_hash' => password_hash($password, PASSWORD_DEFAULT), ':id' => $id]);
        }

        json_response(200, ['ok' => true, 'users' => list_admin_users($pdo)]);
    }

    if ($action === 'delete-user') {
        $currentUser = require_admin_role($pdo);
        $id = string_field($data, 'id');
        if ($id === (string) $currentUser['id']) {
            json_response(422, ['ok' => false, 'message' => 'Nu puteți șterge utilizatorul curent.']);
        }

        $target = find_admin_user_by_id($pdo, $id);
        if ($target && (string) $target['role'] === 'admin' && (int) $target['active'] === 1 && active_admin_count($pdo) <= 1) {
            json_response(422, ['ok' => false, 'message' => 'Trebuie să rămână cel puțin un administrator activ.']);
        }

        $table = admin_table();
        $statement = $pdo->prepare("DELETE FROM `{$table}` WHERE `id` = :id");
        $statement->execute([':id' => $id]);
        json_response(200, ['ok' => true, 'users' => list_admin_users($pdo)]);
    }

    if ($action === 'update-message') {
        session_user_row($pdo);
        $status = string_field($data, 'status') === 'read' ? 'read' : 'new';
        $table = table_name('contact_messages');
        $statement = $pdo->prepare("UPDATE `{$table}` SET `status` = :status, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
        $statement->execute([':status' => $status, ':id' => string_field($data, 'id')]);
        json_response(200, ['ok' => true, 'messages' => list_contact_messages($pdo)]);
    }

    if ($action === 'delete-message') {
        session_user_row($pdo);
        $table = table_name('contact_messages');
        $statement = $pdo->prepare("DELETE FROM `{$table}` WHERE `id` = :id");
        $statement->execute([':id' => string_field($data, 'id')]);
        json_response(200, ['ok' => true, 'messages' => list_contact_messages($pdo)]);
    }

    json_response(400, ['ok' => false, 'message' => 'Acțiunea nu este validă.']);
}

$username = normalize_username(string_field($data, 'username'));
$password = string_field($data, 'pin');
if ($username === '' || $password === '') {
    json_response(422, ['ok' => false, 'message' => 'Completați utilizatorul și parola.']);
}

if (!verify_admin_recaptcha(string_field($data, 'recaptchaToken'))) {
    json_response(403, ['ok' => false, 'message' => 'Verificarea reCAPTCHA nu a reușit.']);
}

$user = find_admin_user($pdo, $username);
if ($user && is_user_banned($user)) {
    json_response(423, [
        'ok' => false,
        'message' => 'Prea multe încercări eșuate. Contul este blocat temporar.',
        'bannedUntil' => (string) $user['banned_until'],
        'remainingAttempts' => 0,
    ]);
}

if (!$user || !(bool) $user['active'] || !password_verify($password, (string) $user['password_hash'])) {
    $failed = register_failed_login($pdo, $username, $user);
    json_response(401, [
        'ok' => false,
        'message' => !empty($failed['bannedUntil'])
            ? 'Prea multe încercări eșuate. Contul este blocat temporar.'
            : 'Date de autentificare incorecte.',
        'bannedUntil' => $failed['bannedUntil'] ?? null,
        'remainingAttempts' => $failed['remainingAttempts'] ?? null,
    ]);
}

json_response(200, ['ok' => true, 'user' => login_success($pdo, $user)]);
