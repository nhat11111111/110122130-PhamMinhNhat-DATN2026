<?php

/**
 * Vinh Long Tourist - Main Web Controller
 * Handles serving the main website pages
 */

class WebController {
    
    /**
     * Render the homepage
     */
    public static function home() {
        // Get any necessary data from database or APIs
        $pageTitle = 'Vinh Long Tourist - Du lịch Vĩnh Long';
        $pageDescription = 'Khám phá du lịch Vĩnh Long - Nơi quy tụ những điểm tham quan, khách sạn, nhà hàng hấp dẫn';
        
        // Load homepage view
        self::loadView('home', [
            'title' => $pageTitle,
            'description' => $pageDescription
        ]);
    }

    /**
     * Render a view
     */
    private static function loadView($view, $data = []) {
        extract($data);
        include dirname(__FILE__) . '/views/' . $view . '.php';
    }

    /**
     * Render error page
     */
    public static function notFound() {
        http_response_code(404);
        echo '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>404 - Trang không tìm thấy</title>
            <style>
                body { font-family: Arial; text-align: center; padding: 50px; }
                h1 { color: #d4854c; }
                p { color: #666; font-size: 16px; }
                a { color: #003a7a; text-decoration: none; }
            </style>
        </head>
        <body>
            <h1>404 - Trang không tìm thấy</h1>
            <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
            <p><a href="/">Quay lại trang chủ</a></p>
        </body>
        </html>';
    }
}

// ==================== SIMPLE ROUTING ==================== //

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove base path if needed
$path = str_replace('/index.php', '', $path);

// Route handler
if ($path === '/' || $path === '') {
    WebController::home();
} elseif ($path === '/api/status') {
    // For API requests, redirect to api.php
    require 'api.php';
} else {
    WebController::notFound();
}

?>
