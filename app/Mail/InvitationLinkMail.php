<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitationLinkMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $inviteeName,
        public string $url,
        public string $code,
        public string $couple,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your wedding invitation',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.invitation',
        );
    }
}
