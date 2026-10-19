<?php

namespace App\Http\Requests\Admin;

use App\Models\Invitation;

class UpdateInvitationRequest extends StoreInvitationRequest
{
    public function authorize(): bool
    {
        $invitation = $this->route('invitation');

        return $invitation instanceof Invitation
            && ($this->user()?->can('update', $invitation) ?? false);
    }
}
