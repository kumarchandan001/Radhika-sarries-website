const fs = require('fs');

const path = 'c:/Users/Chandan Kumar/Desktop/Radhika Sarries/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Schemas
const schemas = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Radhika Sarries",
    "url": "https://radhikasarries.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://radhikasarries.com/shop/index.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you deliver sarees across Karnataka?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes, we deliver across all of Karnataka and also ship pan-India."}
      },
      {
        "@type": "Question",
        "name": "Are your sarees directly sourced from Surat?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes, all our collections are directly sourced from Surat's finest weavers and manufacturers."}
      },
      {
        "@type": "Question",
        "name": "Can I return a saree if I'm not satisfied?",
        "acceptedAnswer": {"@type": "Answer", "text": "We offer a 7-day easy return policy on all orders."}
      }
    ]
  }
  </script>
`;
content = content.replace('</head>', schemas + '\n</head>');

// 2. Replace Navbar
const newNavbar = `
  <header class="navbar" id="navbar">
    <div class="container navbar__container">
      <a href="index.html" class="navbar__logo">Radhika Sarries</a>
      <button class="navbar__mobile-toggle" aria-label="Toggle Menu"><i class="fas fa-bars"></i></button>
      
      <nav class="navbar__menu">
        <ul class="navbar__nav">
          <li><a href="#hero" class="navbar__link active">Home</a></li>
          <li><a href="#about" class="navbar__link">About</a></li>
          <li><a href="shop/index.html" class="navbar__link">Shop <span class="product-badge product-badge--new" style="font-size:0.5rem;padding:2px 4px;margin-left:4px;vertical-align:top;">NEW</span></a></li>
          <li><a href="gallery.html" class="navbar__link">Gallery</a></li>
          <li><a href="testimonials.html" class="navbar__link">Testimonials</a></li>
          <li><a href="blog/index.html" class="navbar__link">Blog</a></li>
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
        <a href="account/index.html" class="nav-icon-btn" aria-label="Account"><i class="far fa-user"></i></a>
        <a href="cart.html" class="nav-icon-btn" aria-label="Cart">
          <i class="fas fa-shopping-bag"></i>
          <span class="cart-badge" style="display:none;">0</span>
        </a>
      </div>
    </div>
  </header>
`;
content = content.replace(/<header class="navbar"[\s\S]*?<\/header>/, newNavbar);

// 3. Insert Search Overlay right after <body>
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
content = content.replace('<body>', '<body>\n' + searchOverlay);

// 4. Shop Preview Section between Collections and About
const shopPreview = `
    <!-- ============================================
         SHOP PREVIEW
         ============================================ -->
    <section class="section" style="background:var(--clr-surface);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Shop Our Latest Arrivals</h2>
        </div>
        <div class="product-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:var(--space-lg); margin-bottom:var(--space-xl);">
          
          <article class="product-card">
            <div class="product-card__image-wrapper">
              <span class="product-card__badges"><span class="product-badge product-badge--new">NEW</span></span>
              <img src="assets/images/bridal-sarees.png" class="product-card__image" loading="lazy">
              <div class="product-card__actions">
                <button class="product-action-btn wishlist-toggle-btn" data-id="p1"><i class="far fa-heart"></i></button>
                <a href="shop/product.html" class="product-action-btn"><i class="far fa-eye"></i></a>
                <button class="product-action-btn add-to-cart-btn" data-id="p1" data-name="Kanjivaram Bridal Silk Saree" data-price="12999" data-img="assets/images/bridal-sarees.png"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
            <div class="product-card__info">
              <div class="product-card__fabric">Kanjivaram Silk</div>
              <h3 class="product-card__title"><a href="shop/product.html">Kanjivaram Bridal Silk Saree — Deep Maroon</a></h3>
              <div class="product-card__price">
                <span class="product-card__price-current">₹12,999</span>
              </div>
            </div>
          </article>

          <article class="product-card">
            <div class="product-card__image-wrapper">
              <img src="assets/images/silk-sarees.png" class="product-card__image" loading="lazy">
              <div class="product-card__actions">
                <button class="product-action-btn wishlist-toggle-btn" data-id="p2"><i class="far fa-heart"></i></button>
                <a href="shop/product.html" class="product-action-btn"><i class="far fa-eye"></i></a>
                <button class="product-action-btn add-to-cart-btn" data-id="p2" data-name="Banarasi Georgette Wedding Saree" data-price="8499" data-img="assets/images/silk-sarees.png"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
            <div class="product-card__info">
              <div class="product-card__fabric">Banarasi Georgette</div>
              <h3 class="product-card__title"><a href="shop/product.html">Banarasi Georgette Wedding Saree — Royal Blue</a></h3>
              <div class="product-card__price">
                <span class="product-card__price-current">₹8,499</span>
              </div>
            </div>
          </article>

          <article class="product-card">
            <div class="product-card__image-wrapper">
              <img src="assets/images/designer-collections.png" class="product-card__image" loading="lazy">
              <div class="product-card__actions">
                <button class="product-action-btn wishlist-toggle-btn" data-id="p4"><i class="far fa-heart"></i></button>
                <a href="shop/product.html" class="product-action-btn"><i class="far fa-eye"></i></a>
                <button class="product-action-btn add-to-cart-btn" data-id="p4" data-name="Organza Designer Saree" data-price="6299" data-img="assets/images/designer-collections.png"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
            <div class="product-card__info">
              <div class="product-card__fabric">Organza</div>
              <h3 class="product-card__title"><a href="shop/product.html">Organza Designer Saree — Blush Pink</a></h3>
              <div class="product-card__price">
                <span class="product-card__price-current">₹6,299</span>
              </div>
            </div>
          </article>

        </div>
        <div class="section__cta">
          <a href="shop/index.html" class="btn btn--secondary">View All Products</a>
        </div>
      </div>
    </section>
`;
content = content.replace('<!-- ============================================', shopPreview + '\n\n    <!-- ============================================');

// 5. FAQ Section before footer
const faqSection = `
  <!-- ============================================
       FAQ SECTION
       ============================================ -->
  <section class="section">
    <div class="container" style="max-width:800px;">
      <div class="section__header reveal">
        <h2 class="section__title">Frequently Asked Questions</h2>
      </div>
      
      <div class="faq-accordion reveal">
        <div class="faq-item">
          <button class="faq-question">Do you deliver sarees across Karnataka? <i class="fas fa-plus faq-icon"></i></button>
          <div class="faq-answer"><div class="faq-answer-inner">Yes, we deliver across all of Karnataka and also ship pan-India with secure couriers.</div></div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Are your sarees directly sourced from Surat? <i class="fas fa-plus faq-icon"></i></button>
          <div class="faq-answer"><div class="faq-answer-inner">Yes, all our collections are directly sourced from Surat's finest weavers and manufacturers ensuring premium quality at fair prices.</div></div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Can I return a saree if I'm not satisfied? <i class="fas fa-plus faq-icon"></i></button>
          <div class="faq-answer"><div class="faq-answer-inner">We offer a 7-day easy return policy on all orders. Keep the tags intact and item unworn.</div></div>
        </div>
        <div class="faq-item">
          <button class="faq-question">What payment methods do you accept? <i class="fas fa-plus faq-icon"></i></button>
          <div class="faq-answer"><div class="faq-answer-inner">We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. Our most popular option is ordering via WhatsApp where we share instant payment links.</div></div>
        </div>
        <div class="faq-item">
          <button class="faq-question">Do you take wholesale orders? <i class="fas fa-plus faq-icon"></i></button>
          <div class="faq-answer"><div class="faq-answer-inner">Yes! For bulk or wholesale enquiries, please contact us directly on WhatsApp for special pricing.</div></div>
        </div>
      </div>
    </div>
  </section>
`;
content = content.replace(/<!-- ============================================\s*FOOTER/, faqSection + '\n\n  <!-- ============================================\n       FOOTER');

// 6. Newsletter Popup before </body>
const newsletter = `
  <!-- Newsletter Modal -->
  <div class="newsletter-modal" id="newsletter-modal">
    <div class="newsletter-content">
      <button class="newsletter-close" id="newsletter-close"><i class="fas fa-times"></i></button>
      <h3 class="newsletter-title">Get 10% Off</h3>
      <p>Subscribe to our fashion journal and get 10% off your first order!</p>
      <form class="newsletter-form" id="newsletter-form" onsubmit="event.preventDefault(); sessionStorage.setItem('rs_news', 'done'); this.innerHTML='<p style=\\'color:#2E7D32; font-weight:bold;\\'>Thank you! Use code RADHIKA10 at checkout.</p>';">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="btn btn--primary">Claim Discount</button>
      </form>
      <button onclick="document.getElementById('newsletter-modal').classList.remove('active'); sessionStorage.setItem('rs_news', 'done');" style="background:none; border:none; margin-top:15px; color:var(--clr-text-light); text-decoration:underline; cursor:pointer;">No thanks, I prefer paying full price</button>
    </div>
  </div>
`;

const newScripts = `
  <script src="js/cart.js"></script>
  <script src="js/wishlist.js"></script>
  <script src="js/search.js"></script>
  <script src="js/language.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // FAQ Logic
      document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const answer = btn.nextElementSibling;
          btn.classList.toggle('active');
          if (btn.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0';
          }
        });
      });

      // Newsletter Logic
      if(!sessionStorage.getItem('rs_news')) {
        setTimeout(() => {
          document.getElementById('newsletter-modal').classList.add('active');
        }, 8000);
      }
      
      document.getElementById('newsletter-close').addEventListener('click', () => {
        document.getElementById('newsletter-modal').classList.remove('active');
        sessionStorage.setItem('rs_news', 'done');
      });
    });
  </script>
`;

content = content.replace('</body>', newsletter + '\n' + newScripts + '\n</body>');

fs.writeFileSync(path, content, 'utf8');
console.log('Index updated.');
