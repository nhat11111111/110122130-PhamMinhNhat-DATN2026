// News Page JavaScript

let allNews = [];
let filteredNews = [];
let lastDateTimeUpdate = 0;
let currentArticle = null;
let activeSidebarTab = 'latest';

// Local placeholder SVG
const PLACEHOLDER_SVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22400%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';

// Update date time - optimized to prevent excessive DOM updates
function updateDateTime() {
    const dateTimeEl = document.getElementById('dateTime');
    if (!dateTimeEl) return;
    
    const now = Date.now();
    // Only update if 5 seconds have passed
    if (now - lastDateTimeUpdate < 5000) return;
    lastDateTimeUpdate = now;
    
    const date = new Date(now);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat('vi-VN', options);
    dateTimeEl.textContent = formatter.format(date);
}

function formatDate(dateString) {
    if (!dateString) return 'Chưa cập nhật';
    return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id, 10) : null;
}

function getArticleContent(item) {
    if (item.content) return item.content;
    const summary = item.summary || '';
    return `
        <p>${summary}</p>
        <p>Vĩnh Long đang tích cực phát triển các sản phẩm du lịch trải nghiệm, góp phần quảng bá hình ảnh địa phương và thu hút du khách trong và ngoài nước.</p>
        <p>Thông qua các hoạt động trải nghiệm thực tế, du khách có cơ hội tìm hiểu văn hóa, ẩm thực và con người Vĩnh Long một cách sinh động và gần gũi hơn.</p>
    `;
}

// Render news card
function renderNewsCard(item) {
    const dateStr = formatDate(item.date);
    const imgSrc = item.image || PLACEHOLDER_SVG;
    
    return `
        <div class="news-card" onclick="navigateToArticle(${item.id})">
            <div class="news-card-image">
                <img src="${imgSrc}" 
                     alt="${item.title}" 
                     onerror="this.src='${PLACEHOLDER_SVG}'"
                     loading="lazy">
                <span class="news-card-category-badge">${item.category || 'Tin tức'}</span>
            </div>
            <div class="news-card-content">
                <h3>${item.title}</h3>
                <p>${item.summary || item.content?.substring(0, 150) || 'Chưa có mô tả'}</p>
                <div class="news-card-meta">
                    <div class="news-card-date">
                        <i class="fas fa-calendar"></i>
                        <span>${dateStr}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load news from API
async function loadNews() {
    try {
        const response = await fetch('/api.php?endpoint=news');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            allNews = data.data;
            filteredNews = [...allNews];
            onNewsLoaded();
            return;
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
    
    loadSampleNews();
}

function onNewsLoaded() {
    renderNews();
    const articleId = getArticleIdFromUrl();
    if (articleId) {
        showArticleDetail(articleId);
    }
}

// Load sample news
function loadSampleNews() {
    allNews = [
        {
            id: 1,
            title: 'VĨNH LONG THÚC ĐẨY SẢN PHẨM DU LỊCH TRẢI NGHIỆM DÀNH CHO HỌC SINH',
            category: 'Du lịch',
            date: new Date().toISOString(),
            summary: 'Tỉnh Vĩnh Long đang tích cực phát triển các sản phẩm du lịch trải nghiệm dành cho học sinh, góp phần giáo dục và quảng bá du lịch địa phương.',
            content: `
                <p>Tỉnh Vĩnh Long đang tích cực phát triển các sản phẩm du lịch trải nghiệm dành cho học sinh, góp phần giáo dục và quảng bá du lịch địa phương. Các chương trình được thiết kế phù hợp với lứa tuổi, kết hợp học tập và khám phá văn hóa.</p>
                <p>Thông qua hoạt động trải nghiệm, học sinh có cơ hội tìm hiểu về lịch sử, văn hóa và ẩm thực Vĩnh Long. Đây là hình thức giáo dục ngoài nhà trường hiệu quả, giúp các em hiểu và yêu quê hương hơn.</p>
                <p>Trung tâm Xúc tiến Du lịch Vĩnh Long phối hợp với các đơn vị lữ hành, điểm tham quan triển khai nhiều tour trải nghiệm trong ngày và qua đêm, đáp ứng nhu cầu của các trường học trong và ngoài tỉnh.</p>
            `,
            image: PLACEHOLDER_SVG,
            featured: true
        },
        {
            id: 2,
            title: 'Lễ Hội Nước - Sự kiện du lịch lớn nhất năm',
            category: 'Sự kiện',
            date: new Date(Date.now() - 86400000).toISOString(),
            summary: 'Lễ hội nước Vĩnh Long là sự kiện du lịch lớn nhất trong năm, thu hút hàng nghìn du khách tham dự.',
            image: PLACEHOLDER_SVG,
            featured: true
        },
        {
            id: 3,
            title: 'Top 10 Nhà hàng ẩm thực Vĩnh Long phải thử',
            category: 'Ẩm thực',
            date: new Date(Date.now() - 172800000).toISOString(),
            summary: 'Khám phá những nhà hàng nổi tiếng với ẩm thực Đông Nam Á...',
            image: PLACEHOLDER_SVG
        },
        {
            id: 4,
            title: 'Khám phá những điểm tham quan nổi tiếng',
            category: 'Du lịch',
            date: new Date(Date.now() - 259200000).toISOString(),
            summary: 'Những điểm tham quan không thể bỏ qua khi đến Vĩnh Long...',
            image: PLACEHOLDER_SVG
        },
        {
            id: 5,
            title: 'Lịch sử hình thành và phát triển tỉnh Vĩnh Long',
            category: 'Lịch sử',
            date: new Date(Date.now() - 345600000).toISOString(),
            summary: 'Tìm hiểu về lịch sử hơn 300 năm hình thành và phát triển của tỉnh Vĩnh Long...',
            image: PLACEHOLDER_SVG
        },
        {
            id: 6,
            title: 'Mệm mứa địa phương - Đặc sản ẩm thực vùng Tây Nam',
            category: 'Ẩm thực',
            date: new Date(Date.now() - 432000000).toISOString(),
            summary: 'Mệm mứa là một trong những đặc sản ẩm thực độc đáo của Vĩnh Long...',
            image: PLACEHOLDER_SVG
        }
    ];
    
    filteredNews = [...allNews];
    onNewsLoaded();
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
                            (item.summary && item.summary.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !filterCategory || 
                               (item.category || '').toLowerCase() === filterCategory.toLowerCase();
        
        return matchesSearch && matchesCategory;
    });
    
    renderNews();
}

function renderSidebarItem(item) {
    const dateStr = formatDate(item.date);
    const imgSrc = item.image || PLACEHOLDER_SVG;
    return `
        <div class="related-news-item" onclick="navigateToArticle(${item.id})">
            <div class="related-news-thumb">
                <img src="${imgSrc}" alt="${item.title}" onerror="this.src='${PLACEHOLDER_SVG}'" loading="lazy">
            </div>
            <div class="related-news-info">
                <h4>${item.title}</h4>
                <span class="date">${dateStr}</span>
            </div>
        </div>
    `;
}

function getLatestNews(excludeId, limit = 6) {
    return [...allNews]
        .filter(item => item.id !== excludeId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

function getTrendingNews(excludeId, limit = 6) {
    const featured = allNews.filter(item => item.id !== excludeId && item.featured);
    const source = featured.length > 0 ? featured : allNews.filter(item => item.id !== excludeId);
    return source.slice(0, limit);
}

function renderSidebarNews(excludeId) {
    const listEl = document.getElementById('sidebarNewsList');
    if (!listEl) return;

    const items = activeSidebarTab === 'latest'
        ? getLatestNews(excludeId)
        : getTrendingNews(excludeId);

    if (items.length === 0) {
        listEl.innerHTML = '<p class="sidebar-empty">Chưa có tin tức khác</p>';
        return;
    }

    listEl.innerHTML = items.map(item => renderSidebarItem(item)).join('');
}

function switchSidebarTab(tab) {
    activeSidebarTab = tab;
    document.querySelectorAll('.sidebar-tab').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    if (currentArticle) {
        renderSidebarNews(currentArticle.id);
    }
}

function showArticleDetail(id) {
    const article = allNews.find(item => String(item.id) === String(id));
    if (!article) {
        goBackToList();
        return;
    }

    currentArticle = article;

    const listView = document.getElementById('newsListView');
    const listBreadcrumbs = document.getElementById('listBreadcrumbs');
    const newsDetail = document.getElementById('newsDetail');

    if (listView) listView.style.display = 'none';
    if (listBreadcrumbs) listBreadcrumbs.style.display = 'none';
    if (newsDetail) newsDetail.style.display = 'block';

    document.title = article.title + ' - Vĩnh Long Tourist';

    const titleEl = document.getElementById('detailTitle');
    const dateEl = document.getElementById('detailDate');
    const bodyEl = document.getElementById('detailBody');
    const imageEl = document.getElementById('detailImage');

    if (titleEl) titleEl.textContent = article.title;
    if (dateEl) dateEl.textContent = formatDate(article.date);
    if (bodyEl) bodyEl.innerHTML = getArticleContent(article);
    if (imageEl) {
        imageEl.src = article.image || PLACEHOLDER_SVG;
        imageEl.alt = article.title;
    }

    renderSidebarNews(article.id);

    if (window.location.search !== '?id=' + article.id) {
        window.history.replaceState({}, '', 'news.html?id=' + article.id);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackToList() {
    currentArticle = null;
    window.history.pushState({}, '', 'news.html');

    const listView = document.getElementById('newsListView');
    const listBreadcrumbs = document.getElementById('listBreadcrumbs');
    const newsDetail = document.getElementById('newsDetail');

    if (listView) listView.style.display = 'block';
    if (listBreadcrumbs) listBreadcrumbs.style.display = 'flex';
    if (newsDetail) newsDetail.style.display = 'none';

    document.title = 'Tin Tức - Vĩnh Long Tourist';
}

function shareOnFacebook(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentArticle?.title || document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareByEmail(e) {
    e.preventDefault();
    const subject = encodeURIComponent(currentArticle?.title || 'Tin tức Vĩnh Long');
    const body = encodeURIComponent(window.location.href);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function printArticle(e) {
    e.preventDefault();
    window.print();
}

// Navigation functions
function navigateToArticle(id) {
    window.location.href = 'news.html?id=' + id;
}

function navigateToLogin() {
    window.location.href = 'login.html';
}

// Setup navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const itemText = this.textContent.trim();
            
            if (itemText === 'TRANG CHỦ' || itemText === 'TIN TỨC' || itemText === 'LƯU TRÚ') {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize page
function initPage() {
    updateDateTime();
    // Use requestAnimationFrame for smoother updates instead of setInterval
    setInterval(updateDateTime, 5000); // Update every 5 seconds instead of 1
    
    loadNews();
    setupNavigation();
    
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
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchNews);
    }
    
    // Setup dropdown menu items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterNewsByDropdown(category);
        });
    });
}

// Filter news by dropdown category
function filterNewsByDropdown(category) {
    const categoryMap = {
        'diem-moi': null,      // Sort by newest
        'dac-san': 'Ẩm thực',   // Filter by Ẩm thực
        'lich-su': 'Lịch sử'    // Filter by Lịch sử
    };
    
    if (category === 'diem-moi') {
        // Sort by newest (date descending)
        filteredNews = [...allNews].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (categoryMap[category]) {
        // Filter by category
        filteredNews = allNews.filter(item => item.category === categoryMap[category]);
    } else {
        filteredNews = [...allNews];
    }
    
    renderNews();
    // Scroll to top of news grid
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        newsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('popstate', function() {
    const articleId = getArticleIdFromUrl();
    if (articleId && allNews.length > 0) {
        showArticleDetail(articleId);
    } else {
        goBackToList();
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
