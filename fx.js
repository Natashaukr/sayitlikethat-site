/* Respect to the flag — a soft turquoise ripple spreads from every click.
   Shared across every page. Reduced-motion users get nothing (see CSS). */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var SIZE = 150;
  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest('input, textarea, select')) return; // never over form fields
    var rp = document.createElement('span');
    rp.className = 'fx-ripple';
    rp.style.width = rp.style.height = SIZE + 'px';
    rp.style.left = e.clientX + 'px';
    rp.style.top = e.clientY + 'px';
    document.body.appendChild(rp);
    setTimeout(function () { if (rp.parentNode) rp.parentNode.removeChild(rp); }, 950);
  }, { passive: true });
})();
