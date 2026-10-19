import { Head } from '@inertiajs/react';

export default function Registry({
    giftPreferences,
    registryUrl,
}: {
    giftPreferences: string | null;
    registryUrl: string | null;
}) {
    return (
        <>
            <Head title="Registry" />
            <article className="mx-auto max-w-3xl px-5 py-16">
                <h1 className="wedding-display text-6xl">Gifts</h1>
                {!giftPreferences && !registryUrl ? (
                    <p className="mt-8 text-taupe">Gift notes and registry links will appear here if the couple chooses to share them.</p>
                ) : (
                    <div className="mt-8 space-y-4">
                        {giftPreferences && <p className="whitespace-pre-line leading-relaxed">{giftPreferences}</p>}
                        {registryUrl && (
                            <a className="inline-block text-sage underline" href={registryUrl}>
                                Open registry
                            </a>
                        )}
                    </div>
                )}
            </article>
        </>
    );
}
