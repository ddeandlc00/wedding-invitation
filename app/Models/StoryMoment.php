<?php

namespace App\Models;

use App\Support\PublicMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string|null $occurred_label
 * @property string $body
 * @property string|null $image_path
 * @property string|null $caption
 * @property int $sort_order
 * @property bool $is_sample
 */
#[Fillable([
    'title',
    'occurred_label',
    'body',
    'image_path',
    'caption',
    'sort_order',
    'is_sample',
])]
class StoryMoment extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_sample' => 'boolean',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'occurredLabel' => $this->occurred_label,
            'body' => $this->body,
            'imageUrl' => PublicMedia::url($this->image_path),
            'caption' => $this->caption,
            'isSample' => $this->is_sample,
            'sortOrder' => $this->sort_order,
        ];
    }
}
