import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader, useWedding } from '@/components/wedding/site-chrome';

export default function WeddingLayout({ children }: { children: ReactNode }) {
    const wedding = useWedding();
    const theme = wedding.theme;

    return (
        <div
            className="wedding-site min-h-screen"
            style={{
                ['--wedding-ivory' as string]: theme.ivory,
                ['--wedding-paper' as string]: theme.paper,
                ['--wedding-ink' as string]: theme.ink,
                ['--wedding-muted' as string]: theme.muted,
                ['--wedding-champagne' as string]: theme.champagne,
                ['--wedding-sage' as string]: theme.sage,
                ['--wedding-heading' as string]: theme.headingStack,
                ['--wedding-body' as string]: theme.bodyStack,
            }}
        >
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
        </div>
    );
}
