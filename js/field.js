/* ---------------------------------------------------------------------------
   Hero background: a t-SNE-style point field.
   Loose clusters of specks (mostly ink, a few oxblood/indigo) that ease toward
   "home" positions with a slow painterly drift — a nod to the embedding-space
   work in "Three Ways of Seeing." It settles if you let it, and freezes for
   anyone who prefers reduced motion.
   --------------------------------------------------------------------------- */
(function () {
  var canvas = document.getElementById('field');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pts = [], W, H, DPR;
  var INK = '#221D16', OX = '#BF432E', IN = '#3A46B8';

  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.parentElement.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  function build() {
    var n = Math.max(46, Math.min(150, Math.floor(W * H / 9000)));
    var centers = [
      { x: W * 0.30, y: H * 0.42 }, { x: W * 0.62, y: H * 0.30 },
      { x: W * 0.78, y: H * 0.66 }, { x: W * 0.46, y: H * 0.74 }
    ];
    pts = [];
    for (var i = 0; i < n; i++) {
      var c = centers[i % centers.length];
      var spread = 70 + Math.random() * 120;
      var ang = Math.random() * Math.PI * 2, rad = Math.pow(Math.random(), 0.7) * spread;
      var col = Math.random() < 0.16 ? OX : (Math.random() < 0.30 ? IN : INK);
      pts.push({
        hx: c.x + Math.cos(ang) * rad, hy: c.y + Math.sin(ang) * rad,  // home
        x: Math.random() * W, y: Math.random() * H,
        r: 0.8 + Math.random() * 2.4, col: col,
        a: 0.10 + Math.random() * 0.34,
        ph: Math.random() * Math.PI * 2, sp: 0.0006 + Math.random() * 0.0012
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (reduce) { p.x = p.hx; p.y = p.hy; }
      else {
        p.x += (p.hx - p.x) * 0.012 + Math.cos(t * p.sp + p.ph) * 0.5;
        p.y += (p.hy - p.y) * 0.012 + Math.sin(t * p.sp * 1.3 + p.ph) * 0.5;
      }
      ctx.beginPath();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.col;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(draw);
  }

  size();
  if (reduce) { draw(0); } else { requestAnimationFrame(draw); }
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 150); });
})();

/* small helper: stamp the current year in the footer */
(function () {
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
