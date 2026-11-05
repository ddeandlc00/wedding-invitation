<?php

$directories = [
    '/tmp/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
];

foreach ($directories as $directory) {
    if (! is_dir($directory) && ! mkdir($directory, 0777, true) && ! is_dir($directory)) {
        http_response_code(500);
        header('Content-Type: text/plain; charset=UTF-8');
        echo "The serverless runtime could not prepare temporary storage.\n";

        return;
    }
}

$appKey = $_ENV['APP_KEY'] ?? $_SERVER['APP_KEY'] ?? getenv('APP_KEY');
$appKey = is_string($appKey) ? $appKey : '';
$decodedKey = str_starts_with($appKey, 'base64:')
    ? base64_decode(substr($appKey, 7), true)
    : false;
$validAppKey = strlen($appKey) === 32 || (is_string($decodedKey) && strlen($decodedKey) === 32);

if (! $validAppKey) {
    error_log('APP_KEY is missing or invalid.');
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "APP_KEY is missing or invalid. Set it in the Vercel project environment to the output of: php artisan key:generate --show\n";

    return;
}

require __DIR__.'/../public/index.php';
