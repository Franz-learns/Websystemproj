/* Static prototype — no backend. Product data is embedded here (matching
   the catalog shown on home_external.html) and the page renders itself
   based on ?id= in the URL. Cart uses the same "fas_cart" localStorage
   key as home.js, so items added anywhere in the prototype show up
   everywhere consistently. */

const PRODUCTS = [
  { id: 1, name: "Achilles", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Achilles.jpg",
    desc: "A bold, resinous opening gives way to a warm, woody heart — built for someone who leads from the front." },
  { id: 2, name: "Amethyste", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Amethyste.jpg",
    desc: "A luminous, violet-tinged composition with a soft powdery finish — understated and quietly confident." },
  { id: 3, name: "Call Me", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Call Me.jpg",
    desc: "A magnetic, skin-close scent designed to linger just long enough to be remembered." },
  { id: 4, name: "Canella", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Canella.png",
    desc: "Warm cinnamon and amber wrapped around a soft musk base — comforting, spiced, and familiar." },
  { id: 5, name: "Connoisseur", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Connoisseur.jpg",
    desc: "A refined, deliberate blend for those who take their time choosing — and choosing well." },
  { id: 6, name: "Crimson", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Crimson.png",
    desc: "Deep, rich, and a little dangerous — a scent that announces itself before you speak." },
  { id: 7, name: "Debonair", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Debonair.jpg",
    desc: "Effortlessly polished, with a clean citrus opening that settles into something quietly luxurious." },
  { id: 8, name: "Dylan", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Dylan.jpg",
    desc: "A modern classic — crisp, dependable, and built to be worn every single day." },
  { id: 9, name: "Extreme", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Extreme.png",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 10, name: "Garden of Dawn", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Garden of Dawn.jpg",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 11, name: "Gentleman", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Gentleman.jpg",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 12, name: "Grandeur", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Grandeur.png",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 13, name: "Intense", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Intense.jpg",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 14, name: "Kingsman", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Kingsman.jpg",
    desc: "A Father and Son signature fragrance made for him. Especially at home on date night." },
  { id: 15, name: "Obsession", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Obsession.jpg",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 16, name: "Old Money", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Old Money.jpg",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 17, name: "Royalty", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Royalty.png",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 18, name: "Sailor", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Sailor.jpg",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 19, name: "Silver", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Silver.jpg",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 20, name: "Skyfall", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Skyfall.jpg",
    desc: "A Father and Son signature fragrance made for him. Especially at home on date night." },
  { id: 21, name: "Sparrow", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Sparrow.jpg",
    desc: "A Father and Son signature fragrance made for him." },
  { id: 22, name: "Summer Paradise", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Summer Paradise.jpg",
    desc: "A Father and Son signature fragrance made for anyone." },
  { id: 23, name: "Unreleased #1", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Unreleased %231.png",
    desc: "A Father and Son signature fragrance made for him. Especially at home on date night." },
  { id: 24, name: "Vesper", brand: 'FATHER AND SON', price: 899, stock: 20, img: "uploads/Vesper.jpg",
    desc: "A Father and Son signature fragrance made for him." },
];

const CART_KEY = 'fas_cart';
const fmt = n => '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2 });

function getId() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  return PRODUCTS.some(p => p.id === id) ? id : PRODUCTS[0].id;
}

/* ── Render the hero + concept + related sections for the current product ── */
function renderProduct() {
  const id = getId();
  const product = PRODUCTS.find(p => p.id === id);
  const others = PRODUCTS.filter(p => p.id !== id);
  const pivot = Math.max(0, others.findIndex(p => p.id > id));
  const related = others.slice(pivot).concat(others.slice(0, pivot)).slice(0, 8);

  document.title = `${product.brand} ${product.name} — Father and Son`;
  document.getElementById('heroImg').src = product.img;
  document.getElementById('heroImg').alt = product.name;
  document.getElementById('heroBrand').textContent = product.brand;
  document.getElementById('heroName').textContent = product.name;
  document.getElementById('heroPrice').textContent = fmt(product.price);
  document.getElementById('heroDesc').textContent = product.desc;
  document.getElementById('qtyInput').max = product.stock;

  const stockEl = document.getElementById('heroStock');
  if (product.stock === 0) stockEl.textContent = 'Out of stock';
  else if (product.stock <= 5) stockEl.textContent = `Only ${product.stock} left`;
  else stockEl.textContent = `${product.stock} in stock`;

  const atc = document.getElementById('addToCartBtn');
  atc.dataset.id = product.id;
  atc.dataset.name = product.name;
  atc.dataset.brand = product.brand;
  atc.dataset.price = product.price;
  atc.dataset.img = product.img;
  atc.disabled = product.stock === 0;
  atc.querySelector('span').textContent = product.stock === 0 ? 'Out of Stock' : 'Add to Cart';

  document.getElementById('conceptText').textContent =
    `${product.brand} ${product.name} embodies a distinct personality, crafted for those who carry themselves with intention and authenticity.`;

  const track = document.getElementById('carouselTrack');
  track.innerHTML = related.map(r => `
    <div class="rcard" onclick="window.location='product_external.html?id=${r.id}'">
      <div class="rcard__img-wrap">
        <img src="${r.img}" alt="${r.name}" onerror="this.src='assets/logo-father-and-son.png'" loading="lazy">
      </div>
      <p class="rcard__brand">${r.brand}</p>
      <p class="rcard__name">${r.name}</p>
      <p class="rcard__price">${fmt(r.price)}</p>
      <button class="rcard__btn related-atc" data-id="${r.id}" data-name="${r.name}" data-brand="${r.brand}" data-price="${r.price}" data-img="${r.img}" onclick="event.stopPropagation()">
        <span>Add to Cart</span>
      </button>
    </div>`).join('');
}

/* ── Qty stepper ── */
function changeQty(btn, delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  const max = parseInt(input.getAttribute('max') || '9999', 10);
  input.value = Math.min(max, Math.max(1, (parseInt(input.value) || 1) + delta));
}

/* ── Toast ── */
function showToast(msg) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast__icon">&#8212;</span><span>${msg}</span>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.add('hide'); t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, 2800);
}

/* ── Cart (localStorage, shared with home.js) ────────────── */
const Cart = {
  items: [],
  load() {
    try { this.items = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch(e) { this.items = []; }
  },
  save() { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); },
  addItem({ id, name, brand, price, img, qty }) {
    this.load();
    const existing = this.items.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else this.items.push({ id, cartRowId: id, name, brand, price, img, qty });
    this.save();
    this.render();
    this.renderBadge();
  },
  remove(rowId) {
    this.items = this.items.filter(i => i.cartRowId !== rowId);
    this.save();
    this.render();
    this.renderBadge();
  },
  open() {
    this.load();
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    this.render();
  },
  close() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
  },
  render() {
    const body  = document.getElementById('cartSidebarBody');
    const foot  = document.getElementById('cartSidebarFoot');
    const count = document.getElementById('cartSidebarCount');
    const sub   = document.getElementById('cartSidebarSubtotal');
    if (!this.items.length) {
      body.innerHTML = '<div class="cart-empty"><div class="cart-empty__icon">&#128722;</div><p class="cart-empty__text">Your cart is empty</p><p class="cart-empty__sub">Add something beautiful to get started.</p></div>';
      foot.style.display = 'none'; count.textContent = ''; return;
    }
    const total = this.items.reduce((s,i) => s + i.price * i.qty, 0);
    const totalQty = this.items.reduce((s,i) => s + i.qty, 0);
    count.textContent = `(${totalQty} item${totalQty !== 1 ? 's' : ''})`;
    sub.textContent = fmt(total);
    foot.style.display = '';
    body.innerHTML = this.items.map(it => `
      <div class="cart-item">
        <img class="cart-item__img" src="${it.img}" onerror="this.src='assets/logo-father-and-son.png'" alt="${it.name}">
        <div class="cart-item__info">
          <p class="cart-item__name">${it.name}</p>
          <p class="cart-item__brand">${it.brand}</p>
          <div class="cart-item__row">
            <span class="cart-item__price">${fmt(it.price * it.qty)}</span>
            <span class="cart-item__qty">× ${it.qty}</span>
          </div>
        </div>
        <button class="cart-item__remove" data-row="${it.cartRowId}" aria-label="Remove">&#x2715;</button>
      </div>`).join('');
    body.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => this.remove(parseInt(btn.dataset.row, 10)));
    });
  },
  renderBadge() {
    this.load();
    const b = document.getElementById('cartBadge');
    if (!b) return;
    const n = this.items.reduce((s,i) => s + i.qty, 0);
    b.textContent = n > 0 ? n : '';
  }
};

document.getElementById('cartSidebarToggle')?.addEventListener('click', () => {
  document.getElementById('cartSidebar').classList.contains('open') ? Cart.close() : Cart.open();
});
document.getElementById('cartOverlay')?.addEventListener('click', () => Cart.close());
document.getElementById('cartSidebarClose')?.addEventListener('click', () => Cart.close());
document.getElementById('cartSidebarContinue')?.addEventListener('click', () => Cart.close());

/* ── Add to Cart (main product) ── */
document.getElementById('addToCartBtn')?.addEventListener('click', function () {
  const btn   = this;
  const qty   = parseInt(document.getElementById('qtyInput')?.value || '1', 10);
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Adding…';
  setTimeout(() => {
    Cart.addItem({ id: parseInt(btn.dataset.id,10), name: btn.dataset.name, brand: btn.dataset.brand, price: parseFloat(btn.dataset.price), img: btn.dataset.img, qty });
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Added ✓';
    setTimeout(() => { btn.querySelector('span').textContent = 'Add to Cart'; }, 2000);
    showToast(`${btn.dataset.name} added to cart`);
    Cart.open();
  }, 300);
});

/* ── Related products: Add to Cart ── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.related-atc');
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Adding…';
  setTimeout(() => {
    Cart.addItem({ id: parseInt(btn.dataset.id,10), name: btn.dataset.name, brand: btn.dataset.brand, price: parseFloat(btn.dataset.price), img: btn.dataset.img, qty: 1 });
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Added ✓';
    setTimeout(() => { btn.querySelector('span').textContent = 'Add to Cart'; }, 1800);
    showToast(`${btn.dataset.name} added to cart`);
  }, 250);
});

/* ── Carousel ── */
function initCarousel() {
  const track   = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track) return;
  let index = 0;
  function getVisible() {
    const w = window.innerWidth;
    if (w < 700)  return 1;
    if (w < 1100) return 2;
    return 4;
  }
  function maxIndex() { return Math.max(0, track.querySelectorAll('.rcard').length - getVisible()); }
  function update() {
    const card = track.querySelector('.rcard');
    if (!card) return;
    track.style.transform = `translateX(-${index * (card.offsetWidth + 20)}px)`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex();
  }
  prevBtn?.addEventListener('click', () => { if (index > 0) { index--; update(); } });
  nextBtn?.addEventListener('click', () => { if (index < maxIndex()) { index++; update(); } });
  window.addEventListener('resize', () => { index = Math.min(index, maxIndex()); update(); });
  update();
}

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Account dropdown ── */
(function() {
  const wrap  = document.getElementById('userDdWrap');
  const btn   = document.getElementById('userDdBtn');
  const panel = document.getElementById('userDdPanel');
  if (!wrap || !btn || !panel) return;
  function openDd()  { panel.classList.add('open');    btn.setAttribute('aria-expanded','true');  panel.setAttribute('aria-hidden','false'); }
  function closeDd() { panel.classList.remove('open'); btn.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true');  }
  btn.addEventListener('click', e => { e.stopPropagation(); panel.classList.contains('open') ? closeDd() : openDd(); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) closeDd(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDd(); });
  panel.addEventListener('click', e => e.stopPropagation());
})();

/* ── Reflect logged-in state in the nav (mock auth from login/register) ── */
function applyAuthState() {
  const user = JSON.parse(localStorage.getItem('fas_user') || 'null');
  const loginLink = document.getElementById('navLoginLink');
  const userWrap  = document.getElementById('userDdWrap');
  if (user && userWrap) {
    loginLink?.remove();
    userWrap.style.display = '';
    const nameEl = document.getElementById('ddUserName');
    const emailEl = document.getElementById('ddUserEmail');
    const avatarEl = document.getElementById('ddAvatar');
    if (nameEl) nameEl.textContent = user.fullname;
    if (emailEl) emailEl.textContent = user.email;
    if (avatarEl) avatarEl.textContent = user.fullname.charAt(0).toUpperCase();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderProduct();
  initCarousel();
  Cart.renderBadge();
  applyAuthState();
});
