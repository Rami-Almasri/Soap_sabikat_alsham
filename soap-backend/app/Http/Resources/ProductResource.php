<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'weight' => $this->weight,
            'stock' => $this->stock,
            'image' => $this->getMedia('product')->first()->getUrl(),
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'benefits' => BenefitResource::make($this->whenLoaded('benefits')),
        ];
    }
}
