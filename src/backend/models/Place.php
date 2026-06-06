<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $table = 'places';
    protected $fillable = ['name', 'description', 'category_id', 'address', 'latitude', 'longitude', 'phone', 'email', 'website', 'image', 'rating', 'status', 'created_at', 'updated_at'];
    protected $casts = [
        'rating' => 'float',
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
