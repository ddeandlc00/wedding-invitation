<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $question
 * @property string $answer
 * @property int $sort_order
 * @property bool $is_sample
 * @property bool $is_published
 */
#[Fillable(['question', 'answer', 'sort_order', 'is_sample', 'is_published'])]
class Faq extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_sample' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'answer' => $this->answer,
            'isSample' => $this->is_sample,
            'sortOrder' => $this->sort_order,
        ];
    }
}
