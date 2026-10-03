/* Static prototype — no backend. Password change and shipping address are
   both simulated via localStorage ("fas_user" and "fas_shipping"). Requires
   a mock sign-in, same rule as the original PHP page. */

function showToast(msg, success) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast' + (success ? ' toast--success' : '');
  t.innerHTML = '<span style="opacity:.6">' + (success ? '✓' : '—') + '</span><span>' + msg + '</span>';
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.add('hide'); t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, 3000);
}

function showNotice(el, type, text) {
  el.className = 's-notice ' + type;
  el.textContent = text;
  el.style.display = 'block';
  // restart the entrance animation even if it's already visible
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
}

/* ── Animated button loading/success states ── */
function setButtonLoading(btn, isLoading) {
  btn.classList.toggle('is-loading', isLoading);
  btn.disabled = isLoading;
}
function flashButtonSuccess(btn, restoreDelay = 1600) {
  btn.classList.remove('is-loading');
  btn.classList.add('is-success');
  btn.disabled = false;
  setTimeout(() => btn.classList.remove('is-success'), restoreDelay);
}

/* ── Sliding tab indicator ── */
function positionIndicator(activeItem) {
  const nav = document.getElementById('settingsNav');
  const indicator = document.getElementById('navIndicator');
  if (!nav || !indicator || !activeItem) return;
  const isStacked = window.matchMedia('(max-width: 768px)').matches;
  if (isStacked) {
    indicator.style.top = '';
    indicator.style.height = '2px';
    nav.style.setProperty('--ind-w', activeItem.offsetWidth + 'px');
    nav.style.setProperty('--ind-x', activeItem.offsetLeft + 'px');
  } else {
    indicator.style.top = activeItem.offsetTop + 'px';
    indicator.style.height = activeItem.offsetHeight + 'px';
    indicator.style.transform = 'none';
  }
}

/* ── Tab switching ── */
function initTabs() {
  const navItems = document.querySelectorAll('.settings-nav__item[data-tab]');
  const panels = document.querySelectorAll('.settings-panel');

  function switchTab(tabId) {
    navItems.forEach(n => n.classList.toggle('active', n.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
    history.replaceState(null, '', location.pathname + '#' + tabId);
    const active = Array.from(navItems).find(n => n.dataset.tab === tabId);
    positionIndicator(active);
  }

  navItems.forEach(item => item.addEventListener('click', () => switchTab(item.dataset.tab)));
  window.addEventListener('resize', () => {
    const active = Array.from(navItems).find(n => n.classList.contains('active'));
    positionIndicator(active);
  });

  const hash = location.hash.replace('#', '');
  const valid = ['password', 'shipping'];
  switchTab(valid.includes(hash) ? hash : 'password');
}

/* ── Change password ── */
document.getElementById('passForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const old = document.getElementById('oldPass');
  const np = document.getElementById('newPass');
  const cp = document.getElementById('confirmPass');
  const notice = document.getElementById('passNotice');
  [old, np, cp].forEach(el => el.classList.remove('invalid', 'valid'));
  document.querySelectorAll('#panel-password .field-error').forEach(el => el.classList.remove('show'));
  notice.style.display = 'none';

  const user = JSON.parse(localStorage.getItem('fas_user') || 'null');
  if (!user) { window.location.href = 'login_external.html'; return; }

  let ok = true;
  const storedPass = user.password || '';
  if (storedPass && old.value !== storedPass) {
    old.classList.add('invalid');
    document.getElementById('err-oldPass').classList.add('show');
    ok = false;
  }
  if (np.value.trim().length < 6) {
    np.classList.add('invalid');
    document.getElementById('err-newPass').classList.add('show');
    ok = false;
  }
  if (np.value !== cp.value) {
    cp.classList.add('invalid');
    document.getElementById('err-confirmPass').classList.add('show');
    ok = false;
  }
  if (!ok) {
    showNotice(notice, 'error', 'Please fix the errors below and try again.');
    return;
  }

  const btn = this.querySelector('.save-btn');
  setButtonLoading(btn, true);

  setTimeout(() => {
    user.password = np.value;
    localStorage.setItem('fas_user', JSON.stringify(user));
    [old, np, cp].forEach(el => { el.classList.remove('invalid'); el.classList.add('valid'); el.value = ''; el.blur(); });
    flashButtonSuccess(btn);
    showNotice(notice, 'success', 'Password updated successfully!');
    showToast('Password updated', true);
  }, 600);
});

/* ── Shipping address ── */
const SHIP_FIELDS = [
  { id: 's_firstName', key: 'first_name', err: 'err-s_firstName' },
  { id: 's_lastName', key: 'last_name', err: 'err-s_lastName' },
  { id: 's_company', key: 'company', err: null },
  { id: 's_street', key: 'street_address', err: 'err-s_street' },
  { id: 's_city', key: 'city', err: 'err-s_city' },
  { id: 's_zip', key: 'zip_code', err: 'err-s_zip' },
];

function loadShipping() {
  let shipping = {};
  try { shipping = JSON.parse(localStorage.getItem('fas_shipping') || '{}'); } catch (e) {}
  SHIP_FIELDS.forEach(f => {
    const el = document.getElementById(f.id);
    if (el && shipping[f.key]) el.value = shipping[f.key];
  });
}

SHIP_FIELDS.forEach(f => {
  const el = document.getElementById(f.id);
  const err = f.err ? document.getElementById(f.err) : null;
  if (!el || !f.err) return;
  const check = () => {
    const ok = el.value.trim().length > 0;
    el.classList.toggle('invalid', !ok);
    el.classList.toggle('valid', ok);
    if (err) err.classList.toggle('show', !ok);
    return ok;
  };
  el.addEventListener('blur', check);
  el.addEventListener('input', () => { if (el.classList.contains('invalid')) check(); });
});

document.getElementById('shippingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const notice = document.getElementById('shipNotice');
  notice.style.display = 'none';
  let ok = true;
  const data = {};
  SHIP_FIELDS.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    data[f.key] = el.value.trim();
    if (!f.err) return;
    const valid = el.value.trim().length > 0;
    el.classList.toggle('invalid', !valid);
    el.classList.toggle('valid', valid);
    const err = document.getElementById(f.err);
    if (err) err.classList.toggle('show', !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    showNotice(notice, 'error', 'Please fill in all required fields.');
    return;
  }

  const btn = this.querySelector('.save-btn');
  setButtonLoading(btn, true);
  setTimeout(() => {
    localStorage.setItem('fas_shipping', JSON.stringify(data));
    flashButtonSuccess(btn);
    showNotice(notice, 'success', 'Shipping information saved.');
    showToast('Shipping address saved', true);
  }, 600);
});

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  document.getElementById('mainNav')?.classList.toggle('scrolled', scrolled);
  document.getElementById('announce')?.classList.toggle('hidden', scrolled);
}, { passive: true });

/* ── User dropdown ── */
(function () {
  const wrap = document.getElementById('userDdWrap');
  const btn = document.getElementById('userDdBtn');
  const panel = document.getElementById('userDdPanel');
  if (!wrap || !btn || !panel) return;
  const open = () => { panel.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', e => { e.stopPropagation(); panel.classList.contains('open') ? close() : open(); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  panel.addEventListener('click', e => e.stopPropagation());
})();

function updateCartBadge() {
  const b = document.getElementById('cartBadge');
  if (!b) return;
  let items = [];
  try { items = JSON.parse(localStorage.getItem('fas_cart') || '[]'); } catch (e) {}
  const n = items.reduce((s, i) => s + i.qty, 0);
  b.textContent = n > 0 ? n : '';
}

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('fas_user') || 'null');
  if (!user) { window.location.href = 'login_external.html'; return; }

  document.getElementById('ddUserName').textContent = user.fullname;
  document.getElementById('ddUserEmail').textContent = user.email;
  const initial = user.fullname.charAt(0).toUpperCase();
  document.getElementById('ddAvatar').textContent = initial;
  document.getElementById('ddAvatarNav').textContent = initial;

  loadShipping();
  initTabs();
  updateCartBadge();

  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('fas_user');
    window.location.href = 'home_external.html';
  });
});
