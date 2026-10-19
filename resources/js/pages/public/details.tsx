import { Head } from '@inertiajs/react';
import { useWedding } from '@/components/wedding/site-chrome';
import type { PublicEvent } from '@/types/wedding';

type Details = {
    events: PublicEvent[];
    hasSampleEvents: boolean;
    dressCode: string | null;
    suggestedArrival: string | null;
    parking: string | null;
    transportation: string | null;
    giftPreferences: string | null;
    registryUrl: string | null;
};

export default function Details(props: Details) {
    const wedding = useWedding();
    const notes = [
        ['Dress code', props.dressCode],
        ['Arrival', props.suggestedArrival],
        ['Parking', props.parking],
        ['Getting there', props.transportation],
    ].filter((entry): entry is [string, string] => Boolean(entry[1]));

    return (
        <>
            <Head title="Wedding Details" />
            <article className="mx-auto max-w-4xl px-5 py-16">
                <p className="text-xs tracking-[0.24em] text-champagne uppercase">The celebration</p>
                <h1 className="wedding-display mt-4 text-6xl">Wedding details</h1>
                <p className="mt-4 text-taupe">
                    {wedding.dateLabel ?? 'The schedule will be posted here.'}
                    {wedding.timeLabel ? ` · ${wedding.timeLabel}` : ''}
                </p>
                {props.hasSampleEvents && (
                    <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3 text-sm">
                        Sample events are shown until the couple adds the real schedule.
                    </p>
                )}
                <div id="itinerary" className="mt-12 space-y-6">
                    {props.events.length === 0 ? (
                        <p className="text-taupe">Venue and schedule details will appear here.</p>
                    ) : (
                        props.events.map((event) => (
                            <section key={event.id} className="border border-champagne/40 bg-paper p-6">
                                <h2 className="wedding-display text-4xl">{event.name}</h2>
                                {event.description && <p className="mt-3 leading-relaxed">{event.description}</p>}
                                <dl className="mt-4 space-y-2 text-sm">
                                    {event.dateLabel && (
                                        <div>
                                            <dt className="text-taupe">Date</dt>
                                            <dd>{event.dateLabel}{event.timeLabel ? ` · ${event.timeLabel}` : ''}</dd>
                                        </div>
                                    )}
                                    {event.venueName && (
                                        <div>
                                            <dt className="text-taupe">Venue</dt>
                                            <dd>{event.venueName}</dd>
                                        </div>
                                    )}
                                    {event.address && (
                                        <div>
                                            <dt className="text-taupe">Address</dt>
                                            <dd>{event.address}</dd>
                                        </div>
                                    )}
                                </dl>
                                {event.mapUrl && (
                                    <a className="mt-4 inline-block text-sm text-sage underline" href={event.mapUrl}>
                                        Open directions
                                    </a>
                                )}
                            </section>
                        ))
                    )}
                </div>
                {notes.length > 0 && (
                    <section className="mt-12 grid gap-6 sm:grid-cols-2">
                        {notes.map(([label, value]) => (
                            <div key={label}>
                                <h2 className="text-xs tracking-[0.16em] text-taupe uppercase">{label}</h2>
                                <p className="mt-2 whitespace-pre-line">{value}</p>
                            </div>
                        ))}
                    </section>
                )}
                {(props.giftPreferences || props.registryUrl) && (
                    <section className="mt-12">
                        <h2 className="wedding-display text-4xl">Gifts</h2>
                        {props.giftPreferences && <p className="mt-4 whitespace-pre-line">{props.giftPreferences}</p>}
                        {props.registryUrl && (
                            <a className="mt-4 inline-block text-sage underline" href={props.registryUrl}>
                                View registry
                            </a>
                        )}
                    </section>
                )}
            </article>
        </>
    );
}
