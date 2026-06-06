<?php

namespace App\Services;

use Illuminate\Support\Collection;

class RecommendationService
{
    public function recommend(Collection $places, array $filters): Collection
    {
        $selectedCategories = $filters['category_ids'] ?? [];
        $priceRange = $filters['price_range'] ?? null;
        $lat = $filters['lat'] ?? null;
        $lng = $filters['lng'] ?? null;
        $priority = $filters['priority'] ?? 'balanced';

        $weights = $this->resolveWeights($priority, $lat, $lng);

        return $places->map(function ($place) use ($selectedCategories, $priceRange, $lat, $lng, $weights) {
            $contentScore = $this->contentScore($place, $selectedCategories, $priceRange);
            $popularityScore = $this->popularityScore($place);
            $distanceScore = $this->distanceScore($place, $lat, $lng);

            $score = ($weights['content'] * $contentScore)
                + ($weights['popularity'] * $popularityScore)
                + ($weights['distance'] * $distanceScore);

            $place->reco_score = round($score, 3);
            $place->reco_reasons = [
                'content' => $contentScore,
                'popularity' => $popularityScore,
                'distance' => $distanceScore,
            ];

            return $place;
        })->sortByDesc('reco_score')->values();
    }

    private function resolveWeights(string $priority, ?float $lat, ?float $lng): array
    {
        $weights = match ($priority) {
            'nearby' => ['content' => 0.30, 'popularity' => 0.30, 'distance' => 0.40],
            'rating' => ['content' => 0.30, 'popularity' => 0.50, 'distance' => 0.20],
            'budget' => ['content' => 0.55, 'popularity' => 0.25, 'distance' => 0.20],
            default => ['content' => 0.45, 'popularity' => 0.35, 'distance' => 0.20],
        };

        if ($lat === null || $lng === null) {
            $weights['content'] += $weights['distance'] * 0.6;
            $weights['popularity'] += $weights['distance'] * 0.4;
            $weights['distance'] = 0.0;
        }

        $total = $weights['content'] + $weights['popularity'] + $weights['distance'];
        return [
            'content' => $weights['content'] / $total,
            'popularity' => $weights['popularity'] / $total,
            'distance' => $weights['distance'] / $total,
        ];
    }

    private function contentScore($place, array $selectedCategories, ?int $priceRange): float
    {
        $categoryScore = 0.2;
        if (count($selectedCategories) > 0) {
            $placeCategoryIds = $place->categories->pluck('id')->all();
            $matches = count(array_intersect($placeCategoryIds, $selectedCategories));
            $categoryScore = $matches / max(count($selectedCategories), 1);
        }

        $priceScore = 0.2;
        if ($priceRange !== null) {
            $diff = abs((int) $place->price_range - $priceRange);
            $priceScore = 1 - min($diff / 3, 1);
        }

        return (0.7 * $categoryScore) + (0.3 * $priceScore);
    }

    private function popularityScore($place): float
    {
        $ratingScore = min(max($place->avg_rating / 5, 0), 1);
        $reviewScore = min($place->review_count / 50, 1);

        return (0.7 * $ratingScore) + (0.3 * $reviewScore);
    }

    private function distanceScore($place, ?float $lat, ?float $lng): float
    {
        if ($lat === null || $lng === null) {
            return 0.5;
        }

        $distance = $this->haversineKm($lat, $lng, $place->latitude, $place->longitude);

        return 1 / (1 + $distance);
    }

    private function haversineKm(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $earthRadius = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
