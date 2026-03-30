<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getuser()
    {

        try {
            $users = Auth::user();
            $result = UserResource::make($users);
            return ResponseHelper::SuccessResponse($result, "info of user");
        } catch (Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }
    public function users()
    {
        try {
            $users = User::all();
            $result = UserResource::collection($users);
            return ResponseHelper::SuccessResponse($result, "User LIst");
        } catch (Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }
    public function update(UpdateUserRequest $request, User $user)
    {
        try {

            $user->update($request->validated());
            $result = UserResource::make($user);
            return ResponseHelper::SuccessResponse($result, "user updated successfully");
        } catch (Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }
    public function delete(User $user)
    {
        try {
            $user->delete();
            return ResponseHelper::SuccessResponse(null, "user deleted successfully");
        } catch (Exception $e) {
            return ResponseHelper::FailureResponse(null, $e->getMessage());
        }
    }
}
