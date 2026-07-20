/* ---------------------------------------------------------------------------
   Studio "Turing Test": one real oil painting vs one AI (DALL-E) replica, the
   pairing straight from the Credo.AI "Agents of Trust" exhibit. Each round
   picks a random real painting and a random AI image, shuffles their sides,
   and the guess reveals which was which.
   --------------------------------------------------------------------------- */
(function () {
  var tiles = Array.prototype.slice.call(document.querySelectorAll('#studio .tile'));
  if (tiles.length < 2) return;
  var imgs = tiles.map(function (t) { return t.querySelector('.pic'); });
  var result = document.querySelector('#studio .tresult');
  var again = document.querySelector('#studio .tagain');

  var REALS = ['restless', 'overwhelm', 'distorting', 'floating', 'evolving']
    .map(function (s) { return 'assets/paintings/' + s + '.jpg'; });
  var AIS = ['ai-1', 'ai-2', 'ai-3', 'ai-4']
    .map(function (s) { return 'assets/turing/' + s + '.jpg'; });
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function paintingOf(t) { return t.closest('.painting'); }

  var realIdx;
  function reset() {
    realIdx = Math.random() < 0.5 ? 0 : 1;
    var realSrc = pick(REALS), aiSrc = pick(AIS);
    imgs[realIdx].src = realSrc; imgs[realIdx].alt = 'an oil painting';
    imgs[1 - realIdx].src = aiSrc; imgs[1 - realIdx].alt = 'an AI-generated image';
    tiles.forEach(function (t) {
      var e = paintingOf(t);
      e.classList.remove('correct', 'wrong');
      e.querySelector('.tlabel').textContent = '';
      t.disabled = false;
    });
    result.innerHTML = '';
    again.style.display = 'none';
  }

  tiles.forEach(function (t) {
    t.addEventListener('click', function () {
      if (t.disabled) return;
      var ok = (+t.dataset.i) === realIdx;
      tiles.forEach(function (x) {
        var i = +x.dataset.i, e = paintingOf(x);
        x.disabled = true;
        e.querySelector('.tlabel').textContent = (i === realIdx ? 'real oil painting' : 'DALL·E replica');
        e.classList.add(i === realIdx ? 'correct' : 'wrong');
      });
      result.innerHTML = ok
        ? 'Nice, that is the <b>real oil painting</b>. Most people at the exhibit got it wrong.'
        : 'Gotcha, that one is the <b>DALL·E replica</b>. You are in good company.';
      again.style.display = 'inline-block';
    });
  });
  again.addEventListener('click', reset);
  reset();
})();
