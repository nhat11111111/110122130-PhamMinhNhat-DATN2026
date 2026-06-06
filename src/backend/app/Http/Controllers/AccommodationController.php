<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;

class AccommodationController extends Controller
{
    public function index(Request $request)
    {
        $query = Accommodation::query();

        // Search by keyword
        if ($request->filled('q')) {
            $q = $request->input('q');
            $query->where('name', 'like', "%{$q}%")
                  ->orWhere('address', 'like', "%{$q}%")
                  ->orWhere('description', 'like', "%{$q}%");
        }

        // Filter by accommodation type
        if ($request->filled('type')) {
            $query->where('accommodation_type', $request->input('type'));
        }

        // Filter by price range
        if ($request->filled('price_range')) {
            $priceRange = $request->input('price_range');
            $ranges = [
                1 => [0, 500000],
                2 => [500000, 1000000],
                3 => [1000000, 2000000],
                4 => [2000000, 3000000],
                5 => [3000000, 5000000],
                6 => [5000000, PHP_INT_MAX],
            ];
            if (isset($ranges[$priceRange])) {
                [$min, $max] = $ranges[$priceRange];
                $query->whereBetween('price_min', [$min, $max]);
            }
        }

        // Sort options
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price_min', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price_min', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $accommodations = $query->paginate(12)->withQueryString();

        $types = Accommodation::distinct()
                              ->pluck('accommodation_type')
                              ->filter()
                              ->sort()
                              ->values();

        return view('accommodations.index', [
            'accommodations' => $accommodations,
            'types' => $types,
            'search_query' => $request->input('q', ''),
            'selected_type' => $request->input('type', ''),
            'selected_sort' => $sort,
            'selected_price_range' => $request->input('price_range', ''),
        ]);
    }

    public function show(Accommodation $accommodation)
    {
        return view('accommodations.show', [
            'accommodation' => $accommodation,
        ]);
    }
}
