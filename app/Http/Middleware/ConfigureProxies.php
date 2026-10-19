<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConfigureProxies
{
    public function handle(Request $request, Closure $next): Response
    {
        $trusted = config('wedding.trusted_proxies');

        if (! is_string($trusted) || $trusted === '') {
            return $next($request);
        }

        if ($trusted === '*') {
            $remote = $request->server->get('REMOTE_ADDR');
            $proxies = is_string($remote) && $remote !== '' ? [$remote] : [];
        } else {
            $proxies = array_values(array_filter(array_map('trim', explode(',', $trusted))));
        }

        if ($proxies === []) {
            return $next($request);
        }

        $request->setTrustedProxies($proxies, Request::HEADER_X_FORWARDED_FOR
            | Request::HEADER_X_FORWARDED_HOST
            | Request::HEADER_X_FORWARDED_PORT
            | Request::HEADER_X_FORWARDED_PROTO
            | Request::HEADER_X_FORWARDED_AWS_ELB);

        return $next($request);
    }
}
