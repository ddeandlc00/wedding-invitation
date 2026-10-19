import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { AdminInvitation, Paginator } from '@/types/wedding';

export default function RsvpIndex({
    invitations,
    filters,
}: {
    invitations: Paginator<AdminInvitation>;
    filters: { search: string; rsvp: string; sort: string; direction: string };
}) {
    const [search, setSearch] = useState(filters.search);

    return (
        <>
            <Head title="RSVPs" />
            <div className="flex flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="font-serif text-3xl">RSVPs</h1>
                    <a className="rounded-md border px-3 py-2 text-sm" href={`/admin/rsvps/export?search=${encodeURIComponent(filters.search)}&rsvp=${encodeURIComponent(filters.rsvp)}`}>
                        Export CSV
                    </a>
                </div>
                <form
                    className="flex flex-wrap gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        router.get('/admin/rsvps', { ...filters, search }, { preserveState: true, replace: true });
                    }}
                >
                    <input className="h-10 rounded-md border px-3" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search invitees" />
                    <select
                        className="h-10 rounded-md border px-2"
                        value={filters.rsvp}
                        onChange={(event) => router.get('/admin/rsvps', { ...filters, search, rsvp: event.target.value }, { preserveState: true, replace: true })}
                    >
                        <option value="">All responses</option>
                        <option value="awaiting">Awaiting response</option>
                        <option value="attending">Attending</option>
                        <option value="declined">Unable to attend</option>
                    </select>
                    <button className="rounded-md border px-3" type="submit">Search</button>
                </form>
                {invitations.data.length === 0 ? (
                    <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No RSVP records match.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full min-w-[680px] text-left text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="p-3">Invitee</th>
                                    <th className="p-3">Pax</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Attendees</th>
                                    <th className="p-3">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.data.map((invitation) => (
                                    <tr key={invitation.id} className="border-b last:border-0">
                                        <td className="p-3">
                                            <Link className="underline" href={`/admin/rsvps/${invitation.id}`}>{invitation.inviteeName}</Link>
                                        </td>
                                        <td className="p-3">{invitation.maxPax}</td>
                                        <td className="p-3">{invitation.statusSummary}</td>
                                        <td className="p-3">{invitation.confirmedAttendees}</td>
                                        <td className="p-3">{invitation.rsvp?.sourceLabel ?? 'Awaiting response'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-end gap-3 text-sm">
                    {invitations.prev_page_url && <Link href={invitations.prev_page_url}>Previous</Link>}
                    {invitations.next_page_url && <Link href={invitations.next_page_url}>Next</Link>}
                </div>
            </div>
        </>
    );
}

RsvpIndex.layout = {
    breadcrumbs: [{ title: 'RSVPs', href: '/admin/rsvps' }],
};
