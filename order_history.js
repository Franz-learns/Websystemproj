/* Static prototype — no backend. Orders come from "fas_orders" in
   localStorage, written by cart.js when a checkout succeeds. Requires a
   mock sign-in ("fas_user"), same rule as the original PHP page. */

const fmt = n => '₱ ' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2 });

function getOrders() {
  try { return JSON.parse(localStorage.getItem('fas_orders') || '[]'); }
  catch (e) { return []; }
}
function saveOrders(o) { localStorage.setItem('fas_orders', JSON.stringify(o)); }

function badgeClass(status) {
  const st = (status || 'pending').toLowerCase();
  if (st === 'completed' || st === 'delivered') return 'status-badge--delivered';
  if (st === 'cancelled') return 'status-badge--cancelled';
  return 'status-badge--pending';
}

function renderOrders() {
  const list = document.getElementById('orderList');
  const orders = getOrders();

  if (!orders.length) {
    list.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p class="empty-state__title">No Orders Yet</p>
        <p class="empty-state__sub">Start shopping and your orders will appear here.</p>
        <a href="home_external.html" class="empty-state__cta">Browse Perfumes</a>
      </div>`;
    return;
  }

  list.innerHTML = orders.map(order => {
    const items = order.items || [];
    const first = items[0];
    const extra = items.slice(1);
    const dateStr = order.date ? new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '';
    const canCancel = ['pending', 'processing'].includes((order.status || '').toLowerCase());

    const top = first ? `
      <div class="order-row__card-top">
        <img class="order-row__img" src="${first.img}" onerror="this.src='assets/logo-father-and-son.png'" alt="${first.name}">
        <div class="order-row__info">
          <p class="order-row__brand">${first.brand || first.name}</p>
          <p class="order-row__name">${first.name}</p>
          <p class="order-row__meta">Perfume${first.qty > 1 ? ' &times;' + first.qty : ''}</p>
          ${extra.length ? `<button class="order-row__more" onclick="toggleExtra('${order.id}')">
            <span class="more-text">+${extra.length} more item${extra.length > 1 ? 's' : ''}</span>
            <span class="more-chevron">▾</span></button>` : ''}
        </div>
      </div>` : `<div class="order-row__card-top"><div class="order-row__info"><p class="order-row__brand" style="opacity:.4;">No items</p></div></div>`;

    const sub = extra.length ? `
      <div class="order-row__sub" id="extra-${order.id}">
        ${extra.map(ei => `
          <div class="sub-item">
            <img class="sub-item__img" src="${ei.img}" onerror="this.src='assets/logo-father-and-son.png'" alt="${ei.name}">
            <span class="sub-item__name">${ei.name}</span>
            <span class="sub-item__qty">&times;${ei.qty}</span>
            <span class="sub-item__price">${fmt(ei.price * ei.qty)}</span>
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="order-row" id="order-${order.id}">
        ${top}
        <div class="order-row__right">
          <span class="status-badge ${badgeClass(order.status)}" id="badge-${order.id}">${order.status}</span>
          <span class="order-row__price">${fmt(order.total)}</span>
          <div class="order-row__footer">
            <div class="order-row__footer-meta">
              ${dateStr ? `<span class="order-row__date">${dateStr}</span>` : ''}
              <span class="order-row__number">${order.id}</span>
            </div>
            ${canCancel ? `<button class="cancel-btn" id="cancel-${order.id}" onclick="cancelOrder('${order.id}')">Cancel Order</button>` : ''}
          </div>
        </div>
      </div>
      ${sub}`;
  }).join('');
}

function toggleExtra(orderId) {
  const el = document.getElementById('extra-' + orderId);
  if (el) el.classList.toggle('open');
}

let pendingCancelId = null;
function cancelOrder(orderId) {
  pendingCancelId = orderId;
  document.getElementById('cancelModalOrderNum').textContent = orderId;
  document.getElementById('cancelModalBackdrop').classList.add('open');
}
document.getElementById('cancelModalKeep').addEventListener('click', () => {
  document.getElementById('cancelModalBackdrop').classList.remove('open');
  pendingCancelId = null;
});
document.getElementById('cancelModalConfirm').addEventListener('click', () => {
  if (!pendingCancelId) return;
  const orders = getOrders();
  const order = orders.find(o => o.id === pendingCancelId);
  if (order) order.status = 'Cancelled';
  saveOrders(orders);
  document.getElementById('cancelModalBackdrop').classList.remove('open');
  pendingCancelId = null;
  renderOrders();
});

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
  if (!user) {
    window.location.href = 'login_external.html';
    return;
  }
  document.getElementById('userDdWrap').style.display = '';
  document.getElementById('ddUserName').textContent = user.fullname;
  document.getElementById('ddUserEmail').textContent = user.email;
  document.getElementById('ddAvatar').textContent = user.fullname.charAt(0).toUpperCase();
  document.getElementById('ddAvatar2').textContent = user.fullname.charAt(0).toUpperCase();

  renderOrders();
  updateCartBadge();

  const ddBtn = document.getElementById('userDdBtn');
  const ddPanel = document.getElementById('userDdPanel');
  ddBtn.addEventListener('click', (e) => { e.stopPropagation(); ddPanel.classList.toggle('open'); });
  document.addEventListener('click', () => ddPanel.classList.remove('open'));
  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('fas_user');
    window.location.href = 'home_external.html';
  });
});
