import { Head } from '@inertiajs/react';
import { Countdown } from '@/components/wedding/countdown';
import { useWedding } from '@/components/wedding/site-chrome';
import { Button } from '@/components/ui/button';
import type { PublicEvent } from '@/types/wedding';

type Details = {
    events: PublicEvent[];
    hasSampleEvents: boolean;
    dressCode: string | null;
    suggestedArrival: string | null;
    parking: string | null;
    transportation: string | null;
    giftPreferences: string | null;
};

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/3W7faTPg12jmqoqD9';
const APPLE_MAPS_URL = 'https://maps.apple/p/pzi~opuZ-gjiFA';
const MAP_EMBED_URL = 'https://maps.google.com/maps?q=18.3707711,120.6014036&z=16&output=embed';

export default function Details(props: Details) {
    const wedding = useWedding();
    const venue = props.events.find((event) => event.venueName) ?? null;
    const venueName = venue?.venueName ?? 'Asaricha Tropical Beach Resort';
    const address = venue?.address ?? 'Brgy. Estancia, Pasuquin, Ilocos Norte, Philippines';
    const googleMapsUrl = venue?.mapUrl ?? GOOGLE_MAPS_URL;
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
                {props.hasSampleEvents && (
                    <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3 text-sm">
                        Sample events are shown until the couple adds the real schedule.
                    </p>
                )}

                <section className="mt-10 border border-champagne/40 bg-paper px-6 py-10 text-center sm:px-10">
                    <p className="text-xs tracking-[0.28em] text-taupe uppercase">The date</p>
                    <p className="wedding-display mt-4 text-5xl leading-none sm:text-7xl">
                        {wedding.dateLabel ?? 'Saturday, March 6, 2027'}
                    </p>
                    <p className="mt-6 text-xl tracking-wide sm:text-2xl">
                        {wedding.timeLabel ?? '3:00 PM Philippine Time (UTC+8)'}
                    </p>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-taupe">
                        The ceremony begins at 3:00 in the afternoon. This is a civil wedding, so the ceremony and the
                        reception are both held at {venueName}.
                    </p>
                    <div className="mx-auto mt-8 max-w-xl text-left">
                        <Countdown countdown={wedding.countdown} />
                    </div>
                </section>

                <section className="mt-16">
                    <p className="text-xs tracking-[0.24em] text-taupe uppercase">The venue</p>
                    <h2 className="wedding-display mt-3 text-5xl sm:text-6xl">{venueName}</h2>
                    <p className="mt-4 text-lg">{address}</p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-taupe">
                        One place for the whole celebration. Vows, dinner, and dancing all happen here.
                    </p>
                    <figure className="mt-8">
                        <img
                            src="/images/venue-asaricha.jpg"
                            alt="Placeholder photograph of a tropical beach. The photograph of Asaricha Tropical Beach Resort will be added here."
                            className="aspect-[16/9] w-full border border-champagne/40 object-cover"
                        />
                        <figcaption className="mt-2 text-sm text-taupe">
                            Placeholder photograph. A picture of the resort will be added here.
                        </figcaption>
                    </figure>
                    <div className="mt-8 overflow-hidden border border-champagne/40 bg-paper">
                        <iframe
                            title={`Map of ${venueName}`}
                            src={MAP_EMBED_URL}
                            className="h-80 w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild variant="outline" className="rounded-full border-champagne">
                            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                                Open in Google Maps
                            </a>
                        </Button>
                        <Button asChild className="rounded-full">
                            <a href={APPLE_MAPS_URL} target="_blank" rel="noreferrer">
                                Open in Apple Maps
                            </a>
                        </Button>
                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="wedding-display text-4xl">The day</h2>
                    <div className="mt-6 space-y-6">
                        {props.events.length === 0 ? (
                            <p className="text-taupe">Venue and schedule details will appear here.</p>
                        ) : (
                            props.events.map((event) => (
                                <section key={event.id} className="border border-champagne/40 bg-paper p-6">
                                    <h3 className="wedding-display text-4xl">{event.name}</h3>
                                    {event.description && <p className="mt-3 leading-relaxed">{event.description}</p>}
                                    <dl className="mt-4 space-y-2 text-sm">
                                        {(event.dateLabel || event.timeLabel) && (
                                            <div>
                                                <dt className="text-taupe">When</dt>
                                                <dd>
                                                    {event.dateLabel}
                                                    {event.dateLabel && event.timeLabel ? ' · ' : ''}
                                                    {event.timeLabel}
                                                </dd>
                                            </div>
                                        )}
                                        {!event.dateLabel && !event.timeLabel && event.name === 'Reception' && (
                                            <div>
                                                <dt className="text-taupe">When</dt>
                                                <dd>Follows the ceremony, on the same day</dd>
                                            </div>
                                        )}
                                        {event.venueName && (
                                            <div>
                                                <dt className="text-taupe">Venue</dt>
                                                <dd>{event.venueName}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </section>
                            ))
                        )}
                    </div>
                </section>

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
                {props.giftPreferences && (
                    <section className="mt-12">
                        <h2 className="wedding-display text-4xl">A note on gifts</h2>
                        <p className="mt-4 whitespace-pre-line">{props.giftPreferences}</p>
                    </section>
                )}
            </article>
        </>
    );
}
