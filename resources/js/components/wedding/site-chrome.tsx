import { Link, usePage } from '@inertiajs/react';
import { Monogram } from '@/components/wedding/monogram';
import { MusicToggle } from '@/components/wedding/music-toggle';
import type { WeddingShared } from '@/types/wedding';

export function useWedding(): WeddingShared {
    return usePage<{ wedding: WeddingShared }>().props.wedding;
}

export function SiteHeader() {
    const wedding = useWedding();
    const current = usePage().url;
    const links = [{ label: 'Home', href: '/' }, ...wedding.navigation];

    return (
        <header className="sticky top-0 z-30 border-b border-champagne/50 bg-ivory/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <Link href="/" className="flex min-w-0 items-center gap-3">
                    <Monogram className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                    <span className="min-w-0">
                        <span className="wedding-display block truncate text-lg leading-none text-ink sm:text-xl">
                            {wedding.couple}
                        </span>
                        <span className="mt-1 hidden text-xs tracking-[0.18em] text-taupe uppercase sm:block">
                            {wedding.dateLabel ?? 'Wedding celebration'}
                        </span>
                    </span>
                </Link>
                <nav
                    className="flex max-w-[16rem] flex-wrap items-center justify-end gap-1 rounded-full border border-champagne bg-paper px-1.5 py-1 sm:max-w-none"
                    aria-label="Wedding pages"
                >
                    {links.map((item) => {
                        const active = item.href === '/' ? current === '/' || current.startsWith('/?') : current.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-2.5 py-1.5 text-xs tracking-wide sm:px-3 sm:text-sm ${active ? 'bg-[#e8d4df] text-ink' : 'text-taupe hover:text-ink'}`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <MusicToggle />
                </nav>
            </div>
        </header>
    );
}

export function SiteFooter() {
    const wedding = useWedding();

    return (
        <footer className="border-t border-champagne/40">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
                <div>
                    <Monogram className="mb-3 h-20 w-20" />
                    <p className="wedding-display text-3xl">{wedding.couple}</p>
                    <p className="mt-2 text-sm text-taupe">
                        {wedding.dateLabel ?? 'The date will be announced here.'}
                        {wedding.timeLabel ? ` · ${wedding.timeLabel}` : ''}
                    </p>
                </div>
                <div>
                    <p className="text-xs tracking-[0.18em] text-taupe uppercase">Visit</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {wedding.navigation.slice(0, 4).map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="hover:text-ink">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-sm text-taupe">
                    <p>Invitations are personal. Guest lists and RSVPs are never shown on public pages.</p>
                    {(wedding.contactEmail || wedding.contactPhone) && (
                        <p className="mt-3">
                            {wedding.contactEmail}
                            {wedding.contactEmail && wedding.contactPhone ? ' · ' : ''}
                            {wedding.contactPhone}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}
