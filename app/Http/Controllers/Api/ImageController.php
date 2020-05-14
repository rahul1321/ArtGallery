<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use Illuminate\Support\Facades\DB;
use App\Utils;

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
        if ($request->hasFile('image')) {
            $fileName = $this->moveFile($request->file('image'));
            
           return $this->saveImage($request, new Image(), $fileName);
        }
    }


    public function update(Request $request, Image $image)
    {   
        $fileName = $image->image;
        if ($request->hasFile('image')) {
            $this->deleteImageFile($image->image); // old file delete
            $fileName = $this->moveFile($request->file('image'));
        }
        return $this->saveImage($request, $image, $fileName);
    }


    public function destroy(Image $image)
    {
        $this->deleteImageFile($image->image);
        return $image->delete();
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

        return Response()->json($image);
    }


    public function moveFile($imageFile)
    {
        $name = time().'.'.$imageFile->getClientOriginalExtension();

        Utils::moveWithResizeImage($imageFile,$name,public_path('images'));
        
        return $name;
    }

    public function deleteImageFile($imageName)
    {
        $file_path = public_path('images')."/".$imageName;
        unlink($file_path);
    }
}
