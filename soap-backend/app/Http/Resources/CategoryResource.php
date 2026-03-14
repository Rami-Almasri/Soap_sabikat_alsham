<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // "image" => $this->getFirstMediaUrl('Categorie') ?: null,

        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->getFirstMediaUrl('Categorie') ?: null,
        ];
    }
}