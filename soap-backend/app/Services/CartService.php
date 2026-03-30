<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}
    public function index()
    {
        $items = Cart::where('user_id', Auth::id())->with('product')->get();

        return $items;
    }
    public function store(array $data)
    {
        $product = Product::where('id', $data['product_id'])->first();
        if ($product->stock < $data['quantity']) {
            throw new \Exception('Out of stock');
        } else {
            //   $product->stock = $product->stock - $data['quantity'];


            $item = Cart::create([
                'quantity' => $data['quantity'],
                'product_id' => $data['product_id'],
                'user_id' => Auth::id()
            ]);
            return $item;
        }
    }
    public function update(array $data, Cart $cart)
    {

        if ($data['quantity'] > $cart->product->stock) {
            throw new \Exception('Out of stock');
        }
        $cart->quantity = $data['quantity'];

        $cart->save();
        return $cart;
    }
    public function destroy(Cart $cart)
    {
        $cart->delete();
        return $cart;
    }
}
