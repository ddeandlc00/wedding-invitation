<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\User;
use App\Models\WeddingSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class RsvpTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_guest_can_submit_an_attending_response(): void
    {
        [$invitation, $code] = invitationWithCode(['max_pax' => 3, 'invitee_name' => 'Lee Family']);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 2,
            'dietary_requirements' => 'No shellfish',
            'message_to_couple' => 'We are so happy for you.',
        ])->assertRedirect(route('invitation.show'));

        $this->assertSame(1, Rsvp::query()->count());
        $this->assertDatabaseHas('rsvps', [
            'invitation_id' => $invitation->id,
            'attendance_status' => 'attending',
            'attendee_count' => 2,
            'source' => 'guest',
        ]);

        $this->get(route('invitation.show'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('invitation.statusLabel', 'Attending')
                ->where('rsvpConfirmed', true));
    }

    public function test_a_guest_can_decline_and_the_count_is_zero(): void
    {
        [$invitation, $code] = invitationWithCode();
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'declined',
            'attendee_count' => 4,
        ])->assertRedirect(route('invitation.show'));

        $this->assertDatabaseHas('rsvps', [
            'invitation_id' => $invitation->id,
            'attendance_status' => 'declined',
            'attendee_count' => 0,
        ]);
    }

    public function test_the_attendee_count_cannot_exceed_assigned_pax(): void
    {
        [$invitation, $code] = invitationWithCode(['max_pax' => 2]);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => 5,
            ])
            ->assertRedirect(route('invitation.show'))
            ->assertSessionHasErrors('attendee_count');

        $this->assertDatabaseMissing('rsvps', ['invitation_id' => $invitation->id]);
        $this->assertSame(2, $invitation->fresh()->max_pax);
    }

    public function test_invalid_attendee_counts_are_rejected(): void
    {
        [, $code] = invitationWithCode(['max_pax' => 3]);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => 0,
            ])
            ->assertSessionHasErrors('attendee_count');

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => -1,
            ])
            ->assertSessionHasErrors('attendee_count');

        $this->assertSame(0, Rsvp::query()->count());
    }

    public function test_a_guest_can_update_an_existing_response_without_creating_a_duplicate(): void
    {
        [$invitation, $code] = invitationWithCode(['max_pax' => 4]);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 1,
        ]);

        $submittedAt = $invitation->rsvp()->first()?->submitted_at;
        $this->assertNotNull($submittedAt);

        $this->travel(5)->minutes();

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 3,
            'message_to_couple' => 'We found a sitter.',
        ])->assertRedirect(route('invitation.show'));

        $this->assertSame(1, Rsvp::query()->where('invitation_id', $invitation->id)->count());
        $rsvp = $invitation->rsvp()->first();
        $this->assertNotNull($rsvp);
        $this->assertSame(3, $rsvp->attendee_count);
        $this->assertTrue($rsvp->submitted_at?->equalTo($submittedAt));
        $this->assertTrue($rsvp->updated_at?->greaterThan($submittedAt));
    }

    public function test_a_validation_error_preserves_the_existing_rsvp(): void
    {
        [$invitation, $code] = invitationWithCode(['max_pax' => 2]);
        $this->post(route('invitation.access'), ['code' => $code]);
        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 2,
            'message_to_couple' => 'Keep this message',
        ]);

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => 9,
                'message_to_couple' => 'Should not replace',
            ])
            ->assertSessionHasErrors('attendee_count');

        $rsvp = $invitation->fresh()->rsvp;
        $this->assertNotNull($rsvp);
        $this->assertSame(2, $rsvp->attendee_count);
        $this->assertSame('Keep this message', $rsvp->message_to_couple);
    }

    public function test_the_rsvp_deadline_blocks_guest_updates(): void
    {
        [$invitation, $code] = invitationWithCode([
            'rsvp_deadline' => now()->subHour(),
        ]);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => 1,
            ])
            ->assertSessionHasErrors('attendance_status');

        $this->assertNull($invitation->fresh()->rsvp);
    }

    public function test_guest_name_counts_must_match_the_attendee_count(): void
    {
        [$invitation, $code] = invitationWithCode([
            'max_pax' => 3,
            'collect_guest_names' => true,
        ]);
        $this->post(route('invitation.access'), ['code' => $code]);

        $this->from(route('invitation.show'))
            ->post(route('invitation.rsvp.store'), [
                'attendance_status' => 'attending',
                'attendee_count' => 2,
                'guests' => [
                    ['name' => 'Only One'],
                ],
            ])
            ->assertSessionHasErrors('guests');

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 2,
            'guests' => [
                ['name' => 'Ada Lovelace', 'dietary_requirement' => 'Vegetarian'],
                ['name' => 'Grace Hopper'],
            ],
        ])->assertRedirect(route('invitation.show'));

        $this->assertSame(2, $invitation->rsvp()->first()?->guests()->count());
    }

    public function test_manual_administrator_updates_are_audited(): void
    {
        $admin = User::factory()->create();
        $invitation = Invitation::factory()->create(['max_pax' => 2]);

        $this->actingAs($admin)->put(route('admin.rsvps.update', $invitation), [
            'attendance_status' => 'attending',
            'attendee_count' => 2,
            'message_to_couple' => 'Called us this morning.',
        ])->assertRedirect(route('admin.rsvps.show', $invitation));

        $this->assertDatabaseHas('rsvps', [
            'invitation_id' => $invitation->id,
            'source' => 'organizer',
            'attendee_count' => 2,
            'updated_by' => $admin->id,
        ]);
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'rsvp.manual_update',
            'user_id' => $admin->id,
        ]);
        $this->assertNull(AuditLog::query()->where('action', 'rsvp.manual_update')->first()?->metadata['code'] ?? null);
    }

    public function test_email_is_not_reported_as_sent_when_mail_is_not_configured(): void
    {
        Mail::fake();
        $admin = User::factory()->create();
        $invitation = Invitation::factory()->create(['email' => 'guest@example.com']);

        $this->actingAs($admin)
            ->from(route('admin.invitations.show', $invitation))
            ->post(route('admin.invitations.email', $invitation))
            ->assertSessionHasErrors('email');

        Mail::assertNothingSent();
    }

    public function test_the_wedding_clock_respects_daylight_saving_time(): void
    {
        $settings = WeddingSetting::current();
        $settings->update([
            'timezone' => 'America/Toronto',
            'wedding_at' => '2027-06-12 16:00:00',
        ]);

        $summer = $settings->fresh()->weddingInstant();
        $this->assertNotNull($summer);
        $this->assertSame('20:00', $summer->utc()->format('H:i'));

        $settings->update(['wedding_at' => '2027-01-12 16:00:00']);
        $winter = $settings->fresh()->weddingInstant();
        $this->assertNotNull($winter);
        $this->assertSame('21:00', $winter->utc()->format('H:i'));
    }
}
