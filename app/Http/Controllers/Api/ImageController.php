<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use Illuminate\Support\Facades\DB;
use App\classes\Utils;
use Exception;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    public function index()
    {
        try {
            $images = DB::table('images')
                ->join('categories', 'categories.id', 'images.category_id')
                ->select('images.*', 'categories.name')
                ->get();
                
            //$images = Image::all();
                
            return Response()->json(["success"=>true, "status"=> 200, "images" => $images]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }

    public function store(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    if ($request->hasFile('image')) {
                        $imageFile = $request->file('image');
                        $name = time().'.'.$imageFile->getClientOriginalExtension();
                        if (Utils::moveWithResizeImage($imageFile, $name, public_path('images'))) {
                            return $this->saveImage($request, new Image(), $name);
                        }
                    }
                    return response()->json(["success"=> false, "status"=> 406, "message" =>"File not found"]);
                }
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }


    public function update(Request $request, Image $image)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    $name = $image->image;
                    if ($request->hasFile('image')) {
                        $imageFile = $request->file('image');
                        Utils::deleteFile(public_path("images")."/".$name); // old file delete
                        $name = time().'.'.$imageFile->getClientOriginalExtension();
                        Utils::moveWithResizeImage($imageFile, $name, public_path('images'));
                    }
                    return $this->saveImage($request, $image, $name);
                }
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }


    public function destroy(Request $request, Image $image)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    $file_path = public_path('images')."/".$image->image;
                    if (Utils::deleteFile($file_path)) {
                        $image->delete();
                        return Response()->json(["success"=>true, "status"=> 200, "message" => "Deleted successfully"]);
                    }
                    return Response()->json(["success"=>false, "status"=> 403, "message" => "Failed"]);
                }
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" => "Internal server error"]);
        }
    }


    public function imagesByCategory($categoryId)
    {
        try {
            $images = DB::table('images')
            ->where('category_id', $categoryId)
            ->get();
            return Response()->json(["success"=>true, "status"=> 200 , "images"=> $images]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500 , "message"=> "Internal server error"]);
        }
    }


    public function saveImage($request, $image, $fileName)
    {
        try {
            $image->title = $request->title;
            $image->description = $request->description;
            $image->category_id = $request->category_id;
            $image->image = $fileName;
            $image->save();
    
            return Response()->json(["success"=>true, "status"=> 200 , "image"=> $image]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500 , "message"=> "Internal server error"]);
        }
    }
}
