// Homepage (Index) JavaScript

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

// Render accommodation card HTML
function renderAccommodationCard(item) {
    return `
        <div class="accommodation-card" onclick="navigateToAccommodation(${item.id})">
            <div class="card-image">
                <img src="${item.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(item.name)}" 
                     alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="overlay">
                    <button>Xem chi tiết</button>
                </div>
            </div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${item.location || 'Vĩnh Long'}</p>
                <p class="rating">${renderStars(item.rating)} (${item.rating || 0}/5)</p>
            </div>
        </div>
    `;
}

// Render stars
function renderStars(rating) {
    const stars = '⭐'.repeat(Math.round(rating || 0));
    return stars || 'Chưa có đánh giá';
}

// Render news card HTML
function renderNewsCard(item) {
    return `
        <div class="news-item" onclick="navigateToNews(${item.id})">
            <div class="news-image">
                <img src="${item.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(item.title)}" 
                     alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            </div>
            <div class="news-info">
                <span class="news-category">${item.category || 'Tin tức'}</span>
                <h3>${item.title}</h3>
                <p class="news-date"><i class="fas fa-calendar"></i> ${formatDate(item.date)}</p>
            </div>
        </div>
    `;
}

// Format date to Vietnamese format
function formatDate(dateString) {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Load featured accommodations
async function loadFeaturedAccommodations() {
    try {
        const response = await fetch('/api.php?endpoint=accommodations');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            const grid = document.querySelector('.featured-grid');
            if (grid) {
                grid.innerHTML = data.data.slice(0, 3).map(item => renderAccommodationCard(item)).join('');
            }
        }
    } catch (error) {
        console.error('Error loading accommodations:', error);
        loadSampleAccommodations();
    }
}

// Load sample accommodations (fallback)
function loadSampleAccommodations() {
    const sampleData = [
        {
            id: 1,
            name: 'KHÁCH SẠN VĂN TRẠNG',
            location: 'Quận 1, Thành phố Vĩnh Long',
            rating: 4.5,
            image: 'https://via.placeholder.com/300x200?text=Khach+San+1'
        },
        {
            id: 2,
            name: 'COCO RIVERSIDE LODGE',
            location: 'Huyện Mang Thít, Vĩnh Long',
            rating: 4.8,
            image: 'https://via.placeholder.com/300x200?text=Khach+San+2'
        },
        {
            id: 3,
            name: 'HOMESTAY MEKONG',
            location: 'Huyện Châu Thành, Vĩnh Long',
            rating: 4.6,
            image: 'https://via.placeholder.com/300x200?text=Khach+San+3'
        }
    ];
    
    const grid = document.querySelector('.featured-grid');
    if (grid) {
        grid.innerHTML = sampleData.map(item => renderAccommodationCard(item)).join('');
    }
}

// Load featured news
async function loadFeaturedNews() {
    try {
        const response = await fetch('/api.php?endpoint=news');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            const grid = document.querySelector('.featured-news-grid');
            if (grid) {
                grid.innerHTML = data.data.slice(0, 3).map(item => renderNewsCard(item)).join('');
            }
        }
    } catch (error) {
        console.error('Error loading news:', error);
        loadSampleNews();
    }
}

// Load sample news (fallback)
function loadSampleNews() {
    const sampleNews = [
        {
            id: 1,
            title: 'Lễ Hội Nước - Sự kiện du lịch lớn nhất năm',
            category: 'Sự kiện',
            date: new Date().toISOString(),
            image: 'https://via.placeholder.com/300x200?text=Tin+Tuc+1'
        },
        {
            id: 2,
            title: 'Top 10 Nhà hàng ẩm thực Vĩnh Long phải thử',
            category: 'Ẩm thực',
            date: new Date().toISOString(),
            image: 'https://via.placeholder.com/300x200?text=Tin+Tuc+2'
        },
        {
            id: 3,
            title: 'Khám phá những điểm tham quan nổi tiếng',
            category: 'Du lịch',
            date: new Date().toISOString(),
            image: 'https://via.placeholder.com/300x200?text=Tin+Tuc+3'
        }
    ];
    
    const grid = document.querySelector('.featured-news-grid');
    if (grid) {
        grid.innerHTML = sampleNews.map(item => renderNewsCard(item)).join('');
    }
}

// Navigation functions
function navigateToAccommodation(id) {
    window.location.href = 'accommodations.html?id=' + id;
}

function navigateToNews(id) {
    window.location.href = 'news.html?id=' + id;
}

function navigateToLogin() {
    window.location.href = 'login.html';
}

// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        window.location.href = 'accommodations.html?search=' + encodeURIComponent(searchTerm);
    }
}

// Navigation event listeners
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const itemText = this.textContent.trim();
            
            // Handle implemented pages
            if (itemText === 'TRANG CHỦ' || itemText === 'TIN TỨC' || itemText === 'LƯU TRÚ') {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            } else if (itemText !== 'TRANG CHỦ' && itemText !== 'TIN TỨC' && itemText !== 'LƯU TRÚ') {
                e.preventDefault();
            }
        });
    });
}

// Initialize page
function initPage() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    loadFeaturedAccommodations();
    loadFeaturedNews();
    
    setupNavigation();
    
    // Search form handling
    const searchForm = document.querySelector('.hero-section');
    if (searchForm) {
        const searchInput = searchForm.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch(e);
                }
            });
        }
        
        const searchBtn = searchForm.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', handleSearch);
        }
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
