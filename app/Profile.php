<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name','email','address','phone','about','facebook_link','youtube_link','instagram_link'
    ];
}
