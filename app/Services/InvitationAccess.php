<?php

namespace App\Services;

use App\Enums\InvitationStatus;
use App\Models\Invitation;
use Illuminate\Http\Request;

class InvitationAccess
{
    public function __construct(private InvitationCodeService $codes) {}

    public function assess(string $code): InvitationAccessResult
    {
        $invitation = $this->codes->findByPlainCode($code);

        if ($invitation === null) {
            return InvitationAccessResult::invalid();
        }

        if ($invitation->status !== InvitationStatus::Active) {
            return InvitationAccessResult::disabled($invitation);
        }

        if ($invitation->expires_at?->isPast()) {
            return InvitationAccessResult::expired($invitation);
        }

        return InvitationAccessResult::valid($invitation);
    }

    public function establish(Request $request, Invitation $invitation): void
    {
        if ($request->user() === null) {
            $request->session()->regenerate();
        }

        $request->session()->put((string) config('wedding.session_key'), $invitation->id);
    }

    public function current(Request $request): ?Invitation
    {
        $id = $request->session()->get(config('wedding.session_key'));

        if (! is_numeric($id)) {
            return null;
        }

        $invitation = Invitation::query()->find((int) $id);

        if (! $invitation instanceof Invitation) {
            $this->forget($request);

            return null;
        }

        if ($invitation->status !== InvitationStatus::Active || $invitation->expires_at?->isPast()) {
            $this->forget($request);

            return null;
        }

        return $invitation;
    }

    public function forget(Request $request): void
    {
        $request->session()->forget((string) config('wedding.session_key'));
    }
}
