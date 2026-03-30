<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }
    public function index()
    {
        try {
            $categories = $this->categoryService->index();
            $result = CategoryResource::collection($categories);
            return ResponseHelper::SuccessResponse($result, 'Category List', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            $category = $this->categoryService->store($request->validated());

            return ResponseHelper::SuccessResponse($category, 'Category Created', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {

        try {
            $category = $this->categoryService->show($category);
            return ResponseHelper::SuccessResponse($category, 'Category Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        /*  if ($product) {
            $product->update($data);
            if (isset($data['image'])) {
                $product->clearMediaCollection('product');
                $product->addMedia($data['image'])->toMediaCollection('product');
            }
        }
            */
        try {
            $category = $this->categoryService->update($request->validated(), $category);
            return ResponseHelper::SuccessResponse($category, 'Category Updated', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category = $this->categoryService->destroy($category);
            return ResponseHelper::SuccessResponse($category, 'Category Deleted', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }
    public function categorywithproduct()
    {
        try {
            $category = $this->categoryService->categorywithproduct();
            $result = CategoryResource::collection($category);
            return ResponseHelper::SuccessResponse($result, 'Category Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }
}
