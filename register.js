/* Static prototype — no backend. "Create Account" writes a fake user
   record into localStorage (key "fas_user") so login state can be
   demoed elsewhere in the prototype. */

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
  const fromLogin = sessionStorage.getItem('sg_to_register') === '1';
  sessionStorage.removeItem('sg_to_register');

  if (fromLogin) {
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

document.getElementById('googleBtn').addEventListener('click', function(e) {
  e.preventDefault();
  showToast('Social sign-in is not available in this static prototype.');
});
document.getElementById('facebookBtn').addEventListener('click', function(e) {
  e.preventDefault();
  showToast('Social sign-in is not available in this static prototype.');
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = document.getElementById('regFullname').value.trim();
  const email   = document.getElementById('regEmail').value.trim();
  const pass    = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;
  let hasErr = false;

  [['regFullname', name,  'Please enter your full name.'],
   ['regEmail',    email, 'Please enter your email address.'],
   ['regPassword', pass,  'Please enter a password.']
  ].forEach(([id, val, msg]) => {
    if (!val) {
      document.getElementById(id).classList.add('err');
      if (!hasErr) { showToast(msg); hasErr = true; }
    }
  });
  if (hasErr) return;

  if (pass.length < 8) {
    document.getElementById('regPassword').classList.add('err');
    showToast('Password must be at least 8 characters.');
    return;
  }
  if (pass !== confirm) {
    document.getElementById('regConfirmPassword').classList.add('err');
    showToast('Passwords do not match.');
    return;
  }

  const btn = this.querySelector('.btn-submit');
  btn.textContent = 'Creating account…';
  btn.disabled = true;

  // Mock account creation — no real database in this static prototype.
  setTimeout(() => {
    localStorage.setItem('fas_user', JSON.stringify({ email, fullname: name }));
    showToast('Account created — welcome to Father and Son.', true);
    setTimeout(() => {
      sessionStorage.setItem('sg_from_register', '1');
      fadeToPage('login_external.html');
    }, 2000);
  }, 500);
});

['regFullname','regEmail','regPassword'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    this.classList.remove('err');
  });
});

document.getElementById('toLogin').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.setItem('sg_from_register', '1');
  fadeToPage('login_external.html');
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
