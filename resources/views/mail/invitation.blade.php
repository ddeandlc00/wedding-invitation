<x-mail::message>
# Your invitation

Dear {{ $inviteeName }},

{{ $couple }} invited you to their wedding. Open your personal invitation with the private link below.

<x-mail::button :url="$url">
Open invitation
</x-mail::button>

If you need the code itself, it is:

{{ $code }}

This link is personal. Please do not post it publicly.

Thanks,<br>
{{ $couple }}
</x-mail::message>
