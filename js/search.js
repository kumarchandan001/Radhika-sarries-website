/* =========================================================
   SEARCH LOGIC
   ========================================================= */

function toggleSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;
  
  if (query.length < 2) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  // Mock search DB for phase 3
  const mockDB = [
    { name: "Kanjivaram Bridal Silk Saree", type: "Product", link: "/shop/product.html" },
    { name: "Banarasi Georgette Wedding", type: "Product", link: "/shop/product.html" },
    { name: "Cotton Handloom Daily", type: "Product", link: "/shop/product.html" },
    { name: "Best Sarees for Weddings", type: "Blog", link: "/blog/post-template.html" }
  ];
  
  const results = mockDB.filter(item => item.name.toLowerCase().includes(query));
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found for "'+query+'"</p>';
    return;
  }
  
  let html = '';
  results.forEach(res => {
    html += `
      <div style="border:1px solid var(--clr-border); padding:10px; border-radius:4px;">
        <span style="font-size:0.7rem; color:var(--clr-text-light); text-transform:uppercase;">${res.type}</span>
        <h4 style="margin:5px 0;"><a href="${res.link}" style="color:var(--clr-primary); text-decoration:none;">${res.name}</a></h4>
      </div>
    `;
  });
  
  resultsContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchToggles = document.querySelectorAll('.search-toggle-btn');
  searchToggles.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearch();
  }));
  
  const closeBtn = document.getElementById('search-close');
  if (closeBtn) closeBtn.addEventListener('click', toggleSearch);
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => performSearch()));
  }
});
