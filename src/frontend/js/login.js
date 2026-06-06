// Login & Register Page JavaScript

// Update current time
function updateCurrentTime() {
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
        const now = new Date();
        const vietnameseTime = now.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '');
        currentTimeEl.textContent = vietnameseTime;
    }
}

// Switch between login and register tabs
function switchTab(tabName) {
    // Hide all forms
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected form
    const selectedForm = document.getElementById(tabName + 'Form');
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    
    // Add active class to selected tab
    event.target.closest('.tab-btn').classList.add('active');
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
function isStrongPassword(password) {
    return password.length >= 6;
}

// Show notification
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('successNotification');
    const messageEl = document.getElementById('notificationMessage');
    
    if (notification && messageEl) {
        messageEl.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Validation
    if (!email || !password) {
        showNotification('Vui lòng điền đầy đủ thông tin', 3000);
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Email không hợp lệ', 3000);
        return;
    }
    
    if (password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 3000);
        return;
    }
    
    // Simulate login request
    loginUser(email, password);
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    const terms = document.querySelector('input[name="terms"]').checked;
    
    // Validation
    if (!fullname || !email || !phone || !password || !confirmPassword) {
        showNotification('Vui lòng điền đầy đủ thông tin', 3000);
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Email không hợp lệ', 3000);
        return;
    }
    
    if (phone.length < 10 || !/^\d+$/.test(phone)) {
        showNotification('Số điện thoại không hợp lệ', 3000);
        return;
    }
    
    if (!isStrongPassword(password)) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 3000);
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 3000);
        return;
    }
    
    if (!terms) {
        showNotification('Vui lòng đồng ý với điều khoản sử dụng', 3000);
        return;
    }
    
    // Simulate register request
    registerUser(fullname, email, phone, password);
}

// Simulate login API call
function loginUser(email, password) {
    // Show loading state
    const submitBtn = document.querySelector('#loginForm .btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    
    // Simulate API delay
    setTimeout(() => {
        // In real application, send credentials to backend API
        console.log('Login attempt:', { email, password });
        
        // Simulate successful login
        showNotification('✓ Đăng nhập thành công! Chuyển hướng...', 3000);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Redirect after notification
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// Simulate register API call
function registerUser(fullname, email, phone, password) {
    // Show loading state
    const submitBtn = document.querySelector('#registerForm .btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo tài khoản...';
    
    // Simulate API delay
    setTimeout(() => {
        // In real application, send data to backend API
        console.log('Register attempt:', { fullname, email, phone, password });
        
        // Simulate successful registration
        showNotification('✓ Tạo tài khoản thành công! Chuyển hướng...', 3000);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Reset form
        document.getElementById('registerForm').reset();
        
        // Redirect after notification
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// Handle social login (Facebook)
function loginWithFacebook() {
    showNotification('⚙️ Tính năng đang được phát triển', 3000);
    // In real app: Initialize Facebook SDK and handle login
}

// Handle social login (Google)
function loginWithGoogle() {
    showNotification('⚙️ Tính năng đang được phát triển', 3000);
    // In real app: Initialize Google SDK and handle login
}

// Handle social register (Facebook)
function registerWithFacebook() {
    showNotification('⚙️ Tính năng đang được phát triển', 3000);
    // In real app: Initialize Facebook SDK and handle register
}

// Handle social register (Google)
function registerWithGoogle() {
    showNotification('⚙️ Tính năng đang được phát triển', 3000);
    // In real app: Initialize Google SDK and handle register
}

// Navigation functions
function navigateToHome() {
    window.location.href = 'index.html';
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = index === 0 ? 'login' : 'register';
            switchTab(tabName);
        });
    });
}

// Real-time password validation feedback
function setupPasswordValidation() {
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = getPasswordStrength(password);
            
            // You could add visual feedback here
            // For now, just store the strength level
            this.dataset.strength = strength;
        });
    }
}

// Get password strength level
function getPasswordStrength(password) {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        return 'strong';
    }
    return 'medium';
}

// Initialize page
function initPage() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    setupEventListeners();
    setupPasswordValidation();
    
    // Set initial active tab
    const firstTabBtn = document.querySelector('.tab-btn.active');
    if (firstTabBtn) {
        firstTabBtn.classList.add('active');
    }
    
    // Make first form active
    const firstForm = document.querySelector('.auth-form');
    if (firstForm) {
        firstForm.classList.add('active');
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
