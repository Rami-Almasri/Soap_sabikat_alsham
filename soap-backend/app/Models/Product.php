<?php

namespace App\Models;

use App\Models\Scopes\WithBenefitsScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    use InteractsWithMedia;
    protected $fillable = [
        'name',
        'description',
        'price',
        'weight',
        'stock',
        'category_id',
        'benefit_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function benefits()
    {
        return $this->belongsTo(Benefit::class);
    }
    protected static function booted()
    {
        // ربط الـ Global Scope
        static::addGlobalScope(new WithBenefitsScope());
    }
}
