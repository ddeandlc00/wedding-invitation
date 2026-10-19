<?php

namespace App\Services;

use App\Enums\InvitationStatus;
use App\Models\Invitation;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class InvitationService
{
    public function __construct(
        private InvitationCodeService $codes,
        private AuditLogger $audit,
    ) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function create(array $attributes, User $actor, ?Request $request = null): Invitation
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $issued = $this->codes->issue();

            try {
                return DB::transaction(function () use ($attributes, $actor, $request, $issued): Invitation {
                    $invitation = Invitation::query()->create([
                        ...$attributes,
                        'code_lookup' => $issued['hash'],
                        'code_encrypted' => $issued['encrypted'],
                        'created_by' => $actor->id,
                    ]);

                    $this->audit->log(
                        'invitation.created',
                        $invitation,
                        $this->audit->invitationMeta($invitation),
                        $actor,
                        $request,
                    );

                    return $invitation;
                });
            } catch (UniqueConstraintViolationException) {
                continue;
            }
        }

        throw new RuntimeException('Unable to generate a unique invitation code.');
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function update(Invitation $invitation, array $attributes, User $actor, ?Request $request = null): Invitation
    {
        return DB::transaction(function () use ($invitation, $attributes, $actor, $request): Invitation {
            $invitation->fill($attributes);
            $invitation->save();

            $this->audit->log(
                'invitation.updated',
                $invitation,
                $this->audit->invitationMeta($invitation),
                $actor,
                $request,
            );

            return $invitation;
        });
    }

    public function regenerate(Invitation $invitation, User $actor, ?Request $request = null): Invitation
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $issued = $this->codes->issue();

            try {
                return DB::transaction(function () use ($invitation, $actor, $request, $issued): Invitation {
                    $invitation->code_lookup = $issued['hash'];
                    $invitation->code_encrypted = $issued['encrypted'];
                    $invitation->save();

                    $this->audit->log(
                        'invitation.code_regenerated',
                        $invitation,
                        $this->audit->invitationMeta($invitation),
                        $actor,
                        $request,
                    );

                    return $invitation;
                });
            } catch (UniqueConstraintViolationException) {
                continue;
            }
        }

        throw new RuntimeException('Unable to generate a unique invitation code.');
    }

    public function changeStatus(Invitation $invitation, string $status, User $actor, ?Request $request = null): Invitation
    {
        $invitation->status = InvitationStatus::from($status);
        $invitation->save();

        $this->audit->log(
            $invitation->status === InvitationStatus::Active
                ? 'invitation.reactivated'
                : 'invitation.disabled',
            $invitation,
            $this->audit->invitationMeta($invitation),
            $actor,
            $request,
        );

        return $invitation;
    }

    public function nullableDate(mixed $value, string $timezone): ?CarbonImmutable
    {
        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        return CarbonImmutable::parse($value, $timezone)->utc();
    }
}
