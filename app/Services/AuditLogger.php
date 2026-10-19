<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AuditLogger
{
    /**
     * @param  array<string, mixed>  $metadata
     */
    public function log(
        string $action,
        ?Model $subject,
        array $metadata,
        ?User $user,
        ?Request $request = null,
    ): void {
        AuditLog::query()->create([
            'user_id' => $user?->id,
            'action' => $action,
            'subject_type' => $subject === null ? null : $subject::class,
            'subject_id' => $subject?->getKey(),
            'metadata' => $metadata,
            'ip_address' => $request?->ip(),
            'created_at' => now(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function invitationMeta(Invitation $invitation): array
    {
        return [
            'invitation_id' => $invitation->id,
            'invitee_name' => $invitation->invitee_name,
            'max_pax' => $invitation->max_pax,
            'status' => $invitation->status->value,
        ];
    }
}
