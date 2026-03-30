<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        try {
            $validatedData = Validator::make($request->all(), [
                'name' => 'required|regex:/^[a-zA-Z\s]+$/',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ], [
                'name.regex' => 'The name must not contain numbers or special characters.',
                'email.email' => 'The email must be a valid email address.',
            ]);

            if ($validatedData->fails()) {
                return response()->json([
                    "msg" => $validatedData->errors(),
                    "success" => false,
                    'data' => []
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                "success" => true,
                "msg" => "User created successfully",
                "data" => ["user" => $user]
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "msg" => $e->getMessage(),
                "data" => ["user" => null]
            ]);
        }
    }

    public function login(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                "msg" => $validatedData->errors(),
                "success" => false,
                'data' => []
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "success" => false,
                "msg" => 'Invalid credentials',
                "data" => []
            ], 400);
        }

        $token = $user->createToken("login")->plainTextToken;

        return response()->json([
            "success" => true,
            "msg" => 'Logged in successfully',
            "data" => ['user' => $user, "token" => $token]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "success" => true,
            "msg" => 'Logged out successfully',
        ]);
    }
}
