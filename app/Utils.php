<?php

namespace App;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class Utils
{

    private static $imageDefaultSize = 1000;

    public static function moveWithResizeImage($imageFile,$fileName,$path){
        
        $img = Image::make($imageFile->getRealPath());
        $width = $img->width()>Utils::$imageDefaultSize ?Utils::$imageDefaultSize:$img->width();
        $img->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(Storage::path($path).'/'.$fileName);
    }
}