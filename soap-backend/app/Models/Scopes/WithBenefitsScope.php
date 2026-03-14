<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class WithBenefitsScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        // كل query على المنتج رح تجيب الـ benefits
        $builder->with('benefits');
    }
}