/* ---------------------------------------------------------------------------
   "Currently" ticker: rotate through the facets one at a time (~3s each). The
   outgoing line slides up and fades; the next rises in from below. Falls back
   to the full static list when JS is off or the viewer prefers reduced motion.
   --------------------------------------------------------------------------- */
(function () {
  var cur = document.querySelector('#currently .cur');
  if (!cur) return;
  var items = cur.querySelectorAll('.cg');
  if (items.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cur.classList.add('rotating');

  // pin the container to the tallest facet so the layout never jumps
  var maxH = 0;
  items.forEach(function (el) { maxH = Math.max(maxH, el.offsetHeight); });
  cur.style.minHeight = maxH + 'px';

  var i = 0;
  items[i].classList.add('show');
  setInterval(function () {
    var prev = i;
    items[prev].classList.remove('show');
    items[prev].classList.add('leave');
    setTimeout(function () { items[prev].classList.remove('leave'); }, 600);
    i = (i + 1) % items.length;
    items[i].classList.add('show');
  }, 3000);
})();
