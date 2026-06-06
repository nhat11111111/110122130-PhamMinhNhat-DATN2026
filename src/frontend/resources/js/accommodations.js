// Accommodations Page - JavaScript Logic

// Sample accommodation data
const accommodations = [
    {
        id: 1,
        name: "KHÁCH SẠN VĂN TRẠNG",
        type: "Khách sạn",
        location: "Vĩnh Long",
        rating: 4.5,
        reviews: 128,
        price: "500,000 - 1,200,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1578899387571-184aafb2bfd9?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Nhà hàng", "Phòng gym", "Spa"],
        description: "Khách sạn 3 sao được xây dựng theo phong cách kiến trúc truyền thống Việt Nam, có vị trí đắc địa ngay trung tâm thành phố Vĩnh Long."
    },
    {
        id: 2,
        name: "KHÁCH SẠN CỬU LONG A",
        type: "Khách sạn",
        location: "Vĩnh Long",
        rating: 4,
        reviews: 95,
        price: "350,000 - 800,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1631049307038-da0ec9d70304?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Nhà hàng", "Bể bơi"],
        description: "Khách sạn 3 sao với không gian thoáng mát, phòng ốc hiện đại, phục vụ chu đáo và chuyên nghiệp."
    },
    {
        id: 3,
        name: "COCO RIVERSIDE LODGE",
        type: "Resort",
        location: "Vĩnh Long",
        rating: 4.8,
        reviews: 156,
        price: "1,500,000 - 3,000,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Nhà hàng", "Spa", "Bể bơi", "Phòng gym"],
        description: "Resort 5 sao tiêu chuẩn quốc tế, nằm bên bờ sông Cửu Long, mang đến trải nghiệm thư giãn tuyệt vời."
    },
    {
        id: 4,
        name: "KHÁCH SẠN KHỞI HOA",
        type: "Khách sạn",
        location: "Vĩnh Long",
        rating: 3.8,
        reviews: 72,
        price: "250,000 - 600,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1559599810-46d1d26da206?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Nhà hàng"],
        description: "Khách sạn 2 sao tiêu chuẩn, giá cả phải chăng, thích hợp cho khách du lịch có ngân sách hạn chế."
    },
    {
        id: 5,
        name: "HOMESTAY MEKONG",
        type: "Homestay",
        location: "Vĩnh Long",
        rating: 4.6,
        reviews: 103,
        price: "200,000 - 400,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Nấu ăn"],
        description: "Homestay tựa nhân văn tại thôn Lan, nơi du khách có thể trải nghiệm sinh hoạt hàng ngày của người dân địa phương."
    },
    {
        id: 6,
        name: "NHÀ NGHỈ SÔNG NƯỚC",
        type: "Nhà nghỉ",
        location: "Vĩnh Long",
        rating: 4.2,
        reviews: 68,
        price: "300,000 - 700,000 VNĐ/đêm",
        image: "https://images.unsplash.com/photo-1520587191167-7e2e01e312a1?q=80&w=600&auto=format&fit=crop",
        amenities: ["WiFi", "Máy lạnh"],
        description: "Nhà nghỉ với view sông tuyệt đẹp, không gian yên tĩnh, phù hợp cho những ai muốn thư giãn."
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    renderAccommodations(accommodations);
    setupEventListeners();
    setInterval(updateCurrentTime, 1000);
});

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeStr;
    }
}

// Render accommodations
function renderAccommodations(items) {
    const grid = document.getElementById('accommodationsGrid');
    if (!grid) return;

    grid.innerHTML = items.map(acc => `
        <div class="accommodation-card" data-id="${acc.id}">
            <div class="card-image">
                <img src="${acc.image}" alt="${acc.name}" loading="lazy">
                <div class="card-overlay">
                    <button class="btn-view-detail">Xem chi tiết</button>
                </div>
            </div>
            <div class="card-body">
                <div class="card-type">${acc.type}</div>
                <h3 class="card-title">${acc.name}</h3>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i> ${acc.location}
                </div>
                <div class="card-rating">
                    <div class="stars">
                        ${renderStars(acc.rating)}
                    </div>
                    <span>${acc.rating} (${acc.reviews} đánh giá)</span>
                </div>
                <p class="card-description">${acc.description}</p>
                <div class="card-amenities">
                    ${acc.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                </div>
                <div class="card-price">${acc.price}</div>
                <button class="btn-book">Đặt phòng</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to cards
    document.querySelectorAll('.accommodation-card').forEach(card => {
        card.querySelector('.btn-view-detail')?.addEventListener('click', () => {
            const id = card.dataset.id;
            showAccommodationDetail(id);
        });
        card.querySelector('.btn-book')?.addEventListener('click', () => {
            alert('Chức năng đặt phòng sẽ được cập nhật sớm!');
        });
    });
}

// Render star rating
function renderStars(rating) {
    const full = Math.floor(rating);
    const partial = rating % 1;
    let stars = '⭐'.repeat(full);
    if (partial > 0.5) stars += '⭐';
    return stars;
}

// Show accommodation detail
function showAccommodationDetail(id) {
    const acc = accommodations.find(a => a.id == id);
    if (acc) {
        alert(`${acc.name}\n\n${acc.description}\n\nGiá: ${acc.price}\n\nĐánh giá: ${acc.rating}/5 ⭐`);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchAccommodations');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = accommodations.filter(acc =>
                acc.name.toLowerCase().includes(query) ||
                acc.location.toLowerCase().includes(query) ||
                acc.type.toLowerCase().includes(query)
            );
            renderAccommodations(filtered);
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortAccommodations');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sorted = [...accommodations];
            switch (e.target.value) {
                case 'rating':
                    sorted.sort((a, b) => b.rating - a.rating);
                    break;
                case 'price-low':
                    sorted.sort((a, b) => {
                        const priceA = parseInt(a.price);
                        const priceB = parseInt(b.price);
                        return priceA - priceB;
                    });
                    break;
                case 'price-high':
                    sorted.sort((a, b) => {
                        const priceA = parseInt(a.price);
                        const priceB = parseInt(b.price);
                        return priceB - priceA;
                    });
                    break;
            }
            renderAccommodations(sorted);
        });
    }

    // Reset filter button
    const resetBtn = document.querySelector('.btn-filter-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('searchAccommodations').value = '';
            document.getElementById('sortAccommodations').value = '';
            renderAccommodations(accommodations);
        });
    }
}

// Login function (if needed)
function showLoginPage() {
    alert('Tính năng đăng nhập sẽ được cập nhật');
}
