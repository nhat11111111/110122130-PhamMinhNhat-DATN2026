// ==================== GAS STATION PAGE ==================== //
// Trang Cay Xang: Carousel khu vuc, danh sach tram xang, tim kiem, Google Maps

// ---- Du lieu khu vuc (huyen/thi xa) Vinh Long ----
const GAS_DISTRICTS = [
    { id: 'binh-minh',  name: 'Thi xa Binh Minh',       label: 'Thị xã Bình Minh'       },
    { id: 'long-ho',    name: 'Huyen Long Ho',           label: 'Huyện Long Hồ'          },
    { id: 'binh-tan',   name: 'Huyen Binh Tan',          label: 'Huyện Bình Tân'         },
    { id: 'vung-liem',  name: 'Huyen Vung Liem',         label: 'Huyện Vũng Liêm'        },
    { id: 'tp-vinh-long', name: 'Thanh pho Vinh Long',   label: 'Thành phố Vĩnh Long'    },
    { id: 'tra-on',     name: 'Huyen Tra On',            label: 'Huyện Trà Ôn'           },
    { id: 'tam-binh',   name: 'Huyen Tam Binh',          label: 'Huyện Tam Bình'         },
    { id: 'mang-thit',  name: 'Huyen Mang Thit',         label: 'Huyện Mang Thít'        },
];

// ---- Du lieu tram xang Vinh Long ----
const GAS_STATION_DATA = [
    // Thi xa Binh Minh
    { id: 1,  district: 'binh-minh',    name: 'Cay xang - Nguyen Van Dang',     address: 'Ap Binh Thuan 1, Hoa Ninh, Binh Minh, Vinh Long',        phone: '02703959014', lat: 10.0851, lng: 105.8203 },
    { id: 2,  district: 'binh-minh',    name: 'Cay xang - Nguyen Minh Vu',      address: '96, To 8, An Thanh, An Binh, Binh Minh, Vinh Long',       phone: '02703966013', lat: 10.0855, lng: 105.8198 },
    { id: 3,  district: 'binh-minh',    name: 'Cay xang - Dang Van Nhu',        address: '145/8, An Thanh, An Binh, Binh Minh, Vinh Long',          phone: '02703960886', lat: 10.0848, lng: 105.8210 },
    { id: 4,  district: 'binh-minh',    name: 'Cay xang - Le Vu Binh',          address: 'An Thanh, An Binh, Binh Minh, Vinh Long',                phone: '02703966531', lat: 10.0844, lng: 105.8215 },
    { id: 5,  district: 'binh-minh',    name: 'Cay xang - Nguyen Thi Muoi',     address: 'To 3, Khu vuc 1, TT. Cai Von, Binh Minh, Vinh Long',     phone: '02703860125', lat: 10.0860, lng: 105.8190 },
    { id: 6,  district: 'binh-minh',    name: 'Tram xang dau Petrolimex Binh Minh', address: '102 Duong 30/4, Cai Von, Binh Minh, Vinh Long',      phone: '02703861234', lat: 10.0870, lng: 105.8180 },

    // Huyen Long Ho
    { id: 7,  district: 'long-ho',      name: 'Cay xang - Phan Thi Thu',        address: 'To 2, An Binh, Long Ho, Vinh Long',                      phone: '02703969002', lat: 10.2200, lng: 105.9580 },
    { id: 8,  district: 'long-ho',      name: 'Cay xang Long Ho - Petrolimex',   address: '75 Duong 7, TT. Long Ho, Huyen Long Ho, Vinh Long',      phone: '02703865432', lat: 10.2240, lng: 105.9600 },
    { id: 9,  district: 'long-ho',      name: 'Cay xang - Tran Van Thanh',      address: 'To 5, Phu Quoi, Long Ho, Vinh Long',                     phone: '02703921234', lat: 10.2180, lng: 105.9560 },
    { id: 10, district: 'long-ho',      name: 'Cay xang - Nguyen Van Bon',      address: 'Hoa Phu, Long Ho, Vinh Long',                            phone: '02703922345', lat: 10.2160, lng: 105.9540 },

    // Huyen Binh Tan
    { id: 11, district: 'binh-tan',     name: 'Cay xang - Tham Nguyen',         address: 'Thanh Loi, Binh Tan, Vinh Long',                         phone: '02703912111', lat: 9.8850, lng: 105.8640 },
    { id: 12, district: 'binh-tan',     name: 'Cay xang - Tran Thi Hoa',        address: 'Tan Thanh, Binh Tan, Vinh Long',                         phone: '02703913222', lat: 9.8810, lng: 105.8620 },
    { id: 13, district: 'binh-tan',     name: 'Tram xang Petrolimex Binh Tan',  address: 'Quoc lo 1A, TT. Tan Quoi, Binh Tan, Vinh Long',          phone: '02703914333', lat: 9.8890, lng: 105.8660 },

    // Huyen Vung Liem
    { id: 14, district: 'vung-liem',    name: 'Cay xang Vung Liem - Petrolimex', address: '100 Duong 1/5, TT. Vung Liem, Huyen Vung Liem, Vinh Long', phone: '02703887234', lat: 10.0580, lng: 105.9900 },
    { id: 15, district: 'vung-liem',    name: 'Cay xang - Le Van Muoi',         address: 'Trung Hiep, Vung Liem, Vinh Long',                       phone: '02703888345', lat: 10.0560, lng: 105.9880 },
    { id: 16, district: 'vung-liem',    name: 'Cay xang - Huynh Thi Ba',        address: 'Hieu Thanh, Vung Liem, Vinh Long',                       phone: '02703889456', lat: 10.0600, lng: 105.9920 },

    // TP. Vinh Long
    { id: 17, district: 'tp-vinh-long', name: 'Tram xang Petrolimex TP. Vinh Long', address: '46 Pham Hung, Phuong 1, TP. Vinh Long',              phone: '02703813456', lat: 10.2560, lng: 105.9720 },
    { id: 18, district: 'tp-vinh-long', name: 'Cay xang - Nguyen Thi Lan',      address: '123 Hoang Thai Hieu, Phuong 4, TP. Vinh Long',           phone: '02703814567', lat: 10.2545, lng: 105.9730 },
    { id: 19, district: 'tp-vinh-long', name: 'Cay xang Shell - Vinh Long',     address: '88 Nguyen Hue, Phuong 2, TP. Vinh Long',                 phone: '02703815678', lat: 10.2555, lng: 105.9715 },
    { id: 20, district: 'tp-vinh-long', name: 'Cay xang PVOIL - Truong An',     address: 'QL1A, Truong An, TP. Vinh Long',                         phone: '02703816789', lat: 10.2480, lng: 105.9650 },

    // Huyen Tra On
    { id: 21, district: 'tra-on',       name: 'Tram xang Petrolimex Tra On',    address: '88 Quoc lo 54, TT. Tra On, Huyen Tra On, Vinh Long',     phone: '02703873456', lat: 9.9550,  lng: 105.9450 },
    { id: 22, district: 'tra-on',       name: 'Cay xang - Tran Thi Mai',        address: 'Thieu My, Tra On, Vinh Long',                            phone: '02703874567', lat: 9.9520,  lng: 105.9430 },
    { id: 23, district: 'tra-on',       name: 'Cay xang - Nguyen Van Loi',      address: 'Xuat Dinh, Tra On, Vinh Long',                           phone: '02703875678', lat: 9.9580,  lng: 105.9470 },

    // Huyen Tam Binh
    { id: 24, district: 'tam-binh',     name: 'Tram xang Petrolimex Tam Binh',  address: '1/1 TL 902, TT. Tam Binh, Huyen Tam Binh, Vinh Long',   phone: '02703845678', lat: 10.1502, lng: 105.9310 },
    { id: 25, district: 'tam-binh',     name: 'Cay xang - Nguyen Thi Thuy',     address: 'Loan My, Tam Binh, Vinh Long',                           phone: '02703846789', lat: 10.1480, lng: 105.9290 },

    // Huyen Mang Thit
    { id: 26, district: 'mang-thit',    name: 'Tram xang Petrolimex Mang Thit', address: 'TT. Cai Nhum, Mang Thit, Vinh Long',                    phone: '02703856789', lat: 10.1400, lng: 105.9050 },
    { id: 27, district: 'mang-thit',    name: 'Cay xang - Le Thi Hoa',          address: 'Long Ho, Mang Thit, Vinh Long',                          phone: '02703857890', lat: 10.1380, lng: 105.9030 },
];

// Display names (Vietnamese with diacritics for UI)
const GAS_DISPLAY_NAMES = {
    1:  'Cây xăng - Nguyễn Văn Đằng',
    2:  'Cây xăng - Nguyễn Minh Vũ',
    3:  'Cây xăng - Đặng Văn Như',
    4:  'Cây xăng - Lê Vũ Bình',
    5:  'Cây xăng - Nguyễn Thị Mười',
    6:  'Trạm xăng dầu Petrolimex Bình Minh',
    7:  'Cây xăng - Phan Thị Thu',
    8:  'Cây xăng Long Hồ - Petrolimex',
    9:  'Cây xăng - Trần Văn Thành',
    10: 'Cây xăng - Nguyễn Văn Bốn',
    11: 'Cây xăng - Thám Nguyên',
    12: 'Cây xăng - Trần Thị Hoa',
    13: 'Trạm xăng Petrolimex Bình Tân',
    14: 'Cây xăng Vũng Liêm - Petrolimex',
    15: 'Cây xăng - Lê Văn Mười',
    16: 'Cây xăng - Huỳnh Thị Ba',
    17: 'Trạm xăng Petrolimex TP. Vĩnh Long',
    18: 'Cây xăng - Nguyễn Thị Lan',
    19: 'Cây xăng Shell - Vĩnh Long',
    20: 'Cây xăng PVOIL - Trường An',
    21: 'Trạm xăng Petrolimex Trà Ôn',
    22: 'Cây xăng - Trần Thị Mai',
    23: 'Cây xăng - Nguyễn Văn Lợi',
    24: 'Trạm xăng Petrolimex Tam Bình',
    25: 'Cây xăng - Nguyễn Thị Thúy',
    26: 'Trạm xăng Petrolimex Mang Thít',
    27: 'Cây xăng - Lê Thị Hoa',
};

const GAS_ADDR_DISPLAY = {
    1:  'Ấp Bình Thuận 1, Hòa Ninh, Bình Minh, Vĩnh Long',
    2:  '96, Tổ 8, An Thạnh, An Bình, Bình Minh, Vĩnh Long',
    3:  '145/8, An Thạnh, An Bình, Bình Minh, Vĩnh Long',
    4:  'An Thạnh, An Bình, Bình Minh, Vĩnh Long',
    5:  'Tổ 3, Khu vực 1, TT. Cái Vồn, Bình Minh, Vĩnh Long',
    6:  '102 Đường 30/4, Cái Vồn, Bình Minh, Vĩnh Long',
    7:  'Tổ 2, An Bình, Long Hồ, Vĩnh Long',
    8:  '75 Đường 7, TT. Long Hồ, Huyện Long Hồ, Vĩnh Long',
    9:  'Tổ 5, Phú Quới, Long Hồ, Vĩnh Long',
    10: 'Hòa Phú, Long Hồ, Vĩnh Long',
    11: 'Thành Lợi, Bình Tân, Vĩnh Long',
    12: 'Tân Thành, Bình Tân, Vĩnh Long',
    13: 'Quốc lộ 1A, TT. Tân Quới, Bình Tân, Vĩnh Long',
    14: '100 Đường 1/5, TT. Vũng Liêm, Huyện Vũng Liêm, Vĩnh Long',
    15: 'Trung Hiệp, Vũng Liêm, Vĩnh Long',
    16: 'Hiếu Thành, Vũng Liêm, Vĩnh Long',
    17: '46 Phạm Hùng, Phường 1, TP. Vĩnh Long',
    18: '123 Hoàng Thái Hiếu, Phường 4, TP. Vĩnh Long',
    19: '88 Nguyễn Huệ, Phường 2, TP. Vĩnh Long',
    20: 'QL1A, Trường An, TP. Vĩnh Long',
    21: '88 Quốc lộ 54, TT. Trà Ôn, Huyện Trà Ôn, Vĩnh Long',
    22: 'Thiện Mỹ, Trà Ôn, Vĩnh Long',
    23: 'Xuất Đinh, Trà Ôn, Vĩnh Long',
    24: '1/1 TL 902, TT. Tam Bình, Huyện Tam Bình, Vĩnh Long',
    25: 'Loan Mỹ, Tam Bình, Vĩnh Long',
    26: 'TT. Cái Nhum, Mang Thít, Vĩnh Long',
    27: 'Long Hồ, Mang Thít, Vĩnh Long',
};

// ---- State ----
let currentDistrictFilter = null;
let currentGasList = [];
let selectedGasId = null;
let districtCarouselOffset = 0;
const DISTRICT_VISIBLE = 6;

// ==================== SHOW / HIDE PAGE ==================== //

function showGasStationPage() {
    const sections = [
        'mainContent', 'newsSection', 'servicesSection', 'utilitiesSection',
        'attractionsSection', 'feedbackSection', 'loginSection',
        'registrationSection', 'digitalMapSection', 'adminDashboardSection',
        'atmSection'
    ];

    sections.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    document.body.classList.remove('auth-active');

    var gsSection = document.getElementById('gasStationSection');
    if (gsSection) gsSection.style.display = 'block';

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var utilNav = Array.from(document.querySelectorAll('.nav-item')).find(
        function(n) { return n.textContent.trim() === 'TIEN ICH' || n.textContent.trim().includes('TI'); }
    );
    // Try to find Tien Ich nav
    document.querySelectorAll('.nav-item').forEach(function(n) {
        if (n.getAttribute('href') && n.getAttribute('href').includes('showUtilitiesPage')) {
            n.classList.add('active');
        }
    });

    initGasStationPage();
    window.scrollTo(0, 0);
}

function backToUtilitiesFromGas() {
    var gsSection = document.getElementById('gasStationSection');
    if (gsSection) gsSection.style.display = 'none';
    if (typeof showUtilitiesPage === 'function') showUtilitiesPage();
}

// ==================== INIT ==================== //

var gasPageInited = false;

function initGasStationPage() {
    if (!gasPageInited) {
        renderDistrictCarousel();
        setupGasSearch();
        gasPageInited = true;
    }
    currentDistrictFilter = null;
    districtCarouselOffset = 0;
    updateDistrictCarouselPos();
    clearDistrictActive();
    filterAndRenderGasList();
    updateGasMap(null);
}

// ==================== DISTRICT CAROUSEL ==================== //

function renderDistrictCarousel() {
    var track = document.getElementById('districtCarouselTrack');
    if (!track) return;

    track.innerHTML = GAS_DISTRICTS.map(function(d) {
        return '<div class="district-carousel-item" id="districtItem_' + d.id + '" onclick="filterGasByDistrict(\'' + d.id + '\')">' +
            '<div class="district-photo-placeholder"><i class="fas fa-gas-pump"></i></div>' +
            '<span class="district-carousel-name">' + d.label + '</span>' +
            '</div>';
    }).join('');

    updateDistrictCarouselPos();
    updateDistrictCarouselBtnState();
}

function getDistrictVisible() {
    return window.innerWidth <= 600 ? 2 : window.innerWidth <= 900 ? 3 : DISTRICT_VISIBLE;
}

function updateDistrictCarouselPos() {
    var track = document.getElementById('districtCarouselTrack');
    if (!track) return;
    var visible = getDistrictVisible();
    var itemWidth = 100 / visible;
    var translateX = -(districtCarouselOffset * itemWidth);
    track.style.transform = 'translateX(' + translateX + '%)';

    var items = track.querySelectorAll('.district-carousel-item');
    items.forEach(function(item) {
        item.style.minWidth = 'calc(100% / ' + visible + ')';
        item.style.flex = '0 0 calc(100% / ' + visible + ')';
    });

    updateDistrictCarouselBtnState();
}

function updateDistrictCarouselBtnState() {
    var visible = getDistrictVisible();
    var maxOffset = Math.max(0, GAS_DISTRICTS.length - visible);
    var prevBtn = document.getElementById('districtCarouselPrev');
    var nextBtn = document.getElementById('districtCarouselNext');
    if (prevBtn) prevBtn.style.opacity = districtCarouselOffset <= 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = districtCarouselOffset >= maxOffset ? '0.3' : '1';
}

function districtCarouselPrev() {
    if (districtCarouselOffset > 0) {
        districtCarouselOffset--;
        updateDistrictCarouselPos();
    }
}

function districtCarouselNext() {
    var visible = getDistrictVisible();
    var maxOffset = Math.max(0, GAS_DISTRICTS.length - visible);
    if (districtCarouselOffset < maxOffset) {
        districtCarouselOffset++;
        updateDistrictCarouselPos();
    }
}

function clearDistrictActive() {
    document.querySelectorAll('.district-carousel-item').forEach(function(el) {
        el.classList.remove('active');
    });
}

function filterGasByDistrict(districtId) {
    clearDistrictActive();
    if (currentDistrictFilter === districtId) {
        currentDistrictFilter = null;
    } else {
        currentDistrictFilter = districtId;
        var el = document.getElementById('districtItem_' + districtId);
        if (el) el.classList.add('active');
    }
    filterAndRenderGasList();
    updateGasMap(currentDistrictFilter);
}

// ==================== SEARCH ==================== //

function setupGasSearch() {
    var input = document.getElementById('gasSearchInput');
    var suggestions = document.getElementById('gasSearchSuggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', function() {
        var val = this.value.trim().toLowerCase();
        if (val.length === 0) {
            suggestions.classList.remove('open');
            filterAndRenderGasList();
            return;
        }
        // Suggest only gas station names
        var matched = GAS_STATION_DATA.filter(function(s) {
            var display = (GAS_DISPLAY_NAMES[s.id] || s.name).toLowerCase();
            return display.includes(val) || s.name.toLowerCase().includes(val);
        }).slice(0, 8);

        if (matched.length > 0) {
            suggestions.innerHTML = matched.map(function(s) {
                var displayName = GAS_DISPLAY_NAMES[s.id] || s.name;
                return '<div class="gasstation-suggestion-item" onclick="selectGasSuggestion(' + s.id + ', \'' + displayName.replace(/'/g, "\\'") + '\')">' +
                    '<i class="fas fa-gas-pump"></i>' +
                    '<span>' + displayName + '</span>' +
                    '</div>';
            }).join('');
            suggestions.classList.add('open');
        } else {
            suggestions.innerHTML = '<div class="gasstation-suggestion-item" style="color:#aaa;cursor:default;"><i class="fas fa-search"></i> Khong tim thay tram xang</div>';
            suggestions.classList.add('open');
        }
        filterAndRenderGasList();
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Enter') {
            suggestions.classList.remove('open');
        }
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('open');
        }
    });
}

function selectGasSuggestion(stationId, displayName) {
    var input = document.getElementById('gasSearchInput');
    var suggestions = document.getElementById('gasSearchSuggestions');
    if (input) input.value = displayName;
    if (suggestions) suggestions.classList.remove('open');

    selectedGasId = stationId;
    filterAndRenderGasList();

    var station = GAS_STATION_DATA.find(function(s) { return s.id === stationId; });
    if (station) showGasOnMap(station);

    // Highlight in list
    setTimeout(function() {
        document.querySelectorAll('.gasstation-list-item').forEach(function(el) {
            el.classList.remove('active');
        });
        var el = document.getElementById('gasItem_' + stationId);
        if (el) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 100);
}

// ==================== FILTER & RENDER ==================== //

function filterAndRenderGasList() {
    var searchInput = document.getElementById('gasSearchInput');
    var searchVal = (searchInput ? searchInput.value : '').trim().toLowerCase();

    var list = GAS_STATION_DATA;

    if (currentDistrictFilter) {
        list = list.filter(function(s) { return s.district === currentDistrictFilter; });
    }

    if (searchVal) {
        list = list.filter(function(s) {
            var displayName = (GAS_DISPLAY_NAMES[s.id] || s.name).toLowerCase();
            var addrDisplay = (GAS_ADDR_DISPLAY[s.id] || s.address).toLowerCase();
            return displayName.includes(searchVal) || s.name.toLowerCase().includes(searchVal) || addrDisplay.includes(searchVal);
        });
    }

    currentGasList = list;
    renderGasList(list);
}

function renderGasList(list) {
    var container = document.getElementById('gasListItems');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML =
            '<div class="gasstation-list-empty">' +
            '<i class="fas fa-search"></i>' +
            '<span>Khong tim thay tram xang phu hop</span>' +
            '</div>';
        return;
    }

    container.innerHTML = list.map(function(s) {
        var displayName = GAS_DISPLAY_NAMES[s.id] || s.name;
        var addrDisplay = GAS_ADDR_DISPLAY[s.id] || s.address;
        return '<div class="gasstation-list-item ' + (selectedGasId === s.id ? 'active' : '') + '" ' +
            'id="gasItem_' + s.id + '" onclick="selectGasStation(' + s.id + ')">' +
            '<div class="gasstation-item-icon"><i class="fas fa-gas-pump"></i></div>' +
            '<div class="gasstation-item-info">' +
            '<div class="gasstation-item-name">' + displayName + '</div>' +
            '<div class="gasstation-item-address"><i class="fas fa-map-marker-alt"></i><span>' + addrDisplay + '</span></div>' +
            (s.phone ? '<div class="gasstation-item-phone"><i class="fas fa-phone"></i>' + s.phone + '</div>' : '') +
            '</div>' +
            '</div>';
    }).join('');
}

// ==================== MAP ==================== //

function selectGasStation(stationId) {
    selectedGasId = stationId;

    document.querySelectorAll('.gasstation-list-item').forEach(function(el) {
        el.classList.remove('active');
    });
    var el = document.getElementById('gasItem_' + stationId);
    if (el) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    var station = GAS_STATION_DATA.find(function(s) { return s.id === stationId; });
    if (station) showGasOnMap(station);
}

function showGasOnMap(station) {
    var mapWrap = document.getElementById('gasstationMapContainer');
    if (!mapWrap) return;

    var displayName = GAS_DISPLAY_NAMES[station.id] || station.name;
    var addrDisplay = GAS_ADDR_DISPLAY[station.id] || station.address;
    var query = encodeURIComponent(displayName + ', ' + addrDisplay);
    var embedUrl = 'https://maps.google.com/maps?q=' + query + '&output=embed&hl=vi';

    mapWrap.innerHTML =
        '<div class="gasstation-map-iframe-wrap">' +
        '<button class="gasstation-map-expand-btn" title="Xem ban do lon" onclick="openGasMapFull(' + station.id + ')">' +
        '<i class="fas fa-expand-arrows-alt"></i></button>' +
        '<iframe src="' + embedUrl + '" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ban do ' + displayName + '"></iframe>' +
        '</div>';
}

function updateGasMap(districtId) {
    var mapWrap = document.getElementById('gasstationMapContainer');
    if (!mapWrap) return;

    var districtLabel = districtId
        ? (GAS_DISTRICTS.find(function(d) { return d.id === districtId; }) || {}).label || districtId
        : '';
    var queryStr = districtLabel
        ? 'Cay xang ' + districtLabel + ' Vinh Long'
        : 'Cay xang Vinh Long';
    var query = encodeURIComponent(queryStr);
    var embedUrl = 'https://maps.google.com/maps?q=' + query + '&output=embed&hl=vi';

    mapWrap.innerHTML =
        '<div class="gasstation-map-iframe-wrap">' +
        '<button class="gasstation-map-expand-btn" title="Xem ban do lon" onclick="openGasMapFullArea()">' +
        '<i class="fas fa-expand-arrows-alt"></i></button>' +
        '<iframe src="' + embedUrl + '" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ban do cay xang Vinh Long"></iframe>' +
        '</div>';
}

function openGasMapFull(stationId) {
    var station = GAS_STATION_DATA.find(function(s) { return s.id === stationId; });
    if (!station) return;
    var displayName = GAS_DISPLAY_NAMES[station.id] || station.name;
    var addrDisplay = GAS_ADDR_DISPLAY[station.id] || station.address;
    var query = encodeURIComponent(displayName + ', ' + addrDisplay);
    window.open('https://maps.google.com/?q=' + query, '_blank');
}

function openGasMapFullArea() {
    var districtLabel = currentDistrictFilter
        ? (GAS_DISTRICTS.find(function(d) { return d.id === currentDistrictFilter; }) || {}).label || ''
        : '';
    var query = encodeURIComponent('Cay xang ' + districtLabel + ' Vinh Long');
    window.open('https://maps.google.com/?q=' + query, '_blank');
}

// ==================== EXPORTS ==================== //
if (typeof window !== 'undefined') {
    window.showGasStationPage = showGasStationPage;
    window.backToUtilitiesFromGas = backToUtilitiesFromGas;
    window.initGasStationPage = initGasStationPage;
    window.districtCarouselPrev = districtCarouselPrev;
    window.districtCarouselNext = districtCarouselNext;
    window.filterGasByDistrict = filterGasByDistrict;
    window.selectGasStation = selectGasStation;
    window.selectGasSuggestion = selectGasSuggestion;
    window.filterAndRenderGasList = filterAndRenderGasList;
    window.openGasMapFull = openGasMapFull;
    window.openGasMapFullArea = openGasMapFullArea;
}
