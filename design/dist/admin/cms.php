<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
start_secure_session();

function create_cms_id(string $prefix): string
{
    try {
        return $prefix . '-' . bin2hex(random_bytes(12));
    } catch (Throwable $error) {
        return $prefix . '-' . time() . '-' . mt_rand(1000, 9999);
    }
}

function slugify_php(string $value): string
{
    $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value) ?: $value;
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?: '';
    $value = trim($value, '-');
    return substr($value, 0, 80);
}

function require_admin(PDO $pdo): void
{
    $userId = $_SESSION['admin_user_id'] ?? '';
    if (!is_string($userId) || $userId === '') {
        json_response(401, ['ok' => false, 'message' => 'Autentificare necesară.']);
    }

    $table = table_name('admin_users');
    $statement = $pdo->prepare("SELECT `id` FROM `{$table}` WHERE `id` = :id AND `active` = 1 LIMIT 1");
    $statement->execute([':id' => $userId]);
    if (!$statement->fetch()) {
        $_SESSION = [];
        session_destroy();
        json_response(401, ['ok' => false, 'message' => 'Sesiunea a expirat.']);
    }
}

function bool_int($value): int
{
    return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
}

function normalize_menu_kind(string $kind): string
{
    return in_array($kind, ['internal', 'external', 'page'], true) ? $kind : 'internal';
}

function is_valid_menu_href(string $href): bool
{
    if ($href === '' || preg_match('/[\x00-\x1F\x7F]/', $href)) {
        return false;
    }

    return preg_match('/^(https?:\/\/|\/|#)/i', $href) === 1;
}

function page_row(array $row): array
{
    return [
        'id' => (string) $row['id'],
        'slug' => (string) $row['slug'],
        'title' => (string) $row['title'],
        'summary' => (string) ($row['summary'] ?? ''),
        'body' => (string) $row['body'],
        'status' => (string) $row['status'],
        'showInMenu' => (bool) $row['show_in_menu'],
        'menuLabel' => (string) ($row['menu_label'] ?: $row['title']),
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

function menu_row(array $row): array
{
    return [
        'id' => (string) $row['id'],
        'label' => (string) $row['label'],
        'href' => (string) $row['href'],
        'kind' => (string) $row['kind'],
        'visible' => (bool) $row['visible'],
        'order' => (int) $row['sort_order'],
    ];
}

function image_row(array $row): array
{
    return [
        'id' => (string) $row['id'],
        'title' => (string) $row['title'],
        'alt' => (string) ($row['alt'] ?: $row['title']),
        'fileName' => (string) $row['file_name'],
        'mimeType' => (string) $row['mime_type'],
        'size' => (int) $row['size_bytes'],
        'dataUrl' => (string) $row['data_url'],
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

function get_pages(PDO $pdo, bool $admin = false): array
{
    $table = table_name('cms_pages');
    $where = $admin ? '' : "WHERE `status` = 'published'";
    $statement = $pdo->query("SELECT * FROM `{$table}` {$where} ORDER BY `updated_at` DESC");
    return array_map('page_row', $statement->fetchAll());
}

function get_menu_items(PDO $pdo, bool $admin = false): array
{
    $table = table_name('cms_menu_items');
    $where = $admin ? '' : 'WHERE `visible` = 1';
    $statement = $pdo->query("SELECT * FROM `{$table}` {$where} ORDER BY `sort_order` ASC, `label` ASC");
    return array_map('menu_row', $statement->fetchAll());
}

function get_visible_menu(PDO $pdo): array
{
    $menu = get_menu_items($pdo, false);
    $pageTable = table_name('cms_pages');
    $statement = $pdo->query("SELECT * FROM `{$pageTable}` WHERE `status` = 'published' AND `show_in_menu` = 1 ORDER BY `updated_at` DESC");
    $index = 0;
    foreach ($statement->fetchAll() as $row) {
        $menu[] = [
            'id' => 'page-' . (string) $row['id'],
            'label' => (string) ($row['menu_label'] ?: $row['title']),
            'href' => '/pagini/' . (string) $row['slug'],
            'kind' => 'page',
            'visible' => true,
            'order' => 500 + $index,
        ];
        $index++;
    }

    usort($menu, function ($a, $b) {
        return ($a['order'] <=> $b['order']) ?: strcmp($a['label'], $b['label']);
    });
    return $menu;
}

function get_images(PDO $pdo): array
{
    $table = table_name('cms_images');
    $statement = $pdo->query("SELECT * FROM `{$table}` ORDER BY `updated_at` DESC");
    return array_map('image_row', $statement->fetchAll());
}

$pdo = database();
if ($pdo === null) {
    json_response(503, ['ok' => false, 'message' => 'CMS server nu este configurat.']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $resource = $_GET['resource'] ?? 'menu';

    if ($resource === 'menu') {
        json_response(200, ['ok' => true, 'menuItems' => get_visible_menu($pdo)]);
    }

    if ($resource === 'page') {
        $slug = slugify_php((string) ($_GET['slug'] ?? ''));
        $table = table_name('cms_pages');
        $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `slug` = :slug AND `status` = 'published' LIMIT 1");
        $statement->execute([':slug' => $slug]);
        $row = $statement->fetch();
        json_response(200, ['ok' => true, 'page' => is_array($row) ? page_row($row) : null]);
    }

    if ($resource === 'image') {
        $id = (string) ($_GET['id'] ?? '');
        $table = table_name('cms_images');
        $statement = $pdo->prepare("SELECT * FROM `{$table}` WHERE `id` = :id LIMIT 1");
        $statement->execute([':id' => $id]);
        $row = $statement->fetch();
        json_response(200, ['ok' => true, 'image' => is_array($row) ? image_row($row) : null]);
    }

    if ($resource === 'admin-content') {
        require_admin($pdo);
        json_response(200, [
            'ok' => true,
            'pages' => get_pages($pdo, true),
            'menuItems' => get_menu_items($pdo, true),
            'images' => get_images($pdo),
        ]);
    }

    json_response(404, ['ok' => false, 'message' => 'Resursa nu există.']);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST');
    json_response(405, ['ok' => false, 'message' => 'Metoda nu este permisă.']);
}

require_admin($pdo);

$data = read_json_body();
$action = string_field($data, 'action');

if ($action === 'save-page') {
    $page = $data['page'] ?? [];
    if (!is_array($page)) {
        json_response(422, ['ok' => false, 'message' => 'Pagina nu este validă.']);
    }

    $id = string_field($page, 'id') ?: create_cms_id('page');
    $title = string_field($page, 'title');
    $slug = slugify_php(string_field($page, 'slug') ?: $title);
    $body = string_field($page, 'body');
    if ($title === '' || $slug === '' || $body === '') {
        json_response(422, ['ok' => false, 'message' => 'Titlul, slug-ul și conținutul sunt obligatorii.']);
    }

    $table = table_name('cms_pages');
    $duplicate = $pdo->prepare("SELECT `id` FROM `{$table}` WHERE `slug` = :slug AND `id` <> :id LIMIT 1");
    $duplicate->execute([':slug' => $slug, ':id' => $id]);
    if ($duplicate->fetch()) {
        json_response(409, ['ok' => false, 'message' => 'Există deja o pagină cu acest slug.']);
    }

    try {
        $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `slug`, `title`, `summary`, `body`, `status`, `show_in_menu`, `menu_label`)
          VALUES (:id, :slug, :title, :summary, :body, :status, :show_in_menu, :menu_label)
          ON DUPLICATE KEY UPDATE
            `slug` = VALUES(`slug`), `title` = VALUES(`title`), `summary` = VALUES(`summary`), `body` = VALUES(`body`),
            `status` = VALUES(`status`), `show_in_menu` = VALUES(`show_in_menu`), `menu_label` = VALUES(`menu_label`),
            `updated_at` = CURRENT_TIMESTAMP");
        $statement->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':title' => $title,
            ':summary' => string_field($page, 'summary'),
            ':body' => $body,
            ':status' => string_field($page, 'status') === 'draft' ? 'draft' : 'published',
            ':show_in_menu' => bool_int($page['showInMenu'] ?? true),
            ':menu_label' => string_field($page, 'menuLabel') ?: $title,
        ]);
    } catch (Throwable $error) {
        error_log('Save CMS page failed: ' . $error->getMessage());
        json_response(500, ['ok' => false, 'message' => 'Pagina nu a putut fi salvată.']);
    }

    json_response(200, ['ok' => true, 'pages' => get_pages($pdo, true), 'menuItems' => get_menu_items($pdo, true)]);
}

if ($action === 'delete-page') {
    $table = table_name('cms_pages');
    $statement = $pdo->prepare("DELETE FROM `{$table}` WHERE `id` = :id");
    $statement->execute([':id' => string_field($data, 'id')]);
    json_response(200, ['ok' => true, 'pages' => get_pages($pdo, true)]);
}

if ($action === 'save-menu-item') {
    $item = $data['item'] ?? [];
    if (!is_array($item)) {
        json_response(422, ['ok' => false, 'message' => 'Elementul de meniu nu este valid.']);
    }

    $label = string_field($item, 'label');
    $href = string_field($item, 'href');
    if ($label === '' || !is_valid_menu_href($href)) {
        json_response(422, ['ok' => false, 'message' => 'Eticheta și un link valid sunt obligatorii. Folosiți /, #, http:// sau https://.']);
    }

    $id = string_field($item, 'id') ?: create_cms_id('menu');
    $table = table_name('cms_menu_items');
    $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `label`, `href`, `kind`, `visible`, `sort_order`)
      VALUES (:id, :label, :href, :kind, :visible, :sort_order)
      ON DUPLICATE KEY UPDATE
        `label` = VALUES(`label`), `href` = VALUES(`href`), `kind` = VALUES(`kind`), `visible` = VALUES(`visible`),
        `sort_order` = VALUES(`sort_order`), `updated_at` = CURRENT_TIMESTAMP");
    $statement->execute([
        ':id' => $id,
        ':label' => $label,
        ':href' => $href,
        ':kind' => normalize_menu_kind(string_field($item, 'kind')),
        ':visible' => bool_int($item['visible'] ?? true),
        ':sort_order' => (int) ($item['order'] ?? 100),
    ]);

    json_response(200, ['ok' => true, 'menuItems' => get_menu_items($pdo, true)]);
}

if ($action === 'delete-menu-item') {
    $table = table_name('cms_menu_items');
    $statement = $pdo->prepare("DELETE FROM `{$table}` WHERE `id` = :id");
    $statement->execute([':id' => string_field($data, 'id')]);
    json_response(200, ['ok' => true, 'menuItems' => get_menu_items($pdo, true)]);
}

if ($action === 'reset-menu') {
    $table = table_name('cms_menu_items');
    $defaults = $data['items'] ?? [];

    if (!is_array($defaults) || count($defaults) === 0) {
        json_response(422, ['ok' => false, 'message' => 'Lista de meniu nu este validă.']);
    }

    $normalizedItems = [];
    foreach ($defaults as $item) {
        if (!is_array($item)) {
            json_response(422, ['ok' => false, 'message' => 'Un element de meniu nu este valid.']);
        }

        $label = string_field($item, 'label');
        $href = string_field($item, 'href');
        if ($label === '' || !is_valid_menu_href($href)) {
            json_response(422, ['ok' => false, 'message' => 'Eticheta și un link valid sunt obligatorii pentru fiecare element de meniu.']);
        }

        $normalizedItems[] = [
            'id' => string_field($item, 'id') ?: create_cms_id('menu'),
            'label' => $label,
            'href' => $href,
            'kind' => normalize_menu_kind(string_field($item, 'kind')),
            'visible' => bool_int($item['visible'] ?? true),
            'sort_order' => (int) ($item['order'] ?? 100),
        ];
    }

    try {
        $pdo->beginTransaction();
        $pdo->exec("DELETE FROM `{$table}`");
        $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `label`, `href`, `kind`, `visible`, `sort_order`) VALUES (:id, :label, :href, :kind, :visible, :sort_order)");
        foreach ($normalizedItems as $item) {
            $statement->execute([
                ':id' => $item['id'],
                ':label' => $item['label'],
                ':href' => $item['href'],
                ':kind' => $item['kind'],
                ':visible' => $item['visible'],
                ':sort_order' => $item['sort_order'],
            ]);
        }
        $pdo->commit();
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('Reset CMS menu failed: ' . $error->getMessage());
        json_response(500, ['ok' => false, 'message' => 'Meniul nu a putut fi resetat.']);
    }

    json_response(200, ['ok' => true, 'menuItems' => get_menu_items($pdo, true)]);
}

if ($action === 'move-menu-item') {
    $id = string_field($data, 'id');
    $direction = string_field($data, 'direction');
    $items = get_menu_items($pdo, true);
    $index = array_search($id, array_column($items, 'id'), true);
    $swapIndex = $direction === 'up' ? $index - 1 : $index + 1;
    if ($index !== false && $swapIndex >= 0 && $swapIndex < count($items)) {
        [$items[$index], $items[$swapIndex]] = [$items[$swapIndex], $items[$index]];
        $table = table_name('cms_menu_items');
        foreach ($items as $itemIndex => $item) {
            $statement = $pdo->prepare("UPDATE `{$table}` SET `sort_order` = :sort_order WHERE `id` = :id");
            $statement->execute([':sort_order' => ($itemIndex + 1) * 10, ':id' => $item['id']]);
        }
    }
    json_response(200, ['ok' => true, 'menuItems' => get_menu_items($pdo, true)]);
}

if ($action === 'save-image') {
    $image = $data['image'] ?? [];
    if (!is_array($image)) {
        json_response(422, ['ok' => false, 'message' => 'Imaginea nu este validă.']);
    }

    $dataUrl = string_field($image, 'dataUrl');
    if (strpos($dataUrl, 'data:image/') !== 0) {
        json_response(422, ['ok' => false, 'message' => 'Fișierul trebuie să fie o imagine validă.']);
    }

    $id = string_field($image, 'id') ?: create_cms_id('image');
    $title = string_field($image, 'title') ?: string_field($image, 'fileName');
    $table = table_name('cms_images');
    $statement = $pdo->prepare("INSERT INTO `{$table}` (`id`, `title`, `alt`, `file_name`, `mime_type`, `size_bytes`, `data_url`)
      VALUES (:id, :title, :alt, :file_name, :mime_type, :size_bytes, :data_url)
      ON DUPLICATE KEY UPDATE
        `title` = VALUES(`title`), `alt` = VALUES(`alt`), `file_name` = VALUES(`file_name`),
        `mime_type` = VALUES(`mime_type`), `size_bytes` = VALUES(`size_bytes`), `data_url` = VALUES(`data_url`),
        `updated_at` = CURRENT_TIMESTAMP");
    $statement->execute([
        ':id' => $id,
        ':title' => $title,
        ':alt' => string_field($image, 'alt') ?: $title,
        ':file_name' => string_field($image, 'fileName'),
        ':mime_type' => string_field($image, 'mimeType'),
        ':size_bytes' => (int) ($image['size'] ?? 0),
        ':data_url' => $dataUrl,
    ]);
    json_response(200, ['ok' => true, 'images' => get_images($pdo)]);
}

if ($action === 'update-image') {
    $image = $data['image'] ?? [];
    if (!is_array($image)) {
        json_response(422, ['ok' => false, 'message' => 'Imaginea nu este validă.']);
    }

    $table = table_name('cms_images');
    $statement = $pdo->prepare("UPDATE `{$table}` SET `title` = :title, `alt` = :alt, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
    $statement->execute([
        ':id' => string_field($image, 'id'),
        ':title' => string_field($image, 'title'),
        ':alt' => string_field($image, 'alt'),
    ]);
    json_response(200, ['ok' => true, 'images' => get_images($pdo)]);
}

if ($action === 'delete-image') {
    $table = table_name('cms_images');
    $statement = $pdo->prepare("DELETE FROM `{$table}` WHERE `id` = :id");
    $statement->execute([':id' => string_field($data, 'id')]);
    json_response(200, ['ok' => true, 'images' => get_images($pdo)]);
}

json_response(400, ['ok' => false, 'message' => 'Acțiunea nu este validă.']);
