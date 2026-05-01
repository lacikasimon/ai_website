<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

function verify_recaptcha(string $token): bool
{
    $result = verify_recaptcha_token($token);
    if (!$result['ok']) {
        error_log('Contact reCAPTCHA failed: ' . implode(',', $result['errors'] ?? []));
    }

    return $result['ok'];
}

function mysql_datetime(string $value): string
{
    $timestamp = strtotime($value);
    if ($timestamp === false) {
        $timestamp = time();
    }

    return gmdate('Y-m-d H:i:s', $timestamp);
}

function save_contact_message_to_database(array $payload, string $crmStatus, $crmStatusCode, string $crmResponse, bool $recaptchaOk): void
{
    $pdo = database();
    if ($pdo === null) {
        return;
    }

    $table = table_name('contact_messages');
    $sql = "INSERT INTO `{$table}` (
        `id`, `channel`, `campaign`, `name`, `first_name`, `last_name`, `email`, `phone`, `message`,
        `source_url`, `status`, `crm_status`, `crm_status_code`, `crm_response`, `recaptcha_ok`, `created_at`
      ) VALUES (
        :id, :channel, :campaign, :name, :first_name, :last_name, :email, :phone, :message,
        :source_url, 'new', :crm_status, :crm_status_code, :crm_response, :recaptcha_ok, :created_at
      )
      ON DUPLICATE KEY UPDATE
        `channel` = VALUES(`channel`),
        `campaign` = VALUES(`campaign`),
        `name` = VALUES(`name`),
        `first_name` = VALUES(`first_name`),
        `last_name` = VALUES(`last_name`),
        `email` = VALUES(`email`),
        `phone` = VALUES(`phone`),
        `message` = VALUES(`message`),
        `source_url` = VALUES(`source_url`),
        `crm_status` = VALUES(`crm_status`),
        `crm_status_code` = VALUES(`crm_status_code`),
        `crm_response` = VALUES(`crm_response`),
        `recaptcha_ok` = VALUES(`recaptcha_ok`),
        `updated_at` = CURRENT_TIMESTAMP";

    try {
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => (string) ($payload['external_id'] ?? ''),
            ':channel' => (string) ($payload['channel'] ?? 'website_contact'),
            ':campaign' => (string) ($payload['campaign'] ?? ''),
            ':name' => (string) ($payload['name'] ?? ''),
            ':first_name' => (string) ($payload['first_name'] ?? ''),
            ':last_name' => (string) ($payload['last_name'] ?? ''),
            ':email' => (string) ($payload['email'] ?? ''),
            ':phone' => (string) ($payload['phone'] ?? ''),
            ':message' => (string) ($payload['message'] ?? ''),
            ':source_url' => (string) ($payload['source_url'] ?? ''),
            ':crm_status' => $crmStatus,
            ':crm_status_code' => $crmStatusCode,
            ':crm_response' => substr($crmResponse, 0, 6000),
            ':recaptcha_ok' => $recaptchaOk ? 1 : 0,
            ':created_at' => mysql_datetime((string) ($payload['submitted_at'] ?? '')),
        ]);
    } catch (Throwable $error) {
        error_log('Saving contact message failed: ' . $error->getMessage());
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Allow: POST, OPTIONS');
    json_response(204, ['ok' => true]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    json_response(405, ['ok' => false, 'message' => 'Metoda nu este permisă.']);
}

$data = read_json_body();
if ($data === []) {
    json_response(400, ['ok' => false, 'message' => 'Datele trimise nu sunt valide.']);
}

$channel = string_field($data, 'channel') ?: 'website_contact';
$email = string_field($data, 'email');
$phone = string_field($data, 'phone');
$name = string_field($data, 'name');
$firstName = string_field($data, 'first_name');
$lastName = string_field($data, 'last_name');
$message = string_field($data, 'message');
$recaptchaToken = string_field($data, 'recaptchaToken');

if ($channel === '') {
    json_response(422, ['ok' => false, 'message' => 'Canalul este obligatoriu.']);
}

if ($email === '' && $phone === '' && $name === '' && $firstName === '' && $lastName === '') {
    json_response(422, ['ok' => false, 'message' => 'Completați cel puțin un identificator de contact.']);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['ok' => false, 'message' => 'Adresa de email nu este validă.']);
}

if (!verify_recaptcha($recaptchaToken)) {
    json_response(403, ['ok' => false, 'message' => 'Verificarea reCAPTCHA nu a reușit.']);
}

$payload = [
    'channel' => $channel,
    'email' => $email,
    'phone' => $phone,
    'name' => $name,
    'first_name' => $firstName,
    'last_name' => $lastName,
    'campaign' => string_field($data, 'campaign') ?: 'syshub_ro_contact',
    'message' => $message,
    'external_id' => string_field($data, 'external_id') ?: ('website-' . hash('sha256', $email . '|' . $phone . '|' . microtime(true))),
    'source_url' => string_field($data, 'source_url'),
    'submitted_at' => string_field($data, 'submitted_at') ?: gmdate('c'),
];

$webhookUrl = env_value('CRM_LEAD_WEBHOOK_URL');
$webhookKey = crm_webhook_key();
if ($webhookUrl === '' || $webhookKey === '') {
    save_contact_message_to_database($payload, 'crm_config_missing', null, '', true);
    json_response(500, ['ok' => false, 'message' => 'Integrarea CRM nu este configurată.']);
}

$crmResponse = http_json_post(
    $webhookUrl,
    crm_webhook_headers($webhookKey),
    $payload,
);

if (!$crmResponse['ok']) {
    save_contact_message_to_database($payload, 'crm_error', $crmResponse['status'], $crmResponse['body'], true);
    json_response(502, [
        'ok' => false,
        'message' => 'CRM-ul nu a acceptat mesajul. Reîncercați sau contactați-ne telefonic.',
        'status' => $crmResponse['status'],
    ]);
}

save_contact_message_to_database($payload, 'sent', $crmResponse['status'], $crmResponse['body'], true);

json_response(200, ['ok' => true]);
