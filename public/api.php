<?php

/**
 * API Controller for Vinh Long Tourist
 * Handles all API requests for listings, locations, etc.
 */

// SVG placeholder data URI to replace broken image links
define('PLACEHOLDER_SVG', 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22400%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E');

class TouristAPI {
    
    private $db;
    public $response = [
        'status' => 'error',
        'message' => 'Unknown error',
        'data' => []
    ];

    public function __construct() {
        // Database connection would be initialized here
        // For now, this is placeholder code showing structure
        $this->setContentType();
    }

    /**
     * Set response content type
     */
    private function setContentType() {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }

    /**
     * Get all listings
     */
    public function getListings() {
        try {
            // TODO: Query database for listings
            $listings = [
                [
                    'id' => 1,
                    'name' => 'KHÁCH SẠN VĂN TRẠNG',
                    'location' => 'Vĩnh Long',
                    'type' => 'hotel',
                    'description' => 'Khách sạn 3 sao nằm tại vị trí đắc địa',
                    'rating' => 4.5,
                    'price' => 500000,
                    'image' => PLACEHOLDER_SVG
                ],
                [
                    'id' => 2,
                    'name' => 'KHÁCH SẠN CỬU LONG A',
                    'location' => 'Vĩnh Long',
                    'type' => 'hotel',
                    'description' => 'Khách sạn tiện nghi gần trung tâm thành phố',
                    'rating' => 4.2,
                    'price' => 450000,
                    'image' => PLACEHOLDER_SVG
                ],
                [
                    'id' => 3,
                    'name' => 'COCO RIVERSIDE LODGE',
                    'location' => 'Vĩnh Long',
                    'type' => 'resort',
                    'description' => 'Resort sang trọng bên bờ sông Cửu Long',
                    'rating' => 4.8,
                    'price' => 750000,
                    'image' => PLACEHOLDER_SVG
                ],
                [
                    'id' => 4,
                    'name' => 'KHÁCH SẠN KHỞI HOA',
                    'location' => 'Vĩnh Long',
                    'type' => 'hotel',
                    'description' => 'Khách sạn bình dân với dịch vụ tốt',
                    'rating' => 3.9,
                    'price' => 350000,
                    'image' => PLACEHOLDER_SVG
                ]
            ];

            $this->response = [
                'status' => 'success',
                'message' => 'Listings retrieved successfully',
                'data' => $listings
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving listings: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get listing by ID
     */
    public function getListingById(int $id) {
        try {
            if (!$id || !is_numeric($id)) {
                throw new Exception('Invalid listing ID');
            }

            // TODO: Query database for specific listing
            $listing = [
                'id' => $id,
                'name' => 'Khách sạn mẫu',
                'location' => 'Vĩnh Long',
                'type' => 'hotel',
                'description' => 'Mô tả chi tiết về khách sạn',
                'rating' => 4.5,
                'price' => 500000,
                'image' => PLACEHOLDER_SVG,
                'address' => 'Số 123, Đường ABC, Vĩnh Long',
                'phone' => '[Chưa cập nhật]',
                'email' => '[Chưa cập nhật]',
                'amenities' => [
                    'Wi-Fi miễn phí',
                    'Bồn tắm nước nóng',
                    'Nhà hàng',
                    'Dịch vụ phòng'
                ]
            ];

            $this->response = [
                'status' => 'success',
                'message' => 'Listing retrieved successfully',
                'data' => $listing
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving listing: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Search listings
     */
    public function searchListings(string $query) {
        try {
            if (empty($query)) {
                throw new Exception('Search query cannot be empty');
            }

            // TODO: Query database with search terms
            $results = [
                [
                    'id' => 1,
                    'name' => 'KHÁCH SẠN VĂN TRẠNG',
                    'location' => 'Vĩnh Long',
                    'type' => 'hotel',
                    'description' => 'Khách sạn 3 sao',
                    'rating' => 4.5,
                    'price' => 500000
                ]
            ];

            $this->response = [
                'status' => 'success',
                'message' => count($results) . ' results found',
                'data' => $results
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error searching listings: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get all categories
     */
    public function getCategories() {
        try {
            // TODO: Query database for categories
            $categories = [
                ['id' => 1, 'name' => 'Khách sạn', 'count' => 12],
                ['id' => 2, 'name' => 'Nhà hàng', 'count' => 28],
                ['id' => 3, 'name' => 'Điểm tham quan', 'count' => 15],
                ['id' => 4, 'name' => 'Mua sắm', 'count' => 8],
                ['id' => 5, 'name' => 'Tour du lịch', 'count' => 5]
            ];

            $this->response = [
                'status' => 'success',
                'message' => 'Categories retrieved successfully',
                'data' => $categories
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving categories: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get listings by category
     */
    public function getListingsByCategory(int $categoryId) {
        try {
            if (!$categoryId || !is_numeric($categoryId)) {
                throw new Exception('Invalid category ID');
            }

            // TODO: Query database for listings in category
            $listings = [];

            $this->response = [
                'status' => 'success',
                'message' => count($listings) . ' listings found in category',
                'data' => $listings
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving category listings: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get all news
     */
    public function getNews() {
        try {
            // TODO: Query database for news
            $news = [
                [
                    'id' => 1,
                    'title' => 'Điểm chạm câu xúc cho hành trình về nguồn ở Vĩnh Long',
                    'slug' => 'diem-cham-cau-xuc-cho-hanh-trinh-ve-nguon-o-vinh-long',
                    'image' => PLACEHOLDER_SVG,
                    'excerpt' => 'Có những hành trình không nhàm dé di xa, mà để di sâu. Và khi về vùng đất Vĩnh Long nơi lưu giữ di tích quốc gia đặc biệt Mỏ và Khu lưu niệm Nguyễn Đình Chiểu - du khách không chỉ được vào một điểm đến, mà được vào một không gian của ký ức.',
                    'content' => 'Nội dung chi tiết về điểm đến Vĩnh Long...',
                    'author' => 'Admin',
                    'date' => '12/05/2026',
                    'category' => 'Du lịch'
                ],
                [
                    'id' => 2,
                    'title' => 'Tour trải nghiệm khoai lang Bình Tân',
                    'slug' => 'tour-trai-nghiem-khoai-lang-binh-tan',
                    'image' => PLACEHOLDER_SVG,
                    'excerpt' => 'Nội dung khoai lang khoai không ít du khách ngồi được vào một không gian của ký ức, của danh giới được vào một không gian của ký ức, của danh',
                    'content' => 'Nội dung chi tiết về tour khoai lang...',
                    'author' => 'Admin',
                    'date' => '12/05/2026',
                    'category' => 'Ẩm thực'
                ],
                [
                    'id' => 3,
                    'title' => 'Khám phá chợ nổi Cái Bè',
                    'slug' => 'kham-pha-cho-noi-cai-be',
                    'image' => PLACEHOLDER_SVG,
                    'excerpt' => 'Chợ nổi Cái Bè là một trong những điểm đến nổi tiếng nhất ở Vĩnh Long với những ghe, xuồng chở đầy hàng hóa nông sản địa phương.',
                    'content' => 'Nội dung chi tiết về chợ nổi Cái Bè...',
                    'author' => 'Admin',
                    'date' => '11/05/2026',
                    'category' => 'Mua sắm'
                ],
                [
                    'id' => 4,
                    'title' => 'Lễ hội truyền thống Vĩnh Long 2026',
                    'slug' => 'le-hoi-truyen-thong-vinh-long-2026',
                    'image' => PLACEHOLDER_SVG,
                    'excerpt' => 'Những lễ hội truyền thống độc đáo của Vĩnh Long sẽ mang đến cho du khách một trải nghiệm văn hóa thú vị.',
                    'content' => 'Nội dung chi tiết về các lễ hội...',
                    'author' => 'Admin',
                    'date' => '10/05/2026',
                    'category' => 'Sự kiện'
                ]
            ];

            $this->response = [
                'status' => 'success',
                'message' => 'News retrieved successfully',
                'data' => $news
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving news: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get news by ID
     */
    public function getNewsById(int $id) {
        try {
            if (!$id || !is_numeric($id)) {
                throw new Exception('Invalid news ID');
            }

            // TODO: Query database for specific news
            $news = [
                'id' => $id,
                'title' => 'Điểm chạm câu xúc cho hành trình về nguồn ở Vĩnh Long',
                'slug' => 'diem-cham-cau-xuc-cho-hanh-trinh-ve-nguon-o-vinh-long',
                'image' => PLACEHOLDER_SVG,
                'excerpt' => 'Có những hành trình không nhàm dé di xa, mà để di sâu...',
                'content' => 'Nội dung chi tiết về điểm đến Vĩnh Long. Có những hành trình không nhàm dé di xa, mà để di sâu. Và khi về vùng đất Vĩnh Long nơi lưu giữ di tích quốc gia đặc biệt Mỏ và Khu lưu niệm Nguyễn Đình Chiểu...',
                'author' => 'Admin',
                'date' => '12/05/2026',
                'category' => 'Du lịch'
            ];

            $this->response = [
                'status' => 'success',
                'message' => 'News retrieved successfully',
                'data' => $news
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving news: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get system status
     */
    public function getStatus() {
        return [
            'status' => 'online',
            'message' => 'Vinh Long Tourist API is running',
            'version' => '1.0.0',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Get all accommodations
     */
    public function getAccommodations(?string $type = null) {
        try {
            // TODO: Query database for accommodations from locations table
            $accommodations = [
                [
                    'id' => 1,
                    'name' => 'KHÁCH SẠN VĂN TRẠNG',
                    'type' => 'Khách sạn',
                    'location' => 'Vĩnh Long',
                    'rating' => 4.5,
                    'reviews' => 128,
                    'price' => '500,000 - 1,200,000 VNĐ/đêm',
                    'minPrice' => 500000,
                    'maxPrice' => 1200000,
                    'image' => 'https://images.unsplash.com/photo-1578899387571-184aafb2bfd9?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Nhà hàng', 'Phòng gym', 'Spa'],
                    'description' => 'Khách sạn 3 sao được xây dựng theo phong cách kiến trúc truyền thống Việt Nam, có vị trí đắc địa ngay trung tâm thành phố Vĩnh Long.'
                ],
                [
                    'id' => 2,
                    'name' => 'KHÁCH SẠN CỬU LONG A',
                    'type' => 'Khách sạn',
                    'location' => 'Vĩnh Long',
                    'rating' => 4,
                    'reviews' => 95,
                    'price' => '350,000 - 800,000 VNĐ/đêm',
                    'minPrice' => 350000,
                    'maxPrice' => 800000,
                    'image' => 'https://images.unsplash.com/photo-1631049307038-da0ec9d70304?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Nhà hàng', 'Bể bơi'],
                    'description' => 'Khách sạn 3 sao với không gian thoáng mát, phòng ốc hiện đại, phục vụ chu đáo và chuyên nghiệp.'
                ],
                [
                    'id' => 3,
                    'name' => 'COCO RIVERSIDE LODGE',
                    'type' => 'Resort',
                    'location' => 'Vĩnh Long',
                    'rating' => 4.8,
                    'reviews' => 156,
                    'price' => '1,500,000 - 3,000,000 VNĐ/đêm',
                    'minPrice' => 1500000,
                    'maxPrice' => 3000000,
                    'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Nhà hàng', 'Spa', 'Bể bơi', 'Phòng gym'],
                    'description' => 'Resort 5 sao tiêu chuẩn quốc tế, nằm bên bờ sông Cửu Long, mang đến trải nghiệm thư giãn tuyệt vời.'
                ],
                [
                    'id' => 4,
                    'name' => 'KHÁCH SẠN KHỞI HOA',
                    'type' => 'Khách sạn',
                    'location' => 'Vĩnh Long',
                    'rating' => 3.8,
                    'reviews' => 72,
                    'price' => '250,000 - 600,000 VNĐ/đêm',
                    'minPrice' => 250000,
                    'maxPrice' => 600000,
                    'image' => 'https://images.unsplash.com/photo-1559599810-46d1d26da206?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Nhà hàng'],
                    'description' => 'Khách sạn 2 sao tiêu chuẩn, giá cả phải chăng, thích hợp cho khách du lịch có ngân sách hạn chế.'
                ],
                [
                    'id' => 5,
                    'name' => 'HOMESTAY MEKONG',
                    'type' => 'Homestay',
                    'location' => 'Vĩnh Long',
                    'rating' => 4.6,
                    'reviews' => 103,
                    'price' => '200,000 - 400,000 VNĐ/đêm',
                    'minPrice' => 200000,
                    'maxPrice' => 400000,
                    'image' => 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Nấu ăn'],
                    'description' => 'Homestay tựa nhân văn tại thôn Lan, nơi du khách có thể trải nghiệm sinh hoạt hàng ngày của người dân địa phương.'
                ],
                [
                    'id' => 6,
                    'name' => 'NHÀ NGHỈ SÔNG NƯỚC',
                    'type' => 'Nhà nghỉ',
                    'location' => 'Vĩnh Long',
                    'rating' => 4.2,
                    'reviews' => 68,
                    'price' => '300,000 - 700,000 VNĐ/đêm',
                    'minPrice' => 300000,
                    'maxPrice' => 700000,
                    'image' => 'https://images.unsplash.com/photo-1520587191167-7e2e01e312a1?q=80&w=600&auto=format&fit=crop',
                    'amenities' => ['WiFi', 'Máy lạnh'],
                    'description' => 'Nhà nghỉ với view sông tuyệt đẹp, không gian yên tĩnh, phù hợp cho những ai muốn thư giãn.'
                ]
            ];

            // Filter by type if provided
            if ($type) {
                $accommodations = array_filter($accommodations, function($acc) use ($type) {
                    return strtolower($acc['type']) === strtolower($type);
                });
            }

            $this->response = [
                'status' => 'success',
                'message' => count($accommodations) . ' accommodations found',
                'data' => array_values($accommodations)
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving accommodations: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get accommodation by ID
     */
    public function getAccommodationById(int $id) {
        try {
            if (!$id || !is_numeric($id)) {
                throw new Exception('Invalid accommodation ID');
            }

            $allAccommodations = $this->getAccommodations();
            $accommodation = null;

            foreach ($allAccommodations['data'] as $acc) {
                if ($acc['id'] == $id) {
                    $accommodation = $acc;
                    break;
                }
            }

            if (!$accommodation) {
                throw new Exception('Accommodation not found');
            }

            $this->response = [
                'status' => 'success',
                'message' => 'Accommodation retrieved successfully',
                'data' => $accommodation
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving accommodation: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get all tours
     */
    public function getTours($duration = null) {
        try {
            // TODO: Query database for tours from tours table
            $tours = [
                [
                    'id' => 1,
                    'name' => 'TOUR 6 ĐIỂM: THĂM QUAN NHÀ GỖ – TRẢI NGHIỆM TẤT',
                    'company' => 'Công ty TNHH TM DV và DL...',
                    'description' => 'Khám phá những điểm tham quan nổi tiếng, trải nghiệm văn hóa địa phương',
                    'location' => 'Vĩnh Long',
                    'duration' => '6 Điểm',
                    'durationCategory' => 'tour-1-ngay',
                    'price' => 1500000,
                    'rating' => 4.5,
                    'groupSize' => '15-30',
                    'image' => 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop'
                ],
                [
                    'id' => 2,
                    'name' => 'Sông nước miệt vườn CÁI BÈ + VĨNH LONG – ĐIỂM ĐẾN AN',
                    'company' => 'Công ty Du Lịch Mekong Travel...',
                    'description' => 'Tour du thuyền khám phá sông nước, làng trái cây, nhà nông dân',
                    'location' => 'Cái Bè - Vĩnh Long',
                    'duration' => '1 Ngày',
                    'durationCategory' => 'tour-1-ngay',
                    'price' => 1800000,
                    'rating' => 4.8,
                    'groupSize' => '10-20',
                    'image' => 'https://images.unsplash.com/photo-1552958915-3a2ca126ecf7?q=80&w=600&auto=format&fit=crop'
                ],
                [
                    'id' => 3,
                    'name' => 'CHO THUÊ TÀU DU LỊCH',
                    'company' => 'Công ty TNHH TM DV và DL...',
                    'description' => 'Cho thuê tàu du lịch với tiện nghi đầy đủ cho các tour nhóm',
                    'location' => 'Vĩnh Long',
                    'duration' => '2-3 Ngày',
                    'durationCategory' => 'tour-2-3-ngay',
                    'price' => 2500000,
                    'rating' => 4.6,
                    'groupSize' => '20-50',
                    'image' => 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop'
                ],
                [
                    'id' => 4,
                    'name' => 'TOUR 5 ĐIỂM – TÀU THĂM QUAN VƯƠNG QUỐC GẠCH',
                    'company' => 'Công ty TNHH TM DV và DL...',
                    'description' => 'Khám phá vương quốc gạch nung truyền thống, thăm các làng nghề',
                    'location' => 'Vĩnh Long',
                    'duration' => '5 Điểm',
                    'durationCategory' => 'tour-1-ngay',
                    'price' => 1300000,
                    'rating' => 4.3,
                    'groupSize' => '10-25',
                    'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop'
                ],
                [
                    'id' => 5,
                    'name' => 'Tour Khám Phá Kinh Tế - Xã Hội Vĩnh Long',
                    'company' => 'Vinh Long Tourist',
                    'description' => 'Tìm hiểu kinh tế, xã hội, văn hóa, lịch sử Vĩnh Long chi tiết',
                    'location' => 'Vĩnh Long',
                    'duration' => '3 Ngày',
                    'durationCategory' => 'tour-2-3-ngay',
                    'price' => 2200000,
                    'rating' => 4.7,
                    'groupSize' => '15-30',
                    'image' => 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop'
                ],
                [
                    'id' => 6,
                    'name' => 'Tour Mở Rộng: Vĩnh Long - An Giang - Cần Thơ',
                    'company' => 'Mekong Travel Co.',
                    'description' => 'Tour 7 ngày khám phá ba tỉnh Đông Nam Bộ, thưởng ngoạn Vịnh Hạ Long',
                    'location' => 'Vĩnh Long - An Giang - Cần Thơ',
                    'duration' => '1 Tuần',
                    'durationCategory' => 'tour-tuan',
                    'price' => 5500000,
                    'rating' => 4.9,
                    'groupSize' => '20-40',
                    'image' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop'
                ]
            ];

            // Filter by duration if provided
            if ($duration) {
                $tours = array_filter($tours, function($tour) use ($duration) {
                    return strtolower($tour['durationCategory']) === strtolower($duration);
                });
            }

            $this->response = [
                'status' => 'success',
                'message' => count($tours) . ' tours found',
                'data' => array_values($tours)
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving tours: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Get tour by ID
     */
    public function getTourById(int $id) {
        try {
            if (!$id || !is_numeric($id)) {
                throw new Exception('Invalid tour ID');
            }

            $allTours = $this->getTours();
            $tour = null;

            foreach ($allTours['data'] as $t) {
                if ($t['id'] == $id) {
                    $tour = $t;
                    break;
                }
            }

            if (!$tour) {
                throw new Exception('Tour not found');
            }

            $this->response = [
                'status' => 'success',
                'message' => 'Tour retrieved successfully',
                'data' => $tour
            ];
        } catch (Exception $e) {
            $this->response['message'] = 'Error retrieving tour: ' . $e->getMessage();
        }

        return $this->response;
    }

    /**
     * Return JSON response
     */
    public function returnJSON() {
        echo json_encode($this->response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    /**
     * Set response
     */
    public function setResponse(string $status, string $message, array $data = []) {
        $this->response = [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
    }
}

// ==================== API ROUTING ==================== //

// Initialize API
$api = new TouristAPI();

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = array_filter(explode('/', $path));

// Get the endpoint (last part of path)
$endpoint = end($pathParts) ?: 'status';
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$query = isset($_GET['q']) ? $_GET['q'] : null;

// Handle CORS preflight
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Route requests
switch ($endpoint) {
    case 'listings':
        if ($id) {
            echo json_encode($api->getListingById($id), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($api->getListings(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'search':
        if ($query) {
            echo json_encode($api->searchListings($query), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            $api->setResponse('error', 'Search query required');
            echo json_encode($api->response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'categories':
        if ($id) {
            echo json_encode($api->getListingsByCategory($id), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($api->getCategories(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'news':
        if ($id) {
            echo json_encode($api->getNewsById($id), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($api->getNews(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'accommodations':
        if ($id) {
            echo json_encode($api->getAccommodationById($id), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            $type = isset($_GET['type']) ? $_GET['type'] : null;
            echo json_encode($api->getAccommodations($type), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'tours':
        if ($id) {
            echo json_encode($api->getTourById($id), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            $duration = isset($_GET['duration']) ? $_GET['duration'] : null;
            echo json_encode($api->getTours($duration), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'status':
    default:
        echo json_encode($api->getStatus(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
}

?>
