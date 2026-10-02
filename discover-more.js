/* Scroll-reveal */
(function () {
  const els = document.querySelectorAll('.js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* Lightbox */
(function () {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightboxImg');
  const lbCap   = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');

  function open(src, alt, caption) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCap.textContent = caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll('.creators__photo').forEach(function (photo) {
    const img = photo.querySelector('img');
    if (!img) return;
    photo.addEventListener('click', function () {
      if (img.style.display === 'none') return;
      const caption = photo.querySelector('.creators__photo-caption span');
      open(img.src, img.alt, caption ? caption.textContent : '');
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
