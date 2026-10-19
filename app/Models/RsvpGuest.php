<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $rsvp_id
 * @property string $guest_name
 * @property string|null $dietary_requirement
 * @property int $sort_order
 */
#[Fillable(['rsvp_id', 'guest_name', 'dietary_requirement', 'sort_order'])]
class RsvpGuest extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<Rsvp, $this>
     */
    public function rsvp(): BelongsTo
    {
        return $this->belongsTo(Rsvp::class);
    }
}
