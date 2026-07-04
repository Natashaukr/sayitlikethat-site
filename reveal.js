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
