// ==================== TRANSPORT PAGE ==================== //
// Trang Di chuyen: 5 danh muc con, danh sach, tim kiem, Google Maps

// ---- Danh muc con ----
var TRANSPORT_CATEGORIES = [
    { id: 'boat',    label: 'T\u00e0u du l\u1ecbch',          icon: 'fa-ship',          cssClass: 'cat-boat'    },
    { id: 'bus',     label: 'Tr\u1ea1m xe li\u00ean t\u1ec9nh', icon: 'fa-bus',           cssClass: 'cat-bus'     },
    { id: 'taxi',    label: 'Taxi',                            icon: 'fa-taxi',          cssClass: 'cat-taxi'    },
    { id: 'rental',  label: 'Thu\u00ea xe',                    icon: 'fa-car',           cssClass: 'cat-rental'  },
    { id: 'parking', label: 'B\u00e3i \u0111\u1ed7 xe',        icon: 'fa-square-parking', cssClass: 'cat-parking' },
];

// ---- Du lieu phuong tien di chuyen Vinh Long ----
var TRANSPORT_DATA = [

    // TAU DU LICH
    { id: 1,  cat: 'boat', name: 'Ben tau du lich Vinh Long',             displayName: 'B\u1ebfn t\u00e0u du l\u1ecbch V\u0129nh Long',             address: '1 Hung Vuong, Phuong 1, TP. Vinh Long',                     addressDisplay: '1 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',                   phone: '02703822476' },
    { id: 2,  cat: 'boat', name: 'Coco Riverside Lodge - Du thuyen',      displayName: 'Coco Riverside Lodge \u2013 Du thuy\u1ec1n',                  address: 'An Binh, Long Ho, Vinh Long',                               addressDisplay: 'An B\u00ecnh, Long H\u1ed3, V\u0129nh Long',                                           phone: '02703823456' },
    { id: 3,  cat: 'boat', name: 'Tour thuyen Mekong - Vinh Long Tourist', displayName: 'Tour thuy\u1ec1n Mekong \u2013 V\u0129nh Long Tourist',       address: '1 Hung Vuong, Phuong 1, TP. Vinh Long',                     addressDisplay: '1 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',                   phone: '02703822000' },
    { id: 4,  cat: 'boat', name: 'Ben tau Cai Be - Tien Giang',           displayName: 'B\u1ebfn t\u00e0u C\u00e1i B\u00e8 \u2013 Ti\u1ec1n Giang',  address: 'Cai Be, Tien Giang (cong noi Vinh Long)',                   addressDisplay: 'C\u00e1i B\u00e8, Ti\u1ec1n Giang (c\u1ed5ng n\u1ed1i V\u0129nh Long)',                  phone: '02733820123' },
    { id: 5,  cat: 'boat', name: 'Tour sinh thai song nuoc An Binh',      displayName: 'Tour sinh th\u00e1i s\u00f4ng n\u01b0\u1edbc An B\u00ecnh',   address: 'An Binh, Long Ho, Vinh Long',                               addressDisplay: 'An B\u00ecnh, Long H\u1ed3, V\u0129nh Long',                                           phone: '02703824567' },

    // TRAM XE LIEN TINH
    { id: 6,  cat: 'bus',  name: 'Ben xe Vinh Long',                      displayName: 'B\u1ebfn xe V\u0129nh Long',                                  address: '284 Nguyen Hue, Phuong 2, TP. Vinh Long',                   addressDisplay: '284 Nguy\u1ec5n Hu\u1ec7, Ph\u01b0\u1eddng 2, TP. V\u0129nh Long',                     phone: '02703822238' },
    { id: 7,  cat: 'bus',  name: 'Tram xe Binh Minh',                     displayName: 'Tr\u1ea1m xe B\u00ecnh Minh',                                 address: 'Duong 30/4, TT. Cai Von, Binh Minh, Vinh Long',            addressDisplay: '\u0110\u01b0\u1eddng 30/4, TT. C\u00e1i V\u1ed3n, B\u00ecnh Minh, V\u0129nh Long',    phone: '02703861222' },
    { id: 8,  cat: 'bus',  name: 'Tram xe Long Ho',                       displayName: 'Tr\u1ea1m xe Long H\u1ed3',                                   address: 'TT. Long Ho, Huyen Long Ho, Vinh Long',                     addressDisplay: 'TT. Long H\u1ed3, Huy\u1ec7n Long H\u1ed3, V\u0129nh Long',                            phone: '02703865333' },
    { id: 9,  cat: 'bus',  name: 'Xe khach Phuong Trang - VP Vinh Long',  displayName: 'Xe kh\u00e1ch Ph\u01b0\u01a1ng Trang \u2013 VP V\u0129nh Long', address: '5 Pham Thai Buong, Phuong 1, TP. Vinh Long',               addressDisplay: '5 Ph\u1ea1m Th\u00e1i Bu\u1ed3ng, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',             phone: '19001234'    },
    { id: 10, cat: 'bus',  name: 'Xe khach Thanh Buoi - VP Vinh Long',    displayName: 'Xe kh\u00e1ch Th\u00e0nh Bu\u1ed9i \u2013 VP V\u0129nh Long', address: '19 Nguyen Hue, Phuong 1, TP. Vinh Long',                    addressDisplay: '19 Nguy\u1ec5n Hu\u1ec7, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',                     phone: '19006067'    },
    { id: 11, cat: 'bus',  name: 'Xe khach Mai Linh - VP Vinh Long',      displayName: 'Xe kh\u00e1ch Mai Linh \u2013 VP V\u0129nh Long',             address: '12 Le Thai To, Phuong 1, TP. Vinh Long',                   addressDisplay: '12 L\u00ea Th\u00e1i T\u1ed5, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',               phone: '02703822900'  },
    { id: 12, cat: 'bus',  name: 'Ben xe Tam Binh',                       displayName: 'B\u1ebfn xe Tam B\u00ecnh',                                   address: 'TT. Tam Binh, Huyen Tam Binh, Vinh Long',                  addressDisplay: 'TT. Tam B\u00ecnh, Huy\u1ec7n Tam B\u00ecnh, V\u0129nh Long',                         phone: '02703845111' },

    // TAXI
    { id: 13, cat: 'taxi', name: 'Taxi Mai Linh Vinh Long',               displayName: 'Taxi Mai Linh V\u0129nh Long',                                address: 'TP. Vinh Long',                                             addressDisplay: 'TP. V\u0129nh Long',                                                                   phone: '02703838383' },
    { id: 14, cat: 'taxi', name: 'Taxi Vinasun Vinh Long',                displayName: 'Taxi Vinasun V\u0129nh Long',                                 address: 'TP. Vinh Long',                                             addressDisplay: 'TP. V\u0129nh Long',                                                                   phone: '02703827272' },
    { id: 15, cat: 'taxi', name: 'Taxi Sao Viet Vinh Long',               displayName: 'Taxi Sao Vi\u1ec7t V\u0129nh Long',                           address: 'TP. Vinh Long',                                             addressDisplay: 'TP. V\u0129nh Long',                                                                   phone: '02703811811' },
    { id: 16, cat: 'taxi', name: 'Grab Vinh Long',                        displayName: 'Grab V\u0129nh Long',                                         address: 'TP. Vinh Long & cac huyen',                                 addressDisplay: 'TP. V\u0129nh Long & c\u00e1c huy\u1ec7n',                                            phone: ''            },
    { id: 17, cat: 'taxi', name: 'Be Taxi Vinh Long',                     displayName: 'Be Taxi V\u0129nh Long',                                      address: 'TP. Vinh Long',                                             addressDisplay: 'TP. V\u0129nh Long',                                                                   phone: ''            },

    // THUE XE
    { id: 18, cat: 'rental', name: 'Thue xe tu lai Vinh Long - Minh Dat', displayName: 'Thu\u00ea xe t\u1ef1 l\u00e1i \u2013 Minh \u0110\u1ea1t',    address: '56 Hung Vuong, Phuong 2, TP. Vinh Long',                   addressDisplay: '56 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 2, TP. V\u0129nh Long',               phone: '0908123456'  },
    { id: 19, cat: 'rental', name: 'Thue xe cuoi Vinh Long - Vinh Phuc',  displayName: 'Thu\u00ea xe c\u01b0\u1edbi \u2013 V\u0129nh Ph\u00fac',     address: '33 3 Thang 2, Phuong 1, TP. Vinh Long',                    addressDisplay: '33 \u0110\u01b0\u1eddng 3 Th\u00e1ng 2, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',     phone: '0907234567'  },
    { id: 20, cat: 'rental', name: 'Thue xe may Vinh Long - Hoang Nam',   displayName: 'Thu\u00ea xe m\u00e1y \u2013 Ho\u00e0ng Nam',                address: '88 Nguyen Hue, Phuong 1, TP. Vinh Long',                   addressDisplay: '88 Nguy\u1ec5n Hu\u1ec7, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',                    phone: '0906345678'  },
    { id: 21, cat: 'rental', name: 'Cho thue xe o to TP. Vinh Long - An Phu', displayName: 'Thu\u00ea xe \u00f4 t\u00f4 \u2013 An Ph\u00fa',         address: '120 Le Loi, Phuong 3, TP. Vinh Long',                       addressDisplay: '120 L\u00ea L\u1ee3i, Ph\u01b0\u1eddng 3, TP. V\u0129nh Long',                       phone: '0905456789'  },
    { id: 22, cat: 'rental', name: 'Thue xe du lich 16 cho - Tuan Kiet',  displayName: 'Thu\u00ea xe du l\u1ecbch 16 ch\u1ed7 \u2013 Tu\u1ea5n Ki\u1ec7t', address: '45 Pham Hung, Phuong 5, TP. Vinh Long',               addressDisplay: '45 Ph\u1ea1m H\u00f9ng, Ph\u01b0\u1eddng 5, TP. V\u0129nh Long',                    phone: '0904567890'  },

    // BAI DO XE
    { id: 23, cat: 'parking', name: 'Bai do xe Sieu thi Co.op Mart Vinh Long', displayName: 'B\u00e3i \u0111\u1ed7 xe Si\u00eau th\u1ecb Co.opMart V\u0129nh Long', address: '108 Hung Vuong, Phuong 2, TP. Vinh Long',          addressDisplay: '108 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 2, TP. V\u0129nh Long',             phone: '02703822999' },
    { id: 24, cat: 'parking', name: 'Bai do xe Benh vien Da khoa Vinh Long',   displayName: 'B\u00e3i \u0111\u1ed7 xe B\u1ec7nh vi\u1ec7n \u0110a khoa V\u0129nh Long', address: '199 Hung Vuong, Phuong 2, TP. Vinh Long',        addressDisplay: '199 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 2, TP. V\u0129nh Long',             phone: '02703822486' },
    { id: 25, cat: 'parking', name: 'Bai do xe Trung tam Thuong mai Vinh Long', displayName: 'B\u00e3i \u0111\u1ed7 xe Trung t\u00e2m TM V\u0129nh Long', address: '5 Le Loi, Phuong 1, TP. Vinh Long',                    addressDisplay: '5 L\u00ea L\u1ee3i, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',                       phone: '02703821234' },
    { id: 26, cat: 'parking', name: 'Bai do xe UBND TP. Vinh Long',            displayName: 'B\u00e3i \u0111\u1ed7 xe UBND TP. V\u0129nh Long',              address: '1 Hoang Thai Hieu, Phuong 1, TP. Vinh Long',               addressDisplay: '1 Ho\u00e0ng Th\u00e1i Hi\u1ebfu, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',           phone: '02703822403' },
    { id: 27, cat: 'parking', name: 'Bai do xe Ben tau du lich',               displayName: 'B\u00e3i \u0111\u1ed7 xe B\u1ebfn t\u00e0u du l\u1ecbch',       address: '1 Hung Vuong, Phuong 1, TP. Vinh Long',                    addressDisplay: '1 H\u00f9ng V\u01b0\u01a1ng, Ph\u01b0\u1eddng 1, TP. V\u0129nh Long',               phone: '' },
];

// ---- State ----
var currentTransportCat = 'boat';   // default: Tau du lich
var selectedTransportId  = null;

// ==================== SHOW / HIDE PAGE ==================== //

function showTransportPage() {
    var sections = [
        'mainContent','newsSection','servicesSection','utilitiesSection',
        'attractionsSection','feedbackSection','loginSection',
        'registrationSection','digitalMapSection','adminDashboardSection',
        'atmSection','gasStationSection'
    ];
    sections.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.body.classList.remove('auth-active');

    var sec = document.getElementById('transportSection');
    if (sec) sec.style.display = 'block';

    // Mark TIEN ICH nav active
    document.querySelectorAll('.nav-item').forEach(function(n) {
        if (n.getAttribute('href') && n.getAttribute('href').includes('showUtilitiesPage')) {
            n.classList.add('active');
        }
    });

    initTransportPage();
    window.scrollTo(0, 0);
}

function backToUtilitiesFromTransport() {
    var sec = document.getElementById('transportSection');
    if (sec) sec.style.display = 'none';
    if (typeof showUtilitiesPage === 'function') showUtilitiesPage();
}

// ==================== INIT ==================== //

var transportPageInited = false;

function initTransportPage() {
    if (!transportPageInited) {
        renderTransportCategoryTabs();
        setupTransportSearch();
        transportPageInited = true;
    }
    // Reset to default category
    setTransportCategory(currentTransportCat, true);
}

// ==================== CATEGORY TABS ==================== //

function renderTransportCategoryTabs() {
    var container = document.getElementById('transportCategoryTabs');
    if (!container) return;

    container.innerHTML = TRANSPORT_CATEGORIES.map(function(cat) {
        return '<button class="transport-tab' + (cat.id === currentTransportCat ? ' active' : '') + '" ' +
            'id="transTab_' + cat.id + '" ' +
            'onclick="setTransportCategory(\'' + cat.id + '\')">' +
            '<i class="fas ' + cat.icon + '"></i> ' + cat.label +
            '</button>';
    }).join('');
}

function setTransportCategory(catId, silent) {
    currentTransportCat = catId;
    selectedTransportId = null;

    // Update tab active state
    document.querySelectorAll('.transport-tab').forEach(function(el) {
        el.classList.toggle('active', el.id === 'transTab_' + catId);
    });

    // Clear search
    var searchInput = document.getElementById('transportSearchInput');
    if (searchInput) searchInput.value = '';
    var suggestions = document.getElementById('transportSearchSuggestions');
    if (suggestions) suggestions.classList.remove('open');

    filterAndRenderTransportList();

    if (!silent) {
        // Update map for the category
        updateTransportMapForCategory(catId);
    } else {
        updateTransportMapForCategory(catId);
    }
}

// ==================== SEARCH ==================== //

function setupTransportSearch() {
    var input = document.getElementById('transportSearchInput');
    var suggestions = document.getElementById('transportSearchSuggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', function() {
        var val = this.value.trim().toLowerCase();
        if (val.length === 0) {
            suggestions.classList.remove('open');
            filterAndRenderTransportList();
            return;
        }

        // Search across ALL categories for suggestions
        var matched = TRANSPORT_DATA.filter(function(s) {
            return s.displayName.toLowerCase().includes(val) || s.name.toLowerCase().includes(val);
        }).slice(0, 8);

        if (matched.length > 0) {
            var catMap = {};
            TRANSPORT_CATEGORIES.forEach(function(c) { catMap[c.id] = c; });

            suggestions.innerHTML = matched.map(function(s) {
                var cat = catMap[s.cat] || {};
                return '<div class="transport-suggestion-item" onclick="selectTransportSuggestion(' + s.id + ')">' +
                    '<i class="fas ' + (cat.icon || 'fa-map-marker-alt') + '"></i>' +
                    '<span>' + s.displayName + '</span>' +
                    '</div>';
            }).join('');
            suggestions.classList.add('open');
        } else {
            suggestions.innerHTML = '<div class="transport-suggestion-item" style="color:#aaa;cursor:default;">' +
                '<i class="fas fa-search"></i><span>Kh\u00f4ng t\u00ecm th\u1ea5y</span></div>';
            suggestions.classList.add('open');
        }

        filterAndRenderTransportList();
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Enter') {
            suggestions.classList.remove('open');
        }
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && suggestions && !suggestions.contains(e.target)) {
            suggestions.classList.remove('open');
        }
    });
}

function selectTransportSuggestion(itemId) {
    var item = TRANSPORT_DATA.find(function(s) { return s.id === itemId; });
    if (!item) return;

    var input = document.getElementById('transportSearchInput');
    var suggestions = document.getElementById('transportSearchSuggestions');
    if (input) input.value = item.displayName;
    if (suggestions) suggestions.classList.remove('open');

    // Switch to that item's category
    currentTransportCat = item.cat;
    document.querySelectorAll('.transport-tab').forEach(function(el) {
        el.classList.toggle('active', el.id === 'transTab_' + item.cat);
    });

    filterAndRenderTransportList();

    selectedTransportId = itemId;
    showTransportOnMap(item);

    setTimeout(function() {
        document.querySelectorAll('.transport-list-item').forEach(function(el) {
            el.classList.remove('active');
        });
        var el = document.getElementById('transItem_' + itemId);
        if (el) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 80);
}

// ==================== FILTER & RENDER ==================== //

function filterAndRenderTransportList() {
    var searchInput = document.getElementById('transportSearchInput');
    var searchVal = (searchInput ? searchInput.value : '').trim().toLowerCase();

    var list = TRANSPORT_DATA.filter(function(s) { return s.cat === currentTransportCat; });

    if (searchVal) {
        list = list.filter(function(s) {
            return s.displayName.toLowerCase().includes(searchVal) ||
                   s.name.toLowerCase().includes(searchVal) ||
                   s.addressDisplay.toLowerCase().includes(searchVal);
        });
    }

    renderTransportList(list);
}

function getCatClass(catId) {
    var cat = TRANSPORT_CATEGORIES.find(function(c) { return c.id === catId; });
    return cat ? cat.cssClass : 'cat-boat';
}

function getCatIcon(catId) {
    var cat = TRANSPORT_CATEGORIES.find(function(c) { return c.id === catId; });
    return cat ? cat.icon : 'fa-map-marker-alt';
}

function renderTransportList(list) {
    var container = document.getElementById('transportListItems');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML =
            '<div class="transport-list-empty">' +
            '<i class="fas fa-search"></i>' +
            '<span>Kh\u00f4ng t\u00ecm th\u1ea5y \u0111\u1ecba \u0111i\u1ec3m ph\u00f9 h\u1ee3p</span>' +
            '</div>';
        return;
    }

    var catClass = getCatClass(currentTransportCat);
    var catIcon  = getCatIcon(currentTransportCat);

    container.innerHTML = list.map(function(s) {
        return '<div class="transport-list-item ' + (selectedTransportId === s.id ? 'active' : '') + '" ' +
            'id="transItem_' + s.id + '" onclick="selectTransportItem(' + s.id + ')">' +
            '<div class="transport-item-icon ' + catClass + '">' +
            '<i class="fas ' + catIcon + '"></i>' +
            '</div>' +
            '<div class="transport-item-info">' +
            '<div class="transport-item-name">' + s.displayName + '</div>' +
            '<div class="transport-item-address"><i class="fas fa-map-marker-alt"></i><span>' + s.addressDisplay + '</span></div>' +
            (s.phone ? '<div class="transport-item-phone"><i class="fas fa-phone"></i>' + s.phone + '</div>' : '') +
            '</div>' +
            '</div>';
    }).join('');
}

// ==================== MAP ==================== //

function selectTransportItem(itemId) {
    selectedTransportId = itemId;

    document.querySelectorAll('.transport-list-item').forEach(function(el) {
        el.classList.remove('active');
    });
    var el = document.getElementById('transItem_' + itemId);
    if (el) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    var item = TRANSPORT_DATA.find(function(s) { return s.id === itemId; });
    if (item) showTransportOnMap(item);
}

function showTransportOnMap(item) {
    var mapWrap = document.getElementById('transportMapContainer');
    if (!mapWrap) return;

    var query = encodeURIComponent(item.displayName + ', ' + item.addressDisplay + ', Vinh Long');
    var embedUrl = 'https://maps.google.com/maps?q=' + query + '&output=embed&hl=vi';

    mapWrap.innerHTML =
        '<div class="transport-map-iframe-wrap">' +
        '<button class="transport-map-expand-btn" title="Xem b\u1ea3n \u0111\u1ed3 l\u1edbn" onclick="openTransportMapFull(' + item.id + ')">' +
        '<i class="fas fa-expand-arrows-alt"></i></button>' +
        '<iframe src="' + embedUrl + '" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="B\u1ea3n \u0111\u1ed3 ' + item.displayName + '"></iframe>' +
        '</div>';
}

function updateTransportMapForCategory(catId) {
    var mapWrap = document.getElementById('transportMapContainer');
    if (!mapWrap) return;

    var cat = TRANSPORT_CATEGORIES.find(function(c) { return c.id === catId; }) || {};
    var query = encodeURIComponent((cat.label || 'Di chuyen') + ' Vinh Long');
    var embedUrl = 'https://maps.google.com/maps?q=' + query + '&output=embed&hl=vi';

    mapWrap.innerHTML =
        '<div class="transport-map-iframe-wrap">' +
        '<button class="transport-map-expand-btn" title="Xem b\u1ea3n \u0111\u1ed3 l\u1edbn" onclick="openTransportMapFullArea()">' +
        '<i class="fas fa-expand-arrows-alt"></i></button>' +
        '<iframe src="' + embedUrl + '" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="B\u1ea3n \u0111\u1ed3 di chuy\u1ec3n V\u0129nh Long"></iframe>' +
        '</div>';
}

function openTransportMapFull(itemId) {
    var item = TRANSPORT_DATA.find(function(s) { return s.id === itemId; });
    if (!item) return;
    var query = encodeURIComponent(item.displayName + ', ' + item.addressDisplay);
    window.open('https://maps.google.com/?q=' + query, '_blank');
}

function openTransportMapFullArea() {
    var cat = TRANSPORT_CATEGORIES.find(function(c) { return c.id === currentTransportCat; }) || {};
    var query = encodeURIComponent((cat.label || 'Di chuyen') + ' Vinh Long');
    window.open('https://maps.google.com/?q=' + query, '_blank');
}

// ==================== EXPORTS ==================== //
if (typeof window !== 'undefined') {
    window.showTransportPage           = showTransportPage;
    window.backToUtilitiesFromTransport= backToUtilitiesFromTransport;
    window.initTransportPage           = initTransportPage;
    window.setTransportCategory        = setTransportCategory;
    window.selectTransportItem         = selectTransportItem;
    window.selectTransportSuggestion   = selectTransportSuggestion;
    window.filterAndRenderTransportList= filterAndRenderTransportList;
    window.openTransportMapFull        = openTransportMapFull;
    window.openTransportMapFullArea    = openTransportMapFullArea;
}
