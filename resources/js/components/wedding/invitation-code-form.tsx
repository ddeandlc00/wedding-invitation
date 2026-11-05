import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
                <Label htmlFor="invitation-code">Invitation code</Label>
                <div className="flex gap-2">
                    <Input
                        id="invitation-code"
                        value={form.data.code}
                        onChange={(event) => form.setData('code', event.target.value.toUpperCase())}
                        type={visible ? 'text' : 'password'}
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        aria-invalid={message ? true : undefined}
                        aria-describedby={message ? 'invitation-code-error' : undefined}
                        className="h-12 bg-paper tracking-[0.2em]"
                        placeholder="ABCD-1234"
                    />
                    <Button type="button" variant="outline" size="icon" className="size-12" aria-pressed={visible} onClick={() => setVisible((value) => !value)}>
                        {visible ? <EyeOff /> : <Eye />}
                        <span className="sr-only">{visible ? 'Hide invitation code' : 'Show invitation code'}</span>
                    </Button>
                </div>
                <InputError id="invitation-code-error" message={message} />
            </div>
            <Button type="submit" disabled={form.processing} className="h-12 w-full rounded-full tracking-[0.14em] uppercase">
                {form.processing ? 'Checking…' : 'Open invitation'}
            </Button>
        </form>
    );
}
