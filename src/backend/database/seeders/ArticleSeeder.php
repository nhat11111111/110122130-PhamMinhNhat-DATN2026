<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Sắc tìm bằng lăng làm say lòng phố thị miền Tây',
                'slug' => 'sac-tim-bang-lang-lam-say-long-pho-thi-mien-tay',
                'excerpt' => 'Tháng Năm chạm ngộ, khi nắng đầu hè vừa kip hong khô những con mưa trái mùa, nhiều tuyến đường trung tâm ở Vĩnh Long bồng trở nên diu dàng hơn trong sắc tìm của bằng lăng nở rộ.',
                'content' => '<p>Tháng Năm chạm ngộ, khi nắng đầu hè vừa kip hong khô những con mưa trái mùa, nhiều tuyến đường trung tâm ở Vĩnh Long bồng trở nên diu dàng hơn trong sắc tìm của bằng lăng nở rộ. Dưới nền trời xanh trong, những chùm bằng lăng tìm mềm mai dung dua theo gió, tạo nên bức tranh thiên nhiên tuyệt đẹp.</p>',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Khám phá Vĩnh Long trong một ngày - Trải nghiệm thiên nhiên, văn hóa và ẩm thực',
                'slug' => 'kham-pha-vinh-long-trong-mot-ngay',
                'excerpt' => 'Vĩnh Long là một trong những địa điểm du lịch hấp dẫn nhất của Đồng bằng sông Cửu Long, nằm yên tĩnh giữa những cánh đồng xanh ngát.',
                'content' => '<p>Vĩnh Long là một trong những địa điểm du lịch hấp dẫn nhất của Đồng bằng sông Cửu Long, nằm yên tĩnh giữa những cánh đồng xanh ngát. Nơi đây không chỉ nổi tiếng với những trái cây tươi ngon mà còn có nhiều di tích lịch sử, các lễ hội truyền thống và nền ẩm thực đặc sắc riêng.</p>',
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Du lịch Vĩnh Long - Những địa điểm không nên bỏ lỡ',
                'slug' => 'du-lich-vinh-long-dia-diem-khong-nen-bo-lo',
                'excerpt' => 'Nếu bạn đang lên kế hoạch cho một chuyến du lịch đến Vĩnh Long, đây là những điểm đến bắt buộc phải ghé thăm.',
                'content' => '<p>Nếu bạn đang lên kế hoạch cho một chuyến du lịch đến Vĩnh Long, đây là những điểm đến bắt buộc phải ghé thăm. Từ những khu vườn sinh thái, chợ nổi, đến các ngôi chùa cổ kính.</p>',
                'published_at' => now()->subDays(1),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
