import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { AdminInvitation, Paginator } from '@/types/wedding';

type Filters = {
    search: string;
    status: string;
    rsvp: string;
    sort: string;
    direction: string;
};

export default function InvitationsIndex({
    invitations,
    filters,
}: {
    invitations: Paginator<AdminInvitation>;
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search);

    function apply(next: Partial<Filters>) {
        router.get('/admin/invitations', { ...filters, search, ...next }, { preserveState: true, replace: true });
    }

    return (
        <>
            <Head title="Invitations" />
            <div className="flex flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="font-serif text-3xl">Invitations</h1>
                    <div className="flex gap-2">
                        <a className="rounded-md border px-3 py-2 text-sm" href="/admin/invitations/export">
                            Export CSV
                        </a>
                        <Link className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground" href="/admin/invitations/create">
                            New invitation
                        </Link>
                    </div>
                </div>
                <form
                    className="grid gap-2 md:grid-cols-5"
                    onSubmit={(event) => {
                        event.preventDefault();
                        apply({ search });
                    }}
                >
                    <label className="md:col-span-2 text-sm">
                        Search
                        <input className="mt-1 h-10 w-full rounded-md border px-3" value={search} onChange={(event) => setSearch(event.target.value)} />
                    </label>
                    <label className="text-sm">
                        Status
                        <select className="mt-1 h-10 w-full rounded-md border px-2" value={filters.status} onChange={(event) => apply({ status: event.target.value })}>
                            <option value="">All</option>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </label>
                    <label className="text-sm">
                        RSVP
                        <select className="mt-1 h-10 w-full rounded-md border px-2" value={filters.rsvp} onChange={(event) => apply({ rsvp: event.target.value })}>
                            <option value="">All</option>
                            <option value="awaiting">Awaiting response</option>
                            <option value="attending">Attending</option>
                            <option value="declined">Unable to attend</option>
                        </select>
                    </label>
                    <label className="text-sm">
                        Sort
                        <select className="mt-1 h-10 w-full rounded-md border px-2" value={`${filters.sort}:${filters.direction}`} onChange={(event) => {
                            const [sort, direction] = event.target.value.split(':');
                            apply({ sort, direction });
                        }}>
                            <option value="created_at:desc">Newest</option>
                            <option value="created_at:asc">Oldest</option>
                            <option value="name:asc">Name A–Z</option>
                            <option value="name:desc">Name Z–A</option>
                            <option value="rsvp:asc">RSVP status</option>
                        </select>
                    </label>
                </form>
                {invitations.data.length === 0 ? (
                    <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No invitations match these filters.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="p-3 font-medium">Invitee</th>
                                    <th className="p-3 font-medium">Pax</th>
                                    <th className="p-3 font-medium">Status</th>
                                    <th className="p-3 font-medium">RSVP</th>
                                    <th className="p-3 font-medium">Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.data.map((invitation) => (
                                    <tr key={invitation.id} className="border-b last:border-0">
                                        <td className="p-3">
                                            <Link className="underline" href={`/admin/invitations/${invitation.id}`}>{invitation.inviteeName}</Link>
                                        </td>
                                        <td className="p-3">{invitation.maxPax}</td>
                                        <td className="p-3">{invitation.statusLabel}</td>
                                        <td className="p-3">{invitation.statusSummary}</td>
                                        <td className="p-3 font-mono text-xs">{invitation.code ?? 'Unavailable'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex items-center justify-between text-sm">
                    <p>{invitations.total} invitations</p>
                    <div className="flex gap-3">
                        {invitations.prev_page_url && <Link href={invitations.prev_page_url}>Previous</Link>}
                        {invitations.next_page_url && <Link href={invitations.next_page_url}>Next</Link>}
                    </div>
                </div>
            </div>
        </>
    );
}

InvitationsIndex.layout = {
    breadcrumbs: [{ title: 'Invitations', href: '/admin/invitations' }],
};
