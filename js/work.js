/* ---------------------------------------------------------------------------
   Work board: arrow buttons + a "2 / 5" column counter for the sideways card rail.
   Scrolling itself is native (trackpad, touch, shift+wheel, arrow keys when
   the rail has focus); this only adds buttons for mouse users.
   --------------------------------------------------------------------------- */
(function () {
  var rail = document.getElementById('pins');
  if (!rail) return;
  var prev = document.getElementById('workPrev');
  var next = document.getElementById('workNext');
  var count = document.getElementById('workCount');
  var cards = rail.children;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function step() {
    var gap = parseFloat(getComputedStyle(rail).columnGap) || 30;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function update() {
    var max = rail.scrollWidth - rail.clientWidth - 2;
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max;
    var rows = getComputedStyle(rail).gridTemplateRows.split(' ').length || 1;
    var cols = Math.ceil(cards.length / rows);
    var first = Math.min(cols, Math.round(rail.scrollLeft / step()) + 1);
    count.textContent = first + ' / ' + cols;
  }

  function go(dir) {
    rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
  }

  prev.addEventListener('click', function () { go(-1); });
  next.addEventListener('click', function () { go(1); });
  rail.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
