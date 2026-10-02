/* Static prototype — no backend. "Sign in" just checks/writes a fake
   session in localStorage (key "fas_user") so the rest of the demo
   (nav showing a logged-in state, order history, etc.) can react to it. */

function showToast(msg, success) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast' + (success ? ' toast--success' : '');
  t.innerHTML = '<span style="opacity:.35;letter-spacing:.02em">' + (success ? '✓' : '—') + '</span><span>' + msg + '</span>';
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  const dur = success ? 3600 : 2800;
  setTimeout(() => {
    t.classList.add('hide'); t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, dur);
}

function fadeToPage(url) {
  const veil = document.getElementById('pageVeil');
  const page = document.querySelector('.page');
  if (page) {
    page.style.transition = 'filter .48s cubic-bezier(.4,0,.2,1)';
    page.style.filter = 'blur(14px) brightness(.92)';
  }
  veil.classList.remove('out');
  veil.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 520);
}

window.addEventListener('DOMContentLoaded', function () {
  const veil = document.getElementById('pageVeil');
  const page = document.querySelector('.page');
  const fromStore    = sessionStorage.getItem('sg_to_login') === '1';
  const fromRegister = sessionStorage.getItem('sg_from_register') === '1';
  sessionStorage.removeItem('sg_to_login');
  sessionStorage.removeItem('sg_from_register');

  if (fromStore || fromRegister) {
    if (page) {
      page.style.transition = 'none';
      page.style.filter = 'blur(14px) brightness(.92)';
      page.offsetHeight;
      page.style.transition = 'filter .52s cubic-bezier(.4,0,.2,1)';
      page.style.filter = 'blur(0px) brightness(1)';
    }
    veil.classList.add('out');
    veil.classList.remove('active');
  } else {
    veil.style.transition = 'none';
    veil.classList.remove('active');
    veil.classList.add('out');
    if (page) { page.style.filter = ''; page.style.transition = ''; }
    requestAnimationFrame(() => { veil.style.transition = ''; });
  }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPassword').value;
  const errBox = document.getElementById('formError');
  errBox.style.display = 'none';

  if (!email && !pass) {
    document.getElementById('loginEmail').classList.add('err');
    document.getElementById('loginPassword').classList.add('err');
    showToast('Please enter your email and password.');
    return;
  }
  if (!email) {
    document.getElementById('loginEmail').classList.add('err');
    showToast('Please enter your email address.');
    return;
  }
  if (!pass) {
    document.getElementById('loginPassword').classList.add('err');
    showToast('Please enter your password.');
    return;
  }

  const btn = this.querySelector('.btn-submit');
  btn.disabled = true;
  btn.textContent = 'Signing in…';

  // Mock auth — this is a static prototype with no real database.
  // Any well-formed email/password combo signs you in.
  setTimeout(() => {
    const fullname = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    localStorage.setItem('fas_user', JSON.stringify({ email, fullname }));
    sessionStorage.setItem('sg_from_login', '1');
    fadeToPage('home_external.html');
  }, 500);
});

document.getElementById('googleBtn').addEventListener('click', function(e) {
  e.preventDefault();
  showToast('Social sign-in is not available in this static prototype.');
});
document.getElementById('facebookBtn').addEventListener('click', function(e) {
  e.preventDefault();
  showToast('Social sign-in is not available in this static prototype.');
});

['loginEmail','loginPassword'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    this.classList.remove('err');
  });
});

document.getElementById('toRegister').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.setItem('sg_to_register', '1');
  fadeToPage('register_external.html');
});
document.getElementById('backToStore').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.setItem('sg_from_login', '1');
  fadeToPage('home_external.html');
});

window.addEventListener('pageshow', function(e) {
  const veil = document.getElementById('pageVeil');
  if (e.persisted) {
    veil.style.transition = 'none';
    veil.classList.remove('active');
    veil.classList.add('out');
    requestAnimationFrame(() => { veil.style.transition = ''; });
  }
});
