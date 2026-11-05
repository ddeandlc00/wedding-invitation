import { Head } from '@inertiajs/react';

type Moment = {
    id: number;
    title: string;
    occurredLabel: string | null;
    body: string;
    imageUrl: string | null;
    imageUrls: string[];
    caption: string | null;
    isSample: boolean;
};

export default function Story({ moments, hasSample }: { moments: Moment[]; hasSample: boolean }) {
    return (
        <>
            <Head title="Our Story" />
            <article className="mx-auto max-w-5xl px-5 py-16">
                <p className="text-xs tracking-[0.24em] text-champagne uppercase">Our story</p>
                <h1 className="wedding-display mt-4 text-6xl">How we got here</h1>
                <p className="mt-4 max-w-2xl text-taupe">
                    From a first hello in 2021 to a wedding by the sea.
                </p>
                {hasSample && (
                    <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3 text-sm">
                        Sample content — replace this story from the administrator settings. The photographs are placeholders.
                    </p>
                )}
                {moments.length === 0 ? (
                    <p className="mt-10 text-taupe">The couple’s story will appear here.</p>
                ) : (
                    <ol className="relative mt-16 space-y-14 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-champagne md:before:left-1/2">
                        {moments.map((moment, index) => {
                            const photos = moment.imageUrls?.length
                                ? moment.imageUrls
                                : moment.imageUrl
                                  ? [moment.imageUrl]
                                  : [];
                            const flip = index % 2 === 1;

                            return (
                                <li key={moment.id} className="relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                                    <span className="absolute top-2 left-0 h-3.5 w-3.5 rounded-full border border-sage bg-ivory md:left-1/2 md:-translate-x-1/2" />
                                    <div className={flip ? 'md:order-2' : undefined}>
                                        {moment.occurredLabel && (
                                            <p className="wedding-display text-4xl text-sage">{moment.occurredLabel}</p>
                                        )}
                                        <h2 className="wedding-display mt-2 text-4xl">{moment.title}</h2>
                                        <p className="mt-4 leading-relaxed whitespace-pre-line">{moment.body}</p>
                                    </div>
                                    {photos.length > 0 && (
                                        <div className={flip ? 'md:order-1' : 'md:order-2'}>
                                            <div className={photos.length > 1 ? 'grid grid-cols-2 gap-3' : undefined}>
                                                {photos.map((src) => (
                                                    <img
                                                        key={src}
                                                        src={src}
                                                        alt={`${moment.title}, placeholder photograph`}
                                                        className={`w-full border border-champagne/40 object-cover ${photos.length > 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                                                    />
                                                ))}
                                            </div>
                                            {moment.caption && <p className="mt-2 text-xs tracking-wide text-taupe">{moment.caption}</p>}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                )}
            </article>
        </>
    );
}
