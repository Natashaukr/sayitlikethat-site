/* SayItLikeThat — gloss visibility toggle (no dependencies).
   Glosses (translations under English examples) are visible by default;
   the choice is remembered across pages via localStorage. */
(function () {
  var KEY = 'silt.glosses';
  var box = document.getElementById('glossToggle');
  if (!box) return;
  function apply(show) {
    document.body.classList.toggle('hide-gloss', !show);
    box.checked = show;
  }
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  apply(stored === null ? true : stored === '1');
  box.addEventListener('change', function () {
    try { localStorage.setItem(KEY, box.checked ? '1' : '0'); } catch (e) {}
    apply(box.checked);
  });
})();
