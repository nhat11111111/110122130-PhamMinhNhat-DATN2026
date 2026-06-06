<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Place;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FoodSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Com tam',
            'Bun',
            'Pho',
            'Hu tieu',
            'Lau',
            'Mon chay',
            'Cafe',
            'Tra sua',
            'Hai san',
            'Banh mi',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate([
                'slug' => Str::slug($name),
            ], [
                'name' => $name,
            ]);
        }

        $categoryMap = Category::all()->keyBy('slug');

        $places = [
            [
                'name' => 'Quan Com Tam Vinh Long',
                'address' => '12 Nguyen Hue, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 1',
                'latitude' => 10.2532,
                'longitude' => 105.9725,
                'price_range' => 2,
                'avg_price' => 35000,
                'opening_hours' => '06:00-21:00',
                'description' => 'Popular com tam with grilled pork and fresh vegetables.',
                'categories' => ['com-tam'],
            ],
            [
                'name' => 'Bun Bo Song Tien',
                'address' => '45 Nguyen Van Thoai, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 2',
                'latitude' => 10.2496,
                'longitude' => 105.9752,
                'price_range' => 2,
                'avg_price' => 40000,
                'opening_hours' => '06:00-20:30',
                'description' => 'Bun bo with rich broth, served near the river.',
                'categories' => ['bun'],
            ],
            [
                'name' => 'Pho Minh Tho',
                'address' => '88 Tran Phu, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 3',
                'latitude' => 10.2571,
                'longitude' => 105.9679,
                'price_range' => 3,
                'avg_price' => 45000,
                'opening_hours' => '06:30-22:00',
                'description' => 'Classic pho with beef slices and fresh herbs.',
                'categories' => ['pho'],
            ],
            [
                'name' => 'Hu Tieu My Thuan',
                'address' => '20 My Thuan, Vinh Long',
                'district' => 'Long Ho',
                'ward' => 'My Thuan',
                'latitude' => 10.2834,
                'longitude' => 105.9637,
                'price_range' => 2,
                'avg_price' => 38000,
                'opening_hours' => '05:30-21:00',
                'description' => 'Hu tieu with clear broth and pork toppings.',
                'categories' => ['hu-tieu'],
            ],
            [
                'name' => 'Lau Ca Linh 9 Thuy',
                'address' => '5 Pham Thai Buong, Vinh Long',
                'district' => 'Vung Liem',
                'ward' => 'Trung Ngai',
                'latitude' => 10.2545,
                'longitude' => 105.9814,
                'price_range' => 3,
                'avg_price' => 120000,
                'opening_hours' => '10:00-22:00',
                'description' => 'Hot pot featuring local fish with vegetables.',
                'categories' => ['lau', 'hai-san'],
            ],
            [
                'name' => 'Cafe Ben Song',
                'address' => '102 Le Loi, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 5',
                'latitude' => 10.2521,
                'longitude' => 105.9694,
                'price_range' => 1,
                'avg_price' => 30000,
                'opening_hours' => '07:00-22:30',
                'description' => 'Riverside cafe with quiet seating and drinks.',
                'categories' => ['cafe'],
            ],
            [
                'name' => 'Tra Sua Toan Ngan',
                'address' => '66 Pham Hung, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 4',
                'latitude' => 10.2478,
                'longitude' => 105.9682,
                'price_range' => 2,
                'avg_price' => 32000,
                'opening_hours' => '09:00-22:00',
                'description' => 'Milk tea menu with toppings and fruit tea.',
                'categories' => ['tra-sua'],
            ],
            [
                'name' => 'Banh Mi Goc Pho',
                'address' => '15 Phan Dinh Phung, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 1',
                'latitude' => 10.2556,
                'longitude' => 105.9739,
                'price_range' => 1,
                'avg_price' => 20000,
                'opening_hours' => '06:00-19:00',
                'description' => 'Banh mi with cold cuts and fresh vegetables.',
                'categories' => ['banh-mi'],
            ],
            [
                'name' => 'Chay An Lac',
                'address' => '9 Nguyen Binh Khiem, Vinh Long',
                'district' => 'Vinh Long City',
                'ward' => 'Ward 8',
                'latitude' => 10.2599,
                'longitude' => 105.9705,
                'price_range' => 2,
                'avg_price' => 35000,
                'opening_hours' => '07:00-20:00',
                'description' => 'Vegetarian meals with seasonal ingredients.',
                'categories' => ['mon-chay'],
            ],
            [
                'name' => 'Hai San Co Ba',
                'address' => '30 Vo Van Kiet, Vinh Long',
                'district' => 'Mang Thit',
                'ward' => 'Tan Long',
                'latitude' => 10.2489,
                'longitude' => 105.9793,
                'price_range' => 4,
                'avg_price' => 180000,
                'opening_hours' => '10:00-23:00',
                'description' => 'Seafood menu with grilled shrimp and crab.',
                'categories' => ['hai-san'],
            ],
        ];

        foreach ($places as $placeData) {
            $categories = $placeData['categories'];
            unset($placeData['categories']);

            $place = Place::create($placeData);
            $categoryIds = collect($categories)
                ->map(fn ($slug) => $categoryMap->get($slug)?->id)
                ->filter()
                ->all();

            $place->categories()->sync($categoryIds);

            $reviewsCount = rand(6, 18);
            $ratingSum = 0;
            for ($i = 0; $i < $reviewsCount; $i++) {
                $rating = rand(3, 5);
                $ratingSum += $rating;
                Review::create([
                    'place_id' => $place->id,
                    'rating' => $rating,
                    'comment' => null,
                ]);
            }

            $place->avg_rating = round($ratingSum / $reviewsCount, 2);
            $place->review_count = $reviewsCount;
            $place->save();
        }
    }
}
