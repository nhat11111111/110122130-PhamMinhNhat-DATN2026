<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accommodations = [
            [
                'name' => 'Khách Sạn Ngọc Hùng',
                'slug' => 'khach-san-ngoc-hung',
                'address' => '62/9, Võ Văn Kiệt, Phường Long Châu, TP. Vĩnh Long',
                'description' => 'Khách sạn 3 sao hiện đại, thoáng mát với tầm nhìn khoáng đạt ra sông Hậu. Cung cấp dịch vụ spa, hồ bơi, nhà hàng trong khuôn viên.',
                'accommodation_type' => 'Khách sạn',
                'price_min' => 800000,
                'price_max' => 1200000,
                'rating' => 4.2,
                'review_count' => 125,
                'phone' => '0270.3822888',
                'website' => 'https://www.ngochunghotel.vn',
                'latitude' => 10.2539,
                'longitude' => 105.9651,
            ],
            [
                'name' => 'Mekong River Homestay',
                'slug' => 'mekong-river-homestay',
                'address' => '145A/11, Ấp Bình Lương, Xã An Bình, Huyện Trà Ôn, Vĩnh Long',
                'description' => 'Homestay yên tĩnh bên bờ sông Mekong, nơi lý tưởng để trải nghiệm cuộc sống nông thôn miền Tây. Các phòng được trang bị đầy đủ tiện nghi hiện đại.',
                'accommodation_type' => 'Homestay',
                'price_min' => 450000,
                'price_max' => 850000,
                'rating' => 4.6,
                'review_count' => 89,
                'phone' => '0963123456',
                'website' => 'https://www.mekongriverhomestay.vn',
                'latitude' => 10.0874,
                'longitude' => 105.4268,
            ],
            [
                'name' => 'ONE HOTEL',
                'slug' => 'one-hotel',
                'address' => '34 TRUNG NỮ VƯƠNG, Phường Long Hồ, TP. Vĩnh Long',
                'description' => 'Hotel cao cấp với kiến trúc hiện đại, phòng rộng rãi sạch sẽ. Có gym, nhà hàng 24/24, dịch vụ phòng chuyên nghiệp.',
                'accommodation_type' => 'Khách sạn',
                'price_min' => 1200000,
                'price_max' => 2000000,
                'rating' => 4.4,
                'review_count' => 234,
                'phone' => '0270.3899999',
                'latitude' => 10.2651,
                'longitude' => 105.9749,
            ],
            [
                'name' => 'Khách Sạn Cửu Long',
                'slug' => 'khach-san-cuu-long',
                'address' => 'Số 2, đường Phan Bội Châu, Phường Long Châu, TP. Vĩnh Long',
                'description' => 'Khách sạn 2 sao với giá cả phải chăng, phòng sạch sẽ và dịch vụ tốt. Thích hợp cho khách du lịch bụi và gia đình.',
                'accommodation_type' => 'Khách sạn',
                'price_min' => 300000,
                'price_max' => 600000,
                'rating' => 3.8,
                'review_count' => 167,
                'phone' => '0270.3822100',
            ],
            [
                'name' => 'Khách Sạn Phúc Thành IV',
                'slug' => 'khach-san-phuc-thanh-iv',
                'address' => '116B-118-120 Nguyễn Huệ, phường Long Tho, TP. Vĩnh Long',
                'description' => 'Khách sạn tiêu chuẩn 3 sao với phòng thoáng mát, phục vụ chu đáo. Gần trung tâm thành phố, tiện đi lại.',
                'accommodation_type' => 'Khách sạn',
                'price_min' => 700000,
                'price_max' => 1000000,
                'rating' => 4.0,
                'review_count' => 98,
                'phone' => '0270.3831555',
            ],
            [
                'name' => 'Khách Sạn Cửu Long A',
                'slug' => 'khach-san-cuu-long-a',
                'address' => 'Số 01 đường 1 tháng 5, Phường Long Hồ, TP. Vĩnh Long',
                'description' => 'Khách sạn 2 sao với thiết kế hiện đại, phòng rộng, có AC và TV. Giá tốt, phục vụ tận tình.',
                'accommodation_type' => 'Khách sạn',
                'price_min' => 350000,
                'price_max' => 700000,
                'rating' => 3.9,
                'review_count' => 76,
                'phone' => '0270.3823888',
            ],
        ];

        foreach ($accommodations as $accommodation) {
            Accommodation::create($accommodation);
        }
    }
}
