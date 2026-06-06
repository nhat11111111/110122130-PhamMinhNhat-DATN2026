// News Page JavaScript

let allNews = [];
let filteredNews = [];

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

// Render news card HTML
function renderNewsCard(item) {
    return `
        <div class="news-card" onclick="navigateToArticle(${item.id})">
            <div class="news-card-image">
                <img src="${item.image || 'https://via.placeholder.com/400x250?text=' + encodeURIComponent(item.title)}" 
                     alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                <span class="news-card-category-badge">${item.category || 'Tin tức'}</span>
            </div>
            <div class="news-card-content">
                <h3>${item.title}</h3>
                <p>${item.summary || item.content?.substring(0, 150) || 'Chưa có mô tả'}</p>
                <div class="news-card-meta">
                    <div class="news-card-date">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(item.date)}</span>
                    </div>
                    <a href="news.html?id=${item.id}" class="news-card-read-more">
                        Đọc thêm →
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Format date to Vietnamese format
function formatDate(dateString) {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Load news from API
async function loadNews() {
    try {
        const response = await fetch('/api.php?endpoint=news');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            allNews = data.data;
            filteredNews = [...allNews];
            renderNews();
        }
    } catch (error) {
        console.error('Error loading news:', error);
        loadSampleNews();
    }
}

// Load sample news (fallback)
function loadSampleNews() {
    allNews = [
        {
            id: 1,
            title: 'Lễ Hội Nước - Sự kiện du lịch lớn nhất năm',
            category: 'Sự kiện',
            date: new Date().toISOString(),
            summary: 'Lễ hội nước Vĩnh Long là sự kiện du lịch lớn nhất trong năm...',
            image: 'https://via.placeholder.com/400x250?text=Tien+Kien'
        },
        {
            id: 2,
            title: 'Top 10 Nhà hàng ẩm thực Vĩnh Long phải thử',
            category: 'Ẩm thực',
            date: new Date(Date.now() - 86400000).toISOString(),
            summary: 'Khám phá những nhà hàng nổi tiếng với ẩm thực Đông Nam Á...',
            image: 'https://via.placeholder.com/400x250?text=Am+Thuc'
        },
        {
            id: 3,
            title: 'Khám phá những điểm tham quan nổi tiếng',
            category: 'Du lịch',
            date: new Date(Date.now() - 172800000).toISOString(),
            summary: 'Những điểm tham quan không thể bỏ qua khi đến Vĩnh Long...',
            image: 'https://via.placeholder.com/400x250?text=Diem+Tham+Quan'
        },
        {
            id: 4,
            title: 'Mua sắm tại chợ truyền thống Vĩnh Long',
            category: 'Mua sắm',
            date: new Date(Date.now() - 259200000).toISOString(),
            summary: 'Hướng dẫn chi tiết để mua sắm tại các chợ truyền thống...',
            image: 'https://via.placeholder.com/400x250?text=Mua+Sam'
        },
        {
            id: 5,
            title: 'Các hoạt động ngoài trời tại Vĩnh Long',
            category: 'Du lịch',
            date: new Date(Date.now() - 345600000).toISOString(),
            summary: 'Tận hưởng những hoạt động ngoài trời thú vị...',
            image: 'https://via.placeholder.com/400x250?text=Hoat+Dong'
        },
        {
            id: 6,
            title: 'Đặc sản Vĩnh Long - Những món ăn độc đáo',
            category: 'Ẩm thực',
            date: new Date(Date.now() - 432000000).toISOString(),
            summary: 'Những đặc sản không thể bỏ qua khi đến Vĩnh Long...',
            image: 'https://via.placeholder.com/400x250?text=Dac+San'
        }
    ];
    
    filteredNews = [...allNews];
    renderNews();
}

// Render news grid
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    
    if (!newsGrid) return;
    
    if (filteredNews.length === 0) {
        newsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Không tìm thấy tin tức</h3>
                <p>Vui lòng thử tìm kiếm hoặc lọc khác</p>
            </div>
        `;
        return;
    }
    
    newsGrid.innerHTML = filteredNews.map(item => renderNewsCard(item)).join('');
}

// Search news
function searchNews() {
    const searchInput = document.getElementById('searchNews');
    const filterSelect = document.getElementById('filterNews');
    
    const searchTerm = (searchInput.value || '').toLowerCase().trim();
    const filterCategory = filterSelect.value;
    
    filteredNews = allNews.filter(item => {
        const matchesSearch = !searchTerm || 
                            item.title.toLowerCase().includes(searchTerm) ||
                            (item.summary && item.summary.toLowerCase().includes(searchTerm)) ||
                            (item.content && item.content.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !filterCategory || 
                               (item.category || '').toLowerCase() === filterCategory.toLowerCase();
        
        return matchesSearch && matchesCategory;
    });
    
    renderNews();
}

// Reset filters
function resetFilters() {
    document.getElementById('searchNews').value = '';
    document.getElementById('filterNews').value = '';
    filteredNews = [...allNews];
    renderNews();
}

// Navigation functions
function navigateToArticle(id) {
    window.location.href = 'news.html?id=' + id;
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
    
    loadNews();
    
    setupNavigation();
    
    // Setup search and filter event listeners
    const searchInput = document.getElementById('searchNews');
    const filterSelect = document.getElementById('filterNews');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchNews);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchNews();
            }
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', searchNews);
    }
    
    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchNews);
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
