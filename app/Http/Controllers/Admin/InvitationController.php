<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InvitationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInvitationRequest;
use App\Http\Requests\Admin\UpdateInvitationRequest;
use App\Mail\InvitationLinkMail;
use App\Models\Invitation;
use App\Models\User;
use App\Models\WeddingSetting;
use App\Services\AuditLogger;
use App\Services\CsvExport;
use App\Services\InvitationAccess;
use App\Services\InvitationFilter;
use App\Services\InvitationService;
use App\Services\WeddingPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class InvitationController extends Controller
{
    public function index(Request $request, InvitationFilter $filter, WeddingPresenter $presenter): Response
    {
        $this->authorize('viewAny', Invitation::class);

        $invitations = $filter->invitations($request)
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Invitation $invitation): array => $presenter->forAdmin($invitation));

        return Inertia::render('admin/invitations/index', [
            'invitations' => $invitations,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'status' => $request->string('status')->toString(),
                'rsvp' => $request->string('rsvp')->toString(),
                'sort' => $request->string('sort')->toString() ?: 'created_at',
                'direction' => $request->string('direction')->toString() === 'asc' ? 'asc' : 'desc',
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Invitation::class);

        return Inertia::render('admin/invitations/form', [
            'invitation' => null,
        ]);
    }

    public function store(StoreInvitationRequest $request, InvitationService $service): RedirectResponse
    {
        $invitation = $service->create(
            $request->invitationAttributes(),
            $this->admin($request),
            $request,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitation created. Copy the link before you leave this page.']);

        return to_route('admin.invitations.show', $invitation);
    }

    public function show(Invitation $invitation, WeddingPresenter $presenter): Response
    {
        $this->authorize('view', $invitation);

        return Inertia::render('admin/invitations/show', [
            'invitation' => $presenter->forAdmin($invitation),
            'mailEnabled' => $this->mailIsConfigured(),
        ]);
    }

    public function edit(Invitation $invitation, WeddingPresenter $presenter): Response
    {
        $this->authorize('update', $invitation);

        return Inertia::render('admin/invitations/form', [
            'invitation' => $presenter->forAdmin($invitation),
        ]);
    }

    public function update(UpdateInvitationRequest $request, Invitation $invitation, InvitationService $service): RedirectResponse
    {
        $service->update($invitation, $request->invitationAttributes(), $this->admin($request), $request);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitation updated.']);

        return to_route('admin.invitations.show', $invitation);
    }

    public function updateStatus(Request $request, Invitation $invitation, InvitationService $service): RedirectResponse
    {
        $this->authorize('update', $invitation);

        $validated = $request->validate([
            'status' => ['required', Rule::enum(InvitationStatus::class)],
        ]);

        $service->changeStatus($invitation, $validated['status'], $this->admin($request), $request);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitation status updated.']);

        return back();
    }

    public function regenerate(Request $request, Invitation $invitation, InvitationService $service): RedirectResponse
    {
        $this->authorize('update', $invitation);
        $service->regenerate($invitation, $this->admin($request), $request);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'A new invitation code was created. The previous link no longer works.']);

        return to_route('admin.invitations.show', $invitation);
    }

    public function email(Request $request, Invitation $invitation, AuditLogger $audit): RedirectResponse
    {
        $this->authorize('update', $invitation);

        if (! $this->mailIsConfigured()) {
            return back()->withErrors([
                'email' => 'Email delivery is not configured. Copy the invitation link and share it manually.',
            ]);
        }

        if ($invitation->email === null || $invitation->plainCode() === null || $invitation->shareUrl() === null) {
            return back()->withErrors([
                'email' => 'Add an email address and a working invitation code before sending.',
            ]);
        }

        try {
            Mail::to($invitation->email)->send(new InvitationLinkMail(
                inviteeName: $invitation->invitee_name,
                url: (string) $invitation->shareUrl(),
                code: (string) $invitation->plainCode(),
                couple: WeddingSetting::current()->coupleLabel(),
            ));
        } catch (Throwable $exception) {
            report($exception);
            $audit->log('invitation.email_failed', $invitation, ['invitation_id' => $invitation->id], $this->admin($request), $request);

            return back()->withErrors([
                'email' => 'The invitation email could not be sent. Copy the link and share it manually.',
            ]);
        }

        $audit->log('invitation.email_submitted', $invitation, ['invitation_id' => $invitation->id], $this->admin($request), $request);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'The invitation email was submitted to the mail provider.']);

        return back();
    }

    public function preview(Request $request, Invitation $invitation, InvitationAccess $access): RedirectResponse
    {
        $this->authorize('view', $invitation);

        if ($invitation->status !== InvitationStatus::Active || $invitation->expires_at?->isPast()) {
            return back()->withErrors([
                'preview' => 'Activate the invitation before previewing the guest page.',
            ]);
        }

        $access->establish($request, $invitation);

        return redirect()->route('invitation.show');
    }

    public function export(Request $request, InvitationFilter $filter, CsvExport $csv, AuditLogger $audit): StreamedResponse
    {
        $this->authorize('viewAny', Invitation::class);
        $audit->log('invitation.exported', null, [], $this->admin($request), $request);

        $rows = $filter->invitations($request)->lazy()->map(function (Invitation $invitation): array {
            $rsvp = $invitation->rsvp;

            return [
                $invitation->invitee_name,
                $invitation->contact_name,
                $invitation->email,
                $invitation->max_pax,
                $invitation->status->value,
                $invitation->plainCode(),
                $invitation->shareUrl(),
                $rsvp === null ? 'awaiting' : $rsvp->attendance_status->value,
                $rsvp?->attendee_count,
                $invitation->organizer_notes,
            ];
        });

        return $csv->download('invitations.csv', [
            'Invitee',
            'Contact name',
            'Email',
            'Pax',
            'Status',
            'Code',
            'URL',
            'RSVP',
            'Attendees',
            'Organizer notes',
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

    private function mailIsConfigured(): bool
    {
        if (! config('wedding.mail_enabled')) {
            return false;
        }

        $mailer = config('mail.default');

        return is_string($mailer) && in_array($mailer, config('wedding.mailers'), true);
    }
}
