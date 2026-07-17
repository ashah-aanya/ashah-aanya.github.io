/* ---------------------------------------------------------------------------
   Studio "Turing Test": two generated oil-portrait tiles. Click one to guess
   which is the real painting vs the DALL-E replica; the reveal is random and
   independent of the images, so appearance never gives it away. The portraits
   are painterly placeholders (brushy warm oil) until real scans replace the
   canvases with <img> tags.
   --------------------------------------------------------------------------- */
(function () {
  var tiles = Array.prototype.slice.call(document.querySelectorAll('#studio .tile'));
  if (tiles.length < 2) return;
  var result = document.querySelector('#studio .tresult');
  var again = document.querySelector('#studio .tagain');
  var real, seeds = [1, 2];

  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // paint a loose, brushy oil self-portrait into a canvas
  function paint(cv, seed) {
    var r = mulberry(seed * 2654435761 & 0x7fffffff);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = cv.clientWidth || 260, h = cv.clientHeight || 325;
    cv.width = w * dpr; cv.height = h * dpr;
    var x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);

    var g = x.createLinearGradient(0, 0, w * 0.4, h);
    g.addColorStop(0, '#3b2620'); g.addColorStop(1, '#221310');
    x.fillStyle = g; x.fillRect(0, 0, w, h);

    function stroke(cx, cy, rx, ry, rot, col, a) {
      x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = a;
      x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, rx, ry, 0, 0, 6.2832); x.fill(); x.restore();
    }
    var bg = ['#3a241c', '#2a1712', '#4a2e22', '#5d3a2f', '#3b2b3a', '#2b2440'];
    for (var i = 0; i < 74; i++) stroke(r() * w, r() * h, 12 + r() * 28, 5 + r() * 11, (r() - 0.5) * 1.2, bg[(r() * bg.length) | 0], 0.09 + r() * 0.13);

    // figure: head + shoulders
    var hx = w * (0.44 + 0.08 * (r() - 0.5)), hy = h * 0.36, hr = w * 0.23;
    var skin = ['#8a5a42', '#a86a4e', '#b97e5c', '#9a6047', '#7a4a38'];
    var light = ['#c98a6a', '#d8a583', '#e6c09c'];
    for (var s = 0; s < 54; s++) stroke(hx + (r() - 0.5) * w * 0.6, hy + hr * 0.9 + r() * h * 0.4, 16 + r() * 24, 7 + r() * 12, (r() - 0.5) * 0.8, skin[(r() * skin.length) | 0], 0.13 + r() * 0.16);
    for (var k = 0; k < 90; k++) {
      var ang = r() * 6.28, rad = Math.pow(r(), 0.6) * hr;
      var px = hx + Math.cos(ang) * rad * 0.85, py = hy + Math.sin(ang) * rad * 1.05;
      var lit = px < hx && py < hy;
      var pal = lit ? light : skin;
      stroke(px, py, 9 + r() * 14, 5 + r() * 8, (r() - 0.5) * 0.9, pal[(r() * pal.length) | 0], 0.16 + r() * 0.2);
    }
    for (var m = 0; m < 18; m++) stroke(hx - hr * 0.3 + r() * hr * 0.45, hy - hr * 0.2 + r() * hr * 0.45, 5 + r() * 7, 3 + r() * 5, (r() - 0.5) * 0.6, light[2], 0.10 + r() * 0.16);
    for (var n = 0; n < 8; n++) stroke(hx + hr * 0.4 + r() * w * 0.3, hy + hr + r() * h * 0.3, 10 + r() * 16, 6 + r() * 9, (r() - 0.5), r() < 0.5 ? '#8A2B22' : '#2C376B', 0.06 + r() * 0.09);
    // fine canvas grain
    x.globalAlpha = 0.05;
    for (var q = 0; q < 320; q++) { x.fillStyle = r() < 0.5 ? '#000' : '#fff'; x.fillRect(r() * w, r() * h, 1, 1); }
    x.globalAlpha = 1;
  }

  function easelOf(t) { return t.closest('.painting'); }
  function paintAll() {
    tiles.forEach(function (t, i) { paint(t.querySelector('.pic'), seeds[i]); });
  }

  function reset(newArt) {
    if (newArt) { seeds = [seeds[0] + 7, seeds[1] + 11]; paintAll(); }
    real = Math.random() < 0.5 ? 0 : 1;
    tiles.forEach(function (t) {
      var e = easelOf(t);
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
      var pick = +t.dataset.i, ok = pick === real;
      tiles.forEach(function (x2) {
        var i = +x2.dataset.i, e = easelOf(x2);
        x2.disabled = true;
        e.querySelector('.tlabel').textContent = (i === real ? 'oil painting' : 'DALL·E replica');
        e.classList.add(i === real ? 'correct' : 'wrong');
      });
      result.innerHTML = ok
        ? 'Nice, that is the <b>real oil painting</b>. Most people at the exhibit got it wrong.'
        : 'Gotcha, you picked the <b>DALL·E replica</b>. You are in good company.';
      again.style.display = 'inline-block';
    });
  });
  again.addEventListener('click', function () { reset(true); });

  paintAll();
  reset(false);
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(paintAll, 200); });
})();
