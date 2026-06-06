-- ==================== VINH LONG TOURIST DATABASE ==================== --
-- Database Schema for Vinh Long Tourist Portal
-- Created: 2026-05-09

-- ==================== TABLES ==================== --

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(100) UNIQUE NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(150),
    `phone` VARCHAR(20),
    `address` TEXT,
    `avatar` VARCHAR(255),
    `role` ENUM('admin', 'business', 'user') DEFAULT 'user',
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `description` TEXT,
    `icon` VARCHAR(255),
    `image` VARCHAR(255),
    `display_order` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listings Table (Hotels, Restaurants, Attractions, etc.)
CREATE TABLE IF NOT EXISTS `listings` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `category_id` INT NOT NULL,
    `user_id` INT,
    `name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) UNIQUE NOT NULL,
    `description` LONGTEXT,
    `address` TEXT NOT NULL,
    `phone` VARCHAR(20),
    `email` VARCHAR(100),
    `website` VARCHAR(255),
    `latitude` DECIMAL(10, 8),
    `longitude` DECIMAL(11, 8),
    `price_from` DECIMAL(10, 2),
    `price_to` DECIMAL(10, 2),
    `rating` DECIMAL(3, 2) DEFAULT 0,
    `review_count` INT DEFAULT 0,
    `image_main` VARCHAR(255),
    `is_featured` BOOLEAN DEFAULT FALSE,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_slug (slug),
    INDEX idx_rating (rating),
    INDEX idx_active (is_active),
    FULLTEXT INDEX ft_search (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listing Images Table
CREATE TABLE IF NOT EXISTS `listing_images` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `listing_id` INT NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `title` VARCHAR(150),
    `alt_text` VARCHAR(255),
    `display_order` INT DEFAULT 0,
    `is_primary` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    INDEX idx_listing (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews Table
CREATE TABLE IF NOT EXISTS `reviews` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `listing_id` INT NOT NULL,
    `user_id` INT,
    `rating` DECIMAL(3, 2) NOT NULL,
    `title` VARCHAR(150),
    `comment` TEXT,
    `helpful_count` INT DEFAULT 0,
    `is_verified` BOOLEAN DEFAULT FALSE,
    `is_published` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_listing (listing_id),
    INDEX idx_user (user_id),
    INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Places (Attractions) Table
CREATE TABLE IF NOT EXISTS `places` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) UNIQUE NOT NULL,
    `description` LONGTEXT,
    `latitude` DECIMAL(10, 8),
    `longitude` DECIMAL(11, 8),
    `image` VARCHAR(255),
    `opening_hours` VARCHAR(100),
    `admission_fee` DECIMAL(8, 2),
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tours/Packages Table
CREATE TABLE IF NOT EXISTS `tours` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) UNIQUE NOT NULL,
    `description` LONGTEXT,
    `duration_days` INT,
    `price` DECIMAL(10, 2),
    `max_participants` INT,
    `image` VARCHAR(255),
    `itinerary` LONGTEXT,
    `included_services` TEXT,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bookings Table
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT,
    `listing_id` INT,
    `tour_id` INT,
    `booking_date` DATETIME NOT NULL,
    `check_in` DATE,
    `check_out` DATE,
    `quantity` INT DEFAULT 1,
    `total_price` DECIMAL(12, 2),
    `status` ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    `guest_name` VARCHAR(150),
    `guest_email` VARCHAR(100),
    `guest_phone` VARCHAR(20),
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Amenities Table
CREATE TABLE IF NOT EXISTS `amenities` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(255),
    `display_order` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listing Amenities (Join Table)
CREATE TABLE IF NOT EXISTS `listing_amenities` (
    `listing_id` INT NOT NULL,
    `amenity_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (listing_id, amenity_id),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20),
    `subject` VARCHAR(150),
    `message` LONGTEXT NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `is_replied` BOOLEAN DEFAULT FALSE,
    `reply_message` LONGTEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `key` VARCHAR(100) UNIQUE NOT NULL,
    `value` LONGTEXT,
    `type` VARCHAR(50),
    `description` TEXT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== SAMPLE DATA ==================== --

-- Insert categories
INSERT INTO `categories` (`name`, `slug`, `description`, `display_order`, `is_active`) VALUES
('Khách sạn', 'khach-san', 'Các khách sạn, resort tại Vĩnh Long', 1, TRUE),
('Nhà hàng', 'nha-hang', 'Các nhà hàng, quán ăn ở Vĩnh Long', 2, TRUE),
('Điểm tham quan', 'diem-tham-quan', 'Các điểm du lịch nổi tiếng', 3, TRUE),
('Mua sắm', 'mua-sam', 'Các trung tâm thương mại, chợ', 4, TRUE),
('Dịch vụ', 'dich-vu', 'Các dịch vụ du lịch, vận chuyển', 5, TRUE);

-- Insert sample amenities
INSERT INTO `amenities` (`name`, `icon`, `display_order`) VALUES
('Wi-Fi miễn phí', 'fa-wifi', 1),
('Bồn tắm nước nóng', 'fa-bath', 2),
('Nhà hàng', 'fa-utensils', 3),
('Dịch vụ phòng', 'fa-bell', 4),
('Hồ bơi', 'fa-water', 5),
('Phòng gym', 'fa-dumbbell', 6),
('Đỗ xe miễn phí', 'fa-car', 7),
('Thang máy', 'fa-elevator', 8);

-- Insert sample listings
INSERT INTO `listings` (`category_id`, `name`, `slug`, `description`, `address`, `phone`, `email`, `latitude`, `longitude`, `price_from`, `price_to`, `rating`, `review_count`, `is_featured`, `is_active`) VALUES
(1, 'KHÁCH SẠN VĂN TRẠNG', 'khach-san-van-trang', 'Khách sạn 3 sao nằm tại vị trí đắc địa', 'Số 45, Đường Hai Bà Trưng, TP. Vĩnh Long', '[Chưa cập nhật]', '[Chưa cập nhật]', 10.25698, 106.37907, 450000, 600000, 4.5, 24, TRUE, TRUE),
(1, 'KHÁCH SẠN CỬU LONG A', 'khach-san-cuu-long-a', 'Khách sạn tiện nghi gần trung tâm thành phố', 'Số 78, Đường Nguyễn Huệ, TP. Vĩnh Long', '[Chưa cập nhật]', '[Chưa cập nhật]', 10.25897, 106.38107, 380000, 500000, 4.2, 18, TRUE, TRUE),
(1, 'COCO RIVERSIDE LODGE', 'coco-riverside-lodge', 'Resort sang trọng bên bờ sông Cửu Long', 'Xã Tân Phú, Huyện Vĩnh Long', '[Chưa cập nhật]', '[Chưa cập nhật]', 10.27500, 106.40000, 800000, 1200000, 4.8, 42, TRUE, TRUE),
(1, 'KHÁCH SẠN KHỞI HOA', 'khach-san-khoi-hoa', 'Khách sạn bình dân với dịch vụ tốt', 'Số 120, Đường 3 Tháng 2, TP. Vĩnh Long', '[Chưa cập nhật]', '[Chưa cập nhật]', 10.25798, 106.38207, 300000, 450000, 3.9, 12, FALSE, TRUE);

-- Insert sample places
INSERT INTO `places` (`name`, `slug`, `description`, `latitude`, `longitude`, `opening_hours`, `admission_fee`, `is_active`) VALUES
('Chợ nổi Cái Bè', 'cho-noi-cai-be', 'Chợ nổi truyền thống trên sông Cửu Long', 10.24800, 106.48500, '04:00 - 10:00', 0, TRUE),
('Vườn Trái cây Cà Mau Thơm', 'vuon-trai-cay-ca-mau-thom', 'Vườn trái cây sinh thái du lịch', 10.28000, 106.42000, '08:00 - 18:00', 50000, TRUE),
('Nhà thờ Vĩnh Long', 'nha-tho-vinh-long', 'Nhà thờ Công giáo lâu đời', 10.25698, 106.37907, '06:00 - 22:00', 0, TRUE),
('Bảo tàng Vĩnh Long', 'bao-tang-vinh-long', 'Bảo tàng lịch sử và văn hóa', 10.25700, 106.38000, '09:00 - 17:00', 20000, TRUE);

-- ==================== VIEWS ==================== --

-- View: Top Rated Listings
CREATE OR REPLACE VIEW `vw_top_rated_listings` AS
SELECT 
    l.id, l.name, l.category_id, c.name as category_name,
    l.rating, l.review_count, l.price_from, l.image_main
FROM listings l
JOIN categories c ON l.category_id = c.id
WHERE l.is_active = TRUE AND l.rating >= 4.0
ORDER BY l.rating DESC
LIMIT 10;

-- View: Featured Listings
CREATE OR REPLACE VIEW `vw_featured_listings` AS
SELECT 
    l.id, l.name, l.slug, l.category_id, c.name as category_name,
    l.description, l.rating, l.review_count, l.image_main
FROM listings l
JOIN categories c ON l.category_id = c.id
WHERE l.is_active = TRUE AND l.is_featured = TRUE
ORDER BY l.created_at DESC;

-- ==================== INDEXES FOR PERFORMANCE ==================== --

-- Additional indexes for frequently searched fields
CREATE INDEX idx_listings_featured ON listings(is_featured, is_active);
CREATE INDEX idx_listings_rating_active ON listings(rating DESC, is_active);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_reviews_listing_published ON reviews(listing_id, is_published);

-- ==================== STORED PROCEDURES ==================== --

DELIMITER //

-- Get average rating for a listing
CREATE PROCEDURE `sp_get_listing_rating`(IN listing_id INT, OUT avg_rating DECIMAL(3,2), OUT total_reviews INT)
BEGIN
    SELECT AVG(rating), COUNT(*) INTO avg_rating, total_reviews
    FROM reviews
    WHERE listing_id = listing_id AND is_published = TRUE;
END //

-- Search listings
CREATE PROCEDURE `sp_search_listings`(IN search_query VARCHAR(255), IN category_filter INT)
BEGIN
    SELECT l.id, l.name, l.slug, l.rating, l.review_count, l.price_from, c.name as category
    FROM listings l
    JOIN categories c ON l.category_id = c.id
    WHERE l.is_active = TRUE 
    AND (
        MATCH(l.name, l.description) AGAINST(search_query IN BOOLEAN MODE)
        OR l.name LIKE CONCAT('%', search_query, '%')
    )
    AND (category_filter = 0 OR l.category_id = category_filter)
    ORDER BY l.rating DESC, l.review_count DESC;
END //

DELIMITER ;
