import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';

export function InvitationCodeForm() {
    const form = useForm({ code: '' });
    const [visible, setVisible] = useState(false);
    const errors = usePage().props.errors as Record<string, string | undefined>;
    const message = form.errors.code ?? errors.code;

    return (
        <form
            className="space-y-4"
            onSubmit={(event) => {
                event.preventDefault();
                form.post('/invitation/access', { preserveScroll: true });
            }}
        >
            <div className="space-y-2">
                <label htmlFor="invitation-code" className="text-sm tracking-wide">
                    Invitation code
                </label>
                <div className="flex gap-2">
                    <input
                        id="invitation-code"
                        value={form.data.code}
                        onChange={(event) => form.setData('code', event.target.value)}
                        type={visible ? 'text' : 'password'}
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        aria-invalid={message ? true : undefined}
                        aria-describedby={message ? 'invitation-code-error' : undefined}
                        className="h-12 w-full border border-champagne/60 bg-paper px-4 tracking-[0.12em] outline-none focus:border-sage"
                        placeholder="Enter your code"
                    />
                    <button
                        type="button"
                        className="inline-flex size-12 items-center justify-center border border-champagne/60"
                        onClick={() => setVisible((value) => !value)}
                        aria-pressed={visible}
                    >
                        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        <span className="sr-only">{visible ? 'Hide invitation code' : 'Show invitation code'}</span>
                    </button>
                </div>
                <InputError id="invitation-code-error" message={message} />
            </div>
            <button
                type="submit"
                disabled={form.processing}
                className="h-12 w-full bg-sage px-6 text-sm tracking-[0.16em] text-paper uppercase disabled:opacity-60"
            >
                {form.processing ? 'Checking…' : 'Open invitation'}
            </button>
        </form>
    );
}
