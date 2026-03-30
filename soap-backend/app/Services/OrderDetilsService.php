<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetils;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class OrderDetilsService
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
        $orders = Order::with('orderdetils.product')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        if (empty($orders)) {
            throw new \Exception("u don't have order yet");
        }
        return $orders;
    }
    public function showw($id)
    {
        $user = Auth::user();

        // إذا كان الحساب "أدمن"، جيب الطلب لأي مستخدم كان
        if ($user->id == 4) {
            return OrderDetils::with('product')
                ->where('order_id', $id)
                ->latest('created_at')
                ->get();
        }

        // إذا كان مستخدم عادي، جيبه بشرط يكون هو صاحب الطلب
        return OrderDetils::with('product')
            ->where('user_id', $user->id)
            ->where('order_id', $id)
            ->latest('created_at')
            ->get();
    }
    public function store(array $data)
    {
        $order = Order::create([
            'user_id' => Auth::id(),
            'total_price' => $data['total'],
        ]);

        foreach ($data['cart'] as $item) {
            OrderDetils::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'user_id' => Auth::id(),
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ]);
        }
        foreach ($data['cart'] as $item) {
            $product = Product::find($item['product_id']);
            if ($product->stock >= $item['quantity']) {
                $product->stock -= $item['quantity'];
                $product->save();
            } else {
                throw new \Exception("out of stock");
            }
        }
        Cart::where('user_id', Auth::id())->delete();

        return $order;
    }
    public function getallorders()
    {
        $orders = Order::with(['orderdetils.product', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();
        if (empty($orders)) {
            throw new \Exception("u don't have order yet");
        }
        return $orders;
    }
}
