/* Tap-to-reveal "Can you tell?" grid (see css/guess.css). Each column holds a
   real oil painting and its AI replica; on load we shuffle which sits on top,
   so the answer isn't always in the same place. Tapping either tile reveals
   the whole column. */
(function () {
  document.querySelectorAll('.guess .gpair').forEach(function (pair) {
    var tiles = pair.querySelectorAll('.gtile');
    if (Math.random() < 0.5) pair.insertBefore(tiles[1], tiles[0]);   // shuffle order
    var shown = pair.querySelectorAll('.gtile');
    var title = pair.getAttribute('data-title') || '';
    shown.forEach(function (t, i) {
      var real = t.getAttribute('data-kind') === 'real';
      t.querySelector('.gtag').textContent = real ? 'Oil painting' : 'AI replica';
      t.querySelector('img').alt = 'Version ' + (i ? 'B' : 'A') + (title ? ' of ' + title : ' of a blue portrait');   // don't leak the answer to screen readers
      t.setAttribute('aria-label', 'Option ' + (i ? 'B' : 'A') + (title ? ' for ' + title : '') + '. Tap to reveal whether it is real or AI.');
      t.addEventListener('click', function () {
        if (pair.classList.contains('done')) return;
        pair.classList.add('done');
        t.classList.add('picked');
        shown.forEach(function (x) {
          x.disabled = true;
          var r = x.getAttribute('data-kind') === 'real';
          x.setAttribute('aria-label', (r ? 'Oil painting' : 'AI replica') + (title ? ' of ' + title : ''));
        });
        var verdict = real ? 'you found the real one' : 'that one was the AI';
        pair.querySelector('.gname').textContent = title ? title + ' · ' + verdict : verdict.charAt(0).toUpperCase() + verdict.slice(1);
      });
    });
  });
})();
