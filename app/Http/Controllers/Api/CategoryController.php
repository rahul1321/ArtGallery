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
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json(["success"=>true, "status"=> 200, "categories" => $categories]);
        } catch (Exception $ex) {
            Log::error($ex);
            return response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }

    
    public function store(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {

                    $validator = Validator::make($request->all(), [
                        'name' => 'required'
                    ]);

                    if($validator->fails()){
                        return response()->json($validator->errors(), 200);
                    }

                    $category = Category::create($request->all());
        
                    return Response()->json(["success"=>true, "status"=> 200 , "category"=> $category]);
                }
                return Response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return Response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }

    public function update(Request $request, Category $category)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    $validator = Validator::make($request->all(), [
                        'name' => 'required'
                    ]);

                    if($validator->fails()){
                        return response()->json($validator->errors(), 200);
                    }
                   
                    $category->name = $request->name;
                    $category->save();
        
                    return Response()->json(["success"=>true, "status"=> 200 , "category"=> $category]);
                }
                return Response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return Response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }


    public function destroy(Request $request, Category $category)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    if ($this->deleteAllImagesByCategory($category->id)) { // delete all images of category
                        $category->delete();
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


    public function deleteAllImagesByCategory($categoryId)
    {
        try {
            $images = Image::where('category_id', $categoryId)
            ->get()
            ->each(function($image){
                $file_path = public_path('images')."/".$image->image;
                Utils::deleteFile($file_path);
                $image->delete();
            });
            
            return true;
        } catch (Exception $ex) {
            Log::error($ex);
            return false;
        }
    }

    public function getCategoriesWithCoverImage()
    {
        try {
            $categories = DB::select(DB::raw("SELECT c.id,c.name,i.image, COUNT(*) as numofimage FROM images as i INNER JOIN
            categories as c on i.category_id = c.id Group BY i.category_id"));

            return Response()->json(["success"=>true, "status"=> 200, "categories" => $categories]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" => "Internal server error"]);
        }
    }
}
