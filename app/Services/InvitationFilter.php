<?php

namespace App\Services;

use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class InvitationFilter
{
    /**
     * @return Builder<Invitation>
     */
    public function invitations(Request $request): Builder
    {
        $query = Invitation::query()->with(['rsvp.guests']);
        $search = trim($request->string('search')->toString());

        if ($search !== '') {
            $query->where(function (Builder $inner) use ($search): void {
                $inner->where('invitee_name', 'like', '%'.$search.'%')
                    ->orWhere('contact_name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%');
            });
        }

        $status = $request->string('status')->toString();

        if (in_array($status, ['active', 'disabled'], true)) {
            $query->where('status', $status);
        }

        $rsvp = $request->string('rsvp')->toString();

        if ($rsvp === 'awaiting') {
            $query->whereDoesntHave('rsvp');
        } elseif (in_array($rsvp, ['attending', 'declined'], true)) {
            $query->whereHas('rsvp', fn (Builder $inner) => $inner->where('attendance_status', $rsvp));
        }

        $direction = $request->string('direction')->toString() === 'asc' ? 'asc' : 'desc';
        $sort = $request->string('sort')->toString();

        if ($sort === 'name') {
            $query->orderBy('invitee_name', $direction);
        } elseif ($sort === 'rsvp') {
            $query->orderBy(
                Rsvp::query()->select('attendance_status')->whereColumn('rsvps.invitation_id', 'invitations.id'),
                $direction,
            );
        } else {
            $query->orderBy('created_at', $direction);
        }

        return $query->orderBy('id');
    }
}
