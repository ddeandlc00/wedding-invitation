import { Head, Link } from '@inertiajs/react';
import type { ChartItem, DashboardStats } from '@/types/wedding';

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const empty = stats.invitations === 0;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="font-serif text-3xl">Wedding dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Counts come from saved invitations and RSVPs.
                    </p>
                </div>
                {empty ? (
                    <div className="rounded-xl border border-dashed p-10 text-center">
                        <p className="text-lg">No invitations yet.</p>
                        <Link href="/admin/invitations/create" className="mt-4 inline-block text-sm underline">
                            Create the first invitation
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <Stat label="Invitations" value={stats.invitations} note="Households invited, one invitation each" />
                            <Stat label="Households" value={stats.households} note="Same count: each invitation is one household" />
                            <Stat label="Invited capacity" value={stats.invitedCapacity} note="Guest seats on active invitations" />
                            <Stat label="Awaiting response" value={stats.awaiting} note="Active invitations with no RSVP" />
                            <Stat label="Attending" value={stats.attending} note="Invitations that accepted" />
                            <Stat label="Unable to attend" value={stats.declined} note="Invitations that declined" />
                            <Stat label="Confirmed attendees" value={stats.confirmedAttendees} note="People who are actually coming" />
                            <Stat label="Unconfirmed capacity" value={stats.unconfirmedCapacity} note="Seats still waiting on a reply, not attendance" />
                            <Stat label="Declined capacity" value={stats.declinedCapacity} note="Seats on invitations that declined" />
                            <Stat label="Disabled invitations" value={stats.disabled} note="Links that no longer open" />
                        </div>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <Chart title="RSVP status" items={stats.statusChart} />
                            <Chart title="Capacity and attendance" items={stats.capacityChart} />
                        </div>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <section className="rounded-xl border p-4">
                                <h2 className="font-medium">Responses over time</h2>
                                {stats.trend.length === 0 ? (
                                    <p className="mt-4 text-sm text-muted-foreground">No RSVPs have been submitted yet.</p>
                                ) : (
                                    <ul className="mt-4 space-y-2 text-sm">
                                        {stats.trend.map((point) => (
                                            <li key={point.day} className="flex justify-between">
                                                <span>{point.day}</span>
                                                <span>{point.total}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                            <section className="rounded-xl border p-4">
                                <h2 className="font-medium">Attendance by event</h2>
                                {stats.events.length === 0 ? (
                                    <p className="mt-4 text-sm text-muted-foreground">Add ceremony or reception events in settings.</p>
                                ) : (
                                    <ul className="mt-4 space-y-3 text-sm">
                                        {stats.events.map((event) => (
                                            <li key={event.name}>
                                                <div className="flex justify-between">
                                                    <span>{event.name}</span>
                                                    <span>{event.confirmed} confirmed</span>
                                                </div>
                                                {event.when && <p className="text-muted-foreground">{event.when}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

function Stat({ label, value, note }: { label: string; value: number; note: string }) {
    return (
        <article className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{note}</p>
        </article>
    );
}

function Chart({ title, items }: { title: string; items: ChartItem[] }) {
    const max = Math.max(1, ...items.map((item) => item.value));
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <section className="rounded-xl border p-4">
            <h2 className="font-medium">{title}</h2>
            {total === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Nothing to chart yet.</p>
            ) : (
                <ul className="mt-4 space-y-3">
                    {items.map((item) => (
                        <li key={item.label}>
                            <div className="mb-1 flex justify-between text-sm">
                                <span>{item.label}</span>
                                <span>{item.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted" aria-hidden="true">
                                <div className="h-2 rounded-full bg-primary" style={{ width: `${(item.value / max) * 100}%` }} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/admin/dashboard' }],
};
