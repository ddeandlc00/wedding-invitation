<?php

namespace App\Models;

use App\Support\PublicMedia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $path
 * @property string $alt_text
 * @property string|null $caption
 * @property int $sort_order
 */
#[Fillable(['path', 'alt_text', 'caption', 'sort_order'])]
class GalleryImage extends Model
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
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'url' => PublicMedia::url($this->path),
            'altText' => $this->alt_text,
            'caption' => $this->caption,
            'sortOrder' => $this->sort_order,
        ];
    }
}
