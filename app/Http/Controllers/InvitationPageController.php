<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Services\WeddingPresenter;
use Inertia\Inertia;
use Inertia\Response;

class InvitationPageController extends Controller
{
    public function show(WeddingPresenter $presenter): Response
    {
        /** @var Invitation $invitation */
        $invitation = request()->attributes->get('invitation');

        return Inertia::render('public/invitation', [
            'invitation' => $presenter->forGuest($invitation),
            'details' => $presenter->details(),
            'rsvpConfirmed' => (bool) session('rsvp_confirmed'),
        ]);
    }
}
