<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetils extends Model
{
    /** @use HasFactory<\Database\Factories\OrderDetilsFactory> */
    use HasFactory;
    protected $table = 'order_detils';
    protected $fillable = [
        'order_id',
        'product_id',
        'user_id',
        'quantity',
        'price',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
