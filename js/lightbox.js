/* ---------------------------------------------------------------------------
   Diagram lightbox: diagrams are drawn small on the cards, so clicking one
   (or pressing Enter on it) opens it full size in a native <dialog>.
   Opt in with data-zoom on an <img>.
   --------------------------------------------------------------------------- */
(function () {
  var imgs = document.querySelectorAll('img[data-zoom]');
  if (!imgs.length || typeof HTMLDialogElement === 'undefined') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'zoom';
  dlg.innerHTML = '<img alt="" /><button type="button" class="zoom-close" aria-label="Close">close</button>';
  document.body.appendChild(dlg);
  var big = dlg.querySelector('img');

  function open(img) {
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    dlg.showModal();
  }

  imgs.forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge diagram: ' + img.alt);
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });

  // click anywhere (backdrop, image, or the button) closes it
  dlg.addEventListener('click', function () { dlg.close(); });
})();
