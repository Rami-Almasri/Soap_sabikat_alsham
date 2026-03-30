<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\OrderDetils;
use App\Http\Requests\StoreOrderDetilsRequest;
use App\Http\Requests\UpdateOrderDetilsRequest;
use App\Http\Resources\OrderDetilsResource;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderDetilsService;

class OrderDetilsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $orderDetils;
    public function __construct(OrderDetilsService  $orderDetils)
    {
        $this->orderDetils = $orderDetils;
    }
    public function index()
    {
        try {

            $orders = $this->orderDetils->index();
            $restult = OrderResource::collection($orders);
            return ResponseHelper::SuccessResponse($restult, 'order List', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderDetilsRequest $request)
    {
        try {
            $order = $this->orderDetils->store($request->validated());
            $result = OrderDetilsResource::make($order);
            return ResponseHelper::SuccessResponse($result, 'Order Created', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage(), 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $order = $this->orderDetils->showw($id);
            $result = OrderDetilsResource::collection($order);
            return ResponseHelper::SuccessResponse($result, 'Order Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }
    public function allorder()
    {
        try {
            $order = $this->orderDetils->getallorders();
            $result = OrderResource::collection($order);
            return ResponseHelper::SuccessResponse($result, 'Order Found', 200);
        } catch (\Exception $e) {
            return ResponseHelper::FailureResponse($e->getMessage());
        }
    }

    public function edit(OrderDetils $orderDetils)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderDetilsRequest $request, OrderDetils $orderDetils)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetils $orderDetils)
    {
        //
    }
}
