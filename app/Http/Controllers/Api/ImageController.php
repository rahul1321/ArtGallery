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
        $images = DB::table('images')
                ->join('categories','categories.id','images.category_id')
                ->select('images.*','categories.name')
                ->get();
                
        //$images = Image::all();
                
        return Response()->json($images);
    }

    public function store(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if($token){
                if(Utils::isValidToken($token)){
                    if ($request->hasFile('image')) {
                        $imageFile = $request->file('image');
                        $name = time().'.'.$imageFile->getClientOriginalExtension();
                        if($this->moveFile($imageFile,$name)){
                            return $this->saveImage($request, new Image(), $name);
                        }
                    }else
                        return response()->json(["success"=> false, "status"=> 406, "message" =>"File not found"]);
                }else
                    return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);

            }else
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        }catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }


    public function update(Request $request, Image $image)
    {   
        try {
            $token = $request->header('Authorization');
            if($token){
                if(Utils::isValidToken($token)){
                    $name = $image->image;
                    if ($request->hasFile('image')) {
                        $imageFile = $request->file('image');
                        Utils::deleteFile(public_path("images")."/".$name); // old file delete
                        $name = time().'.'.$imageFile->getClientOriginalExtension();
                        $this->moveFile($imageFile,$name);       
                    }
                    return $this->saveImage($request, $image, $name);
                }else
                    return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }else
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        }catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }


    public function destroy(Image $image)
    {
        try {
            $file_path = public_path('images')."/".$image->image;
            if (Utils::deleteFile($file_path)) {
                $image->delete();
                return Response()->json(["success"=>true, "status"=> 200, "message" => "Deleted successfully"]); 
            }else
                return Response()->json(["success"=>false, "status"=> 403, "message" => "Failed"]); 
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" => "Internal server error"]); 
        }
        
    }


    public function imagesByCategory($categoryId){
        $images = DB::table('images')
            ->where('category_id',$categoryId)
            ->get();
            
        return Response()->json($images);
    }


    public function saveImage($request, $image, $fileName)
    {
        $image->title = $request->title;
        $image->description = $request->description;
        $image->category_id = $request->category_id;
        $image->image = $fileName;
        $image->save();

        return Response()->json(["success"=>true, "status"=> 200 , "image"=> $image]);
    }


    public function moveFile($imageFile,$name)
    {
        try {
            return Utils::moveWithResizeImage($imageFile,$name,public_path('images'));
        } catch (Exception $ex) {
           Log::error($ex);
           return false;
        }
        
        
        return $name;
    }

    
}
