/**
 * API Service - Xử lý tất cả các gọi API
 * Base URL: http://localhost:8000/api
 */

const API_BASE_URL = 'http://localhost:8000/api';

// ===== UTILITY FUNCTIONS =====

/**
 * Gọi API với phương thức GET
 * @param {string} endpoint - Đường dẫn API (vd: /users, /places/1)
 * @param {object} params - Query parameters
 * @returns {Promise}
 */
async function apiGet(endpoint, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${API_BASE_URL}${endpoint}?${queryString}` : `${API_BASE_URL}${endpoint}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('API GET Error:', error);
        return { success: false, message: 'Lỗi kết nối' };
    }
}

/**
 * Gọi API với phương thức POST
 * @param {string} endpoint - Đường dẫn API
 * @param {object} data - Dữ liệu gửi đi
 * @returns {Promise}
 */
async function apiPost(endpoint, data = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        return await response.json();
    } catch (error) {
        console.error('API POST Error:', error);
        return { success: false, message: 'Lỗi kết nối' };
    }
}

/**
 * Gọi API với phương thức PUT
 * @param {string} endpoint - Đường dẫn API
 * @param {object} data - Dữ liệu cập nhật
 * @returns {Promise}
 */
async function apiPut(endpoint, data = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        return await response.json();
    } catch (error) {
        console.error('API PUT Error:', error);
        return { success: false, message: 'Lỗi kết nối' };
    }
}

/**
 * Gọi API với phương thức DELETE
 * @param {string} endpoint - Đường dẫn API
 * @returns {Promise}
 */
async function apiDelete(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('API DELETE Error:', error);
        return { success: false, message: 'Lỗi kết nối' };
    }
}

// ===== USERS API =====

/**
 * Lấy danh sách tất cả người dùng
 * GET /api/users
 */
async function getUsers() {
    return await apiGet('/users');
}

/**
 * Lấy chi tiết một người dùng
 * GET /api/users/{id}
 */
async function getUser(id) {
    return await apiGet(`/users/${id}`);
}

/**
 * Tạo người dùng mới
 * POST /api/users
 */
async function createUser(userData) {
    return await apiPost('/users', userData);
}

/**
 * Cập nhật người dùng
 * PUT /api/users/{id}
 */
async function updateUser(id, userData) {
    return await apiPut(`/users/${id}`, userData);
}

/**
 * Xóa người dùng
 * DELETE /api/users/{id}
 */
async function deleteUser(id) {
    return await apiDelete(`/users/${id}`);
}

// ===== CATEGORIES API =====

/**
 * Lấy danh sách tất cả danh mục
 * GET /api/categories
 */
async function getCategories() {
    return await apiGet('/categories');
}

/**
 * Lấy chi tiết một danh mục
 * GET /api/categories/{id}
 */
async function getCategory(id) {
    return await apiGet(`/categories/${id}`);
}

/**
 * Tạo danh mục mới
 * POST /api/categories
 */
async function createCategory(categoryData) {
    return await apiPost('/categories', categoryData);
}

/**
 * Cập nhật danh mục
 * PUT /api/categories/{id}
 */
async function updateCategory(id, categoryData) {
    return await apiPut(`/categories/${id}`, categoryData);
}

/**
 * Xóa danh mục
 * DELETE /api/categories/{id}
 */
async function deleteCategory(id) {
    return await apiDelete(`/categories/${id}`);
}

// ===== PLACES API =====

/**
 * Lấy danh sách quán ăn
 * GET /api/places?category_id=1&search=cơm
 */
async function getPlaces(params = {}) {
    return await apiGet('/places', params);
}

/**
 * Lấy chi tiết một quán ăn
 * GET /api/places/{id}
 */
async function getPlace(id) {
    return await apiGet(`/places/${id}`);
}

/**
 * Tạo quán ăn mới
 * POST /api/places
 */
async function createPlace(placeData) {
    return await apiPost('/places', placeData);
}

/**
 * Cập nhật quán ăn
 * PUT /api/places/{id}
 */
async function updatePlace(id, placeData) {
    return await apiPut(`/places/${id}`, placeData);
}

/**
 * Xóa quán ăn
 * DELETE /api/places/{id}
 */
async function deletePlace(id) {
    return await apiDelete(`/places/${id}`);
}

// ===== ARTICLES API =====

/**
 * Lấy danh sách bài viết
 * GET /api/articles?category_id=1&status=published
 */
async function getArticles(params = {}) {
    return await apiGet('/articles', params);
}

/**
 * Lấy chi tiết một bài viết
 * GET /api/articles/{id}
 */
async function getArticle(id) {
    return await apiGet(`/articles/${id}`);
}

/**
 * Tạo bài viết mới
 * POST /api/articles
 */
async function createArticle(articleData) {
    return await apiPost('/articles', articleData);
}

/**
 * Cập nhật bài viết
 * PUT /api/articles/{id}
 */
async function updateArticle(id, articleData) {
    return await apiPut(`/articles/${id}`, articleData);
}

/**
 * Xóa bài viết
 * DELETE /api/articles/{id}
 */
async function deleteArticle(id) {
    return await apiDelete(`/articles/${id}`);
}

// ===== ACCOMMODATIONS API =====

/**
 * Lấy danh sách khách sạn
 * GET /api/accommodations?min_price=100000&max_price=1000000&min_rating=3
 */
async function getAccommodations(params = {}) {
    return await apiGet('/accommodations', params);
}

/**
 * Lấy chi tiết một khách sạn
 * GET /api/accommodations/{id}
 */
async function getAccommodation(id) {
    return await apiGet(`/accommodations/${id}`);
}

/**
 * Tạo khách sạn mới
 * POST /api/accommodations
 */
async function createAccommodation(accommodationData) {
    return await apiPost('/accommodations', accommodationData);
}

/**
 * Cập nhật khách sạn
 * PUT /api/accommodations/{id}
 */
async function updateAccommodation(id, accommodationData) {
    return await apiPut(`/accommodations/${id}`, accommodationData);
}

/**
 * Xóa khách sạn
 * DELETE /api/accommodations/{id}
 */
async function deleteAccommodation(id) {
    return await apiDelete(`/accommodations/${id}`);
}

// ===== HEALTH CHECK =====

/**
 * Kiểm tra trạng thái API
 * GET /api/health
 */
async function checkApiHealth() {
    return await apiGet('/health');
}

// Export functions (nếu dùng ES6 modules)
// export { getPlaces, getArticles, getAccommodations, ... }
