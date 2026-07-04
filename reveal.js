/* SayItLikeThat — gentle scroll reveal for the landing sections (no
   dependencies). The .reveal class is added HERE, never in the HTML,
   so the page stays fully visible without JS — and reduced-motion
   readers are left alone entirely. A short watchdog un-hides
   everything if the observer never delivers (blocked or broken):
   the reveal is decoration, reading the page is the job. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('main > section, main > h2');
  var delivered = false;
  var io = new IntersectionObserver(function (entries) {
    delivered = true;
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target); // reveal once, then stay put
    });
    // Anchor links and End-key jumps can teleport PAST a section
    // without it ever intersecting — anything already above the
    // viewport has been "seen", so it must not stay hidden.
    els.forEach(function (el) {
      if (el.classList.contains('is-visible')) return;
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  els.forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });
  setTimeout(function () {
    if (delivered) return; // observer works — normal scroll reveals
    io.disconnect();
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }, 1000);
})();

/* Living water: on roomy screens with no data/motion objections, the
   hero's still ocean crossfades into a real video loop of the same
   water. Phones keep the photo + shimmer — 6 MB of ocean is a desktop
   luxury, not a mobile tax. No JS, slow networks, reduced motion:
   everyone simply keeps the beautiful still. */
(function () {
  var media = document.querySelector('.hero-media');
  if (!media || !window.matchMedia) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!matchMedia('(min-width: 900px)').matches) return;
  var conn = navigator.connection;
  if (conn && (conn.saveData || /(^|\b)2g/.test(conn.effectiveType || ''))) return;

  var css = document.querySelector('link[rel="stylesheet"][href$="style.css"]');
  var base = css ? css.getAttribute('href').replace('style.css', '') : '';
  var v = document.createElement('video');
  v.muted = true; v.loop = true; v.playsInline = true;
  v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
  v.setAttribute('aria-hidden', 'true');
  v.preload = 'auto';
  v.className = 'hero-video';
  v.src = base + 'assets/ocean-live.mp4';
  v.addEventListener('canplaythrough', function () {
    var p = v.play();
    var ok = function () { v.classList.add('is-flowing'); };
    if (p && p.then) { p.then(ok).catch(function () { v.remove(); }); }
    else { ok(); }
  }, { once: true });
  v.addEventListener('error', function () { v.remove(); }, { once: true });
  media.appendChild(v);
})();
