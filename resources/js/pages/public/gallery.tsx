import { Head } from '@inertiajs/react';

type Image = { id: number; url: string | null; altText: string; caption: string | null };

export default function Gallery({ images }: { images: Image[] }) {
    return (
        <>
            <Head title="Gallery" />
            <article className="mx-auto max-w-5xl px-5 py-16">
                <h1 className="wedding-display text-6xl">Gallery</h1>
                {images.length === 0 ? (
                    <div className="mt-10 border border-dashed border-champagne/70 bg-paper px-6 py-16 text-center">
                        <p className="wedding-display text-4xl text-champagne">Photographs</p>
                        <p className="mt-3 text-sm text-taupe">
                            Wedding photographs will appear here after they are added. No outside image is required.
                        </p>
                    </div>
                ) : (
                    <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                        {images.map((image) => (
                            <li key={image.id} className="bg-paper">
                                {image.url && (
                                    <img src={image.url} alt={image.altText} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                                )}
                                {image.caption && <p className="px-3 py-3 text-sm text-taupe">{image.caption}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </>
    );
}
