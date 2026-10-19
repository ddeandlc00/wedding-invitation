<?php

namespace App\Http\Requests\Admin;

use App\Enums\AttendanceStatus;
use Illuminate\Validation\Rule;

class ManualRsvpRequest extends AdminFormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'attendance_status' => ['required', Rule::enum(AttendanceStatus::class)],
            'attendee_count' => ['nullable', 'integer', 'min:0', 'max:50'],
            'dietary_requirements' => ['nullable', 'string', 'max:1000'],
            'message_to_couple' => ['nullable', 'string', 'max:2000'],
            'guests' => ['nullable', 'array', 'max:50'],
            'guests.*.name' => ['nullable', 'string', 'max:120'],
            'guests.*.dietary_requirement' => ['nullable', 'string', 'max:255'],
            'event_ids' => ['nullable', 'array'],
            'event_ids.*' => ['integer'],
        ];
    }
}
