const fs = require('fs');
const path = require('path');

const files = [
  { path: 'c:/Users/Chandan Kumar/Desktop/Radhika Sarries/gallery.html', prefix: '', active: 'Gallery' },
  { path: 'c:/Users/Chandan Kumar/Desktop/Radhika Sarries/testimonials.html', prefix: '', active: 'Testimonials' },
  { path: 'c:/Users/Chandan Kumar/Desktop/Radhika Sarries/blog/index.html', prefix: '../', active: 'Blog' },
  { path: 'c:/Users/Chandan Kumar/Desktop/Radhika Sarries/blog/post-template.html', prefix: '../', active: 'Blog' }
];

files.forEach(file => {
  let content = fs.readFileSync(file.path, 'utf8');
  
  const searchOverlay = `
  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <div class="search-container">
      <button class="search-close" id="search-close" aria-label="Close search"><i class="fas fa-times"></i></button>
      <div class="search-input-wrapper">
        <i class="fas fa-search" style="font-size:1.5rem; margin-right:1rem; color:var(--clr-primary);"></i>
        <input type="text" id="search-input" placeholder="Search for sarees, fabrics, colors...">
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  </div>
`;

  const navbar = `
  <header class="navbar" id="navbar">
    <div class="container navbar__container">
      <a href="${file.prefix}index.html" class="navbar__logo">Radhika Sarries</a>
      <button class="navbar__mobile-toggle" aria-label="Toggle Menu"><i class="fas fa-bars"></i></button>
      
      <nav class="navbar__menu">
        <ul class="navbar__nav">
          <li><a href="${file.prefix}index.html" class="navbar__link">Home</a></li>
          <li><a href="${file.prefix}shop/index.html" class="navbar__link">Shop <span class="product-badge product-badge--new" style="font-size:0.5rem;padding:2px 4px;margin-left:4px;vertical-align:top;">NEW</span></a></li>
          <li><a href="${file.prefix}gallery.html" class="navbar__link ${file.active === 'Gallery' ? 'active' : ''}">Gallery</a></li>
          <li><a href="${file.prefix}testimonials.html" class="navbar__link ${file.active === 'Testimonials' ? 'active' : ''}">Testimonials</a></li>
          <li><a href="${file.prefix}blog/index.html" class="navbar__link ${file.active === 'Blog' ? 'active' : ''}">Blog</a></li>
        </ul>
      </nav>

      <div class="navbar__actions">
        <div class="lang-switcher">
          <div class="lang-switcher__current"><span>EN</span> <i class="fas fa-chevron-down" style="font-size:0.7rem;"></i></div>
          <div class="lang-switcher__dropdown">
            <a href="#" class="lang-switcher__item" data-lang="en">English</a>
            <a href="#" class="lang-switcher__item" data-lang="kn">ಕನ್ನಡ</a>
            <a href="#" class="lang-switcher__item" data-lang="hi">हिंदी</a>
          </div>
        </div>
        <button class="nav-icon-btn search-toggle-btn" aria-label="Search"><i class="fas fa-search"></i></button>
        <a href="${file.prefix}account/index.html" class="nav-icon-btn" aria-label="Account"><i class="far fa-user"></i></a>
        <a href="${file.prefix}cart.html" class="nav-icon-btn" aria-label="Cart">
          <i class="fas fa-shopping-bag"></i>
          <span class="cart-badge" style="display:none;">0</span>
        </a>
      </div>
    </div>
  </header>
`;

  // Insert search overlay right after body
  if (!content.includes('id="search-overlay"')) {
    content = content.replace('<body>', '<body>\n' + searchOverlay);
  }

  // Replace navbar
  content = content.replace(/<header class="navbar"[\s\S]*?<\/header>/, navbar);

  // Inject scripts
  const scriptsToInject = `
  <script src="${file.prefix}js/cart.js"></script>
  <script src="${file.prefix}js/wishlist.js"></script>
  <script src="${file.prefix}js/search.js"></script>
  <script src="${file.prefix}js/language.js"></script>
</body>`;
  content = content.replace(/<\/body>/, scriptsToInject);

  fs.writeFileSync(file.path, content, 'utf8');
});
console.log('Navbars updated.');
