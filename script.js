/* ===========================================================
   RentMate — script.js
   Acts as a "fake backend" using localStorage so booking,
   wallet, and account actually work without a real server.
   =========================================================== */

/* ---------- Tiny data store (our pretend database) ---------- */
const Store = {
  init(){
    if(!localStorage.getItem('rm_user')){
      localStorage.setItem('rm_user', JSON.stringify({ name:'', email:'', loggedIn:false }));
    }
    if(!localStorage.getItem('rm_wallet')){
      localStorage.setItem('rm_wallet', JSON.stringify({ balance: 500, txns: [
        { label:'Welcome bonus', amount: 500, type:'plus', date:'Today' }
      ]}));
    }
    if(!localStorage.getItem('rm_bookings')){
      localStorage.setItem('rm_bookings', JSON.stringify([]));
    }
  },
  getUser(){ return JSON.parse(localStorage.getItem('rm_user')); },
  setUser(u){ localStorage.setItem('rm_user', JSON.stringify(u)); },
  getWallet(){ return JSON.parse(localStorage.getItem('rm_wallet')); },
  setWallet(w){ localStorage.setItem('rm_wallet', JSON.stringify(w)); },
  getBookings(){ return JSON.parse(localStorage.getItem('rm_bookings')); },
  addBooking(b){
    const list = Store.getBookings();
    list.unshift(b);
    localStorage.setItem('rm_bookings', JSON.stringify(list));
  },
  updateBooking(id, changes){
    const list = Store.getBookings().map(b => b.id === id ? {...b, ...changes} : b);
    localStorage.setItem('rm_bookings', JSON.stringify(list));
  }
};
Store.init();

/* ---------- Toast ---------- */
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> t.classList.remove('show'), 2400);
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle(){
  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if(btn && links){
    btn.addEventListener('click', ()=> links.classList.toggle('mobile-open'));
  }
}

/* ---------- Highlight active nav link ---------- */
function highlightNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const target = a.getAttribute('href').split('/').pop();
    if(target === here) a.classList.add('active');
  });
}

/* ---------- Update header login state ---------- */
function refreshAuthUI(){
  const user = Store.getUser();
  const slot = document.getElementById('authSlot');
  if(!slot) return;
  if(user.loggedIn){
    slot.innerHTML = `<a href="${pathTo('pages/account.html')}" class="btn small outline">Hi, ${user.name.split(' ')[0]||'You'}</a>`;
  } else {
    slot.innerHTML = `<a href="${pathTo('pages/login.html')}" class="btn small outline">Log in</a>
                       <a href="${pathTo('pages/login.html')}" class="btn small">Sign up</a>`;
  }
}

/* helper: path that works from root or /pages/ */
function pathTo(p){
  const inPages = location.pathname.includes('/pages/');
  if(p.startsWith('pages/')) return inPages ? p.replace('pages/','') : p;
  return inPages ? '../' + p : p;
}

/* ---------- Search bar on home: redirect to category page with query ---------- */
function initSearchForm(){
  const form = document.getElementById('searchForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const cat = document.getElementById('searchCategory').value;
    const loc = document.getElementById('searchLocation').value;
    const params = new URLSearchParams();
    if(loc) params.set('loc', loc);
    window.location.href = `pages/${cat}.html?${params.toString()}`;
  });
  // hero category tabs
  document.querySelectorAll('.tabs button[data-cat]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('searchCategory').value = btn.dataset.cat;
    });
  });
}

/* ---------- Pre-fill location from query string on category pages ---------- */
function prefillLocationFromQuery(){
  const input = document.getElementById('filterLocation');
  if(!input) return;
  const params = new URLSearchParams(window.location.search);
  if(params.get('loc')) input.value = params.get('loc');
}

/* ---------- Simple client-side filter for listing grids ---------- */
function initListingFilters(){
  const grid = document.getElementById('listingGrid');
  if(!grid) return;
  const cards = Array.from(grid.querySelectorAll('.card'));
  const priceSlider = document.getElementById('filterPrice');
  const priceLabel = document.getElementById('filterPriceLabel');
  const ratingBoxes = document.querySelectorAll('.rating-filter');
  const locInput = document.getElementById('filterLocation');

  function apply(){
    const maxPrice = priceSlider ? Number(priceSlider.value) : Infinity;
    const minRating = Array.from(ratingBoxes).filter(r=>r.checked).map(r=>Number(r.value));
    const locQuery = locInput ? locInput.value.trim().toLowerCase() : '';

    cards.forEach(card=>{
      const price = Number(card.dataset.price);
      const rating = Number(card.dataset.rating);
      const loc = (card.dataset.location||'').toLowerCase();
      let visible = price <= maxPrice;
      if(minRating.length) visible = visible && minRating.some(m => rating >= m);
      if(locQuery) visible = visible && loc.includes(locQuery);
      card.style.display = visible ? '' : 'none';
    });
  }
  if(priceSlider){
    priceSlider.addEventListener('input', ()=>{
      priceLabel.textContent = '₹' + priceSlider.value;
      apply();
    });
  }
  ratingBoxes.forEach(r=> r.addEventListener('change', apply));
  if(locInput) locInput.addEventListener('input', apply);
  apply();
}

/* ---------- FAQ accordion (Help page) ---------- */
function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click', ()=>{
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
}

/* ---------- Login / Signup form (demo only) ---------- */
function initAuthForm(){
  const form = document.getElementById('authForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('authName')?.value || 'Student';
    const email = document.getElementById('authEmail').value;
    Store.setUser({ name: name || email.split('@')[0], email, loggedIn:true });
    toast('Logged in successfully ✓');
    setTimeout(()=> window.location.href = 'account.html', 700);
  });
}

function logout(){
  const u = Store.getUser();
  u.loggedIn = false;
  Store.setUser(u);
  toast('Logged out');
  setTimeout(()=> window.location.href = pathTo('index.html'), 500);
}

/* ---------- Booking modal logic (used on listing.html) ---------- */
function initBooking(){
  const form = document.getElementById('bookingForm');
  if(!form) return;

  const pricePerUnit = Number(form.dataset.price);
  const unitLabel = form.dataset.unit || 'night';
  const title = form.dataset.title;
  const category = form.dataset.category;

  const from = document.getElementById('bookFrom');
  const to = document.getElementById('bookTo');
  const totalEl = document.getElementById('bookTotal');
  const unitsEl = document.getElementById('bookUnits');

  function calc(){
    if(!from.value || !to.value){ totalEl.textContent='₹0'; return; }
    const d1 = new Date(from.value), d2 = new Date(to.value);
    let units = Math.round((d2 - d1) / (1000*60*60*24));
    if(units <= 0) units = 1;
    unitsEl.textContent = units + ' ' + unitLabel + (units>1?'s':'');
    totalEl.textContent = '₹' + (units * pricePerUnit).toLocaleString('en-IN');
  }
  from.addEventListener('change', calc);
  to.addEventListener('change', calc);

  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!from.value || !to.value){ toast('Please pick both dates'); return; }
    const user = Store.getUser();
    if(!user.loggedIn){
      toast('Please log in to confirm booking');
      setTimeout(()=> window.location.href = 'login.html', 800);
      return;
    }
    const d1 = new Date(from.value), d2 = new Date(to.value);
    let units = Math.round((d2 - d1) / (1000*60*60*24)) || 1;
    const total = units * pricePerUnit;

    const booking = {
      id: 'RM' + Date.now(),
      title, category,
      from: from.value, to: to.value,
      units, total,
      status: 'upcoming',
      payMethod: document.querySelector('input[name=payMethod]:checked').value
    };

    const wallet = Store.getWallet();
    if(booking.payMethod === 'wallet'){
      if(wallet.balance < total){
        toast('Insufficient RentMate Wallet balance');
        return;
      }
      wallet.balance -= total;
      wallet.txns.unshift({ label: 'Booking: ' + title, amount: total, type:'minus', date:'Today' });
      Store.setWallet(wallet);
    }

    Store.addBooking(booking);
    showModal('✅', 'Booking confirmed!', `${title} booked for ${units} ${unitLabel}(s). Total ₹${total.toLocaleString('en-IN')}.`, 'View my bookings', ()=>{
      window.location.href = 'account.html';
    });
  });
}

/* ---------- Cancel booking (account page) ---------- */
function cancelBooking(id){
  showModal('⚠️', 'Cancel this booking?', 'Refund (if any) will be added to your RentMate Wallet.', 'Yes, cancel', ()=>{
    const list = Store.getBookings();
    const b = list.find(x=>x.id===id);
    if(b && b.status === 'upcoming'){
      Store.updateBooking(id, { status:'cancelled' });
      const wallet = Store.getWallet();
      wallet.balance += b.total;
      wallet.txns.unshift({ label:'Refund: ' + b.title, amount: b.total, type:'plus', date:'Today' });
      Store.setWallet(wallet);
      toast('Booking cancelled, amount refunded to wallet');
      renderBookings();
      renderWalletWidgetIfPresent();
    }
  }, true);
}

/* ---------- Render bookings list on account page ---------- */
function renderBookings(){
  const wrap = document.getElementById('bookingsList');
  if(!wrap) return;
  const list = Store.getBookings();
  if(!list.length){
    wrap.innerHTML = `<p class="hint">No bookings yet. Go explore rooms, hostels, hotels, bikes, cycles or cars!</p>`;
    return;
  }
  wrap.innerHTML = list.map(b=>`
    <div class="booking-row">
      <div>
        <strong>${b.title}</strong>
        <div class="hint">${b.from} → ${b.to} · ${b.units} ${b.category==='bikes'||b.category==='cars'||b.category==='cycles'?'day(s)':'night(s)'} · ₹${b.total.toLocaleString('en-IN')}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="status ${b.status}">${b.status}</span>
        ${b.status==='upcoming' ? `<button class="btn small outline" onclick="cancelBooking('${b.id}')">Cancel</button>` : ''}
      </div>
    </div>
  `).join('');
}

/* ---------- Wallet page rendering ---------- */
function renderWallet(){
  const balEl = document.getElementById('walletBalance');
  const txnList = document.getElementById('txnList');
  if(!balEl) return;
  const wallet = Store.getWallet();
  balEl.textContent = '₹' + wallet.balance.toLocaleString('en-IN');
  txnList.innerHTML = wallet.txns.map(t=>`
    <div class="txn-row">
      <span>${t.label} <span class="hint">· ${t.date}</span></span>
      <span class="${t.type==='plus'?'amt-plus':'amt-minus'}">${t.type==='plus'?'+':'-'}₹${t.amount.toLocaleString('en-IN')}</span>
    </div>`).join('');

  document.getElementById('addMoneyBtn')?.addEventListener('click', ()=>{
    wallet.balance += 200;
    wallet.txns.unshift({ label:'Added money', amount:200, type:'plus', date:'Today' });
    Store.setWallet(wallet);
    toast('₹200 added to wallet');
    renderWallet();
  });
}
function renderWalletWidgetIfPresent(){
  if(document.getElementById('walletBalance')) renderWallet();
}

/* ---------- Account profile fill ---------- */
function renderAccountProfile(){
  const nameEl = document.getElementById('acctName');
  if(!nameEl) return;
  const user = Store.getUser();
  if(!user.loggedIn){
    document.getElementById('accountLoggedArea').style.display='none';
    document.getElementById('accountGuestArea').style.display='block';
    return;
  }
  document.getElementById('accountLoggedArea').style.display='block';
  document.getElementById('accountGuestArea').style.display='none';
  nameEl.textContent = user.name || 'Student';
  document.getElementById('acctEmail').textContent = user.email || '';
  document.getElementById('acctAvatar').textContent = (user.name||'S').charAt(0).toUpperCase();
}

/* ---------- Generic confirm/info modal ---------- */
function showModal(icon, title, text, actionLabel, onAction, isConfirm){
  let overlay = document.getElementById('modalOverlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="ic">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      ${isConfirm ? '<button class="btn outline small" id="modalCancel" style="margin-right:8px;">Go back</button>' : ''}
      <button class="btn small" id="modalAction">${actionLabel}</button>
    </div>`;
  overlay.classList.add('show');
  document.getElementById('modalAction').addEventListener('click', ()=>{
    overlay.classList.remove('show');
    if(onAction) onAction();
  });
  document.getElementById('modalCancel')?.addEventListener('click', ()=> overlay.classList.remove('show'));
}

/* ---------- Simple "map" placeholder using an embedded OpenStreetMap iframe ---------- */
function initMaps(){
  document.querySelectorAll('.map-box[data-lat]').forEach(box=>{
    const lat = box.dataset.lat, lng = box.dataset.lng, label = box.dataset.label || 'Location';
    box.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}"
      title="${label} map"></iframe>`;
  });
}

/* ---------- Init everything on load ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initNavToggle();
  highlightNav();
  refreshAuthUI();
  initSearchForm();
  prefillLocationFromQuery();
  initListingFilters();
  initFAQ();
  initAuthForm();
  initBooking();
  renderBookings();
  renderWallet();
  renderAccountProfile();
  initMaps();

  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // close modal on outside click
  document.addEventListener('click', e=>{
    if(e.target.id === 'modalOverlay') e.target.classList.remove('show');
  });
});