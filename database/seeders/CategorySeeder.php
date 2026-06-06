<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Cơm Tấm',
                'description' => 'Các quán cơm tấm nướng ngon, giá rẻ tại Vĩnh Long',
                'icon' => 'fas fa-bowl-rice',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bún/Phở',
                'description' => 'Quán bún bò, phở, bún cá tại Vĩnh Long',
                'icon' => 'fas fa-utensils',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hải Sản',
                'description' => 'Nhà hàng hải sản tươi sống tại Vĩnh Long',
                'icon' => 'fas fa-fish',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cà Phê',
                'description' => 'Quán cà phê, trà, nước ngọt tại Vĩnh Long',
                'icon' => 'fas fa-mug-hot',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Khách Sạn',
                'description' => 'Các khách sạn, nhà nghỉ tại Vĩnh Long',
                'icon' => 'fas fa-hotel',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Du Lịch',
                'description' => 'Điểm du lịch, tham quan tại Vĩnh Long',
                'icon' => 'fas fa-camera',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
