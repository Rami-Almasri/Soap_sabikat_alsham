<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function index()
    {
        $categories = Category::all();
        return $categories;
    }
    public function store(array $data)
    {
        $category = Category::create($data);
        if (isset($data['image'])) {
            $category->addMedia($data['image'])->toMediaCollection('Categorie');
        }
        return $category;
    }
    public function update(array $data, Category $category)
    {
        $category->update($data);
        if ($category) {
            $category->update($data);
            if (isset($data['image'])) {
                $category->clearMediaCollection('Categorie');
                $category->addMedia($data['image'])->toMediaCollection('Categorie');
            }
        }
        return $category;
    }
    public function show(Category $category)
    {

        return $category;
    }
    public function destroy(Category $category)
    {

        $category->delete();
        $category->clearMediaCollection('Categorie');
        return $category;
    }
    public function categorywithproduct()
    {
        $categories = Category::with(['products' => function ($q) {
            $q->withExists(['favorites as is_fav' => function ($f) {
                $f->where('user_id', auth()->id());
            }]);
        }])->get();
        return $categories;
    }
}
