<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invitation\AccessInvitationRequest;
use App\Services\InvitationAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvitationAccessController extends Controller
{
    public function store(AccessInvitationRequest $request, InvitationAccess $access): RedirectResponse
    {
        return $this->open($request, $access, $request->string('code')->toString());
    }

    public function enter(Request $request, InvitationAccess $access, string $code): Response|RedirectResponse
    {
        $result = $access->assess($code);

        if ($result->invitation === null || $result->outcome !== 'valid') {
            return redirect()->route('home')->withErrors([
                'code' => $result->message(),
            ]);
        }

        $access->establish($request, $result->invitation);

        return response()
            ->view('invitation-handoff', [
                'target' => route('invitation.show'),
            ])
            ->header('Cache-Control', 'no-store, private')
            ->header('Referrer-Policy', 'no-referrer');
    }

    public function leave(Request $request, InvitationAccess $access): RedirectResponse
    {
        $access->forget($request);

        return redirect()->route('home');
    }

    private function open(Request $request, InvitationAccess $access, string $code): RedirectResponse
    {
        $result = $access->assess($code);

        if ($result->invitation === null || $result->outcome !== 'valid') {
            return redirect()->route('home')->withErrors([
                'code' => $result->message(),
            ]);
        }

        $access->establish($request, $result->invitation);

        return redirect()->route('invitation.show');
    }
}
