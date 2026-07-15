/* ---------------------------------------------------------------------------
   Featured-project icons: small, deterministic, on-brand motifs drawn to a
   <canvas> — a placeholder that reads as intentional until a real screenshot
   drops into the same slot. Each .feat sets data-kind and data-hue.
     kinds: bars | clusters | tsne | grid | nodes
     hues:  indigo | oxblood
   --------------------------------------------------------------------------- */
(function () {
  var COL = { indigo: '#2C376B', oxblood: '#8A2B22', ink: '#211C15' };

  // tiny seeded PRNG so the motifs don't reshuffle on every resize
  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function draw(cv, kind, hue, seed) {
    var r = mulberry(seed * 97 + 7);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    cv.width = w * dpr; cv.height = h * dpr;
    var x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, w, h);
    var main = COL[hue] || COL.indigo;

    if (kind === 'grid') {                     // attention matrix
      var n = 6, pad = w * 0.16, cell = (w - 2 * pad) / n;
      for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
        x.globalAlpha = 0.12 + r() * 0.6; x.fillStyle = main;
        x.fillRect(pad + j * cell + 1, h * 0.5 - (n * cell) / 2 + i * cell + 1, cell - 2, cell - 2);
      }
    } else if (kind === 'bars') {              // rising bars, last one accented
      var m = 5, bw = w * 0.1, gap = (0.4 * w) / (m + 1), bx = w * 0.2;
      for (var k = 0; k < m; k++) {
        var bh = (0.2 + 0.16 * k) * h; x.globalAlpha = 0.85;
        x.fillStyle = k === m - 1 ? COL.oxblood : main;
        x.fillRect(bx + k * (bw + gap), h * 0.78 - bh, bw, bh);
      }
    } else if (kind === 'nodes') {             // connected nodes
      var pts = [];
      for (var a = 0; a < 5; a++) pts.push([w * (0.2 + r() * 0.6), h * (0.2 + r() * 0.6)]);
      x.strokeStyle = main; x.globalAlpha = 0.35; x.lineWidth = 1;
      for (var a2 = 0; a2 < pts.length; a2++) for (var b = a2 + 1; b < pts.length; b++) {
        if (r() < 0.5) { x.beginPath(); x.moveTo(pts[a2][0], pts[a2][1]); x.lineTo(pts[b][0], pts[b][1]); x.stroke(); }
      }
      x.globalAlpha = 0.9; x.fillStyle = main;
      pts.forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 3.2, 0, 7); x.fill(); });
    } else {                                   // tsne / clusters — dot clouds
      var centers = kind === 'clusters'
        ? [[w * .32, h * .4], [w * .66, h * .36], [w * .5, h * .68]]
        : [[w * .35, h * .42], [w * .62, h * .5], [w * .5, h * .66]];
      var N = kind === 'clusters' ? 26 : 40;
      for (var d = 0; d < N; d++) {
        var c = centers[d % centers.length], sp = w * 0.16;
        var ang = r() * 6.28, rad = Math.pow(r(), 0.6) * sp;
        x.globalAlpha = 0.18 + r() * 0.5;
        x.fillStyle = r() < 0.22 ? COL.oxblood : (r() < 0.4 ? COL.ink : main);
        x.beginPath(); x.arc(c[0] + Math.cos(ang) * rad, c[1] + Math.sin(ang) * rad, 1.2 + r() * 2, 0, 7); x.fill();
      }
    }
    x.globalAlpha = 1;
  }

  function init() {
    document.querySelectorAll('.feat').forEach(function (f, i) {
      var cv = f.querySelector('.ficon canvas');
      if (cv) draw(cv, f.dataset.kind, f.dataset.hue, i + 1);
    });
  }

  init();
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(init, 200); });
})();
