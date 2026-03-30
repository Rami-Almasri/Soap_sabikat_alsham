<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Favorite;
use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Requests\UpdateFavoriteRequest;
use App\Http\Resources\FavoriteResource;
use App\Models\Product;
use App\Services\FavoriteService;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $favoriteService;
    public function __construct(FavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }
    public function index()
    {


        try {

            $favorite = $this->favoriteService->index();
            $result = FavoriteResource::collection($favorite);
            return ResponseHelper::SuccessResponse($result, 'Favorite List', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($productId)
    {
        try {
            $fav = $this->favoriteService->store($productId);
            $result = FavoriteResource::make($fav);
            return ResponseHelper::SuccessResponse($result, 'Favorite Created', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFavoriteRequest $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorite $favorite)
    {
        //
    }
}
