/**
 * Login & Registration Integration
 * Xác thực người dùng và quản trị viên
 */

// ===== HARDCODED CREDENTIALS (For Testing) =====
const VALID_USER = {
    username: 'nhat1234',
    password: 'nhat1234',
    role: 'user'
};

const VALID_ADMIN = {
    username: 'admin123',
    password: 'admin123',
    role: 'admin'
};

// ===== PASSWORD VALIDATION =====

/**
 * Kiểm tra mật khẩu có hợp lệ không (tối thiểu 6 ký tự, có chữ và số)
 */
function isValidPassword(password) {
    if (password.length < 6) {
        return false;
    }
    // Kiểm tra có chữ
    if (!/[a-zA-Z]/.test(password)) {
        return false;
    }
    // Kiểm tra có số
    if (!/[0-9]/.test(password)) {
        return false;
    }
    return true;
}

/**
 * Kiểm tra tên tài khoản hợp lệ (3-20 ký tự)
 */
function isValidUsername(username) {
    return username && username.length >= 3 && username.length <= 20;
}

// ===== USER LOGIN =====

/**
 * Xử lý submit form đăng nhập người dùng
 */
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe')?.checked;
    
    console.log('[USER LOGIN] Username:', username, 'Password length:', password.length);
    
    // Validation
    if (!username) {
        showNotification('Vui lòng nhập tên tài khoản!', 'error');
        return;
    }
    
    if (!password) {
        showNotification('Vui lòng nhập mật khẩu!', 'error');
        return;
    }
    
    // Kiểm tra thông tin đăng nhập
    if (username === VALID_USER.username && password === VALID_USER.password) {
        console.log('[USER LOGIN] Authentication success!');
        console.log('[USER LOGIN] Username matched:', username, '===', VALID_USER.username);
        console.log('[USER LOGIN] Password matched:', password, '===', VALID_USER.password);
        // Đăng nhập thành công
        const user = {
            id: 1,
            name: 'Nhat User',
            username: VALID_USER.username,
            email: 'user@vinhlong.com',
            role: 'user',
            avatar: '/images/banners/banner-01.png'
        };
        
        // Lưu thông tin
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Ẩn form đăng nhập
        document.body.classList.remove('auth-active');
        document.getElementById('loginSection').style.display = 'none';
        
        // Ẩn admin dashboard (nếu đang hiện)
        if (document.getElementById('adminDashboardSection')) {
            document.getElementById('adminDashboardSection').style.display = 'none';
        }
        
        // Hiện trang chủ người dùng
        if (document.getElementById('mainContent')) {
            document.getElementById('mainContent').style.display = 'block';
        }
        
        // Gọi loginSuccess để cập nhật header user menu và hiện thông báo
        loginSuccess(user);
    } else {
        console.log('[USER LOGIN] Authentication failed! Username match:', username === VALID_USER.username, 'Password match:', password === VALID_USER.password);
        // Đăng nhập thất bại
        showNotification('Tên tài khoản hoặc mật khẩu không đúng!', 'error');
    }
}

/**
 * Xử lý đăng nhập admin
 */
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    console.log('[ADMIN LOGIN] Username:', username, 'Password length:', password.length);
    
    // Validation
    if (!username) {
        showNotification('Vui lòng nhập tên tài khoản!', 'error');
        return;
    }
    
    if (!password) {
        showNotification('Vui lòng nhập mật khẩu!', 'error');
        return;
    }
    
    // Kiểm tra thông tin đăng nhập admin
    if (username === VALID_ADMIN.username && password === VALID_ADMIN.password) {
        console.log('[ADMIN LOGIN] Authentication success!');
        // Đăng nhập admin thành công
        const admin = {
            id: 999,
            name: 'Admin',
            username: VALID_ADMIN.username,
            email: 'admin@vinhlong.com',
            role: 'admin',
            avatar: '/images/banners/banner-01.png'
        };
        
        // Lưu thông tin admin
        localStorage.setItem('currentUser', JSON.stringify(admin));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        
        // Ẩn form đăng nhập
        document.body.classList.remove('auth-active');
        document.getElementById('loginSection').style.display = 'none';
        
        // Hiện admin dashboard
        if (document.getElementById('mainContent')) {
            document.getElementById('mainContent').style.display = 'none';
        }
        if (document.getElementById('adminDashboardSection')) {
            document.getElementById('adminDashboardSection').style.display = 'block';
        }
        
        // Gọi loginSuccess để cập nhật header user menu và hiện thông báo
        loginSuccess(admin);
    } else {
        console.log('[ADMIN LOGIN] Authentication failed! Username match:', username === VALID_ADMIN.username, 'Password match:', password === VALID_ADMIN.password);
        // Đăng nhập thất bại
        showNotification('Tên tài khoản hoặc mật khẩu admin không đúng!', 'error');
    }
}

/**
 * Hiện form đăng nhập admin
 */
function showAdminLoginForm() {
    // Ẩn user login form
    document.getElementById('userLoginForm').style.display = 'none';
    // Hiện admin login form
    document.getElementById('adminLoginForm').style.display = 'block';
}

// ===== USER REGISTRATION =====

/**
 * Xử lý submit form đăng ký
 */
function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const birthDate = document.getElementById('regBirthDate').value;
    const address = document.getElementById('regAddress').value.trim();
    const country = document.getElementById('regCountry').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const occupation = document.querySelector('input[name="occupation"]:checked')?.value;
    const termsAccepted = document.getElementById('regTerms').checked;
    
    // ===== VALIDATION =====
    
    if (!firstName) {
        showNotification('Vui lòng nhập họ!', 'error');
        return;
    }
    
    if (!lastName) {
        showNotification('Vui lòng nhập tên!', 'error');
        return;
    }
    
    if (!isValidUsername(username)) {
        showNotification('Tên tài khoản phải từ 3-20 ký tự!', 'error');
        return;
    }
    
    // Username không được trùng với user mẫu
    if (username === VALID_USER.username) {
        showNotification('Tên tài khoản đã tồn tại!', 'error');
        return;
    }
    
    if (!isValidPassword(password)) {
        showNotification('Mật khẩu phải tối thiểu 6 ký tự (bao gồm chữ và số)!', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu nhập lại không khớp!', 'error');
        return;
    }
    
    if (!email) {
        showNotification('Vui lòng nhập email!', 'error');
        return;
    }
    
    if (!phone) {
        showNotification('Vui lòng nhập số điện thoại!', 'error');
        return;
    }
    
    if (!birthDate) {
        showNotification('Vui lòng chọn ngày sinh!', 'error');
        return;
    }
    
    if (!address) {
        showNotification('Vui lòng nhập địa chỉ!', 'error');
        return;
    }
    
    if (!gender) {
        showNotification('Vui lòng chọn giới tính!', 'error');
        return;
    }
    
    if (!occupation) {
        showNotification('Vui lòng chọn nghề nghiệp!', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Vui lòng đồng ý với các điều khoản dịch vụ!', 'error');
        return;
    }
    
    // ===== TẠO USER MỚI =====
    
    // Tạo object user mới
    const newUser = {
        id: Math.floor(Math.random() * 1000000),
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`,
        username: username,
        email: email,
        phone: phone,
        birthDate: birthDate,
        address: address,
        country: country,
        gender: gender,
        occupation: occupation,
        role: 'user',
        avatar: '/images/banners/banner-01.png',
        createdAt: new Date().toISOString()
    };
    
    // Lưu vào localStorage (mô phỏng database)
    let users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    users.push({
        ...newUser,
        password: btoa(password) // Mã hóa đơn giản (không an toàn, chỉ demo)
    });
    localStorage.setItem('allUsers', JSON.stringify(users));
    
    // Đăng nhập tự động sau đăng ký
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Gọi loginSuccess từ user-account.js
    loginSuccess(newUser);
    
    // Hiện thông báo thành công
    showNotification('Đăng ký thành công! Chào mừng ' + newUser.name, 'success');
    
    // Ẩn form đăng ký
    document.body.classList.remove('auth-active');
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    
    // Lưu vào database thông qua API
    saveUserToDatabase(newUser, password);
}

/**
 * Lưu user vào database thông qua API
 */
async function saveUserToDatabase(user, password) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                username: user.username,
                password: password,
                phone: user.phone,
                address: user.address,
                role: 'user',
                status: 'active'
            })
        });
        
        const data = await response.json();
        if (data.success) {
            console.log('User saved to database:', data);
        }
    } catch (error) {
        console.error('Error saving user to database:', error);
    }
}

/**
 * Hiện form đăng ký
 */
function showRegistrationPage() {
    // Ẩn login form
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'none';
    // Hiện registration form
    document.getElementById('registrationSection').style.display = 'block';
}

// ===== HELPER FUNCTIONS =====

/**
 * Hiện/ẩn form đăng nhập
 */
function showLoginPage() {
    document.body.classList.add('auth-active');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('userLoginForm').style.display = 'block';
    document.getElementById('adminLoginForm').style.display = 'none';
}

/**
 * Khôi phục phiên đăng nhập nếu tồn tại
 */
function restoreLoginSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn && currentUser) {
        const user = JSON.parse(currentUser);
        // Khôi phục trạng thái đăng nhập
        loginSuccess(user);
    }
}

/**
 * Hiện thông báo
 * NOTE: Using showNotification() from user-account.js instead
 */
// Function showNotification() is defined in user-account.js and will be used

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Khôi phục phiên đăng nhập nếu tồn tại
    restoreLoginSession();
    
    // Gắn event listener cho form đăng nhập (nếu không có onsubmit)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.removeEventListener('submit', handleLoginSubmit);
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Gắn event listener cho form admin login
    const adminLoginForm = document.getElementById('adminLoginFormElement');
    if (adminLoginForm) {
        adminLoginForm.removeEventListener('submit', handleAdminLogin);
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Gắn event listener cho form đăng ký
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.removeEventListener('submit', handleRegistrationSubmit);
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
});

// ===== CSS ANIMATION =====

const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
