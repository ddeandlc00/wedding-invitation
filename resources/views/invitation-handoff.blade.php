<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="referrer" content="no-referrer">
        <meta name="robots" content="noindex, nofollow">
        <title>Opening invitation</title>
    </head>
    <body>
        <p>Opening your invitation…</p>
        <p><a href="{{ $target }}">Continue</a></p>
        <script>
            window.location.replace(@json($target));
        </script>
    </body>
</html>
