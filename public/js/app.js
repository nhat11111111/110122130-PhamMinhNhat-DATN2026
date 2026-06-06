// ==================== DATE & TIME ==================== //
let lastDateTimeUpdate = 0;

// SVG placeholder for broken images
const PLACEHOLDER_SVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22400%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';

function updateDateTime() {
    const now = Date.now();
    // Only update if 5+ seconds have passed
    if (now - lastDateTimeUpdate < 5000) return;
    lastDateTimeUpdate = now;
    
    const date = new Date(now);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTimeString = date.toLocaleDateString('vi-VN', options);
    const dateTimeEl = document.getElementById('dateTime');
    if (dateTimeEl) {
        dateTimeEl.textContent = dateTimeString;
    }
}

// Update on page load
updateDateTime();
// Update every 5 seconds (with throttling inside function)
setInterval(updateDateTime, 5000);

// ==================== LOGIN STATE & FEEDBACK DATA ==================== //
// Track user login state (currentUser defined in user-account.js to avoid duplicate)
let isLoggedIn = false;

// Feedback data storage
let allFeedback = [];

// ==================== MODAL FUNCTIONS ==================== //
function showDeveloping() {
    const modal = document.getElementById('developingModal');
    modal.classList.add('show');
}

function closeDevelopingModal() {
    const modal = document.getElementById('developingModal');
    modal.classList.remove('show');
}

// Close modal when clicking the X button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDevelopingModal);
    }

    const serviceParam = new URLSearchParams(window.location.search).get('service');
    if (serviceParam === 'am-thuc' || serviceParam === 'mua-sam') {
        showServicesPage(serviceParam);
    }

    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    window.addEventListener('userSessionChanged', function(e) {
        isLoggedIn = !!e.detail?.loggedIn;
        if (currentServiceDetailId) {
            updateServiceReviewFormVisibility();
        }
    });

    // Close modal when clicking outside of it
    const modal = document.getElementById('developingModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeDevelopingModal();
            }
        });
    }

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const itemText = this.textContent.trim();
            
            // Allow natural navigation for implemented pages
            if (itemText === 'TIN TỨC' || itemText === 'TRANG CHỦ' || itemText === 'DỊCH VỤ' || itemText === 'TIềE ÍCH' || itemText === 'PHẢN HỒI' || itemText === 'ĐIềE THAM QUAN' || itemText === 'BẢN ĐềESềE) {
                // Don't prevent default for these - let them navigate naturally
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                if (itemText === 'TRANG CHỦ') {
                    e.preventDefault();
                    showHomePage();
                } else if (itemText === 'TIN TỨC') {
                    e.preventDefault();
                    showNewsPage();
                } else if (itemText === 'DỊCH VỤ') {
                    e.preventDefault();
                    showServicesPage('am-thuc');
                } else if (itemText === 'TIềE ÍCH') {
                    e.preventDefault();
                    showUtilitiesPage();
                } else if (itemText === 'PHẢN HỒI') {
                    e.preventDefault();
                    showFeedbackPage();
                } else if (itemText === 'ĐIềE THAM QUAN') {
                    e.preventDefault();
                    showAttractionsPage();
                } else if (itemText === 'BẢN ĐềESềE) {
                    e.preventDefault();
                    showDigitalMapPage();
                }
            } else {
                // Other menu items - show developing
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                showDeveloping();
            }
        });
    });

    // Home search bar (header, below navigation)
    const homeSearchBtn = document.getElementById('homeSearchBtn');
    const homeSearchInput = document.getElementById('homeSearchInput');

    if (homeSearchBtn && homeSearchInput) {
        const runHomeSearch = () => {
            const query = homeSearchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
                showDeveloping();
            }
        };
        homeSearchBtn.addEventListener('click', runHomeSearch);
        homeSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                runHomeSearch();
            }
        });
    }

    // Add click handlers to listing items
    const listingItems = document.querySelectorAll('.listing-item');
    listingItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Clicked on listing:', this.querySelector('h3').textContent);
            showDeveloping();
        });
        item.style.cursor = 'pointer';
    });

    // Language selector
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            showDeveloping();
        });
    }

    // Login button
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showLoginPage();
        });
    }

    initHomeBannerCarousel();
    loadHomeNewsPreview();
    loadHomeAttractionsPreview();

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDeveloping();
        });
    });

    // App download links
    const appLinks = document.querySelectorAll('.app-link');
    appLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDeveloping();
        });
    });

    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow links with target="_blank" and actual URLs to work normally
            if (link.getAttribute('target') === '_blank' && link.getAttribute('href').startsWith('http')) {
                return; // Don't prevent default, let the link open normally
            }
            e.preventDefault();
            showDeveloping();
        });
    });
});

// ==================== SMOOTH SCROLL ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== //
let scrollTopBtn = null;

window.addEventListener('scroll', function() {
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #d4854c;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 99;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollTopBtn.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#b86b38';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollTopBtn.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#d4854c';
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(scrollTopBtn);
    }

    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// ==================== API CALL SIMULATION ==================== //
// This simulates loading data from the backend
async function loadListingsData() {
    try {
        const response = await fetch('/api/listings');
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        updateListings(data);
    } catch (error) {
        console.log('Using placeholder data - Backend not connected yet');
        // Continue with placeholder data
    }
}

function updateListings(data) {
    const container = document.querySelector('.listings-container');
    // This function would update the listings with real data
    console.log('Listings loaded:', data);
}

// Load listings on page load
document.addEventListener('DOMContentLoaded', loadListingsData);

// ==================== UTILITY FUNCTIONS ==================== //

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== HOME BANNER CAROUSEL ==================== //

const HOME_BANNER_AUTOPLAY_MS = 4000;

const HOME_BANNER_SLIDES = [
    { id: 1, image: '/images/banners/banner-01.png', alt: 'LềEhội ẩm thực Vĩnh Long' },
    { id: 2, image: '/images/banners/banner-02.png', alt: 'Cầu Mỹ Thuận - Biểu tượng Vĩnh Long' },
    { id: 3, image: '/images/banners/banner-03.png', alt: 'Du thuyền khám phá sông nước' },
    { id: 4, image: '/images/banners/banner-04.png', alt: 'Du thuyền khám phá sông nước Vĩnh Long' },
    { id: 5, image: '/images/banners/banner-05.png', alt: 'Tour thuyền và bến tàu du lịch Vĩnh Long' }
];

let currentBannerIndex = 0;
let bannerAutoplayTimer = null;
let homeBannerInitialized = false;

function normalizeBannerImagePath(imagePath) {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    return '/images/banners/' + imagePath;
}

function getActiveHomeBanners() {
    if (typeof adminData !== 'undefined' && Array.isArray(adminData.banners)) {
        const activeBanners = adminData.banners.filter(banner => banner.active);
        if (activeBanners.length > 0) {
            return activeBanners.map(banner => ({
                id: banner.id,
                image: normalizeBannerImagePath(banner.image),
                alt: banner.title || 'Banner Vĩnh Long Tourist'
            }));
        }
    }
    return HOME_BANNER_SLIDES;
}

function renderHomeBannerSlides() {
    const slidesContainer = document.getElementById('bannerSlides');
    if (!slidesContainer) return;

    const banners = getActiveHomeBanners();
    slidesContainer.innerHTML = banners.map((banner, index) => `
        <div class="banner-slide${index === 0 ? ' active' : ''}" data-index="${index}">
            <img src="${banner.image}" alt="${banner.alt}" loading="${index <= 1 ? 'eager' : 'lazy'}">
        </div>
    `).join('');

    renderBannerDots(banners.length);
    currentBannerIndex = 0;
}

function renderBannerDots(count) {
    const dotsContainer = document.getElementById('bannerDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = Array.from({ length: count }, (_, index) => `
        <button type="button" class="banner-dot${index === 0 ? ' active' : ''}" data-index="${index}" aria-label="Banner ${index + 1}" role="tab"></button>
    `).join('');

    dotsContainer.querySelectorAll('.banner-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            goToHomeBanner(parseInt(dot.dataset.index, 10));
            restartHomeBannerAutoplay();
        });
    });
}

function goToHomeBanner(index) {
    const slides = document.querySelectorAll('#bannerSlides .banner-slide');
    const dots = document.querySelectorAll('#bannerDots .banner-dot');
    if (!slides.length) return;

    const total = slides.length;
    currentBannerIndex = ((index % total) + total) % total;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentBannerIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentBannerIndex);
    });
}

function nextHomeBanner() {
    goToHomeBanner(currentBannerIndex + 1);
}

function prevHomeBanner() {
    goToHomeBanner(currentBannerIndex - 1);
}

function stopHomeBannerAutoplay() {
    if (bannerAutoplayTimer) {
        clearInterval(bannerAutoplayTimer);
        bannerAutoplayTimer = null;
    }
}

function startHomeBannerAutoplay() {
    stopHomeBannerAutoplay();
    const totalSlides = document.querySelectorAll('#bannerSlides .banner-slide').length;
    if (totalSlides <= 1) return;

    bannerAutoplayTimer = setInterval(() => {
        nextHomeBanner();
    }, HOME_BANNER_AUTOPLAY_MS);
}

function restartHomeBannerAutoplay() {
    startHomeBannerAutoplay();
}

function initHomeBannerCarousel() {
    const carousel = document.getElementById('homeBannerCarousel');
    if (!carousel) return;

    renderHomeBannerSlides();

    if (!homeBannerInitialized) {
        const prevBtn = document.getElementById('bannerPrev');
        const nextBtn = document.getElementById('bannerNext');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevHomeBanner();
                restartHomeBannerAutoplay();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextHomeBanner();
                restartHomeBannerAutoplay();
            });
        }

        carousel.addEventListener('mouseenter', stopHomeBannerAutoplay);
        carousel.addEventListener('mouseleave', startHomeBannerAutoplay);

        homeBannerInitialized = true;
    }

    startHomeBannerAutoplay();
}

function loadHomeNewsPreview() {
    const grid = document.getElementById('homeNewsGrid');
    if (!grid) return;

    const newsItems = [
        { id: 1, title: 'Điểm chạm câu xúc cho hành trình vềEnguồn ềEVĩnh Long', image: '/images/banners/banner-01.png' },
        { id: 2, title: 'Tour trải nghiệm khoai lang Bình Tân', image: '/images/banners/banner-02.png' },
        { id: 3, title: 'Khám phá chợ nổi Cái Bè', image: '/images/banners/banner-03.png' },
        { id: 4, title: 'Du thuyền khám phá sông nước Vĩnh Long', image: '/images/banners/banner-04.png' },
        { id: 5, title: 'Tour thuyền và bến tàu du lịch', image: '/images/banners/banner-05.png' }
    ];

    grid.innerHTML = newsItems.map(item => `
        <article class="home-news-card" data-news-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="home-news-card-body">
                <h3>${item.title}</h3>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.home-news-card').forEach(card => {
        card.addEventListener('click', () => {
            if (typeof showNewsPage === 'function') {
                showNewsPage();
            }
        });
    });
}

function loadHomeAttractionsPreview() {
    const grid = document.getElementById('homeAttractionsGrid');
    if (!grid) return;

    const attractionItems = [
        { id: 1, name: 'Tour thuyền rềE, image: '/images/banners/banner-03.png' },
        { id: 2, name: 'Du thuyền Mekong', image: '/images/banners/banner-04.png' },
        { id: 3, name: 'LềEhội ẩm thực', image: '/images/banners/banner-01.png' },
        { id: 4, name: 'Khám phá sông nước', image: '/images/banners/banner-02.png' },
        { id: 5, name: 'Cầu Mỹ Thuận', image: '/images/banners/banner-05.png' }
    ];

    grid.innerHTML = attractionItems.map(item => `
        <article class="home-attraction-card" data-attraction-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="home-attraction-card-body">
                <h3>${item.name}</h3>
                <p>Địa điểm nổi tiếng</p>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.home-attraction-card').forEach(card => {
        card.addEventListener('click', () => {
            if (typeof showAttractionsPage === 'function') {
                showAttractionsPage();
            }
        });
    });
}

// ==================== NEWS PAGE FUNCTIONS ==================== //

// Show news page
function showNewsPage() {
    document.body.classList.remove('auth-active');
    stopHomeBannerAutoplay();
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'block';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    loadNews();
    window.scrollTo(0, 0);
}

// Show services page (am-thuc | mua-sam)
function showServicesPage(category) {
    document.body.classList.remove('auth-active');
    stopHomeBannerAutoplay();
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'block';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';

    backToServicesList();
    switchServicesCategory(category || currentServicesCategory || 'am-thuc', true);
    loadServicesIndex();
    window.scrollTo(0, 0);
}

// Load news from API
async function loadNews() {
    try {
        const response = await fetch('/api/news');
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        if (data.status === 'success') {
            displayNews(data.data);
        }
    } catch (error) {
        console.error('Error loading news:', error);
        // Use default data
        const defaultNews = [
            {
                id: 1,
                title: 'Điểm chạm câu xúc cho hành trình vềEnguồn ềEVĩnh Long',
                image: PLACEHOLDER_SVG,
                excerpt: 'Có những hành trình không nhàm dé di xa, mà đềEdi sâu. Và khi vềEvùng đất Vĩnh Long nơi lưu giữ di tích quốc gia đặc biệt...',
                date: '12/05/2026',
                category: 'Du lịch'
            },
            {
                id: 2,
                title: 'Tour trải nghiệm khoai lang Bình Tân',
                image: PLACEHOLDER_SVG,
                excerpt: 'Nội dung khoai lang khoai không ít du khách ngồi được vào một không gian của ký ức...',
                date: '12/05/2026',
                category: 'Ẩm thực'
            },
            {
                id: 3,
                title: 'Khám phá chợ nổi Cái Bè',
                image: PLACEHOLDER_SVG,
                excerpt: 'Chợ nổi Cái Bè là một trong những điểm đến nổi tiếng nhất ềEVĩnh Long...',
                date: '11/05/2026',
                category: 'Mua sắm'
            },
            {
                id: 4,
                title: 'LềEhội truyền thống Vĩnh Long 2026',
                image: PLACEHOLDER_SVG,
                excerpt: 'Những lềEhội truyền thống độc đáo của Vĩnh Long sẽ mang đến cho du khách một trải nghiệm văn hóa thú vềE..',
                date: '10/05/2026',
                category: 'Sự kiện'
            }
        ];
        displayNews(defaultNews);
    }
}

// Display news items
function displayNews(newsItems) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';

    newsItems.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-item-image">
                <img src="${news.image}" alt="${news.title}" onerror="this.src='${PLACEHOLDER_SVG}'" loading="lazy">
                <span class="news-category">${news.category}</span>
            </div>
            <div class="news-item-info">
                <h3>${news.title}</h3>
                <p class="news-date"><i class="fas fa-calendar"></i> ${news.date}</p>
                <p class="news-excerpt">${news.excerpt}</p>
            </div>
        `;
        newsItem.addEventListener('click', () => showNewsDetail(news));
        newsList.appendChild(newsItem);
    });

    // Show first news by default
    if (newsItems.length > 0) {
        showNewsDetail(newsItems[0]);
    }
}

// Show news detail
function showNewsDetail(news) {
    const newsDetail = document.getElementById('newsDetail');
    newsDetail.innerHTML = `
        <div class="news-header">
            <img src="${news.image}" alt="${news.title}" class="news-detail-image" onerror="this.src='${PLACEHOLDER_SVG}'">
            <div class="news-meta">
                <h1>${news.title}</h1>
                <div class="news-info">
                    <span class="news-date"><i class="fas fa-calendar"></i> ${news.date}</span>
                    <span class="news-category-badge">${news.category}</span>
                    <span class="news-author"><i class="fas fa-user"></i> ${news.author || 'Admin'}</span>
                </div>
            </div>
        </div>
        <div class="news-content">
            <p>${news.content || news.excerpt}</p>
        </div>
    `;

    // Highlight active news item
    document.querySelectorAll('.news-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find the matching news item and mark as active
    document.querySelectorAll('.news-item').forEach(item => {
        const itemTitle = item.querySelector('h3')?.textContent || '';
        if (itemTitle.includes(news.title)) {
            item.classList.add('active');
        }
    });
}

// ==================== SERVICES PAGE FUNCTIONS ==================== //

let allServicesIndex = [];
let filteredServicesIndex = [];
let currentServicesCategory = 'am-thuc';
let currentServiceDetailId = null;
let currentGalleryIndex = 0;
let selectedReviewRating = 0;

const SERVICES_CATEGORY_META = {
    'am-thuc': {
        title: 'ẨM THỰC VĨNH LONG',
        desc: 'Tập hợp các điểm ăn uống trong tỉnh Vĩnh Long',
        breadcrumb: 'Ẩm thực',
        searchPlaceholder: 'Bạn muốn đi đâu, ăn gì?'
    },
    'mua-sam': {
        title: 'MUA SẮM VĨNH LONG',
        desc: 'Tập hợp các điểm mua sắm trong tỉnh Vĩnh Long',
        breadcrumb: 'Mua sắm',
        searchPlaceholder: 'Tìm chợ, siêu thềE cửa hàng...'
    }
};

function switchServicesCategory(category, reloadFilters) {
    if (!SERVICES_CATEGORY_META[category]) {
        category = 'am-thuc';
    }
    if (currentServiceDetailId) {
        backToServicesList();
    }
    currentServicesCategory = category;

    const meta = SERVICES_CATEGORY_META[category];
    const titleEl = document.getElementById('servicesPageTitle');
    const descEl = document.getElementById('servicesPageDesc');
    const breadcrumbEl = document.getElementById('servicesBreadcrumbCategory');
    const searchInput = document.getElementById('searchServicesIndex');

    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.desc;
    if (breadcrumbEl) breadcrumbEl.textContent = meta.breadcrumb;
    if (searchInput) searchInput.placeholder = meta.searchPlaceholder;

    document.querySelectorAll('.services-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });

    updateServicesSidebarFilters(category);

    if (reloadFilters !== false) {
        resetServicesFilters();
    }

    if (allServicesIndex.length > 0) {
        searchAndFilterServicesIndex();
    }
}

function updateServicesSidebarFilters(category) {
    const priceFilter = document.getElementById('servicesPriceFilter');
    const typeFilterTitle = document.getElementById('servicesTypeFilterTitle');
    const businessFilters = document.getElementById('servicesBusinessFilters');

    if (!businessFilters) return;

    if (category === 'am-thuc') {
        if (priceFilter) priceFilter.style.display = 'block';
        if (typeFilterTitle) typeFilterTitle.textContent = 'LOẠI HÌNH KINH DOANH';
        businessFilters.innerHTML = `
            <label class="filter-checkbox">
                <input type="checkbox" value="nha-hang" class="business-filter-input">
                <span>Nhà hàng</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="quan-an" class="business-filter-input">
                <span>Quán ăn</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="cafe" class="business-filter-input">
                <span>Café</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="quan-nuoc" class="business-filter-input">
                <span>Quán nước</span>
            </label>
        `;
    } else {
        if (priceFilter) priceFilter.style.display = 'none';
        if (typeFilterTitle) typeFilterTitle.textContent = 'LOẠI HÌNH CỬA HÀNG';
        businessFilters.innerHTML = `
            <label class="filter-checkbox">
                <input type="checkbox" value="cho" class="business-filter-input">
                <span>Chợ</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="sieu-thi" class="business-filter-input">
                <span>Siêu thềE/span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="dac-san" class="business-filter-input">
                <span>Đặc sản</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" value="cua-hang" class="business-filter-input">
                <span>Cửa hàng</span>
            </label>
        `;
    }

    businessFilters.querySelectorAll('.business-filter-input').forEach(filter => {
        filter.addEventListener('change', searchAndFilterServicesIndex);
    });
}

function resetServicesFilters() {
    const searchInput = document.getElementById('searchServicesIndex');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.price-filter-input, .business-filter-input').forEach(input => {
        input.checked = false;
    });
}

// Load services
async function loadServicesIndex() {
    try {
        const response = await fetch('/api.php?endpoint=services');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            allServicesIndex = data.data.map(item => ({
                ...item,
                category: item.category || (item.type && ['cho', 'sieu-thi', 'dac-san', 'cua-hang'].includes(item.type) ? 'mua-sam' : 'am-thuc')
            }));
            searchAndFilterServicesIndex();
            return;
        }
    } catch (error) {
        console.error('Error loading services:', error);
    }
    
    loadSampleServicesIndex();
}

// Load sample services
function loadSampleServicesIndex() {
    allServicesIndex = [
        {
            id: 1,
            name: 'Nhà Hàng Hương Sen',
            address: '51/14B Phạm Thái Bường, Phường Phước Hậu, Tỉnh Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 4582,
            reviews: 12,
            rating: 4.5,
            category: 'am-thuc',
            type: 'nha-hang',
            priceRange: '300000-500000',
            priceMin: 0,
            priceMax: 350000,
            phone: '0986523256',
            openTime: '07:00',
            closeTime: '22:00',
            description: 'Nhà hàng Hương Sen mang đến không gian ẩm thực miền Tây ấm cúng, phục vụ các món đặc sản sông nước được chế biến tươi ngon mỗi ngày.',
            image: PLACEHOLDER_SVG,
            images: [PLACEHOLDER_SVG, PLACEHOLDER_SVG, PLACEHOLDER_SVG, PLACEHOLDER_SVG, PLACEHOLDER_SVG],
            menu: [
                { name: 'Lẩu cá linh bông điệp', image: PLACEHOLDER_SVG },
                { name: 'Gỏi sầu đâu cá lóc', image: PLACEHOLDER_SVG },
                { name: 'Cá kèo nướng muối ớt', image: PLACEHOLDER_SVG },
                { name: 'Lắc rim me', image: PLACEHOLDER_SVG }
            ]
        },
        {
            id: 2,
            name: 'Nhà Hàng Âm Thực Phú',
            address: '123 NguyềE HuềE Phường 1, TP. Vĩnh Long',
            location: 'Long Châu',
            visits: 3461,
            reviews: 8,
            rating: 4.8,
            category: 'am-thuc',
            type: 'nha-hang',
            priceRange: '300000-500000',
            image: PLACEHOLDER_SVG
        },
        {
            id: 3,
            name: 'Nhà Hàng Ngàn Vình',
            address: '33/12 Phạm Thái Bường, Phường 4, TP. Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 2730,
            reviews: 5,
            rating: 4.6,
            category: 'am-thuc',
            type: 'nha-hang',
            priceRange: '100000-300000',
            image: PLACEHOLDER_SVG
        },
        {
            id: 4,
            name: 'Quán Ăn Bình Dân Mekong',
            address: '45 Đường 30/4, Phường 1, TP. Vĩnh Long',
            location: 'Long Châu',
            visits: 2148,
            reviews: 15,
            rating: 4.4,
            category: 'am-thuc',
            type: 'quan-an',
            priceRange: '100000-300000',
            image: PLACEHOLDER_SVG
        },
        {
            id: 5,
            name: 'Café Sông Tiền',
            address: '284 Phạm Hùng, Phường Long Châu, TP. Vĩnh Long',
            location: 'Long Châu',
            visits: 2524,
            reviews: 9,
            rating: 4.7,
            category: 'am-thuc',
            type: 'cafe',
            priceRange: '0-100000',
            image: PLACEHOLDER_SVG
        },
        {
            id: 6,
            name: 'Nhà Hàng Sông Thảo',
            address: '252 Tân Quới Hùng, Phường Long Châu, TP. Vĩnh Long',
            location: 'Long Châu',
            visits: 3275,
            reviews: 11,
            rating: 4.5,
            category: 'am-thuc',
            type: 'nha-hang',
            priceRange: '300000-500000',
            image: PLACEHOLDER_SVG
        },
        {
            id: 7,
            name: 'Chợ nổi Cái Bè',
            address: 'Ấp An Bình, Xã Cái Bè, Huyện Cái Bè, Vĩnh Long',
            location: 'Cái Bè',
            visits: 8920,
            reviews: 45,
            rating: 4.6,
            category: 'mua-sam',
            type: 'cho',
            image: PLACEHOLDER_SVG
        },
        {
            id: 8,
            name: 'Chợ Đêm Vĩnh Long',
            address: 'Đường Phạm Thái Bường, Phường 1, TP. Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 5640,
            reviews: 28,
            rating: 4.3,
            category: 'mua-sam',
            type: 'cho',
            image: PLACEHOLDER_SVG
        },
        {
            id: 9,
            name: 'Siêu thềECo.opmart Vĩnh Long',
            address: '01 Đường 30/4, Phường 1, TP. Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 6780,
            reviews: 32,
            rating: 4.5,
            category: 'mua-sam',
            type: 'sieu-thi',
            image: PLACEHOLDER_SVG
        },
        {
            id: 10,
            name: 'Cửa hàng Đặc sản Mekong',
            address: '107/2 Phạm Hùng, Phường Long Châu, TP. Vĩnh Long',
            location: 'Long Châu',
            visits: 3210,
            reviews: 18,
            rating: 4.7,
            category: 'mua-sam',
            type: 'dac-san',
            image: PLACEHOLDER_SVG
        },
        {
            id: 11,
            name: 'Chợ trung tâm Vĩnh Long',
            address: 'Đường NguyềE HuềE Phường 1, TP. Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 4450,
            reviews: 22,
            rating: 4.2,
            category: 'mua-sam',
            type: 'cho',
            image: PLACEHOLDER_SVG
        },
        {
            id: 12,
            name: 'Cửa hàng Lưu niệm Sông nước',
            address: '15 Phan Bội Châu, Phường 1, TP. Vĩnh Long',
            location: 'Vĩnh Long',
            visits: 1890,
            reviews: 7,
            rating: 4.4,
            category: 'mua-sam',
            type: 'cua-hang',
            image: PLACEHOLDER_SVG
        }
    ];

    searchAndFilterServicesIndex();
}

// Display services
function displayServicesIndex() {
    const servicesGrid = document.getElementById('servicesGridIndex');
    
    if (!servicesGrid) return;
    
    if (filteredServicesIndex.length === 0) {
        const emptyLabel = currentServicesCategory === 'mua-sam' ? 'điểm mua sắm' : 'điểm ăn uống';
        servicesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Không tìm thấy ${emptyLabel}</h3>
                <p>Vui lòng thử tìm kiếm hoặc lọc khác</p>
            </div>
        `;
        return;
    }
    
    servicesGrid.innerHTML = filteredServicesIndex.map(item => renderServiceCardIndex(item)).join('');
}

// Render service card
function renderServiceCardIndex(item) {
    const rating = getServiceAverageRating(item);
    const visits = item.visits || 0;
    const reviewCount = getPlaceReviews(item.id).length;
    const imgSrc = item.image || PLACEHOLDER_SVG;
    const bookLabel = (item.category || 'am-thuc') === 'am-thuc' ? 'ĐẶT BÀN' : 'LIÊN HềE;

    return `
        <div class="service-card" data-service-id="${item.id}">
            <div class="service-card-image">
                <img src="${imgSrc}" alt="${item.name}" onerror="this.src='${PLACEHOLDER_SVG}'" loading="lazy">
                <div class="service-card-overlay">
                    <button type="button" class="btn-service-action btn-service-detail" onclick="showServiceDetail(${item.id})">CHI TIẾT</button>
                    <button type="button" class="btn-service-action btn-service-book" onclick="openServiceBooking(${item.id})">${bookLabel}</button>
                </div>
            </div>
            <div class="service-card-content">
                <h3>${item.name}</h3>
                <p class="service-address">${item.address}</p>
                <div class="service-info">
                    <span class="service-visits"><i class="fas fa-eye"></i> ${visits} Lượt xem</span>
                </div>
                <div class="service-rating">
                    <div class="service-stars">${generateStars(rating)}</div>
                    <span class="service-reviews">${reviewCount} đánh giá</span>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star\"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt\"></i>';
        } else {
            stars += '<i class="far fa-star\"></i>';
        }
    }
    return stars;
}

// Search and filter services
function searchAndFilterServicesIndex() {
    const searchInput = document.getElementById('searchServicesIndex');
    const priceFilters = document.querySelectorAll('.price-filter-input:checked');
    const businessFilters = document.querySelectorAll('.business-filter-input:checked');
    
    const searchTerm = (searchInput?.value || '').toLowerCase().trim();
    const selectedPrices = Array.from(priceFilters).map(f => f.value);
    const selectedTypes = Array.from(businessFilters).map(f => f.value);
    
    filteredServicesIndex = allServicesIndex.filter(item => {
        const matchesCategory = (item.category || 'am-thuc') === currentServicesCategory;

        const matchesSearch = !searchTerm ||
                            item.name.toLowerCase().includes(searchTerm) ||
                            (item.address && item.address.toLowerCase().includes(searchTerm));

        const matchesPrice = currentServicesCategory !== 'am-thuc' ||
                           selectedPrices.length === 0 ||
                           selectedPrices.includes(item.priceRange);

        const matchesType = selectedTypes.length === 0 ||
                          selectedTypes.includes(item.type);

        return matchesCategory && matchesSearch && matchesPrice && matchesType;
    });
    
    displayServicesIndex();
}

function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && !!getLoggedInUser();
}

function getLoggedInUser() {
    if (typeof currentUser !== 'undefined' && currentUser) return currentUser;
    try {
        const raw = localStorage.getItem('currentUser');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function getPlaceReviewsStorageKey(placeId) {
    return 'placeReviews_' + placeId;
}

function getPlaceReviews(placeId) {
    try {
        const stored = localStorage.getItem(getPlaceReviewsStorageKey(placeId));
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function savePlaceReview(placeId, review) {
    const reviews = getPlaceReviews(placeId);
    reviews.unshift(review);
    localStorage.setItem(getPlaceReviewsStorageKey(placeId), JSON.stringify(reviews));
}

function getServiceById(id) {
    return allServicesIndex.find(item => String(item.id) === String(id));
}

function enrichServicePlace(item) {
    const isFood = (item.category || 'am-thuc') === 'am-thuc';
    const priceParts = (item.priceRange || '0-350000').split('-');
    const priceMax = item.priceMax ?? (parseInt(priceParts[1], 10) || 350000);
    const priceMin = item.priceMin ?? (parseInt(priceParts[0], 10) || 0);

    return {
        ...item,
        phone: item.phone || '0901234567',
        openTime: item.openTime || '07:00',
        closeTime: item.closeTime || '22:00',
        description: item.description || `${item.name}  Eđịa điểm ${isFood ? 'ăn uống' : 'mua sắm'} tại Vĩnh Long, phục vụ du khách trong và ngoài tỉnh.`,
        priceMin,
        priceMax,
        images: item.images && item.images.length ? item.images : [item.image || PLACEHOLDER_SVG, PLACEHOLDER_SVG, PLACEHOLDER_SVG],
        menu: item.menu || (isFood ? [
            { name: 'Món đặc sản 1', image: PLACEHOLDER_SVG },
            { name: 'Món đặc sản 2', image: PLACEHOLDER_SVG },
            { name: 'Món đặc sản 3', image: PLACEHOLDER_SVG }
        ] : []),
        products: item.products || (!isFood ? [
            { name: 'Đặc sản địa phương', image: PLACEHOLDER_SVG },
            { name: 'Quà lưu niệm', image: PLACEHOLDER_SVG },
            { name: 'Thủ công mỹ nghềE, image: PLACEHOLDER_SVG }
        ] : [])
    };
}

function getServiceAverageRating(item) {
    const reviews = getPlaceReviews(item.id);
    if (reviews.length > 0) {
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }
    return item.rating || 4.5;
}

function formatPriceVnd(amount) {
    return Number(amount).toLocaleString('vi-VN') + ' āE;
}

function backToServicesList() {
    const listView = document.getElementById('servicesListView');
    const detailView = document.getElementById('serviceDetailView');
    if (listView) listView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
    currentServiceDetailId = null;
}

function showServiceDetail(id) {
    const raw = getServiceById(id);
    if (!raw) return;

    const place = enrichServicePlace(raw);
    currentServiceDetailId = place.id;
    currentGalleryIndex = 0;
    selectedReviewRating = 0;

    const listView = document.getElementById('servicesListView');
    const detailView = document.getElementById('serviceDetailView');
    if (listView) listView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    const isFood = place.category === 'am-thuc';
    const catLabel = isFood ? 'Ẩm thực' : 'Mua sắm';

    document.getElementById('serviceDetailBreadcrumbCategory').textContent = catLabel;
    document.getElementById('serviceDetailBreadcrumbName').textContent = place.name;
    document.getElementById('serviceDetailOpen').textContent = place.openTime;
    document.getElementById('serviceDetailClose').textContent = place.closeTime;
    document.getElementById('serviceDetailPhone').textContent = place.phone;
    document.getElementById('serviceDetailAddress').textContent = place.address;
    document.getElementById('serviceDetailTitle').textContent = place.name.toUpperCase();
    document.getElementById('serviceDetailPriceRange').textContent =
        formatPriceVnd(place.priceMin) + ' - ' + formatPriceVnd(place.priceMax);
    document.getElementById('serviceDetailDescription').textContent = place.description;

    const bookBtn = document.querySelector('.btn-book-table-top');
    if (bookBtn) bookBtn.textContent = isFood ? 'ĐẶT BÀN' : 'LIÊN HềE;

    document.getElementById('serviceItemsSectionTitle').textContent = isFood ? 'THỰC ĐƠN' : 'SẢN PHẨM NỔI BẬT';
    document.getElementById('serviceItemsSectionDesc').textContent = isFood
        ? 'Tận hưởng không gian ấm cúng và có những bữa ăn ngon miệng bên người thân và gia đình.'
        : 'Khám phá các sản phẩm, đặc sản và quà lưu niệm tại Vĩnh Long.';

    renderServiceGallery(place);
    renderServiceMenuOrProducts(place);
    renderServiceReviews(place.id);
    updateServiceReviewFormVisibility();
    setupReviewStarsInput();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderServiceGallery(place) {
    const mainImg = document.getElementById('serviceGalleryMain');
    const thumbsEl = document.getElementById('serviceGalleryThumbs');
    if (!mainImg || !thumbsEl) return;

    mainImg.src = place.images[currentGalleryIndex] || PLACEHOLDER_SVG;
    mainImg.alt = place.name;

    thumbsEl.innerHTML = place.images.map((src, idx) => `
        <button type="button" class="gallery-thumb ${idx === currentGalleryIndex ? 'active' : ''}"
                onclick="setServiceGalleryIndex(${idx})">
            <img src="${src}" alt="Ảnh ${idx + 1}" onerror="this.src='${PLACEHOLDER_SVG}'">
        </button>
    `).join('');
}

function setServiceGalleryIndex(index) {
    const place = enrichServicePlace(getServiceById(currentServiceDetailId));
    if (!place || !place.images.length) return;
    currentGalleryIndex = (index + place.images.length) % place.images.length;
    renderServiceGallery(place);
}

function changeServiceGallery(direction) {
    setServiceGalleryIndex(currentGalleryIndex + direction);
}

function renderServiceMenuOrProducts(place) {
    const grid = document.getElementById('serviceMenuGrid');
    if (!grid) return;

    const items = place.category === 'am-thuc' ? place.menu : place.products;
    grid.innerHTML = items.map(item => `
        <div class="service-menu-item">
            <img src="${item.image || PLACEHOLDER_SVG}" alt="${item.name}" onerror="this.src='${PLACEHOLDER_SVG}'">
            <p>${item.name}</p>
        </div>
    `).join('');
}

function renderServiceReviews(placeId) {
    const listEl = document.getElementById('serviceReviewsList');
    const countEl = document.getElementById('serviceReviewsCount');
    const reviews = getPlaceReviews(placeId);

    if (countEl) countEl.textContent = reviews.length;

    if (!listEl) return;

    if (reviews.length === 0) {
        listEl.innerHTML = '<p class="reviews-empty">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!</p>';
        return;
    }

    listEl.innerHTML = reviews.map(review => `
        <div class="service-review-item">
            <div class="review-item-header">
                <strong>${review.userName}</strong>
                <span class="review-item-date">${review.date}</span>
            </div>
            <div class="review-item-stars">${generateStars(review.rating)}</div>
            <p class="review-item-comment">${review.comment}</p>
        </div>
    `).join('');
}

function updateServiceReviewFormVisibility() {
    const loggedIn = isUserLoggedIn();
    const formWrap = document.getElementById('serviceReviewFormWrap');
    const loginPrompt = document.getElementById('serviceReviewLoginPrompt');

    if (formWrap) formWrap.style.display = loggedIn ? 'block' : 'none';
    if (loginPrompt) loginPrompt.style.display = loggedIn ? 'none' : 'block';

    if (loggedIn) {
        const user = getLoggedInUser();
        const phoneInput = document.getElementById('bookingPhone');
        if (phoneInput && user?.phone) phoneInput.value = user.phone;
        const nameInput = document.getElementById('bookingName');
        if (nameInput && user?.name) nameInput.value = user.name;
    }
}

function setupReviewStarsInput() {
    const container = document.getElementById('reviewStarsInput');
    if (!container) return;

    container.querySelectorAll('i').forEach(star => {
        star.onclick = function() {
            selectedReviewRating = parseInt(this.getAttribute('data-value'), 10);
            container.querySelectorAll('i').forEach(s => {
                const val = parseInt(s.getAttribute('data-value'), 10);
                s.className = val <= selectedReviewRating ? 'fas fa-star active' : 'far fa-star';
            });
        };
    });

    container.querySelectorAll('i').forEach(s => { s.className = 'far fa-star'; });
    selectedReviewRating = 0;
}

function submitPlaceReview() {
    if (!isUserLoggedIn()) {
        showNotification('Vui lòng đăng nhập đềEđánh giá');
        showLoginPage();
        return;
    }

    if (!currentServiceDetailId) return;

    const comment = (document.getElementById('serviceReviewComment')?.value || '').trim();
    if (selectedReviewRating < 1) {
        showNotification('Vui lòng chọn sềEsao đánh giá');
        return;
    }
    if (!comment) {
        showNotification('Vui lòng nhập bình luận');
        return;
    }

    const user = getLoggedInUser();
    const review = {
        id: Date.now(),
        userId: user.id || user.email,
        userName: user.name || user.email || 'Khách du lịch',
        rating: selectedReviewRating,
        comment,
        date: new Date().toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    };

    savePlaceReview(currentServiceDetailId, review);
    document.getElementById('serviceReviewComment').value = '';
    setupReviewStarsInput();
    renderServiceReviews(currentServiceDetailId);
    displayServicesIndex();
    showNotification('Cảm ơn bạn đã đánh giá!', 'success');
}

function openServiceBooking(id) {
    const placeId = id || currentServiceDetailId;
    const place = enrichServicePlace(getServiceById(placeId));
    if (!place) return;

    const modal = document.getElementById('serviceBookingModal');
    const isFood = place.category === 'am-thuc';

    document.getElementById('bookingModalTitle').textContent = isFood ? 'ĐẶT BÀN' : 'LIÊN HềE/ ĐẶT LỊCH';
    document.getElementById('bookingModalPlace').textContent = place.name;

    const user = getLoggedInUser();
    if (user) {
        const nameEl = document.getElementById('bookingName');
        const phoneEl = document.getElementById('bookingPhone');
        if (nameEl) nameEl.value = user.name || '';
        if (phoneEl) phoneEl.value = user.phone || '';
    }

    const dateEl = document.getElementById('bookingDate');
    if (dateEl) {
        const today = new Date().toISOString().split('T')[0];
        dateEl.min = today;
        if (!dateEl.value) dateEl.value = today;
    }

    if (modal) modal.style.display = 'flex';
}

function closeServiceBooking() {
    const modal = document.getElementById('serviceBookingModal');
    if (modal) modal.style.display = 'none';
}

function submitServiceBooking(event) {
    event.preventDefault();
    closeServiceBooking();
    showNotification('Đặt bàn thành công! Chúng tôi sẽ liên hềExác nhận sớm nhất.', 'success');
    document.getElementById('serviceBookingForm')?.reset();
}

function navigateToServiceDetail(id) {
    showServiceDetail(id);
}

// Setup services event listeners
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchServicesIndex');
    const priceFilters = document.querySelectorAll('.price-filter-input');
    const businessFilters = document.querySelectorAll('.business-filter-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchAndFilterServicesIndex);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchAndFilterServicesIndex();
            }
        });
    }
    
    priceFilters.forEach(filter => {
        filter.addEventListener('change', searchAndFilterServicesIndex);
    });
    
    businessFilters.forEach(filter => {
        filter.addEventListener('change', searchAndFilterServicesIndex);
    });
    
    const searchBtn = document.querySelector('.search-btn-services');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchAndFilterServicesIndex);
    }
    
    const likeBtn = document.querySelector('.like-btn-services');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => console.log('Liked'));
    }
    
    const commentBtn = document.querySelector('.comment-btn-services');
    if (commentBtn) {
        commentBtn.addEventListener('click', () => console.log('Commented'));
    }
});

// ==================== UTILITIES PAGE FUNCTIONS ==================== //

let allUtilitiesIndex = [];
let filteredUtilitiesIndex = [];
let currentUtilitiesCategory = 'all';

const EXCLUDED_UTILITY_CATEGORIES = ['health', 'facilities', 'security', 'accommodation', 'medical'];
const EXCLUDED_UTILITY_KEYWORDS = ['y tế', 'y te', 'toilet', 'công an', 'cong an', 'ềEđâu', 'o dau'];

function filterAllowedUtilities(items) {
    if (!Array.isArray(items)) return [];
    return items.filter(item => {
        const category = (item.category || '').toLowerCase();
        if (EXCLUDED_UTILITY_CATEGORIES.includes(category)) return false;

        const name = (item.name || '').toLowerCase();
        if (EXCLUDED_UTILITY_KEYWORDS.some(keyword => name.includes(keyword))) return false;

        return true;
    });
}

function applyUtilitiesList(items) {
    allUtilitiesIndex = filterAllowedUtilities(items);
    searchAndFilterUtilitiesIndex();
}

// Load utilities
async function loadUtilitiesIndex() {
    try {
        const response = await fetch('/api.php?endpoint=utilities');
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
            applyUtilitiesList(data.data);
            return;
        }
    } catch (error) {
        console.error('Error loading utilities:', error);
    }
    
    loadSampleUtilitiesIndex();
}

// Load sample utilities
function loadSampleUtilitiesIndex() {
    applyUtilitiesList([
        {
            id: 1,
            name: 'ATM',
            icon: 'fa-building-columns',
            category: 'banking',
            description: 'Các cây ATM đềErút tiền mặt',
            color: '#3498db'
        },
        {
            id: 3,
            name: 'Cây Xăng',
            icon: 'fa-gas-pump',
            category: 'fuel',
            description: 'Các trạm xăng dầu',
            color: '#f39c12'
        },
        {
            id: 4,
            name: 'Di chuyển',
            icon: 'fa-car',
            category: 'transport',
            description: 'Dịch vụ taxi, xe khách và phương tiện di chuyển',
            color: '#9b59b6'
        }
    ]);
}

// Display utilities
function displayUtilitiesIndex() {
    const utilitiesGrid = document.getElementById('utilitiesGridIndex');
    
    if (!utilitiesGrid) return;
    
    if (filteredUtilitiesIndex.length === 0) {
        utilitiesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Không tìm thấy tiện ích</h3>
                <p>Vui lòng thử tìm kiếm hoặc lọc khác</p>
            </div>
        `;
        return;
    }
    
    utilitiesGrid.innerHTML = filteredUtilitiesIndex.map(item => renderUtilityCardIndex(item)).join('');
}

// Render utility card
function renderUtilityCardIndex(item) {
    return `
        <div class="utility-card" onclick="navigateToUtilityDetail(${item.id})">
            <div class="utility-card-icon" style="background-color: ${item.color};">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="utility-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="utility-card-arrow">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `;
}

// Show utilities page
function showUtilitiesPage() {
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'block';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    resetUtilitiesCategoryFilter();
    loadUtilitiesIndex();
    window.scrollTo(0, 0);
}

// Search and filter utilities
function searchAndFilterUtilitiesIndex() {
    const searchInput = document.getElementById('searchUtilitiesIndex');
    const searchTerm = (searchInput?.value || '').toLowerCase().trim();
    
    filteredUtilitiesIndex = allUtilitiesIndex.filter(item => {
        const matchesSearch = !searchTerm ||
                            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                            (item.description && item.description.toLowerCase().includes(searchTerm));
        
        const matchesCategory = currentUtilitiesCategory === 'all' || 
                               item.category === currentUtilitiesCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayUtilitiesIndex();
}

// Filter utilities by category (sidebar: transport, dining, shopping)
function filterUtilitiesByCategory(category) {
    if (category === 'accommodation') {
        return;
    }

    document.querySelectorAll('.utilities-menu .menu-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-util-cat') === category);
    });

    if (category === 'dining') {
        showServicesPage('am-thuc');
        return;
    }
    if (category === 'shopping') {
        showServicesPage('mua-sam');
        return;
    }
    if (category === 'transport') {
        // "Di dau?" - mo trang ATM
        if (typeof showAtmPage === 'function') {
            showAtmPage();
        }
        return;
    }

    currentUtilitiesCategory = 'all';
    searchAndFilterUtilitiesIndex();
}

function resetUtilitiesCategoryFilter() {
    currentUtilitiesCategory = 'all';
    document.querySelectorAll('.utilities-menu .menu-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Navigate to utility detail
function navigateToUtilityDetail(id) {
    // id=1 la ATM
    if (id === 1) {
        if (typeof showAtmPage === 'function') { showAtmPage(); }
        return;
    }
    // id=3 la Cay Xang
    if (id === 3) {
        if (typeof showGasStationPage === 'function') { showGasStationPage(); }
        return;
    }
    // id=4 la Di chuyen
    if (id === 4) {
        if (typeof showTransportPage === 'function') { showTransportPage(); }
        return;
    }
    console.log('Utility detail:', id);
}

// Setup utilities event listeners
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchUtilitiesIndex');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchAndFilterUtilitiesIndex);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchAndFilterUtilitiesIndex();
            }
        });
    }
    
    const searchBtn = document.querySelector('.search-btn-utilities');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchAndFilterUtilitiesIndex);
    }
});

// ==================== FEEDBACK PAGE FUNCTIONS ==================== //

// Show feedback page (only if logged in)
function showFeedbackPage() {
    // Check if user is logged in
    if (!isLoggedIn) {
        showNotification('Vui lòng đăng nhập đềEsử dụng chức năng này');
        showLoginPage();
        return;
    }

    // Hide all sections
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    
    // Show feedback section
    document.getElementById('feedbackSection').style.display = 'block';
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const feedbackLink = Array.from(document.querySelectorAll('.nav-item')).find(item => 
        item.textContent.includes('PHẢN HỒI')
    );
    if (feedbackLink) {
        feedbackLink.classList.add('active');
    }

    // Load feedback list and set current date/time
    loadFeedbackList();
    updateFeedbackDateTime();
    window.scrollTo(0, 0);
}

// Update feedback form date/time
function updateFeedbackDateTime() {
    const dateField = document.getElementById('feedbackDate');
    if (dateField) {
        const now = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        dateField.value = now.toLocaleDateString('vi-VN', options);
    }
}

// Load feedback list
function loadFeedbackList() {
    // In a real application, this would fetch from an API
    // For now, we'll load sample data
    loadSampleFeedback();
    displayFeedbackList();
}

// Load sample feedback data
function loadSampleFeedback() {
    allFeedback = [
        {
            id: 1,
            name: 'NguyềE Văn A',
            email: 'nguyenvana@email.com',
            date: '20/05/2026 10:30',
            subject: 'Cải thiện thông tin du lịch',
            content: 'Tôi muốn gợi ý thêm thông tin vềEcác điểm du lịch mới trong tỉnh',
            status: 'resolved'
        },
        {
            id: 2,
            name: 'Trần ThềEB',
            email: 'tranthib@email.com',
            date: '19/05/2026 14:45',
            subject: 'Phản hồi vềEdịch vụ',
            content: 'Dịch vụ rất tốt, nhân viên rất thân thiện và chuyên nghiệp',
            status: 'resolved'
        },
        {
            id: 3,
            name: 'Lê Hồng C',
            email: 'lehongc@email.com',
            date: '18/05/2026 16:20',
            subject: 'Yêu cầu cập nhật bản đềE,
            content: 'Yêu cầu cập nhật thêm thông tin vềEcác tuyến vận chuyển công cộng',
            status: 'new'
        }
    ];
}

// Display feedback list
function displayFeedbackList() {
    const feedbackListContainer = document.getElementById('feedbackList');
    
    if (!allFeedback || allFeedback.length === 0) {
        feedbackListContainer.innerHTML = '<div class="loading">Chưa có phản hồi nào</div>';
        return;
    }

    feedbackListContainer.innerHTML = allFeedback.map(item => `
        <div class="feedback-item">
            <div class="feedback-item-header">
                <span class="feedback-item-name">${item.name}</span>
                <span class="feedback-item-date">${item.date}</span>
            </div>
            <div class="feedback-item-subject">${item.subject}</div>
            <div class="feedback-item-content">${item.content}</div>
            <span class="feedback-item-status ${item.status}">
                ${item.status === 'resolved' ? 'Đã xử lý' : 'Mới'}
            </span>
        </div>
    `).join('');
}

// Handle feedback form submission
function handleFeedbackSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const subject = document.getElementById('feedbackSubject').value.trim();
    const content = document.getElementById('feedbackContent').value.trim();
    const recaptcha = document.getElementById('feedbackRecaptcha').checked;

    // Validation
    if (!name || !email || !subject || !content) {
        showNotification('Vui lòng điền đầy đủ tất cả thông tin bắt buộc');
        return;
    }

    if (!recaptcha) {
        showNotification('Vui lòng xác nhận rằng bạn không phải là robot');
        return;
    }

    // Create feedback object
    const newFeedback = {
        id: allFeedback.length + 1,
        name: name,
        email: email,
        date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        subject: subject,
        content: content,
        status: 'new'
    };

    // Add to feedback list
    allFeedback.unshift(newFeedback);

    // Show success notification
    showNotification('Phản hồi của bạn đã được gửi thành công!');

    // Clear form
    document.getElementById('feedbackForm').reset();
    updateFeedbackDateTime();

    // Refresh feedback list
    displayFeedbackList();
}

// Setup feedback event listeners
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }

    const captureBtn = document.querySelector('.btn-capture');
    if (captureBtn) {
        captureBtn.addEventListener('click', function() {
            showNotification('Chức năng chụp hình sẽ được cập nhật sớm!');
        });
    }
});

// ==================== AUTHENTICATION FUNCTIONS ==================== //

// Show login page
function showLoginPage() {
    document.body.classList.add('auth-active');
    stopHomeBannerAutoplay();
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('adminDashboardSection').style.display = 'none';
    document.getElementById('digitalMapSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registrationSection').style.display = 'none';
    
    // Show user login form, hide admin login form
    const userLoginForm = document.getElementById('userLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (userLoginForm) userLoginForm.style.display = 'block';
    if (adminLoginForm) adminLoginForm.style.display = 'none';
    
    // Clear forms
    document.getElementById('loginForm').reset();
    window.scrollTo(0, 0);
}

// Show registration page
function showRegistrationPage() {
    document.body.classList.add('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'block';
    
    // Clear forms
    document.getElementById('registrationForm').reset();
}

// Show admin login form
function showAdminLoginForm() {
    document.body.classList.add('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('adminDashboardSection').style.display = 'none';
    document.getElementById('digitalMapSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registrationSection').style.display = 'none';

    const userLoginForm = document.getElementById('userLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (userLoginForm) userLoginForm.style.display = 'none';
    if (adminLoginForm) adminLoginForm.style.display = 'block';
    window.scrollTo(0, 0);
}

// Show home page and hide other sections
function showHomePage() {
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('adminDashboardSection').style.display = 'none';
    document.getElementById('digitalMapSection').style.display = 'none';

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const homeNav = document.querySelector('.nav-item[href*="showHomePage"]') || document.querySelector('.nav-item');
    if (homeNav) homeNav.classList.add('active');

    initHomeBannerCarousel();
    loadHomeNewsPreview();
    loadHomeAttractionsPreview();
    window.scrollTo(0, 0);
}

// Handle login form submission
/**
 * NOTE: handleLoginSubmit() has been moved to login-integration.js
 * with proper password validation. This function should NOT be used.
 * The new implementation validates both username and password correctly.
 */

// MOVED TO login-integration.js
// Registration form handling is now in login-integration.js to avoid duplicate functions
// that override the correct validation logic

// Handle Google login
function handleGoogleLogin() {
    // Placeholder for Google OAuth integration
    showNotification('Chức năng Google Login sẽ được cập nhật sớm!');
    console.log('Google login handler - to be implemented with OAuth credentials');
}

// Handle Google registration
function handleGoogleRegister() {
    // Placeholder for Google OAuth integration
    // In a real implementation, this would use Google OAuth credentials
    // For now, we'll create a mock Google user
    
    const mockGoogleUser = {
        id: adminData && adminData.users ? adminData.users.length + 1 : 1,
        firstName: 'Google',
        lastName: 'User',
        username: 'googleuser_' + Date.now(),
        email: 'user@example.com',
        phone: 'N/A',
        address: 'N/A',
        birthDate: 'N/A',
        country: 'VN',
        gender: 'N/A',
        occupation: 'N/A',
        role: 'user',
        loginMethod: 'google',
        registrationDate: new Date().toLocaleDateString('vi-VN'),
        password: null // Google OAuth, no password needed
    };
    
    // Store user data in admin dashboard if it's available
    if (typeof adminData !== 'undefined' && adminData) {
        if (!adminData.users) {
            adminData.users = [];
        }
        adminData.users.push(mockGoogleUser);
        console.log('Google user registered and stored:', mockGoogleUser);
    } else {
        // Fallback: store in localStorage
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        users.push(mockGoogleUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        console.log('Google user registered and stored in localStorage:', mockGoogleUser);
    }
    
    // Store current user login state
    currentUser = mockGoogleUser;
    isLoggedIn = true;
    
    showNotification('Đăng ký bằng Google thành công!');
    console.log('Google register handler - user registered with Google OAuth');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('successNotification');
    document.getElementById('notificationMessage').textContent = message;
    notification.classList.add('show');
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Set up login button handler
function setupAuthHandlers() {
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginPage);
    }
}

// ==================== CONSOLE MESSAGES ==================== //
console.log('%c🌿 Vinh Long Tourist', 'font-size: 20px; font-weight: bold; color: #d4854c;');
console.log('%cWelcome to Vinh Long Tourist Portal!', 'font-size: 14px; color: #003a7a;');
console.log('%cNote: Features marked as "Under Development" will be available soon.', 'font-size: 12px; color: #666;');

// ==================== EXPORT GLOBAL FUNCTIONS ==================== //
// Make all functions globally accessible
window.showNewsPage = showNewsPage;
window.showHomePage = showHomePage;
window.showLoginPage = showLoginPage;
window.showRegistrationPage = showRegistrationPage;
window.showServicesPage = showServicesPage;
window.switchServicesCategory = switchServicesCategory;
window.showServiceDetail = showServiceDetail;
window.backToServicesList = backToServicesList;
window.openServiceBooking = openServiceBooking;
window.closeServiceBooking = closeServiceBooking;
window.submitServiceBooking = submitServiceBooking;
window.submitPlaceReview = submitPlaceReview;
window.changeServiceGallery = changeServiceGallery;
window.setServiceGalleryIndex = setServiceGalleryIndex;
window.showUtilitiesPage = showUtilitiesPage;
window.showFeedbackPage = showFeedbackPage;
window.loadNews = loadNews;
window.displayNews = displayNews;
window.showNewsDetail = showNewsDetail;
window.loadUtilitiesIndex = loadUtilitiesIndex;
window.displayUtilitiesIndex = displayUtilitiesIndex;
window.filterUtilitiesByCategory = filterUtilitiesByCategory;
window.searchAndFilterUtilitiesIndex = searchAndFilterUtilitiesIndex;
window.navigateToUtilityDetail = navigateToUtilityDetail;
// ==================== ATTRACTIONS PAGE FUNCTIONS ==================== //

// Sample attractions data
let allAttractions = [];

// Show attractions page
function showAttractionsPage() {
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'block';
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const attractionsNav = Array.from(document.querySelectorAll('.nav-item')).find(
        item => item.textContent.trim() === 'ĐIềE THAM QUAN'
    );
    if (attractionsNav) {
        attractionsNav.classList.add('active');
    }
    
    // Load attractions list
    loadAttractionsList();
    window.scrollTo(0, 0);
}

// Load attractions data
function loadAttractionsList() {
    // Load sample attractions if not already loaded
    if (allAttractions.length === 0) {
        loadSampleAttractions();
    }
    displayAttractionsList();
}

// Sample attractions data
function loadSampleAttractions() {
    allAttractions = [
        {
            id: 1,
            name: "Chùa Mương Cầu Long",
            type: "Du lịch sinh thái - nghi dưỡng",
            location: "Xã An Bình, Tỉnh Vĩnh Long",
            description: "Chùa cềEkính với kiến trúc độc đáo, là điểm tham quan tâm linh nổi tiếng của vùng. Du khách có thềEtham quan, chiêm bái Phật, thưởng ngoạn vườn cây quanh chùa.",
            fee: "MiềE phí",
            category: "cultural",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 2,
            name: "Khu Du Lịch Sinh Thái Vàm CềE,
            type: "Du lịch sinh thái - nghi dưỡng",
            location: "Xã Thạch Liên, Tỉnh Vĩnh Long",
            description: "Khu du lịch sinh thái với cảnh quan tự nhiên hùng vĩ, là thiên đường cho những người yêu thích thiên nhiên. Có các hoạt động như chèo thuyền, câu cá, tham quan vườn cây ăn quả.",
            fee: "50.000 - 100.000 VND",
            category: "nature",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 3,
            name: "Sân Bay CềEQuạng",
            type: "Du lịch vui chơi, giải trí",
            location: "Huyện Vĩnh Long",
            description: "Khu vực du lịch hỗn hợp với các hoạt động vui chơi, giải trí, có sân bay dã ngoại, sân chơi cho trẻ em, quán cà phê, nhà hàng.",
            fee: "Có phí",
            category: "recreation",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 4,
            name: "Bảo Tàng Lịch Sử Vĩnh Long",
            type: "Bảo tàng",
            location: "Thành phềEVĩnh Long",
            description: "Bảo tàng bảo quản những di vật lịch sử quan trọng của tỉnh Vĩnh Long, giới thiệu vềElịch sử, văn hóa và con người địa phương.",
            fee: "20.000 - 50.000 VND",
            category: "cultural",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 5,
            name: "Đình Huỳnh Thủy Lê",
            type: "Du lịch lịch sử - văn hóa cấp quốc gia",
            location: "Thành phềEVĩnh Long",
            description: "Công trình kiến trúc cềEkính, lưu giữ những giá trềElịch sử quốc gia. Là nơi cung cấp thông tin vềEcác nhân vật lịch sử, sự kiện quan trọng.",
            fee: "MiềE phí",
            category: "history",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 6,
            name: "Làng NghềETrồng Lúa Nâng Cao",
            type: "Làng nghềEtruyền thống",
            location: "Huyện Bình Tân, Tỉnh Vĩnh Long",
            description: "Làng nghềEgiáo dục khách hàng vềEphương pháp nông nghiệp bền vững. Du khách có thềEtham gia vào các hoạt động nông nghiệp, tìm hiểu vềEcuộc sống của nông dân địa phương.",
            fee: "30.000 - 80.000 VND",
            category: "education",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 7,
            name: "Cơm Lam - Quán Nhà Vườn",
            type: "Du lịch vui chơi, giải trí",
            location: "Xã Tân Phú, Tỉnh Vĩnh Long",
            description: "Quán nhà vườn độc đáo với phong cách kiến trúc truyền thống, nơi phục vụ những món ăn đặc sản địa phương. Không gian yên tĩnh, thoáng mát, lý tưởng cho gia đình.",
            fee: "Có phí",
            category: "recreation",
            imageUrl: PLACEHOLDER_SVG
        },
        {
            id: 8,
            name: "Vườn Cây Ăn Quả Trái Tươi",
            type: "Du lịch sinh thái - nghi dưỡng",
            location: "Huyện Mang Thít, Tỉnh Vĩnh Long",
            description: "Vườn cây ăn quả được chăm sóc khoa học, du khách có thềEtham quan, hái trái, mua các sản phẩm tươi mới trực tiếp từ vườn.",
            fee: "MiềE phí",
            category: "nature",
            imageUrl: PLACEHOLDER_SVG
        }
    ];
}

// Display attractions list
function displayAttractionsList() {
    const attractionsList = document.getElementById('attractionsList');
    
    if (!attractionsList || allAttractions.length === 0) {
        if (attractionsList) {
            attractionsList.innerHTML = '<div class="loading">Không có dữ liệu điểm tham quan</div>';
        }
        return;
    }
    
    // Build attractions grid
    let html = '';
    allAttractions.forEach(attraction => {
        html += `
            <div class="attraction-card">
                <div class="attraction-image">
                    <i class="fas fa-image"></i>
                    <span class="attraction-badge">${attraction.fee}</span>
                </div>
                <div class="attraction-content">
                    <h3>${attraction.name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${attraction.location}
                    </div>
                    <p class="description">${attraction.description}</p>
                    <div class="attraction-footer">
                        <span class="attraction-type">${attraction.type}</span>
                        <button class="attraction-action" title="Thích">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    attractionsList.innerHTML = html;
    
    // Add event listeners to action buttons
    document.querySelectorAll('.attraction-action').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.opacity = '0.6';
            setTimeout(() => {
                this.style.opacity = '1';
                if (this.querySelector('i').classList.contains('fa-heart')) {
                    this.querySelector('i').classList.toggle('fas');
                    showNotification('Đã thêm vào danh sách yêu thích!');
                }
            }, 200);
        });
    });
}

// Filter attractions by category
function filterAttractions(category) {
    if (category === 'all') {
        loadSampleAttractions();
    } else {
        allAttractions = allAttractions.filter(item => item.category === category);
    }
    displayAttractionsList();
}

// Setup attractions event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.attraction-filter');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Filter by selected categories
            const selectedCategories = Array.from(filterCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            // TODO: Implement filtering by selected categories
            console.log('Selected categories:', selectedCategories);
        });
    });
    
    // Search functionality
    const attractionSearch = document.getElementById('attractionSearch');
    if (attractionSearch) {
        attractionSearch.addEventListener('keyup', function(e) {
            const query = this.value.toLowerCase();
            // TODO: Implement search functionality
            console.log('Searching for:', query);
        });
    }
});

// ==================== PAGE DISPLAY FUNCTIONS ==================== //

// Show feedback page
function showFeedbackPage() {
    if (!isLoggedIn) {
        showNotification('Vui lòng đăng nhập đềEsử dụng chức năng này');
        showLoginPage();
        return;
    }
    
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'block';
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const feedbackNav = Array.from(document.querySelectorAll('.nav-item')).find(
        item => item.textContent.trim() === 'PHẢN HỒI'
    );
    if (feedbackNav) {
        feedbackNav.classList.add('active');
    }
    
    // Load feedback data
    loadFeedbackList();
    updateFeedbackDateTime();
    window.scrollTo(0, 0);
}

// ==================== DIGITAL MAP PAGE ==================== //
let allMapPlaces = [];

function showDigitalMapPage() {
    document.body.classList.remove('auth-active');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    document.getElementById('servicesSection').style.display = 'none';
    document.getElementById('utilitiesSection').style.display = 'none';
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('attractionsSection').style.display = 'none';
    document.getElementById('digitalMapSection').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const mapNav = Array.from(document.querySelectorAll('.nav-item')).find(
        item => item.textContent.trim() === 'BẢN ĐềESềE
    );
    if (mapNav) {
        mapNav.classList.add('active');
    }
    
    loadMapPlaces();
    window.scrollTo(0, 0);
}

function loadMapPlaces() {
    if (allMapPlaces.length === 0) {
        loadSampleMapPlaces();
    }
    displayMapPlaces();
}

function loadSampleMapPlaces() {
    // Sample places with only restaurants and attractions
    allMapPlaces = [
        // Restaurants / Dining
        {
            id: 1,
            name: 'Nhà Hàng Cơm Lam Vĩnh Long',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Xã Tân Phú',
            description: 'Nhà hàng chuyên phục vụ các món ăn địa phương với không gian thoải mái, thân thiện',
            address: '123 Đường Lê ThềERiêng, Xã Tân Phú',
            phone: '(0270) 123 4567',
            lat: 9.9365,
            lng: 105.9761
        },
        {
            id: 2,
            name: 'Quán Ăn Bà Năm',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Thành phềEVĩnh Long',
            description: 'Quán ăn nổi tiếng với các món cơm, canh và các đặc sản miền Tây',
            address: '456 NguyềE HuềE Thành phềEVĩnh Long',
            phone: '(0270) 987 6543',
            lat: 9.9355,
            lng: 105.9767
        },
        {
            id: 3,
            name: 'Nhà Hàng Mekong Riverside',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Thành phềEVĩnh Long',
            description: 'Nhà hàng sang trọng với view sông Hậu, phục vụ ẩm thực Việt Nam và quốc tế',
            address: '789 Phạm Hùng, Thành phềEVĩnh Long',
            phone: '(0270) 456 7890',
            lat: 9.9347,
            lng: 105.9775
        },
        {
            id: 4,
            name: 'Quán Cơm Gà Mạnh',
            category: 'restaurant',
            categoryDisplay: 'Ăn Uống',
            location: 'Xã An Bình',
            description: 'Chuyên phục vụ cơm gà nước mắm, gà nướng và các món ăn kèm đặc sản địa phương',
            address: '321 Quốc LềE1A, Xã An Bình',
            phone: '(0270) 234 5678',
            lat: 9.9308,
            lng: 105.9822
        },
        // Attractions
        {
            id: 5,
            name: 'Chùa Mương Cầu Long',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Xã An Bình',
            description: 'Công trình tôn giáo lịch sử nổi tiếng với kiến trúc độc đáo và không gian linh thiêng',
            address: 'Xã An Bình, Huyện Vĩnh Long',
            phone: 'Liên hềEchính quyền địa phương',
            lat: 9.9300,
            lng: 105.9830
        },
        {
            id: 6,
            name: 'Khu Du Lịch Sinh Thái Vàm CềE,
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Xã Thạch Liên',
            description: 'Khu du lịch sinh thái với cảnh đẹp thiên nhiên, thích hợp cho các hoạt động ngoài trời',
            address: 'Xã Thạch Liên, Huyện Bình Tân',
            phone: '(0270) 678 9012',
            lat: 9.8850,
            lng: 105.8645
        },
        {
            id: 7,
            name: 'Bảo Tàng Lịch Sử Vĩnh Long',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Thành phềEVĩnh Long',
            description: 'Bảo tàng lưu giữ các tài liệu quý giá vềElịch sử phát triển của tỉnh Vĩnh Long',
            address: '807 NguyềE Thái Học, Thành phềEVĩnh Long',
            phone: '(0270) 345 6789',
            lat: 9.9362,
            lng: 105.9758
        },
        {
            id: 8,
            name: 'Đình Huỳnh Thủy Lê',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Thành phềEVĩnh Long',
            description: 'Di tích lịch sử văn hóa nơi thềEvềEanh hùng dân tộc, có giá trềEvềElịch sử và văn hóa',
            address: '1000 Hoàng Thái Bình, Thành phềEVĩnh Long',
            phone: 'Liên hềEchính quyền địa phương',
            lat: 9.9343,
            lng: 105.9785
        },
        {
            id: 9,
            name: 'Làng NghềETrồng Lúa',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Huyện Bình Tân',
            description: 'Làng nghềEtruyền thống nơi khách có thềEtrải nghiệm cuộc sống nông thôn Vĩnh Long',
            address: 'Huyện Bình Tân, Tỉnh Vĩnh Long',
            phone: '(0270) 567 8901',
            lat: 9.8700,
            lng: 105.8500
        },
        {
            id: 10,
            name: 'Vườn Cây Ăn Quả Trái',
            category: 'attraction',
            categoryDisplay: 'Điểm Tham Quan',
            location: 'Huyện Mang Thít',
            description: 'Vườn cây ăn quả lâu đời với nhiều loại trái cây đặc sản của vùng đất cấp bã',
            address: 'Huyện Mang Thít, Tỉnh Vĩnh Long',
            phone: '(0270) 789 0123',
            lat: 9.8400,
            lng: 105.7900
        }
    ];
}

function displayMapPlaces() {
    const placesList = document.getElementById('mapPlacesList');
    if (!placesList) return;
    
    if (allMapPlaces.length === 0) {
        placesList.innerHTML = '<div class="loading">Không có địa điểm nào</div>';
        return;
    }
    
    placesList.innerHTML = allMapPlaces.map(place => `
        <div class="place-item" onclick="selectMapPlace(${place.id})">
            <div class="place-item-name">
                ${place.name}
            </div>
            <div class="place-item-category">
                <i class="fas fa-map-marker-alt"></i> ${place.location}
            </div>
        </div>
    `).join('');
    
    // Initialize map
    initializeMap();
}

function selectMapPlace(placeId) {
    const placesList = document.querySelectorAll('.place-item');
    placesList.forEach(item => item.classList.remove('active'));
    event.target.closest('.place-item').classList.add('active');
    
    const place = allMapPlaces.find(p => p.id === placeId);
    if (place) {
        console.log('Selected place:', place.name);
    }
}

function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;
    
    // Create simple map representation
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map"></i>
            <p>Bản ĐềETương Tác</p>
            <small>Vĩnh Long, Việt Nam</small>
            <div style="margin-top: 20px; font-size: 12px; color: #666;">
                <p>${allMapPlaces.length} địa điểm hiển thềE/p>
                <p style="margin-top: 10px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: #e74c3c; border-radius: 50%; margin-right: 5px;"></span>
                    Ăn Uống (${allMapPlaces.filter(p => p.category === 'restaurant').length})
                </p>
                <p style="margin-top: 5px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: #3498db; border-radius: 50%; margin-right: 5px;"></span>
                    Điểm Tham Quan (${allMapPlaces.filter(p => p.category === 'attraction').length})
                </p>
            </div>
        </div>
    `;
}

function filterMapByCategory(category) {
    const filtered = category ? allMapPlaces.filter(p => p.category === category) : allMapPlaces;
    console.log(`Filtered ${filtered.length} places by category: ${category}`);
}

// ==================== ADMIN DASHBOARD ==================== //

// Global Admin Data
let adminLogged = false;
let currentAdminPage = 'welcome';
let adminData = {
    banners: [
        { id: 1, title: 'LềEhội ẩm thực Vĩnh Long', content: 'Sự kiện ẩm thực truyền thống', image: '/images/banners/banner-01.png', active: true },
        { id: 2, title: 'Cầu Mỹ Thuận', content: 'Biểu tượng giao thông Vĩnh Long', image: '/images/banners/banner-02.png', active: true },
        { id: 3, title: 'Du thuyền sông nước', content: 'Trải nghiệm du lịch sinh thái', image: '/images/banners/banner-03.png', active: true },
        { id: 4, title: 'Du thuyền sông nước', content: 'Khám phá kênh rạch Vĩnh Long', image: '/images/banners/banner-04.png', active: true },
        { id: 5, title: 'Bến tàu du lịch', content: 'Trải nghiệm tour thuyền', image: '/images/banners/banner-05.png', active: true }
    ],
    news: [
        { id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1', date: '2026-05-20', category: 'events', active: true },
        { id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2', date: '2026-05-19', category: 'updates', active: true }
    ],
    services: [
        { id: 1, title: 'Dịch vụ 1', description: 'Mô tả dịch vụ 1', price: '100000', active: true },
        { id: 2, title: 'Dịch vụ 2', description: 'Mô tả dịch vụ 2', price: '200000', active: true }
    ],
    feedback: [
        { id: 1, name: 'NguyềE Văn A', email: 'a@example.com', subject: 'Phản hồi 1', message: 'Nội dung phản hồi 1', date: '2026-05-20', status: 'new' },
        { id: 2, name: 'Trần ThềEB', email: 'b@example.com', subject: 'Phản hồi 2', message: 'Nội dung phản hồi 2', date: '2026-05-19', status: 'resolved' }
    ],
    attractions: allAttractions.slice(),
    mapPlaces: allMapPlaces.slice(),
    users: []  // User accounts array - will be populated by registration
};

let editingId = null;
let editingType = null;

/**
 * Handle admin login form submission
 * NOTE: This function is defined in login-integration.js with proper validation
 * and will be used instead of this placeholder
 */
// Removed: handleAdminLogin() - now using the one from login-integration.js

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
    if (document.getElementById('atmSection')) document.getElementById('atmSection').style.display = 'none';
    if (document.getElementById('gasStationSection')) document.getElementById('gasStationSection').style.display = 'none';
    if (document.getElementById('transportSection')) document.getElementById('transportSection').style.display = 'none';
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

/**
 * Show admin management page for a specific type
 */
function showAdminManage(type) {
    if (!adminLogged) return;
    
    currentAdminPage = type;
    displayAdminContent(type);
    window.scrollTo(0, 0);
}

/**
 * Display admin content based on type
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
            headerTitle.textContent = 'QUẢN LÁEBANNER';
            headerSubtitle.textContent = 'Quản lý các banner trên trang chủ';
            html = renderBannerManagement();
            break;
        case 'news':
            pageTitle.textContent = 'Quản Lý Tin Tức';
            headerTitle.textContent = 'QUẢN LÁETIN TỨC';
            headerSubtitle.textContent = 'Quản lý các bài tin tức';
            html = renderNewsManagement();
            break;
        case 'services':
            pageTitle.textContent = 'Quản Lý Dịch Vụ';
            headerTitle.textContent = 'QUẢN LÁEDỊCH VỤ';
            headerSubtitle.textContent = 'Quản lý các dịch vụ';
            html = renderServicesManagement();
            break;
        case 'feedback':
            pageTitle.textContent = 'Quản Lý Phản Hồi';
            headerTitle.textContent = 'QUẢN LÁEPHẢN HỒI';
            headerSubtitle.textContent = 'Xem và quản lý phản hồi từ khách hàng';
            html = renderFeedbackManagement();
            break;
        case 'attractions':
            pageTitle.textContent = 'Quản Lý Điểm Tham Quan';
            headerTitle.textContent = 'QUẢN LÁEĐIềE THAM QUAN';
            headerSubtitle.textContent = 'Quản lý các điểm tham quan';
            html = renderAttractionsManagement();
            break;
        case 'map':
            pageTitle.textContent = 'Quản Lý Bản ĐềESềE;
            headerTitle.textContent = 'QUẢN LÁEBẢN ĐềESềE;
            headerSubtitle.textContent = 'Quản lý các địa điểm trên bản đềE;
            html = renderMapManagement();
            break;
        case 'accounts':
            pageTitle.textContent = 'Quản Lý Tài Khoản';
            headerTitle.textContent = 'QUẢN LÁETÀI KHOẢN';
            headerSubtitle.textContent = 'Quản lý tài khoản truy cập trang web';
            html = renderAccountsManagement();
            break;
        default:
            pageTitle.textContent = 'Quản Lý';
            html = '<div class="admin-welcome"><i class="fas fa-chart-line"></i><h3>Chào mừng bạn đến bảng điều khiển quản trềE/h3><p>Chọn một mục từ menu bên trái đềEbắt đầu quản lý</p></div>';
    }
    
    adminContent.innerHTML = html;
}

function renderBannerManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Banner</h3>
                <button class="btn-add-new" onclick="editingId=null; editingType='banner'; showAdminEditForm('banner', null)">
                    <i class="fas fa-plus"></i> Thêm Banner
                </button>
            </div>
            
            <div id="bannerForm" style="display:none;" class="admin-form-container">
                <div class="admin-form-row admin-form-full">
                    <div class="admin-form-group">
                        <label>Tiêu ĐềE*</label>
                        <input type="text" id="bannerTitle" placeholder="Tiêu đềEbanner">
                    </div>
                </div>
                <div class="admin-form-row admin-form-full">
                    <div class="admin-form-group">
                        <label>Nội Dung *</label>
                        <textarea id="bannerContent" placeholder="Nội dung banner"></textarea>
                    </div>
                </div>
                <div class="admin-form-row admin-form-full">
                    <div class="admin-form-group">
                        <label>Hình Ảnh *</label>
                        <input type="text" id="bannerImage" placeholder="Đường dẫn hình ảnh">
                    </div>
                </div>
                <div class="admin-form-row admin-form-full">
                    <div class="admin-form-group">
                        <label>
                            <input type="checkbox" id="bannerActive" checked>
                            Kích Hoạt
                        </label>
                    </div>
                </div>
                <div class="admin-form-actions">
                    <button class="btn-admin-submit" onclick="saveBanner()"><i class="fas fa-save"></i> Lưu</button>
                    <button class="btn-admin-cancel" onclick="editingId=null; document.getElementById('bannerForm').style.display='none'"><i class="fas fa-times"></i> Hủy</button>
                </div>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu ĐềE/th>
                        <th>Nội Dung</th>
                        <th>Hình Ảnh</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.banners.map(banner => `
                        <tr>
                            <td>${banner.id}</td>
                            <td>${banner.title}</td>
                            <td>${banner.content.substring(0, 30)}...</td>
                            <td>${banner.image}</td>
                            <td><span class="status-badge ${banner.active ? 'active' : 'inactive'}">${banner.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                            <td class="actions">
                                <button class="btn-admin-edit" onclick="editBanner(${banner.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-admin-delete" onclick="deleteBanner(${banner.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderNewsManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Tin Tức</h3>
                <button class="btn-add-new" onclick="editingId=null; showAdminEditForm('news', null)">
                    <i class="fas fa-plus"></i> Thêm Tin Tức
                </button>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu ĐềE/th>
                        <th>Danh Mục</th>
                        <th>Ngày Tạo</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.news.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.category}</td>
                            <td>${item.date}</td>
                            <td><span class="status-badge ${item.active ? 'active' : 'inactive'}">${item.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                            <td class="actions">
                                <button class="btn-admin-edit" onclick="editNews(${item.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-admin-delete" onclick="deleteNews(${item.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderServicesManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Dịch Vụ</h3>
                <button class="btn-add-new" onclick="editingId=null; showAdminEditForm('services', null)">
                    <i class="fas fa-plus"></i> Thêm Dịch Vụ
                </button>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Dịch Vụ</th>
                        <th>Mô Tả</th>
                        <th>Giá</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.services.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.description.substring(0, 30)}...</td>
                            <td>${item.price}</td>
                            <td><span class="status-badge ${item.active ? 'active' : 'inactive'}">${item.active ? 'Kích Hoạt' : 'Vô Hiệu'}</span></td>
                            <td class="actions">
                                <button class="btn-admin-edit" onclick="editService(${item.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-admin-delete" onclick="deleteService(${item.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderFeedbackManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Phản Hồi (${adminData.feedback.length})</h3>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Chủ ĐềE/th>
                        <th>Ngày</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.feedback.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.subject}</td>
                            <td>${item.date}</td>
                            <td><span class="status-badge ${item.status === 'new' ? 'active' : 'inactive'}">${item.status === 'new' ? 'Mới' : 'Đã Xử Lý'}</span></td>
                            <td class="actions">
                                <button class="btn-admin-delete" onclick="deleteFeedback(${item.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAttractionsManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Điểm Tham Quan</h3>
                <button class="btn-add-new" onclick="editingId=null; showAdminEditForm('attractions', null)">
                    <i class="fas fa-plus"></i> Thêm Điểm Tham Quan
                </button>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Địa Điểm</th>
                        <th>Mô Tả</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.attractions.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.location}</td>
                            <td>${item.description.substring(0, 30)}...</td>
                            <td class="actions">
                                <button class="btn-admin-edit" onclick="editAttraction(${item.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-admin-delete" onclick="deleteAttraction(${item.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderMapManagement() {
    return `
        <div class="admin-form-wrapper">
            <div class="admin-form-header">
                <h3>Danh Sách Địa Điểm Bản ĐềE/h3>
                <button class="btn-add-new" onclick="editingId=null; showAdminEditForm('map', null)">
                    <i class="fas fa-plus"></i> Thêm Địa Điểm
                </button>
            </div>
            
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Địa Điểm</th>
                        <th>Điện Thoại</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.mapPlaces.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.categoryDisplay}</td>
                            <td>${item.location}</td>
                            <td>${item.phone}</td>
                            <td class="actions">
                                <button class="btn-admin-edit" onclick="editMapPlace(${item.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-admin-delete" onclick="deleteMapPlace(${item.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAccountsManagement() {
    return `
        <div class="admin-form-wrapper">
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
                        <span class="summary-label">Quản TrềEViên</span>
                        <span class="summary-value">${adminData.users.filter(u => u.role === 'admin').length}</span>
                    </div>
                </div>
            </div>
            
            ${adminData.users.length === 0 ? '<p class="no-data-message">Chưa có tài khoản nào được đăng ký.</p>' : `
            <table class="admin-table accounts-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>HềE& Tên</th>
                        <th>Tên Đăng Nhập</th>
                        <th>Email</th>
                        <th>SềEĐT</th>
                        <th>Địa ChềE/th>
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
                        <td><span class="role-badge role-${u.role}">${u.role === 'admin' ? 'Quản TrềEViên' : 'Người Dùng'}</span></td>
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
            `}
        </div>
    `;
}

// CRUD Functions
function saveBanner() {
    const title = document.getElementById('bannerTitle')?.value;
    const content = document.getElementById('bannerContent')?.value;
    const image = document.getElementById('bannerImage')?.value;
    const active = document.getElementById('bannerActive')?.checked;
    
    if (!title || !content) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    if (editingId) {
        const banner = adminData.banners.find(b => b.id === editingId);
        if (banner) {
            banner.title = title;
            banner.content = content;
            banner.image = image;
            banner.active = active;
            showNotification('Cập nhật banner thành công!', 'success');
        }
    } else {
        const newId = Math.max(...adminData.banners.map(b => b.id), 0) + 1;
        adminData.banners.push({ id: newId, title, content, image, active });
        showNotification('Thêm banner thành công!', 'success');
    }
    
    editingId = null;
    document.getElementById('bannerForm').style.display = 'none';
    displayAdminContent('banner');
    if (document.getElementById('mainContent')?.style.display !== 'none') {
        initHomeBannerCarousel();
    }
}

function editBanner(id) {
    editingId = id;
    const banner = adminData.banners.find(b => b.id === id);
    if (banner) {
        document.getElementById('bannerTitle').value = banner.title;
        document.getElementById('bannerContent').value = banner.content;
        document.getElementById('bannerImage').value = banner.image;
        document.getElementById('bannerActive').checked = banner.active;
        document.getElementById('bannerForm').style.display = 'block';
        window.scrollTo(0, document.getElementById('bannerForm').offsetTop);
    }
}

function deleteBanner(id) {
    if (confirm('Bạn có chắc chắn muốn xóa banner này?')) {
        adminData.banners = adminData.banners.filter(b => b.id !== id);
        showNotification('Xóa banner thành công!', 'success');
        displayAdminContent('banner');
    }
}

function editNews(id) { showNotification('Chức năng chỉnh sửa tin tức đang phát triển', 'info'); }
function deleteNews(id) { 
    if (confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
        adminData.news = adminData.news.filter(n => n.id !== id);
        showNotification('Xóa tin tức thành công!', 'success');
        displayAdminContent('news');
    }
}

function editService(id) { showNotification('Chức năng chỉnh sửa dịch vụ đang phát triển', 'info'); }
function deleteService(id) {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
        adminData.services = adminData.services.filter(s => s.id !== id);
        showNotification('Xóa dịch vụ thành công!', 'success');
        displayAdminContent('services');
    }
}

function deleteFeedback(id) {
    if (confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
        adminData.feedback = adminData.feedback.filter(f => f.id !== id);
        showNotification('Xóa phản hồi thành công!', 'success');
        displayAdminContent('feedback');
    }
}

function editAttraction(id) { showNotification('Chức năng chỉnh sửa đang phát triển', 'info'); }
function deleteAttraction(id) {
    if (confirm('Bạn có chắc chắn muốn xóa điểm tham quan này?')) {
        adminData.attractions = adminData.attractions.filter(a => a.id !== id);
        showNotification('Xóa điểm tham quan thành công!', 'success');
        displayAdminContent('attractions');
    }
}

function editMapPlace(id) { showNotification('Chức năng chỉnh sửa đang phát triển', 'info'); }
function deleteMapPlace(id) {
    if (confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
        adminData.mapPlaces = adminData.mapPlaces.filter(m => m.id !== id);
        showNotification('Xóa địa điểm thành công!', 'success');
        displayAdminContent('map');
    }
}

function editUserRole(id) {
    const user = adminData.users.find((u, idx) => (u.id || idx + 1) === id);
    if (!user) return;
    
    const currentRole = user.role;
    const newRole = currentRole === 'user' ? 'admin' : 'user';
    
    if (confirm(`Thay đổi vai trò của ${user.firstName} ${user.lastName} thành ${newRole === 'admin' ? 'Quản TrềEViên' : 'Người Dùng'}?`)) {
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

function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        notification.style.backgroundColor = type === 'error' ? '#dc3545' : type === 'info' ? '#17a2b8' : '#28a745';
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

window.showAttractionsPage = showAttractionsPage;
window.loadAttractionsList = loadAttractionsList;
window.loadSampleAttractions = loadSampleAttractions;
window.displayAttractionsList = displayAttractionsList;
window.filterAttractions = filterAttractions;
window.showFeedbackPage = showFeedbackPage;
window.showDigitalMapPage = showDigitalMapPage;
window.loadMapPlaces = loadMapPlaces;
window.loadSampleMapPlaces = loadSampleMapPlaces;
window.displayMapPlaces = displayMapPlaces;
window.selectMapPlace = selectMapPlace;
window.filterMapByCategory = filterMapByCategory;
window.showAdminLoginForm = showAdminLoginForm;
window.handleAdminLogin = handleAdminLogin;
window.showAdminDashboard = showAdminDashboard;
window.handleAdminLogout = handleAdminLogout;
window.showAdminManage = showAdminManage;
window.saveBanner = saveBanner;
window.editBanner = editBanner;
window.deleteBanner = deleteBanner;
window.editNews = editNews;
window.deleteNews = deleteNews;
window.editService = editService;
window.deleteService = deleteService;
window.deleteFeedback = deleteFeedback;
window.editAttraction = editAttraction;
window.deleteAttraction = deleteAttraction;
window.editMapPlace = editMapPlace;
window.deleteMapPlace = deleteMapPlace;
window.editUserRole = editUserRole;
window.deleteUser = deleteUser;
