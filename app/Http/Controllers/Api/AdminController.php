<?php

namespace App\Http\Controllers\Api;

use App\Accesstoken;
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
                $accessToken = new Accesstoken();
                $accessToken->access_token = $token;
                $accessToken->admin_id = $admin->id;
                $accessToken->save();

                return response()->json(["success" => true, "status" => 200, "access_token" => $token,  "admin" => $admin]);
            }
            
            return response()->json(["success" => false, "status" => 404 ]);

        } catch (Exception  $ex) {
            Log::error($ex);
            return response()->json(["success" => false, "status" => 500]);
        }
    }


    public function logout(Request $request){
        try {
            $accessToken = Accesstoken::where("access_token",$request->access_token)->First();
            $accessToken->delete();
            return response()->json(["success" => true, "status" => 200]);

        } catch (Exception $ex) {
            Log::error($ex);
            return response()->json(["success" => false, "status" => 500]);
        }
    }
}
