import { useEffect, useState } from 'react';
import type { CountdownPayload } from '@/types/wedding';

function parts(target: number, now: number) {
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return [
        ['Days', days],
        ['Hours', hours],
        ['Minutes', minutes],
        ['Seconds', seconds],
    ] as const;
}

export function Countdown({ countdown }: { countdown: CountdownPayload }) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!countdown.scheduled || !countdown.target) {
            return;
        }

        const timer = window.setInterval(() => setNow(Date.now()), 1000);

        return () => window.clearInterval(timer);
    }, [countdown.scheduled, countdown.target]);

    if (!countdown.scheduled || !countdown.target) {
        return (
            <p className="text-sm text-taupe">The wedding date will appear here once it is added.</p>
        );
    }

    const target = Date.parse(countdown.target);

    if (Number.isNaN(target) || target <= now || countdown.passed) {
        return <p className="wedding-display text-3xl">{countdown.postMessage}</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-2" aria-live="off">
                {parts(target, now).map(([label, value]) => (
                    <div key={label} className="border border-champagne/50 bg-paper/70 px-2 py-4 text-center">
                        <div className="wedding-display text-3xl sm:text-4xl">{String(value).padStart(2, '0')}</div>
                        <div className="mt-1 text-[0.7rem] tracking-[0.16em] text-taupe uppercase">{label}</div>
                    </div>
                ))}
            </div>
            <p className="mt-3 text-center text-xs tracking-wide text-taupe">
                Official time zone: {countdown.timezone}
            </p>
        </div>
    );
}
