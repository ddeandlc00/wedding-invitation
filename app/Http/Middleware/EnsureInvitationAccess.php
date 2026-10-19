<?php

namespace App\Http\Middleware;

use App\Services\InvitationAccess;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureInvitationAccess
{
    public function __construct(private InvitationAccess $access) {}

    public function handle(Request $request, Closure $next): Response
    {
        $invitation = $this->access->current($request);

        if ($invitation === null) {
            return redirect()->route('home')->withErrors([
                'code' => 'Enter your invitation code to view your invitation.',
            ]);
        }

        $request->attributes->set('invitation', $invitation);

        $response = $next($request);
        $response->headers->set('Cache-Control', 'no-store, private');
        $response->headers->set('Referrer-Policy', 'no-referrer');

        return $response;
    }
}
