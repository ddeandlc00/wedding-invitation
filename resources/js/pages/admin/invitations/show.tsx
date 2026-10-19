import { Head, Link, router, usePage } from '@inertiajs/react';
import { useClipboard } from '@/hooks/use-clipboard';
import { Button } from '@/components/ui/button';
import type { AdminInvitation } from '@/types/wedding';

export default function InvitationShow({
    invitation,
    mailEnabled,
}: {
    invitation: AdminInvitation;
    mailEnabled: boolean;
}) {
    const errors = usePage().props.errors as Record<string, string | undefined>;
    const [copied, copy] = useClipboard();

    return (
        <>
            <Head title={invitation.inviteeName} />
            <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-sm text-muted-foreground">{invitation.statusLabel}</p>
                        <h1 className="font-serif text-4xl">{invitation.inviteeName}</h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link className="rounded-md border px-3 py-2 text-sm" href={`/admin/invitations/${invitation.id}/edit`}>Edit</Link>
                        <Button type="button" variant="outline" onClick={() => router.post(`/admin/invitations/${invitation.id}/preview`)}>Preview</Button>
                    </div>
                </div>
                {errors.preview && <p className="text-sm text-red-700">{errors.preview}</p>}
                {errors.email && <p className="text-sm text-red-700">{errors.email}</p>}
                <section className="rounded-xl border p-4">
                    <h2 className="font-medium">Share</h2>
                    <p className="mt-2 font-mono text-sm break-all">{invitation.code ?? 'The saved code cannot be read. Regenerate it.'}</p>
                    <p className="mt-2 text-sm break-all text-muted-foreground">{invitation.url}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {invitation.code && (
                            <Button type="button" variant="outline" onClick={() => void copy(invitation.code ?? '')}>
                                {copied === invitation.code ? 'Code copied' : 'Copy code'}
                            </Button>
                        )}
                        {invitation.url && (
                            <Button type="button" variant="outline" onClick={() => void copy(invitation.url ?? '')}>
                                {copied === invitation.url ? 'Link copied' : 'Copy link'}
                            </Button>
                        )}
                        <Button type="button" variant="outline" onClick={() => router.post(`/admin/invitations/${invitation.id}/regenerate`)}>
                            Regenerate code
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={!mailEnabled || !invitation.email}
                            onClick={() => router.post(`/admin/invitations/${invitation.id}/email`)}
                        >
                            Email link
                        </Button>
                    </div>
                    {!mailEnabled && (
                        <p className="mt-3 text-sm text-muted-foreground">Email delivery is not configured. Copy the link and send it yourself.</p>
                    )}
                </section>
                <dl className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                    <Item label="Allowed guests" value={String(invitation.maxPax)} />
                    <Item label="RSVP" value={invitation.statusSummary} />
                    <Item label="Confirmed attendees" value={String(invitation.confirmedAttendees)} />
                    <Item label="Created" value={invitation.createdAt ?? '—'} />
                    <Item label="Contact" value={invitation.contactName ?? '—'} />
                    <Item label="Email" value={invitation.email ?? '—'} />
                    <Item label="Other contact" value={invitation.contactInformation ?? '—'} />
                    <Item label="Guest names" value={invitation.collectGuestNames ? 'Requested' : 'Not requested'} />
                </dl>
                {invitation.organizerNotes && (
                    <section className="rounded-xl border p-4">
                        <h2 className="font-medium">Organizer notes</h2>
                        <p className="mt-2 whitespace-pre-line text-sm">{invitation.organizerNotes}</p>
                    </section>
                )}
                <RsvpDetails invitation={invitation} />
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.patch(`/admin/invitations/${invitation.id}/status`, {
                            status: invitation.status === 'active' ? 'disabled' : 'active',
                        })}
                    >
                        {invitation.status === 'active' ? 'Disable invitation' : 'Reactivate invitation'}
                    </Button>
                    <Link className="inline-flex items-center text-sm underline" href={`/admin/rsvps/${invitation.id}`}>RSVP record</Link>
                </div>
            </div>
        </>
    );
}

function Item({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-1">{value}</dd>
        </div>
    );
}

function RsvpDetails({ invitation }: { invitation: AdminInvitation }) {
    const rsvp = invitation.rsvp;

    if (!rsvp) {
        return <p className="text-sm text-muted-foreground">Awaiting response.</p>;
    }

    return (
        <section className="rounded-xl border p-4 text-sm">
            <h2 className="font-medium">{rsvp.statusLabel}</h2>
            <p className="mt-1 text-muted-foreground">{rsvp.sourceLabel}</p>
            <p className="mt-3">Attendees: {rsvp.attendeeCount}</p>
            {rsvp.guests.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                    {rsvp.guests.map((guest) => (
                        <li key={guest.name}>{guest.name}{guest.dietaryRequirement ? ` — ${guest.dietaryRequirement}` : ''}</li>
                    ))}
                </ul>
            )}
            {rsvp.dietaryRequirements && <p className="mt-2">Dietary: {rsvp.dietaryRequirements}</p>}
            {rsvp.messageToCouple && <p className="mt-2 whitespace-pre-line">Message: {rsvp.messageToCouple}</p>}
            <p className="mt-2 text-muted-foreground">Submitted {rsvp.submittedAt ?? '—'}</p>
            <p className="text-muted-foreground">Updated {rsvp.updatedAt ?? '—'}</p>
        </section>
    );
}

InvitationShow.layout = {
    breadcrumbs: [
        { title: 'Invitations', href: '/admin/invitations' },
        { title: 'Details', href: '/admin/invitations' },
    ],
};
