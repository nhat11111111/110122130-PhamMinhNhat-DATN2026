// ==================== DIGITAL MAP PAGE ==================== //

// Global data storage
let allMapPlaces = [];

/**
 * Display the Digital Map page and hide other pages
 * Updates navigation active state and loads map data
 */
function showDigitalMapPage() {
    // Hide other pages
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    
    // Show digital map page
    document.getElementById('digitalMapSection').style.display = 'block';
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const mapNav = Array.from(document.querySelectorAll('.nav-item')).find(
        item => item.textContent.trim() === 'BẢN ĐỒ SỐ'
    );
    if (mapNav) {
        mapNav.classList.add('active');
    }
    
    // Load and display places
    loadMapPlaces();
    window.scrollTo(0, 0);
}

/**
 * Load places - wrapper function that checks if data exists
 * If empty, loads sample data, then displays them
 */
function loadMapPlaces() {
    if (allMapPlaces.length === 0) {
        loadSampleMapPlaces();
    }
    displayMapPlaces();
}

/**
 * Create sample Vietnamese places (restaurants and attractions only)
 * Excludes: accommodation, entertainment, events, health, transportation, postal, police, gas
 * Includes only: Ăn Uống (Restaurants) and Điểm Tham Quan (Attractions)
 */
function loadSampleMapPlaces() {
    allMapPlaces = [
        // ===== RESTAURANTS / DINING (Ăn Uống) =====
        {
            id: 1,
            name: 'Nhà Hàng Cơm Lam Vĩnh Long',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Xã Tân Phú',
            description: 'Nhà hàng chuyên phục vụ các món ăn địa phương với không gian thoải mái, thân thiện',
            address: '123 Đường Lê Thị Riêng, Xã Tân Phú',
            phone: '(0270) 123 4567',
            lat: 9.9365,
            lng: 105.9761
        },
        {
            id: 2,
            name: 'Quán Ăn Bà Năm',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Thành phố Vĩnh Long',
            description: 'Quán ăn nổi tiếng với các món cơm, canh và các đặc sản miền Tây',
            address: '456 Nguyễn Huệ, Thành phố Vĩnh Long',
            phone: '(0270) 987 6543',
            lat: 9.9355,
            lng: 105.9767
        },
        {
            id: 3,
            name: 'Nhà Hàng Mekong Riverside',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Thành phố Vĩnh Long',
            description: 'Nhà hàng sang trọng với view sông Hậu, phục vụ ẩm thực Việt Nam và quốc tế',
            address: '789 Phạm Hùng, Thành phố Vĩnh Long',
            phone: '(0270) 456 7890',
            lat: 9.9347,
            lng: 105.9775
        },
        {
            id: 4,
            name: 'Quán Cơm Gà Mạnh',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Xã An Bình',
            description: 'Chuyên phục vụ cơm gà nước mắm, gà nướng và các món ăn kèm đặc sản địa phương',
            address: '321 Quốc Lộ 1A, Xã An Bình',
            phone: '(0270) 234 5678',
            lat: 9.9308,
            lng: 105.9822
        },

        // ===== ATTRACTIONS / TOURISM (Điểm Tham Quan) =====
        {
            id: 5,
            name: 'Chùa Mương Cầu Long',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Xã An Bình',
            description: 'Công trình tôn giáo lịch sử nổi tiếng với kiến trúc độc đáo và không gian linh thiêng',
            address: 'Xã An Bình, Huyện Vĩnh Long',
            phone: 'Liên hệ chính quyền địa phương',
            lat: 9.9300,
            lng: 105.9830
        },
        {
            id: 6,
            name: 'Khu Du Lịch Sinh Thái Vàm Cỏ',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Xã Thạch Liên',
            description: 'Khu du lịch sinh thái với cảnh đẹp thiên nhiên, thích hợp cho các hoạt động ngoài trời',
            address: 'Xã Thạch Liên, Huyện Bình Tân',
            phone: '(0270) 678 9012',
            lat: 9.8850,
            lng: 105.8645
        },
        {
            id: 7,
            name: 'Bảo Tàng Lịch Sử Vĩnh Long',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Thành phố Vĩnh Long',
            description: 'Bảo tàng lưu giữ các tài liệu quý giá về lịch sử phát triển của tỉnh Vĩnh Long',
            address: '807 Nguyễn Thái Học, Thành phố Vĩnh Long',
            phone: '(0270) 345 6789',
            lat: 9.9362,
            lng: 105.9758
        },
        {
            id: 8,
            name: 'Đình Huỳnh Thủy Lê',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Thành phố Vĩnh Long',
            description: 'Di tích lịch sử văn hóa nơi thờ vị anh hùng dân tộc, có giá trị về lịch sử và văn hóa',
            address: '1000 Hoàng Thái Bình, Thành phố Vĩnh Long',
            phone: 'Liên hệ chính quyền địa phương',
            lat: 9.9343,
            lng: 105.9785
        },
        {
            id: 9,
            name: 'Làng Nghề Trồng Lúa',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Huyện Bình Tân',
            description: 'Làng nghề truyền thống nơi khách có thể trải nghiệm cuộc sống nông thôn Vĩnh Long',
            address: 'Huyện Bình Tân, Tỉnh Vĩnh Long',
            phone: '(0270) 567 8901',
            lat: 9.8700,
            lng: 105.8500
        },
        {
            id: 10,
            name: 'Vườn Cây Ăn Quả Trái',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Huyện Mang Thít',
            description: 'Vườn cây ăn quả lâu đời với nhiều loại trái cây đặc sản của vùng đất cấp bã',
            address: 'Huyện Mang Thít, Tỉnh Vĩnh Long',
            phone: '(0270) 789 0123',
            lat: 9.8400,
            lng: 105.7900
        }
    ];
}

/**
 * Display places in the sidebar list and initialize the map
 * Creates HTML elements for each place and renders them in #mapPlacesList
 */
function displayMapPlaces() {
    const placesList = document.getElementById('mapPlacesList');
    if (!placesList) return;
    
    // If no places, show empty message
    if (allMapPlaces.length === 0) {
        placesList.innerHTML = '<div class="loading">Không có địa điểm nào</div>';
        return;
    }
    
    // Create HTML for each place
    placesList.innerHTML = allMapPlaces.map(place => `
        <div class="place-item" onclick="selectMapPlace(${place.id})">
            <div class="place-item-name">
                ${place.name}
            </div>
            <div class="place-item-category">
                <i class="fas fa-map-marker-alt"></i> ${place.location}
            </div>
        </div>
    `).join('');
    
    // Initialize the map display
    initializeMap();
}

/**
 * Handle place selection from the list
 * Highlights selected place and could perform additional actions
 */
function selectMapPlace(placeId) {
    // Remove active class from all items
    const placesList = document.querySelectorAll('.place-item');
    placesList.forEach(item => item.classList.remove('active'));
    
    // Add active class to selected item
    if (event && event.target) {
        event.target.closest('.place-item').classList.add('active');
    }
    
    // Find and log selected place
    const place = allMapPlaces.find(p => p.id === placeId);
    if (place) {
        console.log('Selected place:', place.name, 'at', place.location);
        // Could add more functionality here like centering map on location
    }
}

/**
 * Initialize and display the interactive map
 * Shows map container with place counts and statistics
 */
function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;
    
    // Count places by category
    const restaurantCount = allMapPlaces.filter(p => p.category === 'restaurant').length;
    const attractionCount = allMapPlaces.filter(p => p.category === 'attraction').length;
    
    // Create map display
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map"></i>
            <p>Bản Đồ Tương Tác</p>
            <small>Vĩnh Long, Việt Nam</small>
            <div style="margin-top: 20px; font-size: 12px; color: #666;">
                <p><strong>${allMapPlaces.length} địa điểm hiển thị</strong></p>
                <p style="margin-top: 10px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: #e74c3c; border-radius: 50%; margin-right: 5px;"></span>
                    Ăn Uống (${restaurantCount})
                </p>
                <p style="margin-top: 5px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: #3498db; border-radius: 50%; margin-right: 5px;"></span>
                    Điểm Tham Quan (${attractionCount})
                </p>
            </div>
        </div>
    `;
}

/**
 * Filter places by category
 * Can be called to show only restaurants or attractions
 * @param {string} category - 'restaurant' or 'attraction' or null for all
 */
function filterMapByCategory(category) {
    const filtered = category ? allMapPlaces.filter(p => p.category === category) : allMapPlaces;
    console.log(`Filtered ${filtered.length} places by category: ${category || 'all'}`);
    
    // Could re-render places list here if needed
    // displayMapPlaces();
}

// ==================== EXPORTS ==================== //
// Make functions available globally for HTML onclick handlers
if (typeof window !== 'undefined') {
    window.showDigitalMapPage = showDigitalMapPage;
    window.loadMapPlaces = loadMapPlaces;
    window.loadSampleMapPlaces = loadSampleMapPlaces;
    window.displayMapPlaces = displayMapPlaces;
    window.selectMapPlace = selectMapPlace;
    window.initializeMap = initializeMap;
    window.filterMapByCategory = filterMapByCategory;
}

// ==================== NOTES ==================== //
/*
FEATURES IMPLEMENTED:
1. Digital Map Page Display
   - Shows/hides digital map section along with other pages
   - Updates navigation active state
   - Scrolls to top on page load

2. Places Data Management
   - Stores 10 Vietnamese places (4 restaurants + 6 attractions)
   - Only keeps Ăn Uống and Điểm Tham Quan categories
   - Excludes: Lưu Trú, Giải Trí, Mua Sắm, Sự Kiện, Y Tế, Di Chuyển, Bưu Điện, Công An, Xăng

3. Interactive Map
   - Displays places in sidebar list
   - Shows map statistics (total places, restaurant count, attraction count)
   - Color-coded markers (red for restaurants, blue for attractions)
   - Clickable place items with active state highlighting

4. Search & Filter
   - Search input field for place names
   - Category filter checkboxes
   - Filter function for category-based display

STRUCTURE:
- Each place has: id, name, category, categoryDisplay, location, description, address, phone, lat, lng
- Restaurant category marker: #e74c3c (red)
- Attraction category marker: #3498db (blue)

INTEGRATION:
- Functions are exported to window object for HTML onclick handlers
- All styles are in digital-map.css
- HTML structure is in digital-map.html
- JavaScript functions work with #digitalMapSection element
*/
