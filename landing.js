// ── NAVBAR SCROLL ──
(function () {
  function applyScroll() {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
  }
  applyScroll();
  window.addEventListener('scroll', applyScroll, { passive: true });
})();

// ── HAMBURGER ──
(function () {
  const hBtn  = document.getElementById('hamburgerBtn');
  const hMenu = document.getElementById('hamburgerMenu');
  function close() { hMenu.classList.remove('open'); hBtn.classList.remove('open'); hBtn.setAttribute('aria-expanded','false'); }
  hBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = hMenu.classList.toggle('open');
    hBtn.classList.toggle('open', open);
    hBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', close);
  hMenu.addEventListener('click', e => e.stopPropagation());
  hMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// ── PAGE VEIL ──
const veil = document.getElementById('pageVeil');
veil.style.transition = 'none';
veil.classList.add('out');
requestAnimationFrame(() => { veil.style.transition = ''; });

function fadeToPage(url) {
  veil.classList.remove('out');
  veil.style.transition = 'opacity .5s cubic-bezier(.4,0,.2,1)';
  veil.style.background = '#f5f4f0';
  veil.style.opacity = '1';
  veil.style.pointerEvents = 'auto';
  setTimeout(() => { window.location.href = url; }, 520);
}

// Wire all internal links through fade
document.querySelectorAll('a[href^="home_external.html"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    sessionStorage.setItem('sg_from_landing', '1');
    fadeToPage(a.getAttribute('href'));
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ── PAGESHOW (bfcache) ──
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    veil.style.transition = 'none';
    veil.classList.add('out');
    veil.style.opacity = '';
    veil.style.pointerEvents = '';
    requestAnimationFrame(() => { veil.style.transition = ''; });
  }
});
