<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Invitation mail
    |--------------------------------------------------------------------------
    |
    | Email is optional. Invitation links can always be copied and shared by
    | hand. A success message is shown only after a real mail transport
    | accepts the message.
    |
    */

    'mail_enabled' => (bool) env('WEDDING_MAIL_ENABLED', false),

    'mailers' => ['smtp', 'ses', 'postmark', 'resend', 'mailgun'],

    'session_key' => 'wedding.invitation_id',

    'trusted_proxies' => env('TRUSTED_PROXIES'),

];
