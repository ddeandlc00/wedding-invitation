<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RsvpSource;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ManualRsvpRequest;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\User;
use App\Services\AuditLogger;
use App\Services\CsvExport;
use App\Services\InvitationFilter;
use App\Services\RsvpService;
use App\Services\WeddingPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RsvpController extends Controller
{
    public function index(Request $request, InvitationFilter $filter, WeddingPresenter $presenter): Response
    {
        $this->authorize('viewAny', Invitation::class);

        $invitations = $filter->invitations($request)
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Invitation $invitation): array => $presenter->forAdmin($invitation));

        return Inertia::render('admin/rsvps/index', [
            'invitations' => $invitations,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'rsvp' => $request->string('rsvp')->toString(),
                'sort' => $request->string('sort')->toString() ?: 'created_at',
                'direction' => $request->string('direction')->toString() === 'asc' ? 'asc' : 'desc',
            ],
        ]);
    }

    public function show(Invitation $invitation, WeddingPresenter $presenter): Response
    {
        $this->authorize('view', $invitation);

        return Inertia::render('admin/rsvps/show', [
            'invitation' => $presenter->forAdmin($invitation),
            'events' => $presenter->adminEvents(),
        ]);
    }

    public function update(ManualRsvpRequest $request, Invitation $invitation, RsvpService $rsvps): RedirectResponse
    {
        $rsvps->save(
            $invitation,
            $request->validated(),
            RsvpSource::Organizer,
            $this->admin($request),
            $request,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'RSVP recorded. This response is marked as entered by the organizer.']);

        return to_route('admin.rsvps.show', $invitation);
    }

    public function export(Request $request, InvitationFilter $filter, CsvExport $csv, AuditLogger $audit): StreamedResponse
    {
        $this->authorize('viewAny', Invitation::class);
        $audit->log('rsvp.exported', null, [], $this->admin($request), $request);

        $rows = $filter->invitations($request)->lazy()->map(function (Invitation $invitation): array {
            $rsvp = $invitation->rsvp;

            if (! $rsvp instanceof Rsvp) {
                return [
                    $invitation->invitee_name,
                    $invitation->max_pax,
                    'awaiting',
                    0,
                    '',
                    null,
                    null,
                    null,
                    null,
                    null,
                ];
            }

            return [
                $invitation->invitee_name,
                $invitation->max_pax,
                $rsvp->attendance_status->value,
                $rsvp->attendee_count,
                $rsvp->guests->pluck('guest_name')->implode(', '),
                $rsvp->dietary_requirements,
                $rsvp->message_to_couple,
                $rsvp->source->value,
                $rsvp->submitted_at?->toIso8601String(),
                $rsvp->updated_at?->toIso8601String(),
            ];
        });

        return $csv->download('rsvps.csv', [
            'Invitee',
            'Pax',
            'Status',
            'Attendees',
            'Guest names',
            'Dietary requirements',
            'Message',
            'Source',
            'Submitted at',
            'Updated at',
        ], $rows);
    }

    private function admin(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            abort(403);
        }

        return $user;
    }
}
