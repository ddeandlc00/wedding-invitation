<?php

namespace App\Http\Requests\Admin;

use App\Models\Invitation;
use Illuminate\Foundation\Http\FormRequest;

abstract class AdminFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage', Invitation::class) ?? false;
    }

    protected function blank(string $key): ?string
    {
        $value = trim($this->string($key)->toString());

        return $value === '' ? null : $value;
    }
}
