import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function MusicToggle() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.volume = 0.35;
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }, []);

    function toggle() {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (playing) {
            audio.pause();
            setPlaying(false);

            return;
        }

        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    return (
        <>
            <audio ref={audioRef} src="/audio/lavender-haze.wav" loop preload="auto" />
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full border-champagne bg-paper"
                aria-pressed={playing}
                onClick={toggle}
            >
                {playing ? <Pause /> : <Play />}
                <span className="hidden sm:inline">{playing ? 'Pause' : 'Play'}</span>
                <span className="sr-only sm:hidden">{playing ? 'Pause music' : 'Play music'}</span>
            </Button>
        </>
    );
}
