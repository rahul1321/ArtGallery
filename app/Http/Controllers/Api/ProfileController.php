<?php

namespace App\Http\Controllers\Api;

use App\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    
    public function index()
    {
        return response()->json(Profile::latest()->get());
    }

    
    public function update(Request $request, Profile $profile)
    {
        $fileName = "profile_pic.png";
        if ($request->hasFile('image')) {
            $this->deleteImageFile($fileName); // old file delete
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

        return response()->json($profile);
    }

    public function deleteImageFile($imageName)
    {
        $file_path = public_path('images')."/".$imageName;
        unlink($file_path);
    }
}
