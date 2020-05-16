<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\classes\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    
    public function index()
    {
       $categories = Category::all();
       return Response()->json($categories);
    }

    
    public function store(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if($token){
                if(Utils::isValidToken($token)){
                    $category = new Category();
                    $category->name = $request->name;
                    $category->save();
        
                    return Response()->json(["success"=>true, "status"=> 200 , "category"=> $category]);
                }else
                    return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);

            }else
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        }catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500]);
        }
    }

    public function update(Request $request, Category $category)
    {
       try {
            $token = $request->header('Authorization');
            if($token){
                if(Utils::isValidToken($token)){
                    $category->name = $request->name;
                    $category->save();
        
                    return Response()->json(["success"=>true, "status"=> 200 , "category"=> $category]);
                }else
                    return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);

            }else
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        }catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500]);
        }

    }


    public function destroy(Category $category)
    {
        try {
            if($this->deleteAllImagesByCategory($category->id)){ // delete all images of category
                $category->delete();
                return Response()->json(["success"=>true, "status"=> 200, "message" => "Deleted successfully"]); 
            }else
                return Response()->json(["success"=>false, "status"=> 403, "message" => "Failed"]); 
            
        } catch (Exception $ex) {
           Log::error($ex);
           return Response()->json(["success"=>false, "status"=> 500, "message" => "Internal server error"]); 
        }
       
    }


    public function deleteAllImagesByCategory($categoryId){
        try {
            $images = Image::where('category_id',$categoryId)->get();
        
            foreach($images as $image){
                $this->deleteImageFile($image->image);
                $image->delete();
           }
           return true;
        } catch (Exception $ex) {
            Log::error($ex);
            return false;
        }
        
    }

    public function deleteImageFile($imageName)
    {
        $file_path = public_path('images')."/".$imageName;
        unlink($file_path);
    }

    public function getCategoriesWithCoverImage(){
        $categories = DB::select( DB::raw("SELECT c.id,c.name,i.image, COUNT(*) as numofimage FROM images as i INNER JOIN
         categories as c on i.category_id = c.id Group BY i.category_id"));
        
        return Response()->json($categories);
    }
}
