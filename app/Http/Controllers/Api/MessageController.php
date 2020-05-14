<?php

namespace App\Http\Controllers\Api;

use App\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{

    public function index()
    {
        return Response()->json(Message::all());
    }

   
    public function store(Request $request)
    {
        $message = new Message();
        $message->fname = $request->fname;
        $message->lname = $request->lname;
        $message->email = $request->email;
        $message->subject = $request->subject;
        $message->message = $request->message;
        $message->save();
        return response()->json($message);

    }

    public function destroy(Message $message)
    {
        return $message->delete();
    }
}
