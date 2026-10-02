/* Static prototype — no backend. Reads/writes the same "fas_cart"
   localStorage key used by home.js and product.js. Checkout is
   simulated: it clears the cart and shows a confirmation, since there
   is no database to actually place an order against. */

const CART_KEY = 'fas_cart';
const fmt = n => '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2 });

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch(e) { return []; }
}
function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function renderCart() {
  const items = getCart();
  const list = document.getElementById('cartList');
  const summaryWrap = document.getElementById('summaryBox');

  if (!items.length) {
    list.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">&#128722;</div>
        <p class="cart-empty__text">Your cart is empty</p>
        <a href="home_external.html" class="cart-empty__cta">Browse Perfumes &nbsp;→</a>
      </div>`;
    summaryWrap.style.display = 'none';
    return;
  }

  summaryWrap.style.display = '';
  list.innerHTML = items.map(it => `
    <div class="c-item">
      <img class="c-item__img" src="${it.img}" onerror="this.src='assets/logo-father-and-son.png'" alt="${it.name}">
      <div class="c-item__info">
        <p class="c-item__brand">${it.brand || '—'}</p>
        <p class="c-item__name">${it.name}</p>
        <p class="c-item__type">Perfume</p>
        <div class="c-item__qty-row">
          <button type="button" class="c-item__qty-btn" data-row="${it.cartRowId}" data-dir="-1">&#8722;</button>
          <input type="number" class="c-item__qty cart-qty-input" data-row="${it.cartRowId}" value="${it.qty}" min="1">
          <button type="button" class="c-item__qty-btn" data-row="${it.cartRowId}" data-dir="1">&#43;</button>
        </div>
      </div>
      <div class="c-item__right">
        <span class="c-item__price">${fmt(it.price)}</span>
        <span class="c-item__subtotal">${fmt(it.price * it.qty)}</span>
        <a class="c-item__remove" href="#" data-row="${it.cartRowId}">Remove</a>
      </div>
    </div>`).join('');

  renderSummary(items);
}

function renderSummary(items) {
  const subtotal = items.reduce((s,i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;
  document.getElementById('sumSubtotal').textContent = fmt(subtotal);
  document.getElementById('sumShipping').textContent = fmt(shipping);
  document.getElementById('sumTotal').textContent = fmt(total);
}

function updateQty(rowId, newQty) {
  let items = getCart();
  const item = items.find(i => i.cartRowId === rowId);
  if (!item) return;
  item.qty = Math.max(1, newQty);
  saveCart(items);
  renderCart();
}

function removeItem(rowId) {
  let items = getCart().filter(i => i.cartRowId !== rowId);
  saveCart(items);
  renderCart();
}

document.addEventListener('click', function(e) {
  const stepBtn = e.target.closest('.c-item__qty-btn');
  if (stepBtn) {
    const rowId = parseInt(stepBtn.dataset.row, 10);
    const dir = parseInt(stepBtn.dataset.dir, 10);
    const items = getCart();
    const item = items.find(i => i.cartRowId === rowId);
    if (item) updateQty(rowId, item.qty + dir);
    return;
  }
  const removeBtn = e.target.closest('.c-item__remove');
  if (removeBtn) {
    e.preventDefault();
    removeItem(parseInt(removeBtn.dataset.row, 10));
    return;
  }
});

document.addEventListener('change', function(e) {
  if (e.target.classList.contains('cart-qty-input')) {
    const rowId = parseInt(e.target.dataset.row, 10);
    updateQty(rowId, parseInt(e.target.value, 10) || 1);
  }
});

/* ── Shipping form + checkout ── */
document.getElementById('checkoutForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const required = ['firstName','lastName','street','city','postal','phone'];
  let hasErr = false;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('err');
      hasErr = true;
    } else {
      el.classList.remove('err');
    }
  });
  if (hasErr) { showToast('Please complete the required shipping fields.'); return; }
  if (!getCart().length) { showToast('Your cart is empty.'); return; }

  // Placing an order needs a signed-in user (same rule as the PHP version).
  const user = JSON.parse(localStorage.getItem('fas_user') || 'null');
  if (!user) {
    showToast('Please sign in to place your order.');
    setTimeout(() => { window.location.href = 'login_external.html'; }, 1400);
    return;
  }

  const btn = this.querySelector('.place-order-btn');
  btn.disabled = true;
  btn.textContent = 'Placing order…';

  // Mock checkout — no backend. The order is saved in localStorage so the
  // Order History page can show it.
  setTimeout(() => {
    const items = getCart();
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 150;
    const order = {
      id: 'FS-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      status: 'Pending',
      email: user.email,
      items: items,
      subtotal: subtotal,
      shipping: shipping,
      total: subtotal + shipping,
      address: {
        name: document.getElementById('firstName').value.trim() + ' ' + document.getElementById('lastName').value.trim(),
        street: document.getElementById('street').value.trim(),
        city: document.getElementById('city').value.trim(),
        postal: document.getElementById('postal').value.trim(),
        phone: document.getElementById('phone').value.trim()
      }
    };
    const orders = JSON.parse(localStorage.getItem('fas_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('fas_orders', JSON.stringify(orders));
    saveCart([]);
    showToast('Order placed! This is a demo — no real payment was taken.', true);
    setTimeout(() => { window.location.href = 'order_history_external.html'; }, 1800);
  }, 700);
});

['firstName','lastName','street','city','postal','phone'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', function() { this.classList.remove('err'); });
});

function showToast(msg, success) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast' + (success ? ' toast--success' : '');
  t.innerHTML = '<span style="opacity:.35">' + (success ? '✓' : '—') + '</span><span>' + msg + '</span>';
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.add('hide'); t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3200);
}

function updateCartBadge() {
  const b = document.getElementById('cartBadge');
  if (!b) return;
  const n = getCart().reduce((s,i) => s + i.qty, 0);
  b.textContent = n > 0 ? n : '';
}

function applyAuthState() {
  const user = JSON.parse(localStorage.getItem('fas_user') || 'null');
  const loginLink = document.getElementById('navLoginLink');
  const userWrap  = document.getElementById('userDdWrap');
  if (user && userWrap) {
    loginLink?.remove();
    userWrap.style.display = '';
    document.getElementById('ddUserName').textContent = user.fullname;
    document.getElementById('ddUserEmail').textContent = user.email;
    document.getElementById('ddAvatar').textContent = user.fullname.charAt(0).toUpperCase();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderCart();
  updateCartBadge();
  applyAuthState();

  const ddBtn = document.getElementById('userDdBtn');
  const ddPanel = document.getElementById('userDdPanel');
  if (ddBtn && ddPanel) {
    ddBtn.addEventListener('click', (e) => { e.stopPropagation(); ddPanel.classList.toggle('open'); });
    document.addEventListener('click', () => ddPanel.classList.remove('open'));
  }
  document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('fas_user');
    window.location.reload();
  });
});
