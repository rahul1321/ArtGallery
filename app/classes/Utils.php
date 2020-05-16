<?php

namespace App\classes;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use App\Admin;
use Exception;

class Utils
{
    private static $imageDefaultSize = 1000;

    public static function moveWithResizeImage($imageFile, $fileName, $path)
    {
        try {
            $img = Image::make($imageFile->getRealPath());
            $width = $img->width()>self::$imageDefaultSize ?self::$imageDefaultSize:$img->width();
            $img->resize($width, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('images').'/'.$fileName);
            return true;
        } catch (Exception $ex) {
            Log::error($ex);
            return false;
        }
    }

    public static function isValidToken($token)
    {
        try {
            $admin = Admin::where("access_token", $token)->first();
            return $admin != null;
        } catch (Exception $ex) {
            Log::error($ex);
            return false;
        }
    }

    public static function deleteFile($file_path)
    {
        try {
            return unlink($file_path);
        } catch (Exception $ex) {
           Log::error($ex);
           return false;
        }
       
    }
}
