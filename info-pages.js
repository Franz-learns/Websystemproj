/* Shared across authenticity_external.html, faqs_external.html, and
   returns_external.html — FAQ accordion + scroll-reveal + page transition. */

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const veil = document.getElementById('pageVeil');
  if (veil) requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('out')));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  document.querySelectorAll('.back-link, .fade-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
      e.preventDefault();
      const veil = document.getElementById('pageVeil');
      if (veil) {
        veil.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 400);
      } else {
        window.location.href = href;
      }
    });
  });
});
