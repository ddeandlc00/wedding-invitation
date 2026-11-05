<?php

namespace App\Support;

class Https
{
    /**
     * Vercel and other proxies terminate TLS and forward plain HTTP.
     * Mark the PHP request secure before Laravel builds redirect URLs.
     */
    public static function honorForwardedProto(): void
    {
        $forwarded = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';

        if (! is_string($forwarded) || $forwarded === '') {
            return;
        }

        $proto = strtolower(trim(explode(',', $forwarded)[0]));

        if ($proto !== 'https') {
            return;
        }

        $_SERVER['HTTPS'] = 'on';
        $_SERVER['SERVER_PORT'] = '443';
    }
}
