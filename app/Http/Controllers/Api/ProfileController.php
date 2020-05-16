<?php

namespace App\Http\Controllers\Api;

use App\classes\Utils;
use App\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    
    public function index()
    {
        return response()->json(Profile::latest()->get());
    }

    
    public function update(Request $request, Profile $profile)
    {
        try {
            $token = $request->header('Authorization');
            if($token){
                if(Utils::isValidToken($token)){
                    $fileName = "profile_pic.png";
                    if ($request->hasFile('image')) {
                        if(Utils::deleteFile(public_path('images')."/".$fileName)) // old file delete
                            $request->file('image')->move(public_path('images'), $fileName);
                    }

                    $profile->name = $request->name;
                    $profile->email = $request->email;
                    $profile->address = $request->address;
                    $profile->phone = $request->phone;
                    $profile->image = $fileName;
                    $profile->about = $request->about;
                    $profile->facebook_link = $request->facebook_link;
                    $profile->youtube_link = $request->youtube_link;
                    $profile->instagram_link = $request->instagram_link;
                    $profile->save();
        
                    return Response()->json(["success"=>true, "status"=> 200 , "profile"=> $profile]);
                }else
                    return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);

            }else
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        }catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message"=> "Internal server error"]);
        }
    }
}
