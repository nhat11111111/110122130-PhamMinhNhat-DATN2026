/**
 * Search functionality for Vĩnh Long website
 * Searches places (restaurants, attractions) and articles
 */

// Search API endpoints
const SEARCH_API_URL = '/api/search';

/**
 * Handle search from header input
 */
function handleHeaderSearch() {
    const keyword = document.getElementById('headerSearchInput').value.trim();
    if (keyword.length > 0) {
        performSearch(keyword);
    }
}

/**
 * Handle keypress on search input
 */
function handleHeaderSearchKeypress(event) {
    if (event.key === 'Enter') {
        handleHeaderSearch();
    }
}

/**
 * Perform search query
 */
async function performSearch(keyword) {
    try {
        // Show loading state
        showSearchLoading();
        
        // Call search API
        const response = await fetch(`${SEARCH_API_URL}?q=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        
        if (data.success && data.results && data.results.length > 0) {
            displaySearchResults(data.results, keyword);
        } else {
            displayNoResults(keyword);
        }
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Lỗi khi tìm kiếm. Vui lòng thử lại!', 'error');
    }
}

/**
 * Display search results
 */
function displaySearchResults(results, keyword) {
    const modal = document.getElementById('searchResultsModal');
    const resultsContainer = document.getElementById('searchResultsContainer');
    const noResultsContainer = document.getElementById('noResultsContainer');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    noResultsContainer.style.display = 'none';
    
    // Create result items
    let html = `<div class="search-results-list">`;
    
    results.forEach(result => {
        const icon = result.type === 'place' ? 'fa-map-marker-alt' : 'fa-newspaper';
        const typeLabel = result.type === 'place' ? 'Địa điểm' : 'Bài viết';
        
        html += `
            <div class="search-result-item">
                <div class="result-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="result-content">
                    <h4 class="result-title">${escapeHtml(result.name || result.title)}</h4>
                    <p class="result-type">${typeLabel}</p>
                    <p class="result-description">${escapeHtml(result.description || result.excerpt || '')}</p>
                    ${result.rating ? `<span class="result-rating"><i class="fas fa-star"></i> ${result.rating}</span>` : ''}
                </div>
                <button class="result-btn" onclick="viewSearchResult('${result.type}', ${result.id})">
                    Xem chi tiết <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    });
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
    
    // Show modal
    modal.classList.add('active');
    modal.style.display = 'flex';
}

/**
 * Display no results message
 */
function displayNoResults(keyword) {
    const modal = document.getElementById('searchResultsModal');
    const resultsContainer = document.getElementById('searchResultsContainer');
    const noResultsContainer = document.getElementById('noResultsContainer');
    const searchKeywordSpan = document.getElementById('searchKeyword');
    
    // Clear results
    resultsContainer.innerHTML = '';
    searchKeywordSpan.textContent = keyword;
    
    // Show no results message
    noResultsContainer.style.display = 'block';
    
    // Show modal
    modal.classList.add('active');
    modal.style.display = 'flex';
}

/**
 * Close search results modal
 */
function closeSearchResults() {
    const modal = document.getElementById('searchResultsModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
}

/**
 * Show search loading state
 */
function showSearchLoading() {
    const modal = document.getElementById('searchResultsModal');
    const resultsContainer = document.getElementById('searchResultsContainer');
    
    resultsContainer.innerHTML = `
        <div class="search-loading">
            <div class="spinner"></div>
            <p>Đang tìm kiếm...</p>
        </div>
    `;
    
    modal.classList.add('active');
    modal.style.display = 'flex';
}

/**
 * View search result detail
 */
function viewSearchResult(type, id) {
    // Close search modal
    closeSearchResults();
    
    // Handle based on type
    if (type === 'place') {
        // Open place detail
        console.log('View place:', id);
        showNotification('Tính năng này sẽ được cập nhật sớm', 'info');
    } else if (type === 'article') {
        // Open article detail
        console.log('View article:', id);
        showNotification('Tính năng này sẽ được cập nhật sớm', 'info');
    }
}

/**
 * Show all places
 */
function showAllPlaces() {
    closeSearchResults();
    showNotification('Tính năng này sẽ được cập nhật sớm', 'info');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Close search modal on outside click
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('searchResultsModal');
    const modalContent = modal?.querySelector('.modal-content');
    
    if (modal && event.target === modal && !modalContent?.contains(event.target)) {
        closeSearchResults();
    }
});

/**
 * Close search modal on escape key
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSearchResults();
    }
});
