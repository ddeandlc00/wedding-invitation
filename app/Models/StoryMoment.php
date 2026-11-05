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
        $imageUrls = $this->imageUrls();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'occurredLabel' => $this->occurred_label,
            'body' => $this->body,
            'imageUrl' => $imageUrls[0] ?? null,
            'imageUrls' => $imageUrls,
            'caption' => $this->caption,
            'isSample' => $this->is_sample,
            'sortOrder' => $this->sort_order,
        ];
    }

    /**
     * @return list<string>
     */
    public function imageUrls(): array
    {
        if ($this->image_path === null || trim($this->image_path) === '') {
            return [];
        }

        $urls = [];

        foreach (explode('|', $this->image_path) as $path) {
            $url = $this->imageUrl(trim($path));

            if ($url !== null) {
                $urls[] = $url;
            }
        }

        return $urls;
    }

    private function imageUrl(string $path): ?string
    {
        if ($path === '' || str_contains($path, '..')) {
            return null;
        }

        if (str_starts_with($path, 'images/')) {
            return '/'.$path;
        }

        return PublicMedia::url($path);
    }
}
