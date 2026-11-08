/**
 * Portfolio behaviour — A A D Dinithi Dulasha
 * ---------------------------------------------------------------------------
 * Plain JavaScript, no libraries. Loaded with `defer`, so the DOM is ready.
 *
 * Sections
 *   1. Settings
 *   2. Small helpers
 *   3. Theme toggle (light / dark)
 *   4. Footer year
 *   5. Career interest slideshow
 *   6. Carousels (projects + certificates)
 *   7. Project details dialog
 *   8. Back-to-top button
 */
(function () {
  'use strict';

  /* 1. Settings
     ====================================================================== */
  const CAREER_INTERESTS = [
    'Software Development',
    'Mobile Application Development',
    'Quality Assurance',
    'Business Analysis',
    'IT Support',
  ];
  const INTEREST_ROTATE_MS = 2100;
  const BACK_TO_TOP_SHOW_AFTER_PX = 400;
  const CAROUSEL_EDGE_TOLERANCE_PX = 4;

  /* 2. Small helpers
     ====================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Restart a CSS animation on an element by removing and re-adding its class. */
  function restartAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth; // force a reflow so the browser sees the removal
    element.classList.add(className);
  }

  /* 3. Theme toggle
     ====================================================================== */
  function initThemeToggle() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    button.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

      button.textContent = isDark ? '☀' : '☾';
      button.setAttribute('aria-label', label);
      button.title = label;
    });
  }

  /* 4. Footer year
     ====================================================================== */
  function initFooterYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* 5. Career interest slideshow
     ====================================================================== */
  function initInterestSlideshow() {
    const name = document.getElementById('interest-name');
    if (!name || prefersReducedMotion) return;

    let index = 0;

    window.setInterval(() => {
      index = (index + 1) % CAREER_INTERESTS.length;
      restartAnimation(name, 'is-entering');
      name.textContent = CAREER_INTERESTS[index];
    }, INTEREST_ROTATE_MS);
  }

  /* 6. Carousels
     ----------------------------------------------------------------------
     Markup: <div data-carousel>
               <button data-carousel-prev> … <button data-carousel-next>
               <div class="scroll-row"> …cards… </div>
             </div>
     The arrows scroll the row by one card; each arrow is disabled when the
     row is already at that end.
     ====================================================================== */
  function initCarousel(carousel) {
    const row = carousel.querySelector('.scroll-row');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!row || !previous || !next) return;

    /** Width of one card plus the gap between cards. */
    function scrollStep() {
      const firstCard = row.firstElementChild;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      return (firstCard ? firstCard.getBoundingClientRect().width : 300) + gap;
    }

    function updateButtons() {
      const atStart = row.scrollLeft <= CAROUSEL_EDGE_TOLERANCE_PX;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - CAROUSEL_EDGE_TOLERANCE_PX;

      previous.disabled = atStart;
      next.disabled = atEnd;
    }

    previous.addEventListener('click', () => row.scrollBy({ left: -scrollStep(), behavior: 'smooth' }));
    next.addEventListener('click', () => row.scrollBy({ left: scrollStep(), behavior: 'smooth' }));
    row.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    updateButtons();
  }

  /* 7. Project details dialog
     ----------------------------------------------------------------------
     Each project card in the row is compact (CSS hides .project-details).
     Clicking "Explore more" (or the image) opens the native <dialog> with a
     copy of the full card.
     ====================================================================== */
  function initProjectDialog() {
    const dialog = document.getElementById('project-dialog');
    const body = document.getElementById('project-dialog-body');
    const closeButton = document.getElementById('project-dialog-close');
    const cards = document.querySelectorAll('.project-card');
    if (!dialog || !body || !closeButton || typeof dialog.showModal !== 'function') return;

    let lastTrigger = null;

    function open(card, trigger) {
      const copy = card.cloneNode(true);
      copy.querySelector('.project-more')?.remove(); // no button inside the dialog

      body.replaceChildren(copy);
      lastTrigger = trigger;
      document.body.classList.add('dialog-open');
      dialog.showModal();
    }

    function close() {
      dialog.close();
    }

    cards.forEach((card) => {
      const button = card.querySelector('.project-more');
      const image = card.querySelector('.project-image');

      button?.addEventListener('click', () => open(card, button));
      image?.addEventListener('click', () => open(card, button)); // mouse convenience
    });

    closeButton.addEventListener('click', close);

    // Click on the dimmed backdrop (the dialog element itself) closes it.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close();
    });

    // Fires for every way of closing, including the Esc key.
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      lastTrigger?.focus();
    });
  }

  /* 8. Back-to-top button
     ====================================================================== */
  function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    function toggleVisibility() {
      button.classList.toggle('show', window.scrollY > BACK_TO_TOP_SHOW_AFTER_PX);
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    toggleVisibility();
  }

  /* Start everything
     ====================================================================== */
  initThemeToggle();
  initFooterYear();
  initInterestSlideshow();
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  initProjectDialog();
  initBackToTop();
})();
