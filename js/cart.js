/* =========================================================
   CART LOGIC (localStorage)
   ========================================================= */

const CART_KEY = 'rs_cart';

// Internal structure: { id, name, price, qty, image, fabric, color }
function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  if (typeof renderCart === 'function') {
    renderCart();
  }
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  
  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast('Added to Cart');
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, newQty);
    saveCart(cart);
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function applyCoupon(code) {
  const validCoupons = {
    'RADHIKA10': { type: 'percent', value: 10 },
    'WELCOME': { type: 'fixed', value: 200 }
  };
  return validCoupons[code.toUpperCase()] || null;
}

function generateWhatsAppCartMessage() {
  const cart = getCart();
  let message = "Hi Radhika Sarries! I would like to place an order for the following items:\n\n";
  
  cart.forEach(item => {
    message += `- ${item.name} (Qty: ${item.qty}) = ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
  });
  
  const total = getCartTotal();
  message += `\nSubtotal: ₹${total.toLocaleString('en-IN')}\n`;
  message += `Please confirm my order and share payment details.`;
  
  return encodeURIComponent(message);
}

// Global exposure for buttons
window.rsAddToCart = addToCart;

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  
  // Attach quick-add handlers for shop cards
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const img = btn.dataset.img || 'assets/images/bridal-sarees.png';
      
      if (id && name && price) {
        addToCart({ id, name, price, qty: 1, image: img, fabric: 'Saree', color: 'Standard' });
      }
    }
  });
});
