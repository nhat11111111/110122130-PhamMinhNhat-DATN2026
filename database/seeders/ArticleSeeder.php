<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('articles')->insert([
            [
                'title' => 'Những Quán Cơm Tấm Ngon Nhất Vĩnh Long',
                'content' => 'Vĩnh Long có rất nhiều quán cơm tấm ngon, từ cơm tấm nướng cho tới cơm tấm gà. Bài viết này sẽ giới thiệu cho bạn những quán cơm tấm nổi tiếng nhất ở thành phố Vĩnh Long.',
                'author_id' => 1,
                'category_id' => 1,
                'image' => 'https://via.placeholder.com/300x200?text=Cơm+Tấm',
                'slug' => 'nhung-quan-com-tam-ngon-nhat-vinh-long',
                'status' => 'published',
                'views' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Du Lịch Vĩnh Long: Hướng Dẫn Chi Tiết',
                'content' => 'Vĩnh Long là một thành phố du lịch nổi tiếng với những điểm tham quan độc đáo. Bài viết này sẽ giới thiệu tất cả những gì bạn cần biết về du lịch tại Vĩnh Long.',
                'author_id' => 1,
                'category_id' => 6,
                'image' => 'https://via.placeholder.com/300x200?text=Du+Lịch',
                'slug' => 'du-lich-vinh-long-huong-dan-chi-tiet',
                'status' => 'published',
                'views' => 320,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Ẩm Thực Vĩnh Long Không Nên Bỏ Qua',
                'content' => 'Ẩm thực Vĩnh Long là một phần không thể tách rời của văn hóa địa phương. Hãy khám phá những đặc sản ẩm thực độc đáo tại Vĩnh Long.',
                'author_id' => 1,
                'category_id' => 2,
                'image' => 'https://via.placeholder.com/300x200?text=Ẩm+Thực',
                'slug' => 'am-thuc-vinh-long-khong-nen-bo-qua',
                'status' => 'published',
                'views' => 210,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Cà Phê Sáng Tại Vĩnh Long',
                'content' => 'Ngồi cà phê vỉa hè tại Vĩnh Long là một cách tuyệt vời để khám phá cuộc sống địa phương. Với ly cà phê đen nóng, bánh mì nóng, và những người Vĩnh Long thân thiện, bạn sẽ cảm thấy như ở nhà.',
                'author_id' => 1,
                'category_id' => 4,
                'image' => 'https://via.placeholder.com/300x200?text=Cà+Phê',
                'slug' => 'ca-phe-sang-tai-vinh-long',
                'status' => 'published',
                'views' => 120,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Các Hoạt Động Ngoài Trời Tại Vĩnh Long Vào Mùa Hè',
                'content' => 'Mùa hè tại Vĩnh Long là thời gian tuyệt vời để khám phá các hoạt động ngoài trời. Bạn có thể chèo thuyền trên các kênh rạch, tham quan vườn cây ăn quả, hoặc tham gia các lễ hội địa phương.',
                'author_id' => 1,
                'category_id' => 6,
                'image' => 'https://via.placeholder.com/300x200?text=Hoạt+Động',
                'slug' => 'cac-hoat-dong-ngoai-troi-tai-vinh-long-vao-mua-he',
                'status' => 'published',
                'views' => 95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Phở - Nước Dùng Huyền Thoại Của Vĩnh Long',
                'content' => 'Phở tại Vĩnh Long không chỉ là một món ăn, nó là một phần của văn hóa. Nước dùng nấu liên tục hàng giờ, thịt tươi mềm, và những bánh phở mền - tất cả kết hợp tạo nên một trải nghiệm ẩm thực tuyệt vời.',
                'author_id' => 1,
                'category_id' => 2,
                'image' => 'https://via.placeholder.com/300x200?text=Phở',
                'slug' => 'pho-nuoc-dung-huyen-thoai-cua-vinh-long',
                'status' => 'published',
                'views' => 175,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Hải Sản Tươi Sống - Nguồn Tài Nguyên Thiên Nhiên Của Vĩnh Long',
                'content' => 'Vĩnh Long là vùng nước lợ giàu tài nguyên hải sản. Cá, tôm, cua đều tươi ngon quanh năm. Hãy tìm đến các nhà hàng hải sản để thưởng thức những món ăn tuyệt vời này được nấu theo cách truyền thống.',
                'author_id' => 1,
                'category_id' => 3,
                'image' => 'https://via.placeholder.com/300x200?text=Hải+Sản',
                'slug' => 'hai-san-tuoi-song-nguon-tai-nguyen-thien-nhien-cua-vinh-long',
                'status' => 'published',
                'views' => 160,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mua Sắm Tại Vĩnh Long - Các Điểm Đến Không Thể Bỏ Lỡ',
                'content' => 'Vĩnh Long có nhiều chợ truyền thống và trung tâm thương mại hiện đại. Chợ nổi Cái Bè là điểm đến yêu thích của du khách với hàng hóa đa dạng và giá cả hợp lý.',
                'author_id' => 1,
                'category_id' => 6,
                'image' => 'https://via.placeholder.com/300x200?text=Mua+Sắm',
                'slug' => 'mua-sam-tai-vinh-long-cac-diem-den-khong-the-bo-lo',
                'status' => 'published',
                'views' => 140,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Những Bí Quyết Nấu Ăn Từ Các Đầu Bếp Vĩnh Long',
                'content' => 'Các đầu bếp tại Vĩnh Long có những bí quyết nấu ăn độc đáo được truyền lại qua nhiều thế hệ. Bài viết này sẽ chia sẻ những bí quyết giúp bạn nấu những món ăn ngon hơn tại nhà.',
                'author_id' => 1,
                'category_id' => 1,
                'image' => 'https://via.placeholder.com/300x200?text=Nấu+Ăn',
                'slug' => 'nhung-bi-quyet-nau-an-tu-cac-dau-bep-vinh-long',
                'status' => 'published',
                'views' => 130,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
