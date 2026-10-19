import { Head } from '@inertiajs/react';

type Moment = {
    id: number;
    title: string;
    occurredLabel: string | null;
    body: string;
    imageUrl: string | null;
    caption: string | null;
    isSample: boolean;
};

export default function Story({ moments, hasSample }: { moments: Moment[]; hasSample: boolean }) {
    return (
        <>
            <Head title="Our Story" />
            <article className="mx-auto max-w-3xl px-5 py-16">
                <p className="text-xs tracking-[0.24em] text-champagne uppercase">Our story</p>
                <h1 className="wedding-display mt-4 text-6xl">How we got here</h1>
                {hasSample && (
                    <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3 text-sm">
                        Sample content — replace this story from the administrator settings.
                    </p>
                )}
                {moments.length === 0 ? (
                    <p className="mt-10 text-taupe">The couple’s story will appear here.</p>
                ) : (
                    <ol className="mt-12 space-y-12 border-l border-champagne/50 pl-6">
                        {moments.map((moment) => (
                            <li key={moment.id}>
                                {moment.occurredLabel && (
                                    <p className="text-xs tracking-[0.16em] text-taupe uppercase">{moment.occurredLabel}</p>
                                )}
                                <h2 className="wedding-display mt-2 text-4xl">{moment.title}</h2>
                                <p className="mt-4 leading-relaxed whitespace-pre-line">{moment.body}</p>
                                {moment.imageUrl && (
                                    <figure className="mt-5">
                                        <img
                                            src={moment.imageUrl}
                                            alt={moment.caption || moment.title}
                                            loading="lazy"
                                            className="w-full"
                                        />
                                        {moment.caption && (
                                            <figcaption className="mt-2 text-sm text-taupe">{moment.caption}</figcaption>
                                        )}
                                    </figure>
                                )}
                            </li>
                        ))}
                    </ol>
                )}
            </article>
        </>
    );
}
