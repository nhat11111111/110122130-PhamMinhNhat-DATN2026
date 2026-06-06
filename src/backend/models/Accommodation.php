<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $table = 'accommodations';
    protected $fillable = ['name', 'description', 'category_id', 'address', 'latitude', 'longitude', 'phone', 'email', 'website', 'image', 'rating', 'price_per_night', 'rooms', 'status', 'created_at', 'updated_at'];
    protected $casts = [
        'rating' => 'float',
        'price_per_night' => 'float',
        'rooms' => 'integer',
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
