<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tạo user admin mặc định
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@vinhlong.com',
            'username' => 'admin',
            'password' => bcrypt('admin123'),
            'phone' => '0276-3826000',
            'role' => 'admin',
            'status' => 'active',
        ]);

        // Tạo user bình thường
        User::factory()->create([
            'name' => 'User Test',
            'email' => 'user@vinhlong.com',
            'username' => 'user',
            'password' => bcrypt('user123'),
            'phone' => '0276-3826001',
            'role' => 'user',
            'status' => 'active',
        ]);

        // Chạy các seeders
        $this->call([
            CategorySeeder::class,
            PlaceSeeder::class,
            ArticleSeeder::class,
            AccommodationSeeder::class,
        ]);
    }
}
