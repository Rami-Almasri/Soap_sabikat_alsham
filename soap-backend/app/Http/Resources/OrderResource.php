<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'total_price' => $this->total_price,
            'orderdetils' => OrderDetilsResource::collection($this->orderdetils),
            'user' => UserResource::make($this->whenLoaded('user')),
            'created_at' => $this->created_at,

        ];
    }
}
