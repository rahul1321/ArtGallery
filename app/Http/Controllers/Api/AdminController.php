<?php

namespace App\Http\Controllers\Api;

use App\Admin;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function getAdmin($email,$password){
        try {

            $admin = Admin::where('email',$email)
            ->where('password',md5($password))
            ->first();

            if($admin != null){
                $token = Str::uuid();
                $admin->access_token = $token;
                $admin->save();

                return response()->json(["success" => true, "status" => 200, "access_token" => $token,  "admin" => $admin]);
            }else
                return response()->json(["success" => false, "status" => 404 ]);

        } catch (Exception  $ex) {
            Log::error($ex);
            return response()->json(["success" => false, "status" => 500]);
        }
    }


    public function logout(Request $request){
        try {
            $admin = Admin::where("access_token",$request->access_token)->First();
            $admin->access_token = null;
            $admin->save();
            return response()->json(["success" => true, "status" => 200]);

        } catch (Exception $ex) {
            Log::error($ex);
            return response()->json(["success" => false, "status" => 500]);
        }
    }
}
