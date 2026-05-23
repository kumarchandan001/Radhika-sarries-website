/* =========================================================
   Radhika Sarries — Shared JavaScript (Phase 1 + Phase 2)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. DOM References
  // ---------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const navLinkItems = document.querySelectorAll('.navbar__link');
  const contactForm = document.getElementById('contactForm');
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section[id]');

  // ---------------------------------------------------------
  // 2. Mobile Menu Toggle
  // ---------------------------------------------------------
  function openMobileMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

  navLinkItems.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ---------------------------------------------------------
  // 3. Sticky Navbar
  // ---------------------------------------------------------
  const SCROLL_THRESHOLD = 50;

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---------------------------------------------------------
  // 4. Active Nav Link — page-based (multi-page)
  // ---------------------------------------------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinkItems.forEach(link => {
    const href = link.getAttribute('href');
    // For multi-page: highlight based on filename
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      // Don't add active if it's an anchor link on the same page
      if (!href.includes('#')) {
        link.classList.add('active');
      }
    }
    // For sub-pages check relative paths
    if (href && !href.includes('#')) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    }
  });

  // Active link on scroll (only for single-page sections)
  if (sections.length > 0 && (currentPage === 'index.html' || currentPage === '')) {
    const sectionObserverOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinkItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
              link.classList.remove('active');
              if (href === `#${currentId}` || href.endsWith(`#${currentId}`)) {
                link.classList.add('active');
              }
            }
          });
        }
      });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ---------------------------------------------------------
  // 5. Scroll Reveal Animations
  // ---------------------------------------------------------
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------------------------------------------------------
  // 6. Contact Form Handling
  // ---------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !phone || !message) {
        showFormFeedback(contactForm, 'Please fill in all fields.', 'error');
        return;
      }

      const phoneRegex = /^[+]?[0-9]{10,13}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showFormFeedback(contactForm, 'Please enter a valid phone number.', 'error');
        return;
      }

      const submitBtn = document.getElementById('contactSubmit');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          showFormFeedback(contactForm, 'Thank you! We will get back to you soon.', 'success');
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }

  function showFormFeedback(form, text, type) {
    const existing = form.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = `form-feedback form-feedback--${type}`;
    feedback.textContent = text;
    feedback.style.cssText = `padding:.75rem 1rem;border-radius:6px;font-size:.9rem;font-weight:500;margin-top:.5rem;animation:fadeInUp .4s ease;`;
    if (type === 'success') {
      feedback.style.cssText += 'background:#E8F5E9;color:#2E7D32;border:1px solid #A5D6A7;';
    } else {
      feedback.style.cssText += 'background:#FFEBEE;color:#C62828;border:1px solid #EF9A9A;';
    }
    form.appendChild(feedback);
    setTimeout(() => {
      feedback.style.transition = 'opacity .4s ease';
      feedback.style.opacity = '0';
      setTimeout(() => feedback.remove(), 400);
    }, 5000);
  }

  // ---------------------------------------------------------
  // 7. Smooth Scroll for Anchor Links
  // ---------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 72;
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------------------------------------------------------
  // 8. Year Auto-Update
  // ---------------------------------------------------------
  const yearEl = document.querySelector('.footer__bottom');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
  }

  // =========================================================
  // PHASE 2 — GALLERY FEATURES
  // =========================================================

  // ---------------------------------------------------------
  // 9. Gallery Filter Tabs
  // ---------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-page__item');

  if (filterTabs.length > 0 && galleryItems.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('filter-tab--active'));
        tab.classList.add('filter-tab--active');

        const category = tab.dataset.category;

        // Fade out all items
        galleryItems.forEach(item => {
          item.classList.add('fade-out');
          item.classList.remove('fade-in');
        });

        // After fade-out animation, show/hide based on category
        setTimeout(() => {
          galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || itemCategory === category) {
              item.classList.remove('hidden');
              // Only show items up to visible limit if "load more" is active
              requestAnimationFrame(() => {
                item.classList.remove('fade-out');
                item.classList.add('fade-in');
              });
            } else {
              item.classList.add('hidden');
            }
          });
        }, 300);
      });
    });
  }

  // ---------------------------------------------------------
  // 10. Gallery Load More
  // ---------------------------------------------------------
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.gallery-page__item.load-more-hidden');
      hiddenItems.forEach((item, idx) => {
        item.classList.remove('load-more-hidden', 'hidden');
        item.style.transitionDelay = `${idx * 0.08}s`;
        requestAnimationFrame(() => {
          item.classList.add('fade-in');
        });
      });
      loadMoreBtn.style.display = 'none';
    });
  }

  // ---------------------------------------------------------
  // 11. Lightbox
  // ---------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__prev');
    const lightboxNext = lightbox.querySelector('.lightbox__next');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');

    let lightboxImages = [];
    let currentIndex = 0;

    // Collect all gallery images
    document.querySelectorAll('.gallery-page__item').forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImages.push(img.src);
        item.addEventListener('click', () => {
          currentIndex = index;
          openLightbox();
        });
      }
    });

    function openLightbox() {
      if (!lightboxImages[currentIndex]) return;
      lightboxImg.src = lightboxImages[currentIndex];
      lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxImages.length}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
      lightboxImg.src = lightboxImages[currentIndex];
      lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxImages.length}`;
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % lightboxImages.length;
      lightboxImg.src = lightboxImages[currentIndex];
      lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxImages.length}`;
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }

  // =========================================================
  // PHASE 2 — TESTIMONIALS FEATURES
  // =========================================================

  // ---------------------------------------------------------
  // 12. Animated Counters
  // ---------------------------------------------------------
  const counters = document.querySelectorAll('.stat-counter__number');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toLocaleString() + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // =========================================================
  // PHASE 2 — BLOG FEATURES
  // =========================================================

  // ---------------------------------------------------------
  // 13. Copy Link Share Button
  // ---------------------------------------------------------
  const copyBtn = document.querySelector('.share-btn--copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.classList.add('copied');
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = originalIcon;
        }, 2000);
      });
    });
  }

  // ---------------------------------------------------------
  // 14. Table of Contents Active Tracking
  // ---------------------------------------------------------
  const tocLinks = document.querySelectorAll('.toc__link');
  if (tocLinks.length > 0) {
    const articleHeadings = document.querySelectorAll('.article__body h2');
    if (articleHeadings.length > 0) {
      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

      articleHeadings.forEach(h => headingObserver.observe(h));
    }
  }

  // ---------------------------------------------------------
  // 15. Newsletter Form (basic)
  // ---------------------------------------------------------
  const newsletterForms = document.querySelectorAll('.sidebar__newsletter');
  newsletterForms.forEach(form => {
    const btn = form.querySelector('.btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          btn.style.background = '#25D366';
          emailInput.value = '';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
            btn.style.background = '';
          }, 3000);
        }
      });
    }
  });
});
