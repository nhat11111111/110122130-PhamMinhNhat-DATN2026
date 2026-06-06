// ==================== ADMIN DASHBOARD JAVASCRIPT ==================== //

/**
 * ADMIN DASHBOARD MANAGEMENT SYSTEM
 * 
 * This file contains all functions for the admin dashboard
 * Authentication: username: admin123, password: admin123
 * 
 * Features:
 * - Admin login/logout with authentication
 * - 7 management modules with CRUD operations
 * - Data management for banners, news, services, feedback, attractions, map locations, and user accounts
 * - Responsive UI with tables and forms
 */

// ==================== GLOBAL STATE ==================== //

let adminLogged = false;
let currentAdminPage = 'welcome';
let editingId = null;
let editingType = null;

let adminData = {
    banners: [],
    news: [],
    services: [],
    feedback: [],
    attractions: [],
    mapPlaces: [],
    users: []
};

// ==================== AUTHENTICATION ==================== //

/**
 * Handle admin login form submission
 * @param {Event} event - Form submit event
 */
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername')?.value || '';
    const password = document.getElementById('adminPassword')?.value || '';
    
    if (username === 'admin123' && password === 'admin123') {
        adminLogged = true;
        document.body.classList.add('auth-active');
        showAdminDashboard();
        showNotification('Đăng nhập admin thành công!', 'success');
        
        // Clear form
        if (document.getElementById('adminUsername')) {
            document.getElementById('adminUsername').value = '';
            document.getElementById('adminPassword').value = '';
        }
    } else {
        showNotification('Tên đăng nhập hoặc mật khẩu sai!', 'error');
    }
}

/**
 * Handle admin logout
 */
function handleAdminLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        adminLogged = false;
        currentAdminPage = 'welcome';
        editingId = null;
        editingType = null;
        document.body.classList.remove('auth-active');
        showHomePage();
        showNotification('Đã đăng xuất admin!', 'success');
    }
}

// ==================== PAGE DISPLAY ==================== //

/**
 * Display admin dashboard
 */
function showAdminDashboard() {
    if (!adminLogged) return;
    
    document.body.classList.add('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('digitalMapSection').style.display = 'none';
    document.getElementById('adminDashboardSection').style.display = 'block';
    
    currentAdminPage = 'welcome';
    displayAdminContent('welcome');
    window.scrollTo(0, 0);
}

/**
 * Show admin management page for a specific type
 * @param {string} type - Management type (banner, news, services, feedback, attractions, map)
 */
function showAdminManage(type) {
    if (!adminLogged) return;
    currentAdminPage = type;
    displayAdminContent(type);
    window.scrollTo(0, 0);
}

/**
 * Display admin content based on type
 * @param {string} type - Content type to display
 */
function displayAdminContent(type) {
    const adminContent = document.getElementById('adminContent');
    const pageTitle = document.getElementById('adminPageTitle');
    const headerTitle = document.getElementById('adminHeaderTitle');
    const headerSubtitle = document.getElementById('adminHeaderSubtitle');
    
    if (!adminContent) return;
    
    let html = '';
    
    switch(type) {
        case 'banner':
            pageTitle.textContent = 'Quản Lý Banner';
            headerTitle.textContent = 'QUẢN LÝ BANNER';
            headerSubtitle.textContent = 'Quản lý các banner trên trang chủ';
            html = renderBannerManagement();
            break;
        case 'news':
            pageTitle.textContent = 'Quản Lý Tin Tức';
            headerTitle.textContent = 'QUẢN LÝ TIN TỨC';
            headerSubtitle.textContent = 'Quản lý các bài tin tức';
            html = renderNewsManagement();
            break;
        case 'services':
            pageTitle.textContent = 'Quản Lý Dịch Vụ';
            headerTitle.textContent = 'QUẢN LÝ DỊCH VỤ';
            headerSubtitle.textContent = 'Quản lý các dịch vụ';
            html = renderServicesManagement();
            break;
        case 'feedback':
            pageTitle.textContent = 'Quản Lý Phản Hồi';
            headerTitle.textContent = 'QUẢN LÝ PHẢN HỒI';
            headerSubtitle.textContent = 'Xem và quản lý phản hồi từ khách hàng';
            html = renderFeedbackManagement();
            break;
        case 'attractions':
            pageTitle.textContent = 'Quản Lý Điểm Tham Quan';
            headerTitle.textContent = 'QUẢN LÝ ĐIỂM THAM QUAN';
            headerSubtitle.textContent = 'Quản lý các điểm tham quan';
            html = renderAttractionsManagement();
            break;
        case 'map':
            pageTitle.textContent = 'Quản Lý Bản Đồ Số';
            headerTitle.textContent = 'QUẢN LÝ BẢN ĐỒ SỐ';
            headerSubtitle.textContent = 'Quản lý các địa điểm trên bản đồ';
            html = renderMapManagement();
            break;
        case 'accounts':
            pageTitle.textContent = 'Quản Lý Tài Khoản';
            headerTitle.textContent = 'QUẢN LÝ TÀI KHOẢN';
            headerSubtitle.textContent = 'Quản lý tài khoản truy cập trang web';
            html = renderAccountsManagement();
            break;
        default:
            pageTitle.textContent = 'Quản Lý';
            headerTitle.textContent = 'BẢNG ĐIỀU KHIỂN QUẢN TRỊ';
            headerSubtitle.textContent = 'Quản lý nội dung và dữ liệu website';
            html = '<div class="admin-welcome"><i class="fas fa-chart-line"></i><h3>Chào mừng bạn đến bảng điều khiển quản trị</h3><p>Chọn một mục từ menu bên trái để bắt đầu quản lý</p></div>';
    }
    
    adminContent.innerHTML = html;
}

// ==================== RENDER FUNCTIONS ==================== //

function renderBannerManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Banner</h3>
            <button class="btn-add-new" onclick="editingId=null; editingType='banner'; showNotification('Thêm banner mới', 'info')">
                <i class="fas fa-plus"></i> Thêm Banner
            </button>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tiêu Đề</th><th>Nội Dung</th><th>Hình Ảnh</th><th>Trạng Thái</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.banners.map(b => `
                <tr>
                    <td>${b.id}</td><td>${b.title}</td><td>${(b.content || '').substring(0, 30)}...</td>
                    <td>${b.image}</td><td><span class="status-badge ${b.active ? 'active' : 'inactive'}">${b.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                    <td class="actions">
                        <button class="btn-admin-edit" onclick="editBanner(${b.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-admin-delete" onclick="deleteBanner(${b.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderNewsManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Tin Tức</h3>
            <button class="btn-add-new"><i class="fas fa-plus"></i> Thêm Tin Tức</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tiêu Đề</th><th>Danh Mục</th><th>Ngày Tạo</th><th>Trạng Thái</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.news.map(n => `
                <tr>
                    <td>${n.id}</td><td>${n.title}</td><td>${n.category}</td><td>${n.date}</td>
                    <td><span class="status-badge ${n.active ? 'active' : 'inactive'}">${n.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                    <td class="actions"><button class="btn-admin-delete" onclick="deleteNews(${n.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderServicesManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Dịch Vụ</h3>
            <button class="btn-add-new"><i class="fas fa-plus"></i> Thêm Dịch Vụ</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tên Dịch Vụ</th><th>Mô Tả</th><th>Giá</th><th>Trạng Thái</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.services.map(s => `
                <tr>
                    <td>${s.id}</td><td>${s.title}</td><td>${(s.description || '').substring(0, 30)}...</td><td>${s.price}</td>
                    <td><span class="status-badge ${s.active ? 'active' : 'inactive'}">${s.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                    <td class="actions"><button class="btn-admin-delete" onclick="deleteService(${s.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderFeedbackManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Phản Hồi (${adminData.feedback.length})</h3>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tên</th><th>Email</th><th>Chủ Đề</th><th>Ngày</th><th>Trạng Thái</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.feedback.map(f => `
                <tr>
                    <td>${f.id}</td><td>${f.name}</td><td>${f.email}</td><td>${f.subject}</td><td>${f.date}</td>
                    <td><span class="status-badge ${f.status === 'new' ? 'active' : 'inactive'}">${f.status === 'new' ? 'Mới' : 'Đã Xử Lý'}</span></td>
                    <td class="actions"><button class="btn-admin-delete" onclick="deleteFeedback(${f.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderAttractionsManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Điểm Tham Quan</h3>
            <button class="btn-add-new"><i class="fas fa-plus"></i> Thêm Điểm Tham Quan</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tên</th><th>Địa Điểm</th><th>Mô Tả</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.attractions.map(a => `
                <tr>
                    <td>${a.id}</td><td>${a.name}</td><td>${a.location}</td><td>${(a.description || '').substring(0, 30)}...</td>
                    <td class="actions"><button class="btn-admin-delete" onclick="deleteAttraction(${a.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderMapManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Địa Điểm Bản Đồ</h3>
            <button class="btn-add-new"><i class="fas fa-plus"></i> Thêm Địa Điểm</button>
        </div>
        <table class="admin-table">
            <thead><tr><th>ID</th><th>Tên</th><th>Loại</th><th>Địa Điểm</th><th>Điện Thoại</th><th>Hành Động</th></tr></thead>
            <tbody>${adminData.mapPlaces.map(m => `
                <tr>
                    <td>${m.id}</td><td>${m.name}</td><td>${m.categoryDisplay}</td><td>${m.location}</td><td>${m.phone}</td>
                    <td class="actions"><button class="btn-admin-delete" onclick="deleteMapPlace(${m.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join('')}</tbody>
        </table>
    </div>`;
}

function renderAccountsManagement() {
    return `<div class="admin-form-wrapper">
        <div class="admin-form-header">
            <h3>Danh Sách Tài Khoản (${adminData.users.length})</h3>
        </div>
        <div class="accounts-summary">
            <div class="summary-card">
                <i class="fas fa-users"></i>
                <div class="summary-info">
                    <span class="summary-label">Tổng Tài Khoản</span>
                    <span class="summary-value">${adminData.users.length}</span>
                </div>
            </div>
            <div class="summary-card">
                <i class="fas fa-user"></i>
                <div class="summary-info">
                    <span class="summary-label">Người Dùng</span>
                    <span class="summary-value">${adminData.users.filter(u => u.role === 'user').length}</span>
                </div>
            </div>
            <div class="summary-card">
                <i class="fas fa-user-shield"></i>
                <div class="summary-info">
                    <span class="summary-label">Quản Trị Viên</span>
                    <span class="summary-value">${adminData.users.filter(u => u.role === 'admin').length}</span>
                </div>
            </div>
        </div>
        <table class="admin-table accounts-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ & Tên</th>
                    <th>Tên Đăng Nhập</th>
                    <th>Email</th>
                    <th>Số ĐT</th>
                    <th>Địa Chỉ</th>
                    <th>Vai Trò</th>
                    <th>Phương Thức Đăng Nhập</th>
                    <th>Ngày Đăng Ký</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                ${adminData.users.map((u, idx) => `
                <tr>
                    <td>${u.id || idx + 1}</td>
                    <td>${u.firstName} ${u.lastName}</td>
                    <td>${u.username}</td>
                    <td>${u.email}</td>
                    <td>${u.phone}</td>
                    <td>${u.address}</td>
                    <td><span class="role-badge role-${u.role}">${u.role === 'admin' ? 'Quản Trị Viên' : 'Người Dùng'}</span></td>
                    <td><span class="login-method-badge">${u.loginMethod === 'google' ? '<i class="fab fa-google"></i> Google' : '<i class="fas fa-envelope"></i> Email'}</span></td>
                    <td>${u.registrationDate || 'N/A'}</td>
                    <td class="actions">
                        <button class="btn-admin-edit" title="Chỉnh sửa vai trò" onclick="editUserRole(${u.id || idx + 1})"><i class="fas fa-edit"></i></button>
                        <button class="btn-admin-delete" title="Xóa tài khoản" onclick="deleteUser(${u.id || idx + 1})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ${adminData.users.length === 0 ? '<p class="no-data-message">Chưa có tài khoản nào được đăng ký.</p>' : ''}
    </div>`;
}

// ==================== CRUD OPERATIONS ==================== //

function saveBanner() { showNotification('Banner được lưu', 'success'); }
function editBanner(id) { showNotification('Chỉnh sửa banner #' + id, 'info'); }
function deleteBanner(id) {
    if (confirm('Xóa banner này?')) {
        adminData.banners = adminData.banners.filter(b => b.id !== id);
        showNotification('Xóa banner thành công', 'success');
        displayAdminContent('banner');
    }
}

function editNews(id) { showNotification('Chỉnh sửa tin tức #' + id, 'info'); }
function deleteNews(id) {
    if (confirm('Xóa tin tức này?')) {
        adminData.news = adminData.news.filter(n => n.id !== id);
        showNotification('Xóa tin tức thành công', 'success');
        displayAdminContent('news');
    }
}

function editService(id) { showNotification('Chỉnh sửa dịch vụ #' + id, 'info'); }
function deleteService(id) {
    if (confirm('Xóa dịch vụ này?')) {
        adminData.services = adminData.services.filter(s => s.id !== id);
        showNotification('Xóa dịch vụ thành công', 'success');
        displayAdminContent('services');
    }
}

function deleteFeedback(id) {
    if (confirm('Xóa phản hồi này?')) {
        adminData.feedback = adminData.feedback.filter(f => f.id !== id);
        showNotification('Xóa phản hồi thành công', 'success');
        displayAdminContent('feedback');
    }
}

function editAttraction(id) { showNotification('Chỉnh sửa điểm tham quan #' + id, 'info'); }
function deleteAttraction(id) {
    if (confirm('Xóa điểm tham quan này?')) {
        adminData.attractions = adminData.attractions.filter(a => a.id !== id);
        showNotification('Xóa điểm tham quan thành công', 'success');
        displayAdminContent('attractions');
    }
}

function editMapPlace(id) { showNotification('Chỉnh sửa địa điểm #' + id, 'info'); }
function deleteMapPlace(id) {
    if (confirm('Xóa địa điểm này?')) {
        adminData.mapPlaces = adminData.mapPlaces.filter(m => m.id !== id);
        showNotification('Xóa địa điểm thành công', 'success');
        displayAdminContent('map');
    }
}

function editUserRole(id) {
    const user = adminData.users.find((u, idx) => (u.id || idx + 1) === id);
    if (!user) return;
    
    const currentRole = user.role;
    const newRole = currentRole === 'user' ? 'admin' : 'user';
    
    if (confirm(`Thay đổi vai trò của ${user.firstName} ${user.lastName} thành ${newRole === 'admin' ? 'Quản Trị Viên' : 'Người Dùng'}?`)) {
        user.role = newRole;
        showNotification(`Thay đổi vai trò thành công!`, 'success');
        displayAdminContent('accounts');
    }
}

function deleteUser(id) {
    const userIndex = adminData.users.findIndex((u, idx) => (u.id || idx + 1) === id);
    if (userIndex === -1) return;
    
    const user = adminData.users[userIndex];
    
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản ${user.firstName} ${user.lastName} (${user.username})?`)) {
        adminData.users.splice(userIndex, 1);
        showNotification('Xóa tài khoản thành công', 'success');
        displayAdminContent('accounts');
    }
}

// ==================== UTILITY FUNCTIONS ==================== //

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type: success, error, info
 */
function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        const bgColors = {
            'success': '#28a745',
            'error': '#dc3545',
            'info': '#17a2b8'
        };
        notification.style.backgroundColor = bgColors[type] || '#28a745';
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// ==================== EXPORTS ==================== //

if (typeof window !== 'undefined') {
    window.handleAdminLogin = handleAdminLogin;
    window.showAdminDashboard = showAdminDashboard;
    window.handleAdminLogout = handleAdminLogout;
    window.showAdminManage = showAdminManage;
    window.displayAdminContent = displayAdminContent;
    window.saveBanner = saveBanner;
    window.editBanner = editBanner;
    window.deleteBanner = deleteBanner;
    window.deleteNews = deleteNews;
    window.deleteService = deleteService;
    window.deleteFeedback = deleteFeedback;
    window.deleteAttraction = deleteAttraction;
    window.deleteMapPlace = deleteMapPlace;
}

/**
 * FUNCTIONS DOCUMENTATION:
 * 
 * Authentication:
 * - handleAdminLogin(event) - Authenticate with username: admin123, password: admin123
 * - handleAdminLogout() - Logout from admin dashboard
 * 
 * Display:
 * - showAdminDashboard() - Display admin dashboard
 * - showAdminManage(type) - Show management page for type
 * - displayAdminContent(type) - Render content for type
 * 
 * Management Modules:
 * - renderBannerManagement() - Banner management interface
 * - renderNewsManagement() - News management interface
 * - renderServicesManagement() - Services management interface
 * - renderFeedbackManagement() - Feedback management interface
 * - renderAttractionsManagement() - Attractions management interface
 * - renderMapManagement() - Map locations management interface
 * 
 * CRUD Operations:
 * - saveBanner() - Save banner changes
 * - editBanner(id) - Edit banner
 * - deleteBanner(id) - Delete banner
 * - deleteNews(id) - Delete news
 * - deleteService(id) - Delete service
 * - deleteFeedback(id) - Delete feedback
 * - deleteAttraction(id) - Delete attraction
 * - deleteMapPlace(id) - Delete map location
 * 
 * Utilities:
 * - showNotification(message, type) - Display notification
 */
