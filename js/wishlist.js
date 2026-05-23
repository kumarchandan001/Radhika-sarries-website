/* =========================================================
   WISHLIST LOGIC (localStorage)
   ========================================================= */

const WISHLIST_KEY = 'rs_wishlist';

function getWishlist() {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  updateWishlistUI();
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from Wishlist');
  } else {
    wishlist.push(productId);
    showToast('Added to Wishlist');
  }
  
  saveWishlist(wishlist);
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistUI() {
  const wishlistBtnElements = document.querySelectorAll('.wishlist-toggle-btn');
  wishlistBtnElements.forEach(btn => {
    const productId = btn.dataset.id;
    const icon = btn.querySelector('i');
    if (isWishlisted(productId)) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      btn.classList.add('active');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      btn.classList.remove('active');
    }
  });
}

// Global Toast System (simple)
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--clr-primary);color:var(--clr-accent);padding:10px 20px;border-radius:4px;z-index:9999;transition:opacity 0.3s;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistUI();
  
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-toggle-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.dataset.id;
      if (id) toggleWishlist(id);
    }
  });
});
