<?php

namespace App\Http\Controllers\Api;

use App\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function getAdmin($email,$password){
        $admin = Admin::where('email',$email)
                    ->where('password',md5($password))
                    ->first();
        

        return Response()->json($admin);
    }
}
