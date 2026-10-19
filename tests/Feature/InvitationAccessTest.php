<?php

namespace Tests\Feature;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class InvitationAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_valid_code_opens_the_correct_invitation(): void
    {
        [$invitation, $code] = invitationWithCode(['invitee_name' => 'Amina Rahman']);
        Invitation::factory()->create(['invitee_name' => 'Someone Else', 'organizer_notes' => 'private-note-xyz']);

        $this->post(route('invitation.access'), ['code' => $code])
            ->assertRedirect(route('invitation.show'));

        $this->get(route('invitation.show'))
            ->assertOk()
            ->assertSee('Amina Rahman')
            ->assertDontSee('Someone Else')
            ->assertDontSee('private-note-xyz')
            ->assertDontSee($code);
    }

    public function test_a_direct_link_exchanges_the_code_for_a_clean_session(): void
    {
        [$invitation, $code] = invitationWithCode(['invitee_name' => 'Direct Guest']);

        $this->get(route('invitation.enter', ['code' => $code]))
            ->assertOk()
            ->assertSee('Opening your invitation')
            ->assertDontSee('Direct Guest');

        $this->get(route('invitation.show'))
            ->assertOk()
            ->assertSee('Direct Guest')
            ->assertSee('up to 2 guests');

        $this->assertNotNull($invitation->id);
    }

    public function test_an_invalid_code_is_rejected_without_revealing_guests(): void
    {
        Invitation::factory()->create(['invitee_name' => 'Hidden Guest']);

        $this->post(route('invitation.access'), ['code' => 'WRONG-CODE-NOT-REAL'])
            ->assertRedirect(route('home'))
            ->assertSessionHasErrors('code');

        $this->get(route('home'))
            ->assertOk()
            ->assertDontSee('Hidden Guest');
    }

    public function test_an_expired_invitation_is_rejected(): void
    {
        [$invitation, $code] = invitationWithCode([
            'expires_at' => now()->subMinute(),
        ]);

        $this->post(route('invitation.access'), ['code' => $code])
            ->assertRedirect(route('home'))
            ->assertSessionHasErrors('code');

        $this->assertNotNull($invitation->fresh());
    }

    public function test_one_guest_cannot_access_another_guests_rsvp(): void
    {
        [$first, $code] = invitationWithCode(['invitee_name' => 'First Household', 'max_pax' => 2]);
        $second = Invitation::factory()->create([
            'invitee_name' => 'Second Household',
            'email' => 'second-household@example.com',
            'organizer_notes' => 'second-private-note',
        ]);

        $this->post(route('invitation.access'), ['code' => $code])->assertRedirect(route('invitation.show'));

        $this->post(route('invitation.rsvp.store'), [
            'attendance_status' => 'attending',
            'attendee_count' => 1,
            'invitation_id' => $second->id,
        ])->assertRedirect(route('invitation.show'));

        $this->assertDatabaseHas('rsvps', [
            'invitation_id' => $first->id,
            'attendee_count' => 1,
        ]);
        $this->assertDatabaseMissing('rsvps', [
            'invitation_id' => $second->id,
        ]);

        $this->get(route('invitation.show'))
            ->assertDontSee('second-household@example.com')
            ->assertDontSee('second-private-note');
    }

    public function test_repeated_invalid_attempts_are_rate_limited(): void
    {
        RateLimiter::clear('127.0.0.1');

        for ($attempt = 0; $attempt < 8; $attempt++) {
            $this->post(route('invitation.access'), [
                'code' => 'BAD-CODE-'.$attempt,
            ])->assertSessionHasErrors('code');
        }

        $this->post(route('invitation.access'), ['code' => 'BAD-CODE-FINAL'])
            ->assertRedirect(route('home'))
            ->assertSessionHasErrors([
                'code' => 'Too many attempts. Please wait a minute and try again.',
            ]);
    }

    public function test_public_pages_do_not_list_invitations(): void
    {
        Invitation::factory()->create(['invitee_name' => 'Unlisted Guest']);
        $admin = User::factory()->create();

        $this->get(route('home'))->assertOk()->assertDontSee('Unlisted Guest');
        $this->get(route('story'))->assertOk()->assertDontSee('Unlisted Guest');
        $this->get(route('details'))->assertOk();
        $this->get(route('faq'))->assertOk();
        $this->get(route('gallery'))->assertOk();
        $this->get(route('contact'))->assertOk();
        $this->get(route('registry'))->assertOk();
        $this->get('/invitations')->assertNotFound();

        $this->actingAs($admin)->get(route('dashboard'))->assertOk();
    }
}
