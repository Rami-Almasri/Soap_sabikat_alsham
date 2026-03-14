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
            $category->addMedia($category['image'])->toMediaCollection('category');
        }
        return $category;
    }
    public function update(array $data, Category $category)
    {
        $category->update($data);
        if ($category) {
            $category->update($data);
            if (isset($data['image'])) {
                $category->clearMediaCollection('category');
                $category->addMedia($data['image'])->toMediaCollection('category');
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
        $category->clearMediaCollection('category');
        return $category;
    }
    public function categorywithproduct()
    {
        $categories = Category::with('products')->get();
        return $categories;
    }
}
