<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $table = 'accommodations';

    protected $fillable = [
        'name',
        'slug',
        'address',
        'description',
        'image',
        'price_min',
        'price_max',
        'accommodation_type',
        'latitude',
        'longitude',
        'rating',
        'review_count',
        'phone',
        'website',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'rating' => 'float',
        'price_min' => 'integer',
        'price_max' => 'integer',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
