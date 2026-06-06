// Tours Page JavaScript

let allTours = [];
let filteredTours = [];

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

// Render tour card HTML
function renderTourCard(item) {
    const duration = item.duration || '1 Ngày';
    const rating = item.rating || 4.5;
    const price = item.price || 1500000;
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(price);

    return `
        <div class="tour-card" onclick="navigateToTour(${item.id})">
            <div class="tour-card-image">
                <img src="${item.image || 'https://via.placeholder.com/400x240?text=' + encodeURIComponent(item.name)}" 
                     alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x240?text=No+Image'">
                <span class="tour-card-duration">
                    <i class="fas fa-calendar"></i> ${duration}
                </span>
                <span class="tour-card-rating">
                    <i class="fas fa-star"></i> ${rating}/5
                </span>
            </div>
            <div class="tour-card-content">
                <h3>${item.name}</h3>
                <div class="tour-card-company">
                    <i class="fas fa-building"></i>
                    ${item.company || 'Công ty Du lịch Vĩnh Long'}
                </div>
                <p class="tour-card-description">${item.description || 'Tour du lịch hấp dẫn tại Vĩnh Long'}</p>
                <div class="tour-card-info">
                    <div class="tour-card-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.location || 'Vĩnh Long'}</span>
                    </div>
                    <div class="tour-card-info-item">
                        <i class="fas fa-users"></i>
                        <span>${item.groupSize || '10-30'} người</span>
                    </div>
                </div>
                <div class="tour-card-footer">
                    <div>
                        <span class="tour-card-price-label">Giá khởi điểm</span>
                        <span class="tour-card-price">${formattedPrice}</span>
                    </div>
                    <button class="tour-card-btn">Đặt tour</button>
                </div>
            </div>
        </div>
    `;
}

// Load tours from API
async function loadTours() {
    try {
        const response = await fetch('/api.php?endpoint=tours');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            allTours = data.data;
            filteredTours = [...allTours];
            renderTours();
        }
    } catch (error) {
        console.error('Error loading tours:', error);
        loadSampleTours();
    }
}

// Load sample tours (fallback)
function loadSampleTours() {
    allTours = [
        {
            id: 1,
            name: 'TOUR 6 ĐIỂM: THĂM QUAN NHÀ GỖ – TRẢI NGHIỆM TẤT',
            company: 'Công ty TNHH TM DV và DL...',
            description: 'Khám phá những điểm tham quan nổi tiếng, trải nghiệm văn hóa địa phương',
            location: 'Vĩnh Long',
            duration: '6 Điểm',
            price: 1500000,
            rating: 4.5,
            groupSize: '15-30',
            image: 'https://via.placeholder.com/400x240?text=Tour+1',
            category: 'tour-1-ngay'
        },
        {
            id: 2,
            name: 'Sông nước miệt vườn CÁI BÈ + VĨNH LONG – ĐIỂM ĐẾN AN',
            company: 'Công ty Du Lịch Mekong Travel...',
            description: 'Tour du thuyền khám phá sông nước, làng trái cây, nhà nông dân',
            location: 'Cái Bè - Vĩnh Long',
            duration: '1 Ngày',
            price: 1800000,
            rating: 4.8,
            groupSize: '10-20',
            image: 'https://via.placeholder.com/400x240?text=Tour+2',
            category: 'tour-1-ngay'
        },
        {
            id: 3,
            name: 'CHO THUÊ TÀU DU LỊCH',
            company: 'Công ty TNHH TM DV và DL...',
            description: 'Cho thuê tàu du lịch với tiện nghi đầy đủ cho các tour nhóm',
            location: 'Vĩnh Long',
            duration: '2-3 Ngày',
            price: 2500000,
            rating: 4.6,
            groupSize: '20-50',
            image: 'https://via.placeholder.com/400x240?text=Tour+3',
            category: 'tour-2-3-ngay'
        },
        {
            id: 4,
            name: 'TOUR 5 ĐIỂM – TÀU THĂM QUAN VƯƠNG QUỐC GẠCH',
            company: 'Công ty TNHH TM DV và DL...',
            description: 'Khám phá vương quốc gạch nung truyền thống, thăm các làng nghề',
            location: 'Vĩnh Long',
            duration: '5 Điểm',
            price: 1300000,
            rating: 4.3,
            groupSize: '10-25',
            image: 'https://via.placeholder.com/400x240?text=Tour+4',
            category: 'tour-1-ngay'
        },
        {
            id: 5,
            name: 'Tour Khám Phá Kinh Tế - Xã Hội Vĩnh Long',
            company: 'Vinh Long Tourist',
            description: 'Tìm hiểu kinh tế, xã hội, văn hóa, lịch sử Vĩnh Long chi tiết',
            location: 'Vĩnh Long',
            duration: '3 Ngày',
            price: 2200000,
            rating: 4.7,
            groupSize: '15-30',
            image: 'https://via.placeholder.com/400x240?text=Tour+5',
            category: 'tour-2-3-ngay'
        },
        {
            id: 6,
            name: 'Tour Mở Rộng: Vĩnh Long - An Giang - Cần Thơ',
            company: 'Mekong Travel Co.',
            description: 'Tour 7 ngày khám phá ba tỉnh Đông Nam Bộ, thưởng ngoạn Vịnh Hạ Long',
            location: 'Vĩnh Long - An Giang - Cần Thơ',
            duration: '1 Tuần',
            price: 5500000,
            rating: 4.9,
            groupSize: '20-40',
            image: 'https://via.placeholder.com/400x240?text=Tour+6',
            category: 'tour-tuan'
        }
    ];
    
    filteredTours = [...allTours];
    renderTours();
}

// Render tours grid
function renderTours() {
    const toursGrid = document.getElementById('toursGrid');
    
    if (!toursGrid) return;
    
    if (filteredTours.length === 0) {
        toursGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Không tìm thấy tour</h3>
                <p>Vui lòng thử tìm kiếm hoặc lọc khác</p>
            </div>
        `;
        return;
    }
    
    toursGrid.innerHTML = filteredTours.map(item => renderTourCard(item)).join('');
}

// Search and filter tours
function searchAndFilterTours() {
    const searchInput = document.getElementById('searchTours');
    const filterSelect = document.getElementById('filterTours');
    const sortSelect = document.getElementById('sortTours');
    
    const searchTerm = (searchInput.value || '').toLowerCase().trim();
    const filterCategory = filterSelect.value;
    const sortBy = sortSelect.value;
    
    filteredTours = allTours.filter(item => {
        const matchesSearch = !searchTerm || 
                            item.name.toLowerCase().includes(searchTerm) ||
                            item.description.toLowerCase().includes(searchTerm) ||
                            item.company.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !filterCategory || 
                               (item.category === filterCategory);
        
        return matchesSearch && matchesCategory;
    });
    
    // Apply sorting
    if (sortBy === 'price-asc') {
        filteredTours.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
        filteredTours.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
        filteredTours.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
        filteredTours.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
    
    renderTours();
}

// Navigation functions
function navigateToTour(id) {
    window.location.href = 'tours.html?id=' + id;
}

function navigateToLogin() {
    window.location.href = 'login.html';
}

// Navigation event listeners
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const itemText = this.textContent.trim();
            
            // Handle implemented pages
            if (itemText === 'TRANG CHỦ' || itemText === 'TIN TỨC' || itemText === 'LƯU TRÚ' || itemText === 'LỮ HÀNH') {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            } else if (itemText !== 'TRANG CHỦ' && itemText !== 'TIN TỨC' && itemText !== 'LƯU TRÚ' && itemText !== 'LỮ HÀNH') {
                e.preventDefault();
            }
        });
    });
}

// Initialize page
function initPage() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    loadTours();
    
    setupNavigation();
    
    // Setup search, filter and sort event listeners
    const searchInput = document.getElementById('searchTours');
    const filterSelect = document.getElementById('filterTours');
    const sortSelect = document.getElementById('sortTours');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchAndFilterTours);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchAndFilterTours();
            }
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', searchAndFilterTours);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', searchAndFilterTours);
    }
    
    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchAndFilterTours);
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
