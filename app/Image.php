<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'image','title','category_id','description'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
