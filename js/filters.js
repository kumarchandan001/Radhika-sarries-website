/* =========================================================
   SHOP FILTERS LOGIC
   ========================================================= */

function applyFilters() {
  const products = document.querySelectorAll('.product-card');
  if (!products.length) return;
  
  // Get active filters
  const checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
  const checkedFabrics = Array.from(document.querySelectorAll('input[name="fabric"]:checked')).map(cb => cb.value);
  const checkedOccasions = Array.from(document.querySelectorAll('input[name="occasion"]:checked')).map(cb => cb.value);
  const checkedColors = Array.from(document.querySelectorAll('.color-swatch.active')).map(el => el.dataset.color);
  
  // Price range (mock simple for now)
  const minPrice = parseInt(document.getElementById('min-price')?.value || 0);
  const maxPrice = parseInt(document.getElementById('max-price')?.value || 50000);
  
  let visibleCount = 0;
  
  products.forEach(product => {
    let show = true;
    
    // Dataset values from product card
    const pCat = product.dataset.category || '';
    const pFab = product.dataset.fabric || '';
    const pOcc = product.dataset.occasion || '';
    const pCol = product.dataset.color || '';
    const pPrice = parseInt(product.dataset.price || 0);
    
    if (checkedCategories.length && !checkedCategories.includes(pCat)) show = false;
    if (checkedFabrics.length && !checkedFabrics.includes(pFab)) show = false;
    if (checkedOccasions.length && !checkedOccasions.includes(pOcc)) show = false;
    if (checkedColors.length && !checkedColors.includes(pCol)) show = false;
    
    if (pPrice < minPrice || pPrice > maxPrice) show = false;
    
    product.style.display = show ? 'flex' : 'none';
    if (show) visibleCount++;
  });
  
  // Update UI counts
  const countEl = document.getElementById('filter-count');
  if (countEl) countEl.textContent = visibleCount;
  
  updateUrlParams(checkedCategories);
}

function clearFilters() {
  document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
  document.querySelectorAll('.color-swatch').forEach(el => el.classList.remove('active'));
  
  const minEl = document.getElementById('min-price');
  const maxEl = document.getElementById('max-price');
  if (minEl) minEl.value = minEl.min;
  if (maxEl) maxEl.value = maxEl.max;
  
  applyFilters();
}

function updateUrlParams(categories) {
  if (!window.history.replaceState) return;
  const url = new URL(window.location);
  if (categories.length) {
    url.searchParams.set('category', categories.join(','));
  } else {
    url.searchParams.delete('category');
  }
  window.history.replaceState({}, '', url);
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind inputs
  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });
  
  document.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
      applyFilters();
    });
  });
  
  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);
  
  // Sort
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const grid = document.querySelector('.product-grid');
      const products = Array.from(document.querySelectorAll('.product-card'));
      
      products.sort((a, b) => {
        const pa = parseInt(a.dataset.price);
        const pb = parseInt(b.dataset.price);
        if (e.target.value === 'price-low') return pa - pb;
        if (e.target.value === 'price-high') return pb - pa;
        return 0; // Default order
      });
      
      grid.innerHTML = '';
      products.forEach(p => grid.appendChild(p));
    });
  }
});
