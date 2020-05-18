<?php

namespace App\Http\Controllers\Api;

use App\classes\Utils;
use App\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    $messages = Message::all();
                    return response()->json(["success"=> true, "status"=> 200, "messages" => $messages]);
                }
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" =>"Internal server error"]);
        }
    }

   
    public function store(Request $request)
    {
        try {
            $message = new Message();
            $message->fname = $request->fname;
            $message->lname = $request->lname;
            $message->email = $request->email;
            $message->subject = $request->subject;
            $message->message = $request->message;
            $message->save();
            return Response()->json(["success"=>true, "status"=> 200 , "message"=> $message]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message"=> "Internal server error"]);
        }
    }

    public function destroy(Request $request, Message $message)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                if (Utils::isValidToken($token)) {
                    $message->delete();
                    return Response()->json(["success"=>true, "status"=> 200, "message" => "Deleted successfully"]);
                }
                return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
            }
            return response()->json(["success"=> false, "status"=> 401, "message" =>"Access Denied"]);
        } catch (Exception $ex) {
            Log::error($ex);
            return Response()->json(["success"=>false, "status"=> 500, "message" => "Internal server error"]);
        }
    }
}
