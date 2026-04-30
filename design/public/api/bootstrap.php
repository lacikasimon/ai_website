<?php
declare(strict_types=1);

function server_env_values(): array
{
    static $values = null;
    if ($values !== null) {
        return $values;
    }

    $values = [];
    $paths = [
        __DIR__ . '/../../.env.server',
        __DIR__ . '/../.env.server',
    ];

    foreach ($paths as $path) {
        if (!is_readable($path)) {
            continue;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            continue;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || substr($line, 0, 1) === '#' || strpos($line, '=') === false) {
                continue;
            }

            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            $value = trim($value, "\"'");
            if ($key !== '') {
                $values[$key] = $value;
            }
        }
    }

    return $values;
}

function env_value(string $name, string $fallback = ''): string
{
    $value = getenv($name);
    if ($value === false || trim($value) === '') {
        $serverEnv = server_env_values();
        return trim($serverEnv[$name] ?? $fallback);
    }

    return trim($value);
}

function crm_webhook_key(): string
{
    $key = env_value('CRM_WEBHOOK_KEY');
    $key = trim($key, " \t\n\r\0\x0B\"'");

    if (stripos($key, 'Authorization:') === 0) {
        $key = trim(substr($key, strlen('Authorization:')));
    }

    if (stripos($key, 'X-CRM-Webhook-Key:') === 0) {
        $key = trim(substr($key, strlen('X-CRM-Webhook-Key:')));
    }

    if (stripos($key, 'Bearer ') === 0) {
        $key = trim(substr($key, strlen('Bearer ')));
    }

    return trim($key, " \t\n\r\0\x0B\"'");
}

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array
{
    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody ?: '', true);
    return is_array($data) ? $data : [];
}

function string_field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function http_json_post(string $url, array $headers, array $payload): array
{
    $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($body === false) {
        return ['ok' => false, 'status' => 0, 'body' => 'JSON encode failed'];
    }

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $body,
        ]);

        $responseBody = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        return [
            'ok' => $responseBody !== false && $status >= 200 && $status < 300,
            'status' => $status,
            'body' => $responseBody === false ? $error : (string) $responseBody,
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'timeout' => 12,
            'ignore_errors' => true,
            'follow_location' => 1,
            'max_redirects' => 3,
        ],
    ]);

    $responseBody = file_get_contents($url, false, $context);
    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
            $status = (int) $matches[1];
            break;
        }
    }

    return [
        'ok' => $responseBody !== false && $status >= 200 && $status < 300,
        'status' => $status,
        'body' => $responseBody === false ? '' : (string) $responseBody,
    ];
}

function http_form_post(string $url, array $payload): array
{
    $body = http_build_query($payload);

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
            CURLOPT_POSTFIELDS => $body,
        ]);

        $responseBody = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        return [
            'ok' => $responseBody !== false && $status >= 200 && $status < 300,
            'status' => $status,
            'body' => $responseBody === false ? $error : (string) $responseBody,
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $body,
            'timeout' => 12,
            'ignore_errors' => true,
            'follow_location' => 1,
            'max_redirects' => 3,
        ],
    ]);

    $responseBody = file_get_contents($url, false, $context);
    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
            $status = (int) $matches[1];
            break;
        }
    }

    return [
        'ok' => $responseBody !== false && $status >= 200 && $status < 300,
        'status' => $status,
        'body' => $responseBody === false ? '' : (string) $responseBody,
    ];
}

function verify_recaptcha_token(string $token): array
{
    $secret = env_value('RECAPTCHA_SECRET_KEY');
    if ($secret === '') {
        return ['ok' => true, 'skipped' => true, 'errors' => []];
    }

    if ($token === '') {
        return ['ok' => false, 'skipped' => false, 'errors' => ['missing-input-response']];
    }

    $payload = [
        'secret' => $secret,
        'response' => $token,
    ];

    $remoteIp = $_SERVER['REMOTE_ADDR'] ?? '';
    if (is_string($remoteIp) && $remoteIp !== '') {
        $payload['remoteip'] = $remoteIp;
    }

    $response = http_form_post('https://www.google.com/recaptcha/api/siteverify', $payload);
    if (!$response['ok']) {
        return ['ok' => false, 'skipped' => false, 'errors' => ['verify-request-failed'], 'status' => $response['status']];
    }

    $decoded = json_decode($response['body'], true);
    if (!is_array($decoded)) {
        return ['ok' => false, 'skipped' => false, 'errors' => ['invalid-json-response']];
    }

    return [
        'ok' => ($decoded['success'] ?? false) === true,
        'skipped' => false,
        'errors' => is_array($decoded['error-codes'] ?? null) ? $decoded['error-codes'] : [],
        'hostname' => is_string($decoded['hostname'] ?? null) ? $decoded['hostname'] : '',
    ];
}

function database()
{
    static $pdo = null;
    static $loaded = false;

    if ($loaded) {
        return $pdo;
    }
    $loaded = true;

    $host = env_value('DB_HOST');
    $name = env_value('DB_NAME');
    $user = env_value('DB_USER');
    $pass = env_value('DB_PASS');
    $charset = env_value('DB_CHARSET', 'utf8mb4');

    if ($host === '' || $name === '' || $user === '') {
        return null;
    }

    try {
        $dsn = "mysql:host={$host};dbname={$name};charset={$charset}";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (Throwable $error) {
        error_log('Database connection failed: ' . $error->getMessage());
        $pdo = null;
    }

    return $pdo;
}

function table_name(string $name): string
{
    $prefix = env_value('DB_TABLE_PREFIX', 'gs_');
    $table = $prefix . $name;
    return preg_replace('/[^A-Za-z0-9_]/', '', $table);
}
