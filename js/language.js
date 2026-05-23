/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */

function switchLanguage(lang) {
  localStorage.setItem('rs_lang', lang);
  
  let basePath = window.location.pathname.includes('/lang/') 
    ? '../' 
    : './';
    
  if (lang === 'en') {
    if (window.location.pathname.includes('/lang/')) {
      window.location.href = '../index.html';
    }
  } else if (lang === 'kn') {
    window.location.href = basePath + 'lang/kn.html';
  } else if (lang === 'hi') {
    window.location.href = basePath + 'lang/hi.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const langItems = document.querySelectorAll('.lang-switcher__item');
  langItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = e.target.dataset.lang;
      if (lang) switchLanguage(lang);
    });
  });
  
  // Set current label
  const currentLang = localStorage.getItem('rs_lang') || 'en';
  const label = document.querySelector('.lang-switcher__current span');
  if (label) {
    label.textContent = currentLang.toUpperCase();
  }
});
