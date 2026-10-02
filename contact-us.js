document.addEventListener('DOMContentLoaded', () => {
  const veil = document.getElementById('pageVeil');
  if (veil) requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('out')));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  document.querySelectorAll('.back-link, .fade-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('mailto')) return;
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
