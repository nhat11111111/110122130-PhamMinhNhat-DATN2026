<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'district',
        'ward',
        'description',
        'latitude',
        'longitude',
        'price_range',
        'avg_price',
        'phone',
        'website',
        'image_url',
        'opening_hours',
        'avg_rating',
        'review_count',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'price_range' => 'int',
        'avg_price' => 'int',
        'avg_rating' => 'float',
        'review_count' => 'int',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
