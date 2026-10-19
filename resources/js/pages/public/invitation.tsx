import { Head, router } from '@inertiajs/react';
import { Countdown } from '@/components/wedding/countdown';
import { RsvpForm } from '@/components/wedding/rsvp-form';
import { useWedding } from '@/components/wedding/site-chrome';
import type { GuestInvitation, PublicEvent } from '@/types/wedding';

export default function Invitation({
    invitation,
    details,
    rsvpConfirmed,
}: {
    invitation: GuestInvitation;
    details: { events: PublicEvent[] };
    rsvpConfirmed: boolean;
}) {
    const wedding = useWedding();

    return (
        <>
            <Head title="Your invitation">
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <article className="mx-auto max-w-3xl px-5 py-16">
                <p className="text-xs tracking-[0.24em] text-champagne uppercase">Personal invitation</p>
                <h1 className="wedding-display mt-4 text-5xl sm:text-6xl">{invitation.greeting}</h1>
                <p className="mt-6 text-lg leading-relaxed">{invitation.message}</p>
                <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3">{invitation.allowanceLabel}</p>
                <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs tracking-[0.16em] text-taupe uppercase">When</dt>
                        <dd className="mt-2">{wedding.dateLabel ?? 'To be announced'}</dd>
                        {wedding.timeLabel && <dd className="text-sm text-taupe">{wedding.timeLabel}</dd>}
                    </div>
                    <div>
                        <dt className="text-xs tracking-[0.16em] text-taupe uppercase">Response</dt>
                        <dd className="mt-2">{invitation.statusLabel}</dd>
                        {invitation.deadlineLabel && (
                            <dd className="text-sm text-taupe">Please reply by {invitation.deadlineLabel}</dd>
                        )}
                    </div>
                </dl>
                <div className="mt-10">
                    <Countdown countdown={wedding.countdown} />
                </div>
                {details.events.length > 0 && (
                    <section className="mt-12 space-y-4">
                        <h2 className="wedding-display text-4xl">The day</h2>
                        {details.events.map((event) => (
                            <div key={event.id} className="border border-champagne/40 p-5">
                                <h3 className="wedding-display text-3xl">{event.name}</h3>
                                {event.dateLabel && <p className="mt-2 text-sm">{event.dateLabel}</p>}
                                {event.timeLabel && <p className="text-sm text-taupe">{event.timeLabel}</p>}
                                {event.venueName && <p className="mt-3">{event.venueName}</p>}
                                {event.address && <p className="text-sm text-taupe">{event.address}</p>}
                                {event.mapUrl && (
                                    <a className="mt-3 inline-block text-sm text-sage underline" href={event.mapUrl}>
                                        Directions
                                    </a>
                                )}
                            </div>
                        ))}
                    </section>
                )}
                <section className="mt-12 border border-champagne/40 bg-paper p-6 sm:p-8">
                    <h2 className="wedding-display text-4xl">RSVP</h2>
                    <div className="mt-6">
                        <RsvpForm invitation={invitation} events={details.events} confirmed={rsvpConfirmed} />
                    </div>
                </section>
                <button
                    type="button"
                    className="mt-8 text-sm text-taupe underline"
                    onClick={() => router.post('/invitation/leave')}
                >
                    This is not my invitation
                </button>
            </article>
        </>
    );
}
