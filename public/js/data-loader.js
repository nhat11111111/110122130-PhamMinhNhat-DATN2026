/**
 * Frontend Data Loader - Load dữ liệu từ API
 * File này chứa ví dụ của cách load dữ liệu từ database
 * và render lên trang chủ
 */

/**
 * Load dữ liệu danh mục từ API
 */
async function loadCategories() {
    try {
        const response = await getCategories();
        
        if (response.success && response.data) {
            console.log('Danh mục:', response.data);
            renderCategories(response.data);
            return response.data;
        } else {
            console.error('Lỗi load danh mục:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return [];
    }
}

/**
 * Load danh sách quán ăn từ API
 */
async function loadPlaces(params = {}) {
    try {
        const response = await getPlaces(params);
        
        if (response.success && response.data) {
            console.log('Quán ăn:', response.data);
            renderPlaces(response.data);
            return response.data;
        } else {
            console.error('Lỗi load quán ăn:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return [];
    }
}

/**
 * Load danh sách bài viết từ API
 */
async function loadArticles(params = {}) {
    try {
        const response = await getArticles(params);
        
        if (response.success && response.data) {
            console.log('Bài viết:', response.data);
            renderArticles(response.data);
            return response.data;
        } else {
            console.error('Lỗi load bài viết:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return [];
    }
}

/**
 * Load danh sách khách sạn từ API
 */
async function loadAccommodations(params = {}) {
    try {
        const response = await getAccommodations(params);
        
        if (response.success && response.data) {
            console.log('Khách sạn:', response.data);
            renderAccommodations(response.data);
            return response.data;
        } else {
            console.error('Lỗi load khách sạn:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return [];
    }
}

/**
 * Render danh mục lên trang
 */
function renderCategories(categories) {
    const container = document.getElementById('categories-container');
    if (!container) return;
    
    let html = '';
    categories.forEach(category => {
        html += `
            <div class="category-item" data-id="${category.id}">
                <i class="fas ${category.icon || 'fa-folder'}"></i>
                <h4>${category.name}</h4>
                <p>${category.description || ''}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Render quán ăn lên trang
 */
function renderPlaces(places) {
    const container = document.getElementById('places-grid') || 
                     document.getElementById('homeNewsGrid') ||
                     document.querySelector('.places-container');
    
    if (!container) {
        console.log('Container không tìm thấy, lưu dữ liệu để dùng sau');
        return;
    }
    
    let html = '';
    places.forEach(place => {
        const image = place.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(place.name);
        html += `
            <div class="place-card" data-id="${place.id}">
                <div class="place-image">
                    <img src="${image}" alt="${place.name}" loading="lazy">
                    <div class="place-rating">
                        <i class="fas fa-star"></i> ${place.rating || 0}
                    </div>
                </div>
                <div class="place-info">
                    <h3>${place.name}</h3>
                    <p class="place-description">${place.description || ''}</p>
                    <p class="place-address">
                        <i class="fas fa-map-marker-alt"></i> ${place.address}
                    </p>
                    <p class="place-contact">
                        <i class="fas fa-phone"></i> ${place.phone || 'N/A'}
                    </p>
                    <button class="btn-view" onclick="viewPlace(${place.id})">Xem Chi Tiết</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p class="no-data">Không có dữ liệu</p>';
}

/**
 * Render bài viết lên trang
 */
function renderArticles(articles) {
    const container = document.getElementById('articles-container') || 
                     document.getElementById('homeNewsGrid') ||
                     document.querySelector('.articles-container');
    
    if (!container) return;
    
    let html = '';
    articles.forEach(article => {
        const image = article.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(article.title);
        html += `
            <div class="article-card" data-id="${article.id}">
                <div class="article-image">
                    <img src="${image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p class="article-excerpt">${article.content.substring(0, 100)}...</p>
                    <p class="article-meta">
                        <small><i class="fas fa-calendar"></i> ${new Date(article.created_at).toLocaleDateString('vi-VN')}</small>
                        <small><i class="fas fa-eye"></i> ${article.views} lượt xem</small>
                    </p>
                    <button class="btn-read" onclick="viewArticle(${article.id})">Đọc Tiếp</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p class="no-data">Không có bài viết</p>';
}

/**
 * Render khách sạn lên trang
 */
function renderAccommodations(accommodations) {
    const container = document.getElementById('accommodations-container') ||
                     document.querySelector('.accommodations-container');
    
    if (!container) return;
    
    let html = '';
    accommodations.forEach(acc => {
        const image = acc.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(acc.name);
        html += `
            <div class="accommodation-card" data-id="${acc.id}">
                <div class="acc-image">
                    <img src="${image}" alt="${acc.name}" loading="lazy">
                    <div class="acc-rating">
                        <i class="fas fa-star"></i> ${acc.rating || 0}
                    </div>
                    <div class="acc-price">
                        ${acc.price_per_night.toLocaleString('vi-VN')}đ/đêm
                    </div>
                </div>
                <div class="acc-info">
                    <h3>${acc.name}</h3>
                    <p class="acc-description">${acc.description || ''}</p>
                    <p class="acc-details">
                        <span><i class="fas fa-bed"></i> ${acc.rooms} phòng</span>
                    </p>
                    <p class="acc-address">
                        <i class="fas fa-map-marker-alt"></i> ${acc.address}
                    </p>
                    <button class="btn-book" onclick="viewAccommodation(${acc.id})">Xem Phòng</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p class="no-data">Không có khách sạn</p>';
}

/**
 * Tìm kiếm quán ăn
 */
async function searchPlaces(searchTerm) {
    if (searchTerm.trim() === '') {
        await loadPlaces();
    } else {
        await loadPlaces({ search: searchTerm });
    }
}

/**
 * Lọc quán ăn theo danh mục
 */
async function filterPlacesByCategory(categoryId) {
    if (categoryId === 'all' || categoryId === '') {
        await loadPlaces();
    } else {
        await loadPlaces({ category_id: categoryId });
    }
}

/**
 * Lọc khách sạn theo giá
 */
async function filterAccommodationsByPrice(minPrice, maxPrice) {
    const params = {};
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    
    await loadAccommodations(params);
}

/**
 * Lọc khách sạn theo rating
 */
async function filterAccommodationsByRating(minRating) {
    if (minRating) {
        await loadAccommodations({ min_rating: minRating });
    } else {
        await loadAccommodations();
    }
}

/**
 * Xem chi tiết quán ăn
 */
async function viewPlace(placeId) {
    try {
        const response = await getPlace(placeId);
        if (response.success) {
            console.log('Chi tiết quán ăn:', response.data);
            // TODO: Mở modal hoặc trang chi tiết
            alert(`Quán: ${response.data.name}\n${response.data.description}`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

/**
 * Xem chi tiết bài viết
 */
async function viewArticle(articleId) {
    try {
        const response = await getArticle(articleId);
        if (response.success) {
            console.log('Chi tiết bài viết:', response.data);
            // TODO: Chuyển hướng tới trang bài viết
            alert(`Bài viết: ${response.data.title}\n${response.data.content.substring(0, 100)}...`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

/**
 * Xem chi tiết khách sạn
 */
async function viewAccommodation(accommodationId) {
    try {
        const response = await getAccommodation(accommodationId);
        if (response.success) {
            console.log('Chi tiết khách sạn:', response.data);
            // TODO: Mở modal hoặc trang chi tiết
            alert(`Khách sạn: ${response.data.name}\n${response.data.price_per_night.toLocaleString('vi-VN')}đ/đêm`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

/**
 * Kiểm tra trạng thái API
 */
async function checkAPI() {
    try {
        const response = await checkApiHealth();
        console.log('API Status:', response);
        return response.success;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}

/**
 * Load tất cả dữ liệu trang chủ
 */
async function loadHomePageData() {
    console.log('Loading home page data...');
    
    // Kiểm tra API
    const apiAvailable = await checkAPI();
    if (!apiAvailable) {
        console.warn('API không khả dụng, sử dụng dữ liệu mặc định');
        return;
    }
    
    // Load tất cả dữ liệu
    await Promise.all([
        loadCategories(),
        loadPlaces(),
        loadArticles({ status: 'published' }),
        loadAccommodations()
    ]);
    
    console.log('Home page data loaded successfully!');
}

/**
 * Load dữ liệu khi trang được load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, loading data from API...');
    loadHomePageData();
});

/**
 * Refresh dữ liệu mỗi 30 giây (tùy chọn)
 */
// setInterval(loadHomePageData, 30000);
