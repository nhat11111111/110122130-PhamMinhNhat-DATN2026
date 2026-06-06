/**
 * User Account Management
 * Xử lý đăng nhập, đăng xuất, thông tin tài khoản, đổi mật khẩu, thay đổi ảnh đại diện
 */

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let avatarFile = null;

// ===== LOGIN FUNCTIONALITY =====

/**
 * Đăng nhập thành công - Cập nhật giao diện
 */
function loginSuccess(user) {
    currentUser = user;
    
    // Lưu thông tin user vào localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('userSessionChanged', { detail: { loggedIn: true, user } }));
    }
    
    // Cập nhật giao diện header
    updateHeaderAfterLogin(user);
    
    // Hiện thông báo
    showNotification('Đăng nhập thành công!', 'success');
}

/**
 * Cập nhật giao diện header sau khi đăng nhập
 */
function updateHeaderAfterLogin(user) {
    const btnLogin = document.getElementById('btnLogin');
    const userAccountMenu = document.getElementById('userAccountMenu');
    
    if (btnLogin) {
        btnLogin.style.display = 'none';
    }
    
    if (userAccountMenu) {
        userAccountMenu.style.display = 'block';
        
        // Cập nhật tên người dùng
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = user.name || user.email || 'Tài khoản';
        }
        
        // Cập nhật ảnh đại diện
        const userAvatar = document.getElementById('userAvatar');
        const modalUserAvatar = document.getElementById('modalUserAvatar');
        if (userAvatar && user.avatar) {
            userAvatar.src = user.avatar;
        }
        if (modalUserAvatar && user.avatar) {
            modalUserAvatar.src = user.avatar;
        }
        
        // Tải thông tin user vào form
        loadUserInfoToForm(user);
    }
}

/**
 * Tải thông tin user vào form
 */
function loadUserInfoToForm(user) {
    document.getElementById('infFullName').value = user.name || '';
    document.getElementById('infEmail').value = user.email || '';
    document.getElementById('infPhone').value = user.phone || '';
    document.getElementById('infAddress').value = user.address || '';
    document.getElementById('infBirthDate').value = user.birthDate || '';
    document.getElementById('infGender').value = user.gender || '';
    document.getElementById('infCity').value = user.city || '';
}

/**
 * Đăng xuất
 */
function userLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('userSessionChanged', { detail: { loggedIn: false } }));
        }
        
        // Cập nhật giao diện
        const btnLogin = document.getElementById('btnLogin');
        const userAccountMenu = document.getElementById('userAccountMenu');
        
        if (btnLogin) {
            btnLogin.style.display = 'inline-block';
        }
        
        if (userAccountMenu) {
            userAccountMenu.style.display = 'none';
        }
        
        // Đóng dropdown
        closeUserDropdown();
        
        // Hiện thông báo
        showNotification('Đăng xuất thành công!', 'success');
    }
}

/**
 * Khôi phục phiên đăng nhập nếu tồn tại
 */
function restoreLoginSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userJson = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && userJson) {
        try {
            const user = JSON.parse(userJson);
            updateHeaderAfterLogin(user);
        } catch (e) {
            console.error('Error restoring login session:', e);
        }
    }
}

// ===== DROPDOWN MENU =====

/**
 * Toggle dropdown menu
 */
function toggleUserMenu() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.toggle('active');
    }
}

/**
 * Đóng dropdown
 */
function closeUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.remove('active');
    }
}

/**
 * Đóng dropdown khi click bên ngoài
 */
document.addEventListener('click', function(event) {
    const userAccountMenu = document.getElementById('userAccountMenu');
    if (userAccountMenu && !userAccountMenu.contains(event.target)) {
        closeUserDropdown();
    }
});

// ===== USER INFO MODAL =====

/**
 * Hiện modal thông tin cơ bản
 */
function showUserInfo() {
    closeUserDropdown();
    const modal = document.getElementById('userInfoModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Đóng modal thông tin cơ bản
 */
function closeUserInfoModal() {
    const modal = document.getElementById('userInfoModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Cập nhật thông tin user
 */
function updateUserInfo(event) {
    event.preventDefault();
    
    // Lấy dữ liệu từ form
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('infFullName').value,
        email: document.getElementById('infEmail').value,
        phone: document.getElementById('infPhone').value,
        address: document.getElementById('infAddress').value,
        birthDate: document.getElementById('infBirthDate').value,
        gender: document.getElementById('infGender').value,
        city: document.getElementById('infCity').value,
    };
    
    // Gọi API để cập nhật
    updateUserViaAPI(updatedUser)
        .then(response => {
            if (response.success) {
                currentUser = updatedUser;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                updateHeaderAfterLogin(updatedUser);
                showNotification('Cập nhật thông tin thành công!', 'success');
                closeUserInfoModal();
            } else {
                showNotification('Cập nhật thất bại: ' + response.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Cập nhật thất bại!', 'error');
        });
}

/**
 * Gọi API để cập nhật user info
 */
async function updateUserViaAPI(user) {
    try {
        const response = await fetch('/api/users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                phone: user.phone,
                address: user.address,
                birthDate: user.birthDate,
                gender: user.gender,
                city: user.city,
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: error.message };
    }
}

// ===== PASSWORD MODAL =====

/**
 * Hiện modal đổi mật khẩu
 */
function showPasswordModal() {
    closeUserInfoModal();
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Đóng modal đổi mật khẩu
 */
function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Reset form
    document.getElementById('passwordForm').reset();
    document.getElementById('strengthBar').className = 'strength-bar';
    document.getElementById('strengthText').textContent = 'Chưa xác định';
}

/**
 * Toggle visibility của password input
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
    }
}

/**
 * Kiểm tra độ mạnh của mật khẩu
 */
function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    
    // Kiểm tra các tiêu chí
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[\W]/)) strength++;
    
    // Cập nhật thanh mạnh
    strengthBar.className = 'strength-bar';
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Yếu';
        strengthText.className = 'strength-text weak';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Vừa phải';
        strengthText.className = 'strength-text medium';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Mạnh';
        strengthText.className = 'strength-text strong';
    }
}

/**
 * Lắng nghe sự kiện nhập password
 */
document.addEventListener('DOMContentLoaded', function() {
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
});

/**
 * Đổi mật khẩu
 */
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Kiểm tra validate
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Mật khẩu phải có ít nhất 8 ký tự!', 'error');
        return;
    }
    
    // Gọi API để đổi mật khẩu
    changePasswordViaAPI(currentPassword, newPassword)
        .then(response => {
            if (response.success) {
                showNotification('Đổi mật khẩu thành công!', 'success');
                closePasswordModal();
            } else {
                showNotification('Đổi mật khẩu thất bại: ' + response.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Đổi mật khẩu thất bại!', 'error');
        });
}

/**
 * Gọi API để đổi mật khẩu
 */
async function changePasswordViaAPI(currentPassword, newPassword) {
    try {
        const response = await fetch('/api/users/' + currentUser.id + '/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                password_confirmation: newPassword,
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: error.message };
    }
}

// ===== AVATAR MODAL =====

/**
 * Hiện modal thay đổi ảnh đại diện
 */
function showAvatarModal() {
    closeUserInfoModal();
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Đóng modal thay đổi ảnh đại diện
 */
function closeAvatarModal() {
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.classList.remove('active');
    }
    avatarFile = null;
}

/**
 * Xử lý drag over
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.backgroundColor = '#ffffcc';
        uploadArea.style.borderColor = '#e67e22';
    }
}

/**
 * Xử lý drag leave
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ddd';
    }
}

/**
 * Xử lý drop
 */
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ddd';
    }
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleAvatarFile(files[0]);
    }
}

/**
 * Xử lý chọn file ảnh
 */
function handleAvatarSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        handleAvatarFile(files[0]);
    }
}

/**
 * Xử lý file ảnh
 */
function handleAvatarFile(file) {
    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
        showNotification('Vui lòng chọn file ảnh!', 'error');
        return;
    }
    
    // Kiểm tra kích thước
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Kích thước ảnh không được vượt quá 5MB!', 'error');
        return;
    }
    
    avatarFile = file;
    
    // Hiển thị preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        if (previewImage) {
            previewImage.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
    
    showNotification('Ảnh đã được chọn!', 'success');
}

/**
 * Upload ảnh đại diện
 */
function uploadAvatar() {
    if (!avatarFile) {
        showNotification('Vui lòng chọn ảnh!', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('user_id', currentUser.id);
    
    uploadAvatarViaAPI(formData)
        .then(response => {
            if (response.success) {
                currentUser.avatar = response.avatar_url;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateHeaderAfterLogin(currentUser);
                showNotification('Thay đổi ảnh đại diện thành công!', 'success');
                closeAvatarModal();
            } else {
                showNotification('Upload thất bại: ' + response.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Upload thất bại!', 'error');
        });
}

/**
 * Gọi API để upload avatar
 */
async function uploadAvatarViaAPI(formData) {
    try {
        const response = await fetch('/api/users/' + currentUser.id + '/avatar', {
            method: 'POST',
            body: formData,
        });
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: error.message };
    }
}

// ===== DEVELOPING MODALS =====

/**
 * Hiện modal chức năng đang phát triển
 */
function showDeveloping(title = 'Chức năng này') {
    closeUserDropdown();
    const modal = document.getElementById('developingModal');
    const titleElement = document.getElementById('developingTitle');
    
    if (titleElement) {
        titleElement.innerHTML = '<i class="fas fa-cog"></i> ' + title + ' đang được phát triển';
    }
    
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Các chức năng đang phát triển
 */
function showUserSecurity() {
    showDeveloping('Bảo mật');
}

function showUserSettings() {
    showDeveloping('Cài đặt');
}

function showUserHistory() {
    showDeveloping('Lịch sử');
}

/**
 * Đóng modal developing
 */
function closeDevelopingModal() {
    const modal = document.getElementById('developingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ===== NOTIFICATIONS =====

/**
 * Hiện thông báo
 */
function showNotification(message, type = 'info') {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Thêm CSS nếu chưa có
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                z-index: 3000;
                animation: slideIn 0.3s ease;
            }
            
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
            
            .notification-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            
            .notification-error {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            
            .notification-info {
                background-color: #d1ecf1;
                border: 1px solid #bee5eb;
                color: #0c5460;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                font-size: 18px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Xóa sau 3 giây
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== INITIALIZATION =====

/**
 * Khởi tạo khi trang load
 */
window.addEventListener('load', function() {
    restoreLoginSession();
});
