<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;

class ProductService
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
        $products = Product::all();
        return $products;
    }
    public function store(array $data)
    {
        $product = Product::create($data);
        if (isset($data['image'])) {
            $product->addMedia($data['image'])->toMediaCollection('product');
        }
        return $product;
    }
    public function update(array $data, Product $product)
    {
        $product->update($data);
        if (isset($data['image'])) {
            $product->clearMediaCollection('product');
            $product->addMedia($data['image'])->toMediaCollection('product');
        }
        return $product;
    }
    public function show(Product $product)
    {
        return $product;
    }
    public function destroy(Product $category)
    {
        $category->delete();
        $category->clearMediaCollection('product');
        return $category;
    }
    public function indexByCategory($id)
    {


        $products = Product::where('category_id', $id)->get();
        if ($products->isEmpty()) {
            dd('No products found!');
        }
        return $products;
    }
}
