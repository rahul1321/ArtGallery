<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accesstoken extends Model
{
    protected $fillable = [
        "access_token", "admin_id"
    ];
}
