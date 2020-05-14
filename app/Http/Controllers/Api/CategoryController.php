<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    
    public function index()
    {
       $categories = Category::all();
       return Response()->json($categories);
    }

    
    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->save();

        return Response()->json($category);

    }

    public function update(Request $request, Category $category)
    {
        $category->name = $request->name;
        $category->save();

        return Response()->json($category);
    }


    public function destroy(Category $category)
    {
        $this->deleteAllImagesByCategory($category->id); // delete all images of category
        return $category->delete();
    }


    public function deleteAllImagesByCategory($categoryId){
        $images = Image::where('category_id',$categoryId)->get();
        
        foreach($images as $image){
            $this->deleteImageFile($image->image);
            $image->delete();
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
