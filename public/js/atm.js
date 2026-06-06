// ==================== ATM PAGE ==================== //
// Trang ATM: Carousel logo ngân hàng, danh sách ATM, tìm kiếm, Google Maps

// ---- Dữ liệu ngân hàng ----
const ATM_BANKS = [
    { id: 'mbbank',     name: 'MB Bank',     fullName: 'MB Ngân hàng Quân đội', color: '#1e3a6e', textColor: '#fff' },
    { id: 'acb',        name: 'ACB',          fullName: 'Ngân hàng Á Châu',      color: '#003087', textColor: '#fff' },
    { id: 'vietinbank', name: 'Vietinbank',   fullName: 'VietinBank',             color: '#006837', textColor: '#fff' },
    { id: 'vietcombank',name: 'Vietcombank',  fullName: 'Vietcombank',            color: '#007b3d', textColor: '#fff' },
    { id: 'bidv',       name: 'BIDV',         fullName: 'BIDV',                   color: '#c8102e', textColor: '#fff' },
    { id: 'agribank',   name: 'Agribank',     fullName: 'Agribank',               color: '#007a3d', textColor: '#fff' },
    { id: 'techcombank',name: 'Techcombank',  fullName: 'Techcombank',            color: '#e3000f', textColor: '#fff' },
    { id: 'sacombank',  name: 'Sacombank',    fullName: 'Sacombank',              color: '#005baa', textColor: '#fff' },
    { id: 'vpbank',     name: 'VPBank',       fullName: 'VPBank',                 color: '#007a4d', textColor: '#fff' },
    { id: 'tpbank',     name: 'TPBank',       fullName: 'TPBank',                 color: '#6c00a3', textColor: '#fff' },
];

// ---- Dữ liệu ATM Vĩnh Long ----
const ATM_DATA = [
    // MB Bank
    { id: 1,  bank: 'mbbank',      name: 'ATM MB Bank - Chi nhánh Vĩnh Long',       address: '46 Phạm Hùng, Phường 1, TP. Vĩnh Long',                  phone: '(0270) 381 6789', lat: 10.2560, lng: 105.9720 },
    { id: 2,  bank: 'mbbank',      name: 'ATM MB Bank - PGD Cái Ngang',              address: '22 Nguyễn Trãi, TT. Cái Ngang, Huyện Tam Bình, Vĩnh Long', phone: '(0270) 382 1234', lat: 10.1500, lng: 105.9300 },

    // ACB
    { id: 3,  bank: 'acb',         name: 'ATM ACB - Chi nhánh Vĩnh Long',            address: '7 Hoàng Thái Hiếu, Phường 1, TP. Vĩnh Long',              phone: '(0270) 383 5678', lat: 10.2558, lng: 105.9718 },
    { id: 4,  bank: 'acb',         name: 'ATM ACB - PGD Bình Minh',                  address: '105 Đường 30/4, TT. Cái Vồn, Bình Minh, Vĩnh Long',       phone: '(0270) 384 4321', lat: 10.0850, lng: 105.8200 },

    // Vietinbank
    { id: 5,  bank: 'vietinbank',  name: 'ATM Vietinbank - PGD Mang Thít',          address: '44 Phạm Hùng, Khóm 1, TT. Cái Nhum, Huyện Mang Thít, Vĩnh Long', phone: '02703.930.499', lat: 10.1400, lng: 105.9050 },
    { id: 6,  bank: 'vietinbank',  name: 'ATM Vietinbank - Bình Minh',              address: '434, Khóm 8, Phường Cái Vồn, Bình Minh, Vĩnh Long',       phone: '02703.891.882', lat: 10.0848, lng: 105.8198 },
    { id: 7,  bank: 'vietinbank',  name: 'Vietinbank Thành phố Vĩnh Long',         address: 'Số 1C, Hoàng Thái Hiếu, Phường 1, Thành phố Vĩnh Long',    phone: '02703.822.416', lat: 10.2561, lng: 105.9723 },
    { id: 8,  bank: 'vietinbank',  name: 'ATM Vietinbank - Trường An, Thành Phố Vĩnh Long', address: 'Số 397, QL1A, Trường An, Thành phố Vĩnh Long',    phone: '02703.830.041', lat: 10.2480, lng: 105.9650 },
    { id: 9,  bank: 'vietinbank',  name: 'ATM Vietinbank - Tam Bình',              address: '1/1 Đường Tỉnh lộ 902, TT. Tam Bình, Huyện Tam Bình, Vĩnh Long', phone: '(0270) 385 0011', lat: 10.1502, lng: 105.9310 },

    // Vietcombank
    { id: 10, bank: 'vietcombank', name: 'ATM Vietcombank - Chi nhánh Vĩnh Long',   address: '129 Hoàng Thái Hiếu, Phường 1, TP. Vĩnh Long',            phone: '(0270) 386 2233', lat: 10.2563, lng: 105.9715 },
    { id: 11, bank: 'vietcombank', name: 'ATM Vietcombank - PGD Long Hồ',           address: '75 Đường 7, TT. Long Hồ, Huyện Long Hồ, Vĩnh Long',       phone: '(0270) 386 4455', lat: 10.2250, lng: 105.9620 },

    // BIDV
    { id: 12, bank: 'bidv',        name: 'ATM BIDV - Chi nhánh Vĩnh Long',          address: '12 Lê Thái Tổ, Phường 1, TP. Vĩnh Long',                  phone: '(0270) 387 6677', lat: 10.2555, lng: 105.9725 },
    { id: 13, bank: 'bidv',        name: 'ATM BIDV - PGD Vũng Liêm',               address: '100 Đường 1/5, TT. Vũng Liêm, Huyện Vũng Liêm, Vĩnh Long', phone: '(0270) 387 8899', lat: 10.0580, lng: 105.9900 },

    // Agribank
    { id: 14, bank: 'agribank',    name: 'ATM Agribank - Chi nhánh Vĩnh Long',      address: '222 Phạm Hùng, Phường 4, TP. Vĩnh Long',                  phone: '(0270) 388 1122', lat: 10.2545, lng: 105.9730 },
    { id: 15, bank: 'agribank',    name: 'ATM Agribank - Huyện Trà Ôn',             address: '88 Quốc lộ 54, TT. Trà Ôn, Huyện Trà Ôn, Vĩnh Long',      phone: '(0270) 388 3344', lat: 9.9550,  lng: 105.9450 },

    // Techcombank
    { id: 16, bank: 'techcombank', name: 'ATM Techcombank - TP. Vĩnh Long',         address: '55 1 Tháng 5, Phường 2, TP. Vĩnh Long',                   phone: '(0270) 389 5566', lat: 10.2570, lng: 105.9710 },

    // Sacombank
    { id: 17, bank: 'sacombank',   name: 'ATM Sacombank - Chi nhánh Vĩnh Long',     address: '34 Nguyễn Huệ, Phường 2, TP. Vĩnh Long',                  phone: '(0270) 390 7788', lat: 10.2552, lng: 105.9716 },

    // VPBank
    { id: 18, bank: 'vpbank',      name: 'ATM VPBank - TP. Vĩnh Long',              address: '68 Trưng Nữ Vương, Phường 5, TP. Vĩnh Long',              phone: '(0270) 391 9900', lat: 10.2535, lng: 105.9740 },

    // TPBank
    { id: 19, bank: 'tpbank',      name: 'ATM TPBank - Vĩnh Long',                  address: '8/1 Đường Tỉnh lộ 904, Phường 9, TP. Vĩnh Long',          phone: '(0270) 392 1010', lat: 10.2520, lng: 105.9750 },
];

// ---- State ----
let currentBankFilter = null;   // null = tất cả ngân hàng
let currentAtmList = [];        // danh sách ATM đang hiển thị
let selectedAtmId = null;       // ATM đang được chọn
let bankCarouselOffset = 0;     // số item đã scroll
const BANK_VISIBLE = 6;         // số logo hiện cùng lúc (desktop)

// ==================== SHOW / HIDE PAGE ==================== //

/**
 * Hiện trang ATM, ẩn tất cả section khác
 */
function showAtmPage() {
    const sections = [
        'mainContent', 'newsSection', 'servicesSection', 'utilitiesSection',
        'attractionsSection', 'feedbackSection', 'loginSection',
        'registrationSection', 'digitalMapSection', 'adminDashboardSection'
    ];

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    document.body.classList.remove('auth-active');

    const atmSection = document.getElementById('atmSection');
    if (atmSection) {
        atmSection.style.display = 'block';
    }

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const utilNav = Array.from(document.querySelectorAll('.nav-item')).find(
        n => n.textContent.trim() === 'TIỆN ÍCH'
    );
    if (utilNav) utilNav.classList.add('active');

    // Init lần đầu
    initAtmPage();
    window.scrollTo(0, 0);
}

/**
 * Quay về trang Tiện ích
 */
function backToUtilitiesFromAtm() {
    const atmSection = document.getElementById('atmSection');
    if (atmSection) atmSection.style.display = 'none';
    if (typeof showUtilitiesPage === 'function') showUtilitiesPage();
}

// ==================== INIT ==================== //

let atmPageInited = false;

function initAtmPage() {
    if (!atmPageInited) {
        renderBankCarousel();
        setupAtmSearch();
        atmPageInited = true;
    }
    // Luôn reset filter và render lại
    currentBankFilter = null;
    bankCarouselOffset = 0;
    updateCarouselPosition();
    clearBankActiveState();
    filterAndRenderAtmList();
}

// ==================== BANK CAROUSEL ==================== //

function renderBankCarousel() {
    const track = document.getElementById('bankCarouselTrack');
    if (!track) return;

    track.innerHTML = ATM_BANKS.map(bank => `
        <div class="bank-carousel-item" id="bankItem_${bank.id}" onclick="filterAtmByBank('${bank.id}')">
            <div class="bank-logo-placeholder" style="background-color: ${bank.color}; color: ${bank.textColor};">
                ${bank.name}
            </div>
            <span class="bank-carousel-name">${bank.fullName}</span>
        </div>
    `).join('');

    updateCarouselPosition();
    updateCarouselBtnState();
}

function getVisibleCount() {
    const wrapper = document.getElementById('bankCarouselWrapper');
    if (!wrapper) return BANK_VISIBLE;
    return window.innerWidth <= 600 ? 2 : window.innerWidth <= 900 ? 3 : BANK_VISIBLE;
}

function updateCarouselPosition() {
    const track = document.getElementById('bankCarouselTrack');
    if (!track) return;
    const visible = getVisibleCount();
    const itemWidth = 100 / visible;
    const translateX = -(bankCarouselOffset * itemWidth);
    track.style.transform = `translateX(${translateX}%)`;

    // Cập nhật width từng item
    const items = track.querySelectorAll('.bank-carousel-item');
    items.forEach(item => {
        item.style.minWidth = `calc(100% / ${visible})`;
        item.style.flex = `0 0 calc(100% / ${visible})`;
    });

    updateCarouselBtnState();
}

function updateCarouselBtnState() {
    const visible = getVisibleCount();
    const maxOffset = Math.max(0, ATM_BANKS.length - visible);
    const prevBtn = document.getElementById('bankCarouselPrev');
    const nextBtn = document.getElementById('bankCarouselNext');
    if (prevBtn) prevBtn.style.opacity = bankCarouselOffset <= 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = bankCarouselOffset >= maxOffset ? '0.3' : '1';
}

function bankCarouselPrev() {
    if (bankCarouselOffset > 0) {
        bankCarouselOffset--;
        updateCarouselPosition();
    }
}

function bankCarouselNext() {
    const visible = getVisibleCount();
    const maxOffset = Math.max(0, ATM_BANKS.length - visible);
    if (bankCarouselOffset < maxOffset) {
        bankCarouselOffset++;
        updateCarouselPosition();
    }
}

function clearBankActiveState() {
    document.querySelectorAll('.bank-carousel-item').forEach(el => el.classList.remove('active'));
}

function filterAtmByBank(bankId) {
    clearBankActiveState();
    if (currentBankFilter === bankId) {
        // Click lại để bỏ filter
        currentBankFilter = null;
    } else {
        currentBankFilter = bankId;
        const el = document.getElementById(`bankItem_${bankId}`);
        if (el) el.classList.add('active');
    }
    filterAndRenderAtmList();
    // Reset map to default Vĩnh Long view
    updateMapForBank(currentBankFilter);
}

// ==================== ATM SEARCH ==================== //

function setupAtmSearch() {
    const input = document.getElementById('atmSearchInput');
    const suggestions = document.getElementById('atmSearchSuggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', function () {
        const val = this.value.trim().toLowerCase();
        if (val.length === 0) {
            suggestions.classList.remove('open');
            filterAndRenderAtmList();
            return;
        }
        // Gợi ý chỉ gồm tên ngân hàng phù hợp
        const matched = ATM_BANKS.filter(b =>
            b.name.toLowerCase().includes(val) ||
            b.fullName.toLowerCase().includes(val)
        );
        if (matched.length > 0) {
            suggestions.innerHTML = matched.map(b => `
                <div class="atm-suggestion-item" onclick="selectBankSuggestion('${b.id}', '${escapeAttr(b.fullName)}')">
                    <i class="fas fa-university"></i>
                    <span>${b.fullName} (${b.name})</span>
                </div>
            `).join('');
            suggestions.classList.add('open');
        } else {
            suggestions.innerHTML = `<div class="atm-suggestion-item" style="color:#aaa;cursor:default;"><i class="fas fa-search"></i> Không tìm thấy ngân hàng</div>`;
            suggestions.classList.add('open');
        }
        filterAndRenderAtmList();
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Enter') {
            suggestions.classList.remove('open');
        }
    });

    // Đóng suggestions khi click ngoài
    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('open');
        }
    });
}

function selectBankSuggestion(bankId, bankFullName) {
    const input = document.getElementById('atmSearchInput');
    const suggestions = document.getElementById('atmSearchSuggestions');
    if (input) input.value = bankFullName;
    if (suggestions) suggestions.classList.remove('open');

    // Activate bank filter
    clearBankActiveState();
    currentBankFilter = bankId;
    const el = document.getElementById(`bankItem_${bankId}`);
    if (el) el.classList.add('active');

    filterAndRenderAtmList();
    updateMapForBank(bankId);
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'");
}

// ==================== FILTER & RENDER ATM LIST ==================== //

function filterAndRenderAtmList() {
    const searchInput = document.getElementById('atmSearchInput');
    const searchVal = (searchInput?.value || '').trim().toLowerCase();

    let list = ATM_DATA;

    // Filter theo ngân hàng (click logo)
    if (currentBankFilter) {
        list = list.filter(atm => atm.bank === currentBankFilter);
    }

    // Filter theo tìm kiếm (chỉ theo tên ngân hàng)
    if (searchVal) {
        list = list.filter(atm => {
            const bank = ATM_BANKS.find(b => b.id === atm.bank);
            return (bank && (bank.name.toLowerCase().includes(searchVal) || bank.fullName.toLowerCase().includes(searchVal)))
                || atm.name.toLowerCase().includes(searchVal);
        });
    }

    currentAtmList = list;
    renderAtmList(list);
}

function renderAtmList(list) {
    const container = document.getElementById('atmListItems');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="atm-list-empty">
                <i class="fas fa-search"></i>
                <span>Không tìm thấy ATM phù hợp</span>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(atm => {
        const bank = ATM_BANKS.find(b => b.id === atm.bank) || { name: atm.bank, color: '#666', textColor: '#fff' };
        return `
            <div class="atm-list-item ${selectedAtmId === atm.id ? 'active' : ''}"
                 id="atmItem_${atm.id}"
                 onclick="selectAtm(${atm.id})">
                <div class="atm-item-logo-placeholder"
                     style="background-color: ${bank.color}; color: ${bank.textColor};">
                    ${bank.name}
                </div>
                <div class="atm-item-info">
                    <div class="atm-item-name">${atm.name}</div>
                    <div class="atm-item-address">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${atm.address}</span>
                    </div>
                    ${atm.phone ? `<div class="atm-item-phone"><i class="fas fa-phone"></i>${atm.phone}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ==================== GOOGLE MAP ==================== //

function selectAtm(atmId) {
    selectedAtmId = atmId;

    // Highlight trong list
    document.querySelectorAll('.atm-list-item').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`atmItem_${atmId}`);
    if (el) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Tìm ATM
    const atm = ATM_DATA.find(a => a.id === atmId);
    if (!atm) return;

    // Hiển thị Google Maps tìm kiếm theo địa chỉ ATM
    showAtmOnMap(atm);
}

/**
 * Hiển thị Google Maps embed cho 1 ATM theo địa chỉ
 */
function showAtmOnMap(atm) {
    const mapWrap = document.getElementById('atmMapContainer');
    if (!mapWrap) return;

    const query = encodeURIComponent(`ATM ${atm.name}, ${atm.address}, Vĩnh Long`);
    const embedUrl = `https://maps.google.com/maps?q=${query}&output=embed&hl=vi`;

    mapWrap.innerHTML = `
        <div class="atm-map-iframe-wrap">
            <button class="atm-map-type-btn" title="Loại bản đồ" onclick="toggleAtmMapType()">
                <i class="fas fa-layer-group"></i>
            </button>
            <button class="atm-map-expand-btn" title="Xem bản đồ lớn" onclick="openAtmMapFull(${atm.id})">
                <i class="fas fa-expand-arrows-alt"></i>
            </button>
            <iframe
                src="${embedUrl}"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Bản đồ ${atm.name}">
            </iframe>
        </div>
    `;
}

/**
 * Hiển thị bản đồ tất cả ATM của ngân hàng (hoặc khu vực Vĩnh Long nếu null)
 */
function updateMapForBank(bankId) {
    const mapWrap = document.getElementById('atmMapContainer');
    if (!mapWrap) return;

    const bankName = bankId
        ? (ATM_BANKS.find(b => b.id === bankId)?.fullName || bankId)
        : 'ATM';
    const query = bankId
        ? encodeURIComponent(`ATM ${bankName} Vĩnh Long`)
        : encodeURIComponent('ATM Vĩnh Long');

    const embedUrl = `https://maps.google.com/maps?q=${query}&output=embed&hl=vi`;

    mapWrap.innerHTML = `
        <div class="atm-map-iframe-wrap">
            <button class="atm-map-type-btn" title="Loại bản đồ" onclick="toggleAtmMapType()">
                <i class="fas fa-layer-group"></i>
            </button>
            <button class="atm-map-expand-btn" title="Xem bản đồ lớn" onclick="openAtmMapFullArea()">
                <i class="fas fa-expand-arrows-alt"></i>
            </button>
            <iframe
                src="${embedUrl}"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Bản đồ ATM ${bankName} Vĩnh Long">
            </iframe>
        </div>
    `;
}

function openAtmMapFull(atmId) {
    const atm = ATM_DATA.find(a => a.id === atmId);
    if (!atm) return;
    const query = encodeURIComponent(`ATM ${atm.name}, ${atm.address}, Vĩnh Long`);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
}

function openAtmMapFullArea() {
    const bankId = currentBankFilter;
    const bankName = bankId
        ? (ATM_BANKS.find(b => b.id === bankId)?.fullName || '')
        : '';
    const query = encodeURIComponent(`ATM ${bankName} Vĩnh Long`);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
}

function toggleAtmMapType() {
    // Placeholder: trong thực tế có thể toggle satellite/terrain bằng thay params
    // Ở đây hiển thị thông báo
    const mapWrap = document.getElementById('atmMapContainer');
    if (!mapWrap) return;
    const iframe = mapWrap.querySelector('iframe');
    if (!iframe) return;
    const src = iframe.src;
    if (src.includes('t=m')) {
        iframe.src = src.replace('t=m', 't=k'); // satellite
    } else {
        // Toggle không được hỗ trợ với embed đơn giản – mở Google Maps
        openAtmMapFullArea();
    }
}

// ==================== EXPORTS ==================== //
if (typeof window !== 'undefined') {
    window.showAtmPage = showAtmPage;
    window.backToUtilitiesFromAtm = backToUtilitiesFromAtm;
    window.initAtmPage = initAtmPage;
    window.bankCarouselPrev = bankCarouselPrev;
    window.bankCarouselNext = bankCarouselNext;
    window.filterAtmByBank = filterAtmByBank;
    window.selectAtm = selectAtm;
    window.selectBankSuggestion = selectBankSuggestion;
    window.filterAndRenderAtmList = filterAndRenderAtmList;
    window.openAtmMapFull = openAtmMapFull;
    window.openAtmMapFullArea = openAtmMapFullArea;
    window.toggleAtmMapType = toggleAtmMapType;
}
