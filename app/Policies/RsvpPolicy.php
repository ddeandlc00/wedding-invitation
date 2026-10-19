<?php

namespace App\Policies;

use App\Models\Rsvp;
use App\Models\User;

class RsvpPolicy
{
    public function view(User $user, Rsvp $rsvp): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Rsvp $rsvp): bool
    {
        return $user->isAdmin();
    }
}
