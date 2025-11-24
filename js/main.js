// Shared site JS: nav toggle, countdown. Runs after includesLoaded.
function initNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const sidebarNav = document.querySelector('.sidebar-nav');
  if (!navToggle || !sidebarNav) return;
  navToggle.addEventListener('click', function() {
    sidebarNav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

function updateCountdown() {
  const eventDate = new Date('2026-06-27T12:00:00');
  const now = new Date();
  const diff = eventDate - now;
  const el = document.getElementById('countdown');
  if (!el) return;

  if (diff <= 0) {
    el.innerHTML = "It's Natfest time!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const d = document.getElementById('days');
  const h = document.getElementById('hours');
  const m = document.getElementById('minutes');
  const s = document.getElementById('seconds');
  if (d) d.textContent = days;
  if (h) h.textContent = hours;
  if (m) m.textContent = minutes;
  if (s) s.textContent = seconds;
}

// Initialize when includes are present
function initAfterIncludes() {
  initNavToggle();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initGallery();
  setActiveNav();
  initAbout();
  initFaqs();
}

// FAQ accordion initializer
function initFaqs() {
  const items = document.querySelectorAll('.faq-item');
  if (!items || items.length === 0) return;

  items.forEach(section => {
    const btn = section.querySelector('.faq-question');
    const answer = section.querySelector('.faq-answer');
    if (!btn || !answer) return;
    // Set initial ARIA state
    btn.setAttribute('aria-expanded', (!answer.hidden).toString());
    // Avoid double binding
    if (btn._faqBound) return;
    btn._faqBound = true;

    btn.addEventListener('click', () => {
      const isOpen = !answer.hidden;
      if (isOpen) {
        answer.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        section.classList.remove('open');
      } else {
        answer.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        section.classList.add('open');
      }
    });
  });
}

// Initialize About page interactions
function initAbout() {
  const btn = document.getElementById('toggleButton');
  const more = document.getElementById('moreContent');
  if (!btn || !more) return;
  // ensure ARIA state is correct initially
  const isHidden = more.style.display === 'none' || getComputedStyle(more).display === 'none';
  btn.setAttribute('aria-expanded', (!isHidden).toString());
  btn.setAttribute('aria-controls', 'moreContent');
  // avoid double-binding if called multiple times
  btn.removeEventListener('click', toggleLetter);
  btn.addEventListener('click', toggleLetter);
}

document.addEventListener('includesLoaded', initAfterIncludes);
// In case includes already present (rare), run shortly after load
window.setTimeout(() => {
  if (document.querySelector('[data-include]') === null) initAfterIncludes();
}, 1000);

// Gallery initialization (safe no-op on pages without a gallery)
function initGallery() {
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  if (!galleryThumbs || galleryThumbs.length === 0) return;

  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const closeBtn = document.querySelector('.gallery-close');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  if (!modal || !modalImg || !closeBtn) return;

  let images = Array.from(galleryThumbs).map(img => img.src);
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex];
    modal.classList.add('open');
  }
  function closeModal() {
    modal.classList.remove('open');
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
  }

  galleryThumbs.forEach((img, idx) => {
    img.addEventListener('click', () => openModal(idx));
  });
  closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

// Highlight active nav link in header and sidebar based on current page
function setActiveNav() {
  // Determine current page basename (e.g. index.html, lineup.html)
  let current = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  // Normalize root to index.html
  if (current === '') current = 'index.html';

  function basenameFromHref(href) {
    try {
      const url = new URL(href, window.location.href);
      const name = url.pathname.split('/').filter(Boolean).pop();
      return name || 'index.html';
    } catch (e) {
      // If href is something unexpected, fallback to raw string
      return href.split('/').pop();
    }
  }

  const navLinks = document.querySelectorAll('header a, .sidebar-nav a');
  navLinks.forEach(a => {
    const hrefName = basenameFromHref(a.getAttribute('href') || '');
    if (!hrefName) return;
    if (hrefName === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  });
}

// Toggle the hidden letter content on the About page
function toggleLetter() {
  const more = document.getElementById('moreContent');
  const btn = document.getElementById('toggleButton');
  if (!more || !btn) return;

  const isHidden = more.style.display === 'none' || getComputedStyle(more).display === 'none';
  if (isHidden) {
    more.style.display = 'block';
    btn.textContent = 'Read less';
    btn.setAttribute('aria-expanded', 'true');
  } else {
    more.style.display = 'none';
    btn.textContent = 'Read more';
    btn.setAttribute('aria-expanded', 'false');
  }
}
