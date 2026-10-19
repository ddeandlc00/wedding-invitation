<?php

namespace App\Http\Controllers;

use App\Enums\RsvpSource;
use App\Http\Requests\Invitation\SubmitRsvpRequest;
use App\Models\Invitation;
use App\Services\RsvpService;
use Illuminate\Http\RedirectResponse;

class RsvpSubmissionController extends Controller
{
    public function store(SubmitRsvpRequest $request, RsvpService $rsvps): RedirectResponse
    {
        $invitation = $request->attributes->get('invitation');

        if (! $invitation instanceof Invitation) {
            abort(403);
        }

        $rsvps->save(
            $invitation,
            $request->validated(),
            RsvpSource::Guest,
            null,
            $request,
        );

        return redirect()
            ->route('invitation.show')
            ->with('rsvp_confirmed', true);
    }
}
