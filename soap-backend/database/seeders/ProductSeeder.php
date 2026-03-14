<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\Benefit;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 1️⃣ Categories
        $categories = [
            'Natural Soap',
            'Face Soap',
            'Hair Soap',
        ];

        foreach ($categories as $catName) {
            Category::create(['name' => $catName]);
        }

        // 2️⃣ Products
        $products = [
            [
                'name' => 'Olive Soap',
                'description' => 'Natural soap made from olive oil',
                'price' => 5.0,
                'weight' => '100g',
                'stock' => 10,
                'category_id' => 1, // Natural Soap
                'benefits' => ['Moisturizing', 'Soft Skin']
            ],
            [
                'name' => 'Charcoal Face Soap',
                'description' => 'Deep cleansing soap for face',
                'price' => 6.0,
                'stock' => 10,
                'weight' => '90g',
                'category_id' => 2, // Face Soap
                'benefits' => ['Deep Cleaning', 'Acne Treatment']
            ],
            [
                'name' => 'Herbal Hair Soap',
                'description' => 'Soap for healthy hair',
                'price' => 7.0,
                'stock' => 10,
                'weight' => '120g',
                'category_id' => 3, // Hair Soap
                'benefits' => ['Hair Growth', 'Anti Dandruff']
            ],
        ];

        foreach ($products as $prodData) {
            $benefitsData = $prodData['benefits'];
            unset($prodData['benefits']); // نشيلها قبل create Product

            $product = Product::create($prodData);

            // 3️⃣ Benefits
            foreach ($benefitsData as $b) {
                $product->benefits()->create([
                    'name' => $b,
                    'description' => 'Benefit description',
                ]);
            }
        }
    }
}
