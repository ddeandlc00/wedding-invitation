<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Support\Https;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Fortify\Features;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get(route('login'));

        $response->assertOk();
    }

    public function test_forwarded_https_is_recognized_before_redirects_are_built(): void
    {
        $originalProto = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? null;
        $originalHttps = $_SERVER['HTTPS'] ?? null;

        $_SERVER['HTTP_X_FORWARDED_PROTO'] = 'https';
        $_SERVER['HTTPS'] = 'off';

        Https::honorForwardedProto();

        $this->assertSame('on', $_SERVER['HTTPS']);
        $this->assertSame('443', (string) $_SERVER['SERVER_PORT']);

        if ($originalProto === null) {
            unset($_SERVER['HTTP_X_FORWARDED_PROTO']);
        } else {
            $_SERVER['HTTP_X_FORWARDED_PROTO'] = $originalProto;
        }

        if ($originalHttps === null) {
            unset($_SERVER['HTTPS']);
        } else {
            $_SERVER['HTTPS'] = $originalHttps;
        }
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_with_two_factor_enabled_are_redirected_to_two_factor_challenge()
    {
        $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $user = User::factory()->withTwoFactor()->create();

        $response = $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('two-factor.login'));
        $response->assertSessionHas('login.id', $user->id);
        $this->assertGuest();
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_remember_me_stores_a_remember_token(): void
    {
        $remembered = User::factory()->create(['remember_token' => null]);
        $forgotten = User::factory()->create(['remember_token' => null]);

        $this->post(route('login.store'), [
            'email' => $remembered->email,
            'password' => 'password',
            'remember' => '1',
        ])->assertRedirect(route('dashboard', absolute: false));

        $this->assertNotNull($remembered->fresh()?->remember_token);

        $this->post(route('logout'));

        $this->post(route('login.store'), [
            'email' => $forgotten->email,
            'password' => 'password',
        ])->assertRedirect(route('dashboard', absolute: false));

        $this->assertNull($forgotten->fresh()?->remember_token);
    }

    public function test_users_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout'));

        $response->assertRedirect(route('home'));

        $this->assertGuest();
    }

    public function test_users_are_rate_limited()
    {
        $user = User::factory()->create();

        RateLimiter::increment(md5('login'.implode('|', [$user->email, '127.0.0.1'])), amount: 5);

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertTooManyRequests();
    }
}
