/* ---------------------------------------------------------------------------
   Studio "Human or AI?" — the Credo AI "Agents of Trust" challenge, embedded
   in the gallery masonry. One tile (data-ai) is an AI-generated replica; the
   rest are real oil paintings. Clicking a tile is a guess: the reveal rings the
   AI tile in indigo, marks a wrong guess in oxblood, and reports the verdict in
   the placard. "Try again" clears the state so it can be replayed.
   --------------------------------------------------------------------------- */
(function () {
  var gallery = document.querySelector('#studio .gallery');
  if (!gallery) return;
  var tiles = Array.prototype.slice.call(gallery.querySelectorAll('.art'));
  if (!tiles.length) return;

  var card = gallery.querySelector('.aot-card');
  var result = gallery.querySelector('.aot-result');
  var again = gallery.querySelector('.aot-again');
  var answered = false;

  function isAI(t) { return !!(t.dataset && t.dataset.ai); }

  function badge(tile, kind, text) {
    var b = tile.querySelector('.verdict');
    if (!b) { b = document.createElement('span'); tile.appendChild(b); }
    b.className = 'verdict ' + kind;
    b.textContent = text;
  }

  function reveal(clicked) {
    if (answered) return;
    answered = true;
    var correct = isAI(clicked);

    tiles.forEach(function (t) {
      t.classList.add('revealed');
      if (isAI(t)) { t.classList.add('g-ai'); badge(t, 'v-ai', 'AI generated'); }
      else if (t !== clicked) { t.classList.add('g-dim'); }
    });
    if (!correct) { clicked.classList.add('g-real'); badge(clicked, 'v-real', 'Your guess'); }

    card.classList.add('answered', correct ? 'r-correct' : 'r-wrong');
    result.innerHTML = correct
      ? '<strong>Correct.</strong> That one was AI-generated — everything else is oil on canvas.'
      : '<strong>Not quite.</strong> That’s a real oil painting; the AI-generated one is ringed in indigo.';
  }

  function resetGame() {
    answered = false;
    tiles.forEach(function (t) {
      t.classList.remove('revealed', 'g-ai', 'g-real', 'g-dim');
      var b = t.querySelector('.verdict');
      if (b) b.parentNode.removeChild(b);
    });
    card.classList.remove('answered', 'r-correct', 'r-wrong');
    result.innerHTML = '';
  }

  tiles.forEach(function (t) {
    t.setAttribute('role', 'button');
    t.setAttribute('tabindex', '0');
    t.setAttribute('aria-label', 'Guess whether this piece is the AI-generated one');
    t.addEventListener('click', function () { reveal(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(t); }
    });
  });
  if (again) again.addEventListener('click', resetGame);
})();
