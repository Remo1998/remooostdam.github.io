/* ==========================================================================
   Remo Oostdam — shared behaviour
   Loaded with `defer` on every page, so the DOM is ready when this runs.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Current year in the footer ------------------------------------- */

  var year = String(new Date().getFullYear());
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = year;
  });

  /* ---- Email: keep the visible text obfuscated, make the click real ---- */

  document.querySelectorAll('a.js-email').forEach(function (a) {
    var user = a.dataset.user;
    var domain = a.dataset.domain;
    if (!user || !domain) return;
    a.setAttribute('href', 'mailto:' + user + '@' + domain);
  });

  /* ---- Lightbox -------------------------------------------------------- */

  (function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;

    var img = document.getElementById('lightbox-img');
    var cap = document.getElementById('lightbox-caption');
    var closeBtn = lb.querySelector('.lightbox-close');
    var lastFocused = null;

    function open(source) {
      lastFocused = document.activeElement;
      img.src = source.src;
      img.alt = source.alt || '';
      img.classList.toggle('rotated', source.classList.contains('rotated-thumb'));
      cap.textContent = source.getAttribute('data-caption') || source.alt || '';
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.js-lightbox').forEach(function (el) {
      el.addEventListener('click', function () { open(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
      });
    });

    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
    });
  })();
})();
