<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Place;
use App\Services\RecommendationService;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index(Request $request)
    {
        $filters = $this->extractFilters($request);

        $query = $this->buildQuery($filters, true);

        $places = $query->paginate(12)->withQueryString();

        $placesForMap = collect($places->items())->map(function ($place) {
            return [
                'id' => $place->id,
                'name' => $place->name,
                'latitude' => $place->latitude,
                'longitude' => $place->longitude,
                'avg_rating' => $place->avg_rating,
                'price_range' => $place->price_range,
                'address' => $place->address,
            ];
        })->values();

        return view('places.trangchu', [
            'places' => $places,
            'categories' => Category::orderBy('name')->get(),
            'districts' => Place::query()->whereNotNull('district')->distinct()->orderBy('district')->pluck('district'),
            'wards' => Place::query()->whereNotNull('ward')->distinct()->orderBy('ward')->pluck('ward'),
            'filters' => $filters,
            'placesForMap' => $placesForMap,
            'googleMapsKey' => env('GOOGLE_MAPS_API_KEY'),
        ]);
    }

    public function show(Place $place)
    {
        $place->load('categories');

        return view('places.show', [
            'place' => $place,
            'googleMapsKey' => env('GOOGLE_MAPS_API_KEY'),
        ]);
    }

    public function recommend(Request $request, RecommendationService $service)
    {
        $filters = $this->extractFilters($request);

        $query = $this->buildQuery($filters, true);

        $places = $query->limit(60)->get();
        $recommendations = $service->recommend($places, $filters)->take(12);

        return view('places.recommend', [
            'recommendations' => $recommendations,
            'filters' => $filters,
            'categories' => Category::orderBy('name')->get(),
            'districts' => Place::query()->whereNotNull('district')->distinct()->orderBy('district')->pluck('district'),
            'wards' => Place::query()->whereNotNull('ward')->distinct()->orderBy('ward')->pluck('ward'),
        ]);
    }

    public function apiPlaces(Request $request)
    {
        $filters = $this->extractFilters($request);
        $places = $this->buildQuery($filters, false)->limit(100)->get([
            'id',
            'name',
            'address',
            'latitude',
            'longitude',
            'avg_rating',
            'price_range',
        ]);

        return response()->json($places);
    }

    private function extractFilters(Request $request): array
    {
        $categoryIds = $request->input('category_ids', []);
        if (!is_array($categoryIds)) {
            $categoryIds = [$categoryIds];
        }

        return [
            'q' => trim((string) $request->input('q', '')),
            'category_ids' => array_filter($categoryIds),
            'district' => $request->filled('district') ? (string) $request->input('district') : null,
            'ward' => $request->filled('ward') ? (string) $request->input('ward') : null,
            'price_range' => $request->filled('price_range') ? (int) $request->input('price_range') : null,
            'price_min' => $request->filled('price_min') ? (int) $request->input('price_min') : null,
            'price_max' => $request->filled('price_max') ? (int) $request->input('price_max') : null,
            'min_rating' => $request->filled('min_rating') ? (float) $request->input('min_rating') : null,
            'lat' => $request->filled('lat') ? (float) $request->input('lat') : null,
            'lng' => $request->filled('lng') ? (float) $request->input('lng') : null,
            'radius' => $request->filled('radius') ? (float) $request->input('radius') : null,
            'priority' => $request->filled('priority') ? (string) $request->input('priority') : 'balanced',
        ];
    }

    private function buildQuery(array $filters, bool $includeDistance)
    {
        $query = Place::query()->with('categories');

        if ($filters['q'] !== '') {
            $keyword = $filters['q'];
            $query->where(function ($sub) use ($keyword) {
                $like = '%' . $keyword . '%';
                $sub->where('name', 'like', $like)
                    ->orWhere('address', 'like', $like)
                    ->orWhere('description', 'like', $like);
            });
        }

        if (count($filters['category_ids']) > 0) {
            $query->whereHas('categories', function ($sub) use ($filters) {
                $sub->whereIn('categories.id', $filters['category_ids']);
            });
        }

        if ($filters['district'] !== null) {
            $query->where('district', $filters['district']);
        }

        if ($filters['ward'] !== null) {
            $query->where('ward', $filters['ward']);
        }

        if ($filters['price_range'] !== null) {
            $query->where('price_range', '<=', $filters['price_range']);
        }

        if ($filters['min_rating'] !== null) {
            $query->where('avg_rating', '>=', $filters['min_rating']);
        }

        if ($filters['price_min'] !== null) {
            $query->where('avg_price', '>=', $filters['price_min']);
        }

        if ($filters['price_max'] !== null) {
            $query->where('avg_price', '<=', $filters['price_max']);
        }

        if ($filters['lat'] !== null && $filters['lng'] !== null && $includeDistance) {
            $distanceSql = '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))))';
            $query->select('*')->selectRaw($distanceSql . ' as distance_km', [
                $filters['lat'],
                $filters['lng'],
                $filters['lat'],
            ]);

            if ($filters['radius'] !== null) {
                $query->having('distance_km', '<=', $filters['radius']);
            }

            $query->orderBy('distance_km');
        } else {
            $query->orderByDesc('avg_rating')->orderByDesc('review_count');
        }

        return $query;
    }
}
