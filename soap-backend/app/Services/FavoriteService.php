<?php

namespace App\Services;

use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;

class FavoriteService
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
        $favorite = Favorite::where('user_id', Auth::id())->with('product')->get();

        return $favorite;
    }


    public function store($product_id)
    {


        $exists = Favorite::where('user_id', Auth::id())
            ->where('product_id', $product_id)
            ->first();

        if ($exists) {
            $exists->delete(); // هيك بصير Toggle (إضافة إذا مو موجود، حذف إذا موجود)
            return $exists;
        }

        return Favorite::create([
            'user_id' => Auth::id(),
            'product_id' => $product_id
        ]);
    }
}
