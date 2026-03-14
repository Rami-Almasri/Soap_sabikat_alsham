<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $productService;
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function index()
    {
        try {
            $products = $this->productService->index();
            $result = ProductResource::collection($products);
            return ResponseHelper::SuccessResponse($result, 'Product List', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }


    public function store(StoreProductRequest $request)
    {
        try {
            $product = $this->productService->store($request->validated());
            return ResponseHelper::SuccessResponse($product, 'Product Created', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            $product = $this->productService->show($product);
            return ResponseHelper::SuccessResponse($product, 'Product Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $product = $this->productService->update($request->validated(), $product);
            return ResponseHelper::SuccessResponse($product, 'Product Updated', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product = $this->productService->destroy($product);
            return ResponseHelper::SuccessResponse($product, 'Product Deleted', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }
    public function indexByCategory($id)
    {
        try {
            $product = $this->productService->indexByCategory($id);
            return ResponseHelper::SuccessResponse($product, 'Product Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }
}
