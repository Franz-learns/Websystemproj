/* ── Static-preview data shim ─────────────────────────────────
   This standalone version has no backend. The shop panel asks for its
   product / category lists with fetch(); we answer those two requests
   locally with the data below so nothing ever touches the network.
   The cart itself lives in localStorage (key "fas_cart"). */
(function() {
  const STATIC_PRODUCTS = [{"id":1,"name":"Achilles","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Achilles.jpg","cats":["gender:for-him"]},{"id":2,"name":"Amethyste","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Amethyste.jpg","cats":["gender:for-her"]},{"id":3,"name":"Call Me","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Call Me.jpg","cats":["gender:for-her"]},{"id":4,"name":"Canella","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Canella.png","cats":["gender:unisex","occasion:date-night"]},{"id":5,"name":"Connoisseur","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Connoisseur.jpg","cats":["gender:for-him"]},{"id":6,"name":"Crimson","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Crimson.png","cats":["gender:unisex"]},{"id":7,"name":"Debonair","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Debonair.jpg","cats":["gender:for-him"]},{"id":8,"name":"Dylan","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Dylan.jpg","cats":["gender:for-him"]},{"id":9,"name":"Extreme","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Extreme.png","cats":["gender:for-him"]},{"id":10,"name":"Garden of Dawn","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Garden of Dawn.jpg","cats":["gender:unisex"]},{"id":11,"name":"Gentleman","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Gentleman.jpg","cats":["gender:for-him"]},{"id":12,"name":"Grandeur","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Grandeur.png","cats":["gender:unisex"]},{"id":13,"name":"Intense","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Intense.jpg","cats":["gender:for-him"]},{"id":14,"name":"Kingsman","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Kingsman.jpg","cats":["gender:for-him","occasion:date-night"]},{"id":15,"name":"Obsession","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Obsession.jpg","cats":["gender:unisex"]},{"id":16,"name":"Old Money","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Old Money.jpg","cats":["gender:unisex"]},{"id":17,"name":"Royalty","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Royalty.png","cats":["gender:for-him"]},{"id":18,"name":"Sailor","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Sailor.jpg","cats":["gender:for-him"]},{"id":19,"name":"Silver","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Silver.jpg","cats":["gender:unisex"]},{"id":20,"name":"Skyfall","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Skyfall.jpg","cats":["gender:for-him","occasion:date-night"]},{"id":21,"name":"Sparrow","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Sparrow.jpg","cats":["gender:for-him"]},{"id":22,"name":"Summer Paradise","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Summer Paradise.jpg","cats":["gender:unisex"]},{"id":23,"name":"Unreleased #1","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Unreleased %231.png","cats":["gender:for-him","occasion:date-night"]},{"id":24,"name":"Vesper","brand":"FATHER AND SON","price":899,"stock":20,"img":"uploads/Vesper.jpg","cats":["gender:for-him"]}];
  const STATIC_CATEGORIES = [{"name":"Gender","slug":"gender","tags":[{"name":"For Him","slug":"for-him"},{"name":"For Her","slug":"for-her"},{"name":"Unisex","slug":"unisex"}]},{"name":"Occasion","slug":"occasion","tags":[{"name":"Date Night","slug":"date-night"}]}];
  const STATIC_CART = [];
  const realFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    if (url.includes('action=get_products')) {
      return Promise.resolve(new Response(JSON.stringify(STATIC_PRODUCTS), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    if (url.includes('action=get_categories')) {
      return Promise.resolve(new Response(JSON.stringify(STATIC_CATEGORIES), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    if (url.includes('action=get_cart')) {
      return Promise.resolve(new Response(JSON.stringify(STATIC_CART), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    return realFetch(input, init);
  };
})();

/* ── SCROLL PROGRESS BAR ─────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  });
  /* __ placeholder to be continued __ */

/* ── HERO MOUSE PARALLAX (desktop only) ──────────── */
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const hero    = document.querySelector('.hero');
  const content = document.querySelector('.hero__content');
  if (!hero || !content) return;
  let tX = 0, tY = 0, cX = 0, cY = 0;
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    tX = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    tY = ((e.clientY - r.top)  / r.height - 0.5) * 8;
  });
  hero.addEventListener('mouseleave', () => { tX = 0; tY = 0; });
  (function tick() {
    cX += (tX - cX) * 0.07;
    cY += (tY - cY) * 0.07;
    content.style.transform = `translate(${cX}px, ${cY}px)`;
    requestAnimationFrame(tick);
  })();
});

/* ── HAMBURGER MENU SCROLL HELPER ────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  function closeMenu() {
    document.getElementById('hamburgerMenu').classList.remove('open');
    const btn = document.getElementById('hamburgerBtn');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  document.querySelectorAll('.js-menu-scroll').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const slide  = link.dataset.slide;
      const target = link.dataset.target;
      closeMenu();
      if (slide !== undefined) {
        const tab = document.querySelector(`[data-slide="${slide}"]`);
        if (tab) tab.click();
      }
      setTimeout(() => {
        const el = target ? document.getElementById(target) : null;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    });
  });
});

/* ── CART BADGE PULSE (patched after Cart is defined) ── */
window.addEventListener('load', function () {
  const badge = document.getElementById('cartBadge');
  if (!badge || typeof Cart === 'undefined') return;
  const _orig = Cart.updateBadge;
  Cart.updateBadge = function() {
    const before = badge.textContent;
    if (_orig) _orig.apply(this, arguments);
    const after = badge.textContent;
    if (before !== after && after !== '') {
      badge.classList.remove('pop');
      void badge.offsetWidth;
      badge.classList.add('pop');
      badge.addEventListener('animationend', () => badge.classList.remove('pop'), { once: true });
    }
  };
});

(function(){
    const reviews = [{"text":"I'm a huge fragrance collector, and Father and Son never disappoints. All the perfumes I've bought here are 100% authentic and long-lasting.","author":"Jayco D.","loc":"Paris, France"},{"text":"I don't always have time to shop around, but Father and Son makes it easy. Great service, quality products, I always leave satisfied.","author":"Danier G.","loc":"Dubai, UAE"},{"text":"I just popped in out of curiosity — wow, I'm glad I did! The scents are so calming and affordable. I'll definitely be back.","author":"Kirk M.","loc":"New York, USA"},{"text":"The packaging was immaculate. Smells exactly like the boutique. Truly a premium experience end-to-end.","author":"Anna L.","loc":"Singapore"},{"text":"Ordered twice and both times arrived fast, well-packed, and 100% authentic. Father and Son has earned a customer for life.","author":"Marco R.","loc":"Milan, Italy"},{"text":"The team helped me find the exact scent I was looking for. Outstanding service and incredibly knowledgeable staff.","author":"Sarah K.","loc":"London, UK"},{"text":"Father and Son is the only place I trust for authentic niche fragrances. Their curation is unmatched and the experience is seamless.","author":"James T.","loc":"Sydney, AU"}];
    const total   = reviews.length;
    let cur = 0, timer = null;

    const textEl  = document.getElementById('reviewsText');
    const nameEl  = document.getElementById('reviewsName');
    const locEl   = document.getElementById('reviewsLoc');
    const authEl  = document.getElementById('reviewsAuthor');
    const barEl   = document.getElementById('reviewsBar');
    const curEl   = document.getElementById('reviewsCur');
    const dots    = document.querySelectorAll('.reviews-dot');

    function pad(n){ return n < 10 ? '0' + n : '' + n; }

    function show(idx) {
      cur = ((idx % total) + total) % total;
      textEl.classList.remove('visible'); textEl.classList.add('exit');
      authEl.classList.remove('visible');

      setTimeout(() => {
        textEl.textContent = reviews[cur].text;
        nameEl.textContent = reviews[cur].author;
        locEl.textContent  = reviews[cur].loc;
        textEl.classList.remove('exit'); textEl.classList.add('visible');
        authEl.classList.add('visible');
        if (barEl) barEl.style.width = ((cur + 1) / total * 100) + '%';
        if (curEl) curEl.textContent = pad(cur + 1);
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      }, 380);
    }

    show(0);
    dots.forEach(d => d.addEventListener('click', () => { show(+d.dataset.index); resetTimer(); }));
    document.getElementById('reviewsPrev')?.addEventListener('click', () => { show(cur - 1); resetTimer(); });
    document.getElementById('reviewsNext')?.addEventListener('click', () => { show(cur + 1); resetTimer(); });

    function startTimer() { timer = setInterval(() => show(cur + 1), 7000); }
    function resetTimer()  { clearInterval(timer); startTimer(); }
    startTimer();
    const right = document.querySelector('.reviews-right');
    if (right) {
      right.addEventListener('mouseenter', () => clearInterval(timer));
      right.addEventListener('mouseleave', resetTimer);
    }  // was startTimer — caused timer accumulation bug
  })();

/* ════ SHOP DROPDOWN ════════════════════════════ */
(function () {
  let allProducts = [];
  let loaded      = false;
  let mobileCatsLoaded = false;
  let activeBrand = null;
  let searchQ     = '';

  const drop    = document.getElementById('shopDrop');
  const btn     = document.getElementById('shopDropBtn');
  const hBtn    = document.getElementById('hamburgerBtn');
  const grid    = document.getElementById('shopGrid');
  const search  = document.getElementById('shopSearch');
  const zoneLeft  = document.getElementById('shopZoneLeft');
  const zoneRight = document.getElementById('shopZoneRight');
  if (!drop || !btn || !grid || !search) return; // critical elements missing

  // ── Carousel scroll ───────────────────────────
  function scrollCarousel(dir) {
    const card = grid.querySelector('.shop-card');
    const cardW = card ? card.offsetWidth + 10 : 300;
    grid.scrollBy({ left: dir * cardW * 3, behavior: 'smooth' });
  }

  // ── Zone hover → update cursor follower label & activate ─
  function zoneEnter(dir) {
    if (window._cursorSetMode) {
      window._cursorSetMode(dir === -1 ? 'arrow-left' : 'arrow-right', dir === -1 ? '←' : '→');
    }
  }
  function zoneLeave() {
    if (window._cursorSetMode) window._cursorSetMode(null, '');
  }

  zoneLeft.addEventListener('mouseenter', () => zoneEnter(-1));
  zoneLeft.addEventListener('mouseleave', zoneLeave);
  zoneLeft.addEventListener('click', () => scrollCarousel(-1));

  zoneRight.addEventListener('mouseenter', () => zoneEnter(1));
  zoneRight.addEventListener('mouseleave', zoneLeave);
  zoneRight.addEventListener('click', () => scrollCarousel(1));

  // ── Open / close ─────────────────────────────
  function openDrop() {
    drop.classList.add('open');
    document.body.classList.add('shop-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!loaded) { fetchProducts(); }
    if (!mobileCatsLoaded) { fetchMobileCats(); }
    setTimeout(() => search.focus(), 300);
  }
  window.openShopDrop = openDrop; // expose globally

  // Open shop and expand a specific category group by slug
  window.openShopDropFiltered = function(groupSlug) {
    openDrop();
    // Wait for sidebar to be ready then click the matching group
    const tryExpand = (attempts) => {
      const item = document.querySelector(`.sd-item[data-sub="sd-${groupSlug}"]`);
      if (item) {
        // Close all first, then open target
        document.querySelectorAll('.sd-sub').forEach(s => s.classList.remove('open'));
        document.querySelectorAll('.sd-item').forEach(i => i.classList.remove('open'));
        const sub = document.getElementById('sd-' + groupSlug);
        if (sub) {
          sub.classList.add('open'); item.classList.add('open');
          sub.querySelectorAll('a').forEach((a, i) => {
            a.style.transitionDelay = (0.04 + i * 0.035) + 's';
          });
          sub.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else if (attempts > 0) {
        setTimeout(() => tryExpand(attempts - 1), 150);
      }
    };
    setTimeout(() => tryExpand(8), 200);
  };

  function closeDrop() {
    drop.classList.remove('open');
    document.body.classList.remove('shop-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    drop.classList.contains('open') ? closeDrop() : openDrop();
  });

  // Cart button inside shop dropdown — open cart without closing the dropdown
  const shopDropCartBtn = document.getElementById('shopDropCartBtn');
  if (shopDropCartBtn) {
    shopDropCartBtn.addEventListener('click', () => {
      Cart.open();
    });
  }

  // Hamburger acts as close button when shop is open
  hBtn.addEventListener('click', e => {
    if (drop.classList.contains('open')) {
      e.stopImmediatePropagation(); // prevent hamburger menu toggle
      closeDrop();
    }
  }, true); // capture phase so it runs before the hamburger IIFE

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrop(); });

  // ── Fetch products ────────────────────────────
  async function fetchProducts() {
    try {
      const res  = await fetch('data/products?action=get_products');
      allProducts = await res.json();
      loaded = true;
      renderGrid();
    } catch(e) {
      grid.innerHTML = '<div class="shop-drop__empty">Could not load products.</div>';
    }
  }

  // ── Fetch & render mobile category pills ──────
  async function fetchMobileCats() {
    const bar = document.getElementById('shopMobileCats');
    if (!bar) return;
    try {
      const res  = await fetch('data/categories?action=get_categories');
      const groups = await res.json();
      if (!groups || !groups.length) return;
      mobileCatsLoaded = true;
      bar.innerHTML = groups.map(g => `
        <div class="shop-mobile-cats__group">
          <span class="shop-mobile-cats__label">${g.name}</span>
          <div class="shop-mobile-cats__pills">
            ${g.tags.map(t => `
              <a href="#" class="shop-mobile-cat-pill"
                 data-filter-type="cat"
                 data-group="${g.slug}"
                 data-value="${t.slug}">${t.name}</a>
            `).join('')}
          </div>
        </div>
      `).join('');
    } catch(e) { /* silent fail — sidebar still works */ }
  }

  // ── Filter links — single delegated listener, no duplicates ──
  function attachFilterLinks() {} // kept for compatibility, no-op

  document.querySelector('.shop-drop__sidebar').addEventListener('click', function(e) {
    const a = e.target.closest('.sd-sub a');
    if (!a) return;
    e.preventDefault();

    const type  = a.dataset.filterType;
    const val   = a.dataset.value;
    const group = a.dataset.group || null;

    const wasActive = a.classList.contains('active');
    document.querySelectorAll('.sd-sub a').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.shop-mobile-cat-pill').forEach(x => x.classList.remove('active'));

    if (!wasActive) {
      a.classList.add('active');
      activeBrand = { type, val, group };
    } else {
      activeBrand = null;
    }

    renderGrid();
  });

  // ── Mobile pill filter clicks ─────────────────
  const mobileCats = document.getElementById('shopMobileCats');
  if (mobileCats) {
    mobileCats.addEventListener('click', function(e) {
      const pill = e.target.closest('.shop-mobile-cat-pill');
      if (!pill) return;
      e.preventDefault();

      const type  = pill.dataset.filterType;
      const val   = pill.dataset.value;
      const group = pill.dataset.group || null;

      const wasActive = pill.classList.contains('active');
      document.querySelectorAll('.shop-mobile-cat-pill').forEach(x => x.classList.remove('active'));

      if (!wasActive) {
        pill.classList.add('active');
        activeBrand = { type, val, group };
      } else {
        activeBrand = null;
      }

      renderGrid();
    });
  }

  // ── Search ────────────────────────────────────
  search.addEventListener('input', () => {
    searchQ = search.value.trim().toLowerCase();
    renderGrid();
  });

  // ── Arrow / scroll-zone visibility ───────────────
  function updateArrows() {
    const atStart = grid.scrollLeft <= 2;
    const atEnd   = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2;
    zoneLeft.style.visibility  = atStart ? 'hidden' : '';
    zoneRight.style.visibility = atEnd   ? 'hidden' : '';
  }
  grid.addEventListener('scroll', updateArrows, { passive: true });

  // ── Render ────────────────────────────────────
  function fmt(n) { return n > 0 ? '₱ ' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 }) : 'Price not set'; }

  // HTML-entity escape helper — prevents XSS when inserting dynamic values into innerHTML
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderGrid() {
    let products = allProducts;

    if (activeBrand) {
      products = products.filter(p => {
        // All filters now use type='cat' with group+value from DB
        const needle = activeBrand.group + ':' + activeBrand.val;
        return Array.isArray(p.cats) && p.cats.includes(needle);
      });
    }

    if (searchQ) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQ) ||
        p.brand.toLowerCase().includes(searchQ)
      );
    }

    if (!products.length) {
      grid.innerHTML = '<div class="shop-drop__empty">No products found.</div>';
      updateArrows();
      return;
    }

    grid.innerHTML = products.map(p => {
      const dis  = p.stock <= 0 ? 'disabled' : '';
      const hasImg = p.img && p.img !== 'assets/logo-father-and-son.png';
      const imgHtml = hasImg
        ? `<img src="${escHtml(p.img)}" alt="${escHtml(p.name)}" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('shop-card__img-wrap--no-img');var fb=document.createElement('div');fb.className='product-card__name-fallback';fb.textContent=this.alt;this.parentElement.insertBefore(fb,this);">`
        : `<div class="product-card__name-fallback">${escHtml(p.name)}</div>`;
      const badge = p.stock <= 0
        ? '<span class="shop-card__badge shop-card__badge--out">Out of Stock</span>'
        : (p.stock <= 5 ? `<span class="shop-card__badge">Only ${p.stock} left</span>` : '');
      return `
        <div class="shop-card">
          <a href="product_external.html?id=${p.id}" class="shop-card__img-wrap${!hasImg ? ' shop-card__img-wrap--no-img' : ''}">
            ${imgHtml}
            <div class="shop-card__hint">View Product</div>
            ${badge}
          </a>
          <div class="shop-card__info">
            <a href="product_external.html?id=${p.id}" style="text-decoration:none;color:inherit;">
              <p class="shop-card__name">${escHtml(p.name)}</p>
            </a>
            <p class="shop-card__brand">${escHtml(p.brand)}</p>
            <p class="shop-card__price">${fmt(p.price)}</p>
          </div>
          <div class="shop-card__footer">
            <button class="shop-card__btn sd-add-to-cart" ${dis}
              data-id="${p.id}" data-name="${escHtml(p.name)}" data-price="${p.price}" data-brand="${escHtml(p.brand)}" data-img="${escHtml(p.img)}">
              <span>${p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            <div class="shop-card__qty" data-max="${p.stock}" ${dis ? 'style="opacity:.35;pointer-events:none"' : ''}>
              <button class="shop-card__qty-btn sd-qty-dec" type="button">&#8722;</button>
              <span class="shop-card__qty-val">1</span>
              <button class="shop-card__qty-btn sd-qty-inc" type="button">&#43;</button>
            </div>
          </div>
        </div>`;
    }).join('');

    // Reset scroll + stagger reveal cards
    grid.scrollLeft = 0;
    setTimeout(() => {
      grid.querySelectorAll('.shop-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('revealed'), i * 55);
      });
      updateArrows();
    }, 60);

    // Qty buttons in shop dropdown
    grid.querySelectorAll('.shop-card').forEach(card => {
      const dec = card.querySelector('.sd-qty-dec');
      const inc = card.querySelector('.sd-qty-inc');
      const val = card.querySelector('.shop-card__qty-val');
      if (!dec || !inc || !val) return;
      dec.addEventListener('click', () => {
        let q = parseInt(val.textContent, 10) || 1;
        if (q > 1) val.textContent = q - 1;
      });
      inc.addEventListener('click', () => {
        let q   = parseInt(val.textContent, 10) || 1;
        const qtyDiv = inc.closest('.shop-card__qty');
        const maxQ = qtyDiv ? parseInt(qtyDiv.dataset.max, 10) || 9999 : 9999;
        val.textContent = Math.min(maxQ, q + 1);
      });
    });

    // Add to cart from dropdown (localStorage)
    grid.querySelectorAll('.sd-add-to-cart').forEach(b => {
      b.addEventListener('click', () => {
        if (b.disabled) return;
        const id    = parseInt(b.dataset.id, 10);
        const name  = b.dataset.name;
        const brand = b.dataset.brand || '';
        const price = parseFloat(b.dataset.price);
        const img   = b.dataset.img || '';
        const qtyEl = b.closest('.shop-card__footer')?.querySelector('.shop-card__qty-val');
        const qty   = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
        b.disabled = true;
        b.querySelector('span').textContent = 'Adding…';
        setTimeout(() => {
          Cart.addItem({ id, name, brand, price, img, qty });
          b.querySelector('span').textContent = 'Added ✓';
          setTimeout(() => { b.disabled = false; b.querySelector('span').textContent = 'Add to Cart'; }, 1800);
          showToast(`${name} added to cart`);
        }, 200);
      });
    });
  }

  // ── Sidebar accordion ─────────────────────────
  document.querySelectorAll('.sd-item').forEach(item => {
    item.addEventListener('click', () => {
      const subId = item.dataset.sub;
      const sub   = document.getElementById(subId);
      if (!sub) return; // guard: skip if sub-panel not found
      const open  = sub.classList.contains('open');

      // Close all OTHER open subs first (reset their delays too)
      document.querySelectorAll('.sd-sub').forEach(s => {
        if (s !== sub) { s.querySelectorAll('a').forEach(a => { a.style.transitionDelay = '0s'; }); s.classList.remove('open'); }
      });
      document.querySelectorAll('.sd-item').forEach(i => { if (i !== item) i.classList.remove('open'); });

      if (!open) {
        // Set delays BEFORE adding .open so browser registers them before transition fires
        sub.querySelectorAll('a').forEach((a, i) => {
          a.style.transitionDelay = (0.04 + i * 0.035) + 's';
        });
        // Double rAF guarantees a full paint cycle before the class change triggers transitions
        requestAnimationFrame(() => requestAnimationFrame(() => {
          sub.classList.add('open'); item.classList.add('open');
        }));
      } else {
        sub.querySelectorAll('a').forEach(a => { a.style.transitionDelay = '0s'; });
        sub.classList.remove('open'); item.classList.remove('open');
      }
    });
  });
})();
const CART_KEY = 'fas_cart';

const Cart = (() => {
  let items = [];

  // Client-side cart (localStorage) — shared with product, cart and checkout pages.
  function loadFromStorage() {
    try { items = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch (e) { items = []; }
    updateBadge();
    render();
  }
  function saveToStorage() { localStorage.setItem(CART_KEY, JSON.stringify(items)); }

  function addItem({ id, name, brand, price, img, qty }) {
    loadItemsOnly();
    const existing = items.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else items.push({ id, cartRowId: id, name, brand, price, img, qty });
    saveToStorage();
    updateBadge();
    render();
  }
  function loadItemsOnly() {
    try { items = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch (e) { items = []; }
  }

  function open() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    loadFromStorage();
  }

  function close() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    // Only restore scroll if the shop dropdown isn't still holding it locked
    if (!document.body.classList.contains('shop-open')) {
      document.body.style.overflow = '';
    }
  }

  function remove(rowId) {
    items = items.filter(i => i.cartRowId !== rowId);
    saveToStorage();
    updateBadge();
    render();
  }

  const totalQty   = () => items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = () => items.reduce((s, i) => s + i.price * i.qty, 0);
  const fmt        = n  => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 });

  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    const q = totalQty();
    badge.textContent = q > 0 ? q : '';
    badge.classList.remove('bump');
    void badge.offsetWidth;
    if (q > 0) badge.classList.add('bump');
    // Also sync the shop dropdown cart badge
    const dropBadge = document.getElementById('shopDropCartBadge');
    if (dropBadge) dropBadge.textContent = q > 0 ? q : '';
  }

  function render() {
    const body    = document.getElementById('cartSidebarBody');
    const foot    = document.getElementById('cartSidebarFoot');
    const countEl = document.getElementById('cartSidebarCount');
    const subEl   = document.getElementById('cartSidebarSubtotal');
    const q       = totalQty();

    countEl.textContent = q > 0 ? `(${q} item${q !== 1 ? 's' : ''})` : '';

    if (!items.length) {
      foot.style.display = 'none';
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">&#128722;</div>
          <p class="cart-empty__text">Your cart is empty</p>
          <p class="cart-empty__sub">Add something beautiful to get started.</p>
        </div>`;
      return;
    }

    foot.style.display = 'block';
    subEl.textContent  = fmt(totalPrice());

    body.innerHTML = items.map(item => `
      <div class="cart-item">
        <img class="cart-item__img" src="${item.img}" alt="${item.name}"
             onerror="this.src='assets/logo-father-and-son.png'">
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__brand">${item.brand}</p>
          <div class="cart-item__row">
            <span class="cart-item__price">${fmt(item.price * item.qty)}</span>
            <span class="cart-item__qty">× ${item.qty}</span>
          </div>
        </div>
        <button class="cart-item__remove" data-row="${item.cartRowId}" aria-label="Remove">&#x2715;</button>
      </div>`).join('');

    body.querySelectorAll('[data-row]').forEach(btn =>
      btn.addEventListener('click', () => remove(+btn.dataset.row))
    );
  }

  // Events
  document.getElementById('cartSidebarToggle').addEventListener('click', open);
  document.getElementById('cartSidebarClose').addEventListener('click', close);
  document.getElementById('cartOverlay').addEventListener('click', close);
  document.getElementById('cartSidebarContinue').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('cartSidebar').classList.contains('open')) {
      e.stopImmediatePropagation();
      close();
    }
  });

  loadFromStorage(); // hydrate badge on load

  return { open, addItem, updateBadge };
})();

/* ── Toast ─────────────────────────────────────── */
function showToast(msg) {
  const wrap = document.getElementById('toastWrap');
  const t    = document.createElement('div');
  t.className   = 'toast';
  t.innerHTML   = `<span class="toast__icon">&#8212;</span><span>${msg}</span>`;
  wrap.appendChild(t);
  // Trigger entrance — needs one frame for height to apply
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.add('hide');
    t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, 2800);
}

/* ── Qty controls ──────────────────────────────── */
function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector('input');
  const max   = parseInt(input.getAttribute('max') || '9999', 10);
  input.value = Math.min(max, Math.max(1, (parseInt(input.value) || 1) + delta));
}
/* ── Qty input clamp (vanilla) ─────────────────── */
document.addEventListener('change', e => {
  const inp = e.target.closest('.quantity-input');
  if (!inp) return;
  const max = parseInt(inp.getAttribute('max') || '9999', 10);
  inp.value = Math.max(1, Math.min(max, parseInt(inp.value || '1', 10)));
});
document.addEventListener('input', e => {
  const inp = e.target.closest('.quantity-input');
  if (!inp) return;
  const max = parseInt(inp.getAttribute('max') || '9999', 10);
  inp.value = Math.max(1, Math.min(max, parseInt(inp.value || '1', 10)));
});

/* ── Add to Cart (product cards, vanilla) ───────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn || btn.classList.contains('loading')) return;
  e.preventDefault();

  const id    = parseInt(btn.dataset.id, 10);
  const name  = btn.dataset.name;
  const brand = btn.dataset.brand || '';
  const price = parseFloat(btn.dataset.price);
  const img   = btn.dataset.img || '';
  const card  = btn.closest('.product-card');
  const input = card ? card.querySelector('.quantity-input') : null;
  const max   = parseInt(input?.getAttribute('max') || '9999', 10);
  const qty   = Math.max(1, Math.min(max, parseInt(input?.value || '1', 10)));
  if (input) input.value = qty;

  btn.classList.add('loading');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Adding…';
  setTimeout(() => {
    Cart.addItem({ id, name, brand, price, img, qty });
    btn.classList.remove('loading');
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Add To Cart';
    Cart.open();
    showToast(`${name} added to cart`);
  }, 250);
});

/* ── Navbar scroll behaviour ───────────────────── */
(function () {
  function applyScroll() {
    const y = window.scrollY;
    document.getElementById('mainNav').classList.toggle('scrolled', y > 50);
    document.getElementById('scrollTopBtn').classList.toggle('show', y > 500);
  }

  // Run immediately on load — covers refresh while scrolled
  applyScroll();

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { applyScroll(); ticking = false; });
  }, { passive: true });
})();

/* ── Scroll-to-top button ──────────────────────── */
document.getElementById('scrollTopBtn')
  .addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Hamburger menu ────────────────────────────── */
(function () {
  const hBtn = document.getElementById('hamburgerBtn');
  const hMenu = document.getElementById('hamburgerMenu');

  function close() {
    hMenu.classList.remove('open');
    hBtn.classList.remove('open');
    hBtn.setAttribute('aria-expanded', 'false');
  }

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

/* ── Mobile icons dropdown ──────────────────────── */
(function () {
  const toggle = document.getElementById('mobileIconsToggle');
  const panel  = document.getElementById('mobileIconsPanel');
  if (!toggle || !panel) return;

  function isMobile() { return window.matchMedia('(max-width: 680px)').matches; }

  function open() {
    panel.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function close() {
    panel.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function togglePanel(e) {
    e.stopPropagation();
    panel.classList.contains('open') ? close() : open();
  }

  toggle.addEventListener('click', togglePanel);

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !panel.contains(e.target)) close();
  });

  // Close if window resizes past breakpoint
  window.addEventListener('resize', function() {
    if (!isMobile()) close();
  });
})();

/* ── Product slider ────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.slider-slide');
  const title  = document.getElementById('sliderTitle');
  const tabs   = document.querySelectorAll('.featured__tab');
  const meta   = ['Customer Favorites', 'New Arrivals'];
  let cur = 0;

  function goTo(next) {
    if (next === cur || next < 0 || next >= slides.length) return;
    // Exit current
    slides[cur].classList.add('exit');
    slides[cur].classList.remove('active');
    setTimeout(() => slides[cur].classList.remove('exit'), 500);
    cur = next;
    // Enter next — stagger cards
    slides[cur].classList.add('active');
    const cards = slides[cur].querySelectorAll('.product-card');
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(18px)';
      setTimeout(() => {
        c.style.transition = 'opacity .45s ease, transform .45s ease';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 60 + i * 70);
    });
    // Update title
    title.classList.add('switching');
    setTimeout(() => {
      title.textContent = meta[cur];
      title.classList.remove('switching');
    }, 180);
    // Update tabs
    tabs.forEach((t, i) => t.classList.toggle('active', i === cur));
  }

  tabs.forEach(t => t.addEventListener('click', () => goTo(+t.dataset.slide)));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(cur - 1);
    if (e.key === 'ArrowRight') goTo(cur + 1);
  });

  // Touch/swipe
  let touchX = 0;
  const vp = document.querySelector('.slider-viewport');
  vp.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', e => {
    const delta = touchX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) goTo(delta > 0 ? cur + 1 : cur - 1);
  });
})();

/* ── Account modal ─────────────────────────────── */
(function() {
  const wrap    = document.getElementById('userDdWrap');
  const btn     = document.getElementById('userDdBtn');
  const panel   = document.getElementById('userDdPanel');
  const overlay = document.getElementById('userDdOverlay');
  if (!wrap || !btn || !panel || !overlay) return;

  function openDd() {
    panel.querySelectorAll('.dropdown-item').forEach(function(item, i) {
      item.style.transitionDelay = (0.08 + i * 0.05) + 's';
    });
    overlay.classList.add('open');
    panel.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDd() {
    panel.querySelectorAll('.dropdown-item').forEach(function(item) {
      item.style.transitionDelay = '0s';
    });
    overlay.classList.remove('open');
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Toggle on button click
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    panel.classList.contains('open') ? closeDd() : openDd();
  });

  // Click overlay to close
  overlay.addEventListener('click', closeDd);

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeDd();
  });

  // Close when a link inside the panel is clicked
  panel.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() { closeDd(); });
  });

  // Close when shop dropdown opens
  const shopBtn = document.getElementById('shopDropBtn');
  if (shopBtn) shopBtn.addEventListener('click', closeDd);
})();

/* ── Scroll-reveal animations ──────────────────── */
(function () {
  const els = document.querySelectorAll('.anim');
  els.forEach(el => el.classList.add('js-anim'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Stagger each element for a cascading luxury reveal
      const delay = i * 120;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
})();

/* ── Cursor follower ───────────────────────────── */
(function () {
  const cursor = document.getElementById('cursorFollower');
  if (!cursor) return;
  const label = cursor.querySelector('.cursor-follower__label');

  let mouseX = 0, mouseY = 0;
  let curX = 0,   curY = 0;
  let raf = null;
  let mode = null; // null | 'view' | 'arrow-left' | 'arrow-right'
  let labelSwapTimer = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    // Faster lerp (0.14) = slightly snappier follow
    curX = lerp(curX, mouseX, 0.14);
    curY = lerp(curY, mouseY, 0.14);
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    // Context-aware cursor color
    const _el   = document.elementFromPoint(curX, curY);
    const _shopOpen = document.body.classList.contains('shop-open');
    const _onImg = _el && _el.tagName === 'IMG' && (
      _el.closest('.product-card__img-wrap') ||
      _el.closest('.shop-card__img-wrap') ||
      _el.closest('.rcard__img-wrap') ||
      _el.closest('.hero__img-side')
    );
    // On a product-card image wrap: always white cursor (dark product photo)
    // On product-card non-image area: black cursor (light card bg)
    // This gives consistent visual: cursor matches the element under it
    const _onCardImg = _el && (
      _el.closest('.product-card__img-wrap') !== null
    );
    // On a product-card image: always white cursor regardless of background
    const _dark = _onCardImg ? false : (_shopOpen ? _onImg : !_onImg);
    cursor.classList.toggle('dark-mode', _dark);
    raf = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
  }, { passive: true });

  // Always animate — cursor starts invisible
  raf = requestAnimationFrame(animate);

  function setMode(newMode, text) {
    if (newMode === mode) return;
    mode = newMode;

    // Clear pending
    clearTimeout(labelSwapTimer);

    const isArrow = newMode === 'arrow-left' || newMode === 'arrow-right';
    const isView  = newMode === 'view';

    if (newMode === null) {
      cursor.classList.remove('active', 'view-mode', 'arrow-mode');
      return;
    }

    cursor.classList.add('active');

    // Fade label out → swap → fade in
    if (label) {
      label.style.opacity = '0';
      labelSwapTimer = setTimeout(() => {
        label.textContent = text;
        cursor.classList.toggle('view-mode',  isView);
        cursor.classList.toggle('arrow-mode', isArrow);
        label.style.opacity = '';
      }, 160);
    } else {
      cursor.classList.toggle('view-mode',  isView);
      cursor.classList.toggle('arrow-mode', isArrow);
    }
  }

  // ── Product card zones ───────────────────────────
  const PRODUCT_ZONES = ['.shop-card__img-wrap', '.product-card__img-wrap'];

  document.addEventListener('mouseover', e => {
    if (PRODUCT_ZONES.some(sel => e.target.closest(sel))) {
      setMode('view', 'View');
    } else if (!e.target.closest('.shop-scroll-zone')) {
      // Only reset to null if we are not on a scroll zone
      // (scroll zones handled separately)
      if (mode === 'view') setMode(null, '');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => setMode(null, ''));

  // ── Expose for scroll zone use ───────────────────
  window._cursorSetMode = setMode;
})();
(function () {
  const vidA     = document.getElementById('heroBg');
  const vidB     = document.getElementById('heroBg2');
  const blackout = document.getElementById('heroBgBlackout');
  if (!vidA || !vidB || !blackout) return;

  // ── Playlist: cycles video-bg → video-bg1 → video-bg2 → loop ──
  const PLAYLIST = [
    'assets/video-bg-LV.mp4',
    'assets/video-bg-CHANEL.mp4',
    'assets/video-bg-CD.mp4',
  ];
  const FADE_MS = 700; // must match CSS transition duration (.7s)

  let index   = 0;
  let active  = vidA;
  let standby = vidB;
  let transitioning = false;

  active.src   = PLAYLIST[0];
  active.muted = true;
  standby.muted = true;

  function preloadNext() {
    const ni = (index + 1) % PLAYLIST.length;
    standby.src = PLAYLIST[ni];
    standby.load();
  }

  function crossfade() {
    if (transitioning) return;
    transitioning = true;

    // Step 1: fade to black
    blackout.classList.add('blackout-in');

    setTimeout(() => {
      // Step 2: fully black — hide old video, show & play new one
      active.classList.remove('vid-active');
      active.pause();

      index = (index + 1) % PLAYLIST.length;

      standby.style.zIndex = '2';
      active.style.zIndex  = '1';
      standby.play().catch(() => {});

      // Step 3: fade back in from black
      requestAnimationFrame(() => requestAnimationFrame(() => {
        standby.classList.add('vid-active');
        blackout.classList.remove('blackout-in');
      }));

      // Step 4: after fade-in completes, clean up old slot and preload next
      setTimeout(() => {
        active.removeAttribute('src');
        active.load();
        active.style.zIndex  = '0';
        standby.style.zIndex = '1';

        const tmp = active;
        active    = standby;
        standby   = tmp;

        preloadNext();
        transitioning = false;
      }, FADE_MS + 50);

    }, FADE_MS);
  }

  vidA.addEventListener('ended', crossfade);
  vidB.addEventListener('ended', crossfade);

  // ── Called by loading screen just before iris opens ──
  window._playHeroVideo = function () {
    preloadNext();
    active.play().catch(() => {});
    requestAnimationFrame(() => requestAnimationFrame(() => {
      active.classList.add('vid-active');
    }));
  };

  // Fallback: play on first user interaction if loader hasn't fired yet
  ['click', 'touchstart', 'keydown'].forEach(ev =>
    document.addEventListener(ev, () => {
      if (active.paused) window._playHeroVideo();
    }, { once: true })
  );
})();

/* ── Auto-open shop dropdown if ?shop=1 ── */
(function () {
  const sp    = new URLSearchParams(window.location.search);
  const group = sp.get('group');
  const cat   = sp.get('cat');

  if (sp.get('shop') !== '1') return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (group) {
        // Open and expand the matching category group
        window.openShopDropFiltered(group);

        // If a specific category slug was also provided, click its filter link
        if (cat) {
          const trySelect = (attempts) => {
            const link = document.querySelector(
              `.sd-sub a[data-group="${group}"][data-value="${cat}"]`
            );
            if (link) {
              link.click();
            } else if (attempts > 0) {
              setTimeout(() => trySelect(attempts - 1), 200);
            }
          };
          setTimeout(() => trySelect(12), 600);
        }
      } else {
        window.openShopDrop();
      }
    }, 400);
  });
})();

/* ═══════════════════════════════════════════════════
   FATHER & SON CINEMATIC LOADING SCREEN
═══════════════════════════════════════════════════ */
(function () {
  const loader = document.getElementById('scentinel-loader');
  if (!loader) return;

  const alreadyVisited = sessionStorage.getItem('sg_visited');
  const fromLogin = sessionStorage.getItem('sg_from_login');
  const fromLanding = sessionStorage.getItem('sg_from_landing');
  const navType = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type) || '';
  const isReload = navType === 'reload';

  sessionStorage.removeItem('sg_from_login');
  sessionStorage.removeItem('sg_from_landing');
  sessionStorage.setItem('sg_visited', '1');

  if (alreadyVisited && !fromLogin && !fromLanding && !isReload) {
    loader.remove();
    document.body.classList.remove('is-loading');
    if (window._playHeroVideo) window._playHeroVideo();
    requestAnimationFrame(() => {
      document.querySelectorAll('.js-anim.anim').forEach(el => el.classList.remove('visible'));
      setTimeout(() => {
        document.querySelectorAll('.js-anim.anim').forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight * .92) el.classList.add('visible');
        });
      }, 80);
    });
    return;
  }

  const fill = document.getElementById('slFill');
  const countEl = document.getElementById('slCount');
  const statusEl = document.getElementById('slStatus');

  const messages = [
    [0, 'Preparing your collection'],
    [28, 'Blending memories'],
    [55, 'Choosing your signature'],
    [78, 'Almost ready'],
    [100, 'Welcome to Father & Son']
  ];

  function setStatus(value) {
    const match = messages.slice().reverse().find(item => value >= item[0]);
    if (statusEl && match) statusEl.textContent = match[1];
  }

  function animateCounter(duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.floor(eased * 100);
      if (countEl) countEl.textContent = value;
      setStatus(value);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Let the cinematic entrance breathe, then load the progress bar.
  setTimeout(() => {
    if (fill) fill.style.width = '100%';
    animateCounter(1500);
  }, 650);

  // Reveal the home page video shortly before the loader disappears.
  const T_IRIS = 2750;
  setTimeout(() => {
    if (window._playHeroVideo) window._playHeroVideo();
  }, T_IRIS - 500);

  setTimeout(() => {
    loader.classList.add('sl-iris');
    document.body.classList.remove('is-loading');

    document.querySelectorAll('.js-anim.anim').forEach(el => el.classList.remove('visible'));
    setTimeout(() => {
      document.querySelectorAll('.js-anim.anim').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * .92) el.classList.add('visible');
      });
    }, 80);

    setTimeout(() => loader.remove(), 850);
  }, T_IRIS);
})();

/* ═══════════════════════════════════════════════════
   DISCLAIMER MODAL
═══════════════════════════════════════════════════ */
(function () {
  const STORAGE_KEY = 'sg_disc_accepted';
  const modal       = document.getElementById('disc-modal');
  const acceptBtn   = document.getElementById('discAccept');
  const backdrop    = document.getElementById('discBackdrop');
  if (!modal) return;

  // Always show on every page load (including refresh)
  // T_IRIS from loader + iris animation (~720ms) + small buffer
  const T_SHOW = 4350;

  function openModal() {
    modal.classList.add('disc-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.transition = 'opacity .4s cubic-bezier(.22,1,.36,1)';
    modal.style.opacity    = '0';
    modal.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 420);
  }

  setTimeout(openModal, T_SHOW);

  acceptBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Keyboard: Escape to close
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape' && modal.classList.contains('disc-open')) {
      closeModal();
      document.removeEventListener('keydown', onKey);
    }
  });
})();

(function () {
  var veil = document.getElementById('signout-veil');

  function fadeOut(url) {
    veil.style.pointerEvents = 'auto';
    veil.style.opacity = '1';
    if (url === 'login_external.html') sessionStorage.setItem('sg_to_login', '1');
    setTimeout(function () { window.location.href = url; }, 580);
  }

  // Capture phase — fires before anything else on the page
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (link.id === 'logoutLink') {
      e.preventDefault();
      e.stopImmediatePropagation();
      localStorage.removeItem('fas_user');          // mock sign-out
      fadeOut('home_external.html');
    } else if (href === 'login_external.html' && link.classList.contains('nav-icon')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      fadeOut('login_external.html');
    }
  }, true);
})();

/* ── Signed-in state (mock auth written by login/register pages) ──
   Wrapped defensively: runs on DOMContentLoaded (or immediately if the
   DOM is already parsed) and never lets an error here affect anything
   else on the page. */
function fasApplySignedInState() {
  try {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('fas_user') || 'null'); } catch (e) {}
    var loginLink = document.getElementById('navLoginLink');
    var wrap = document.getElementById('acctDd');
    if (!user || !wrap) return;
    if (loginLink) loginLink.style.display = 'none';
    wrap.style.display = '';
    document.getElementById('acctName').textContent  = user.fullname || 'Account';
    document.getElementById('acctEmail').textContent = user.email || '';
    document.getElementById('acctAvatar').textContent = (user.fullname || user.email || 'A').charAt(0).toUpperCase();
    var btn = document.getElementById('acctDdBtn'), panel = document.getElementById('acctDdPanel');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) panel.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });
  } catch (err) { console.warn('Signed-in state setup failed:', err); }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fasApplySignedInState);
} else {
  fasApplySignedInState();
}
