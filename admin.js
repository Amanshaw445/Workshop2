// ═══════════════════════════════════════════════
//  STEELCRAFT ADMIN PANEL — JS
// ═══════════════════════════════════════════════

// ── Auth ──
const CREDS_KEY = 'steelcraft_creds';
const defaultCreds = { user: 'admin', pass: 'steelcraft2025' };

function getCreds() {
  const saved = localStorage.getItem(CREDS_KEY);
  return saved ? JSON.parse(saved) : defaultCreds;
}

function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  const creds = getCreds();
  const err = document.getElementById('loginError');
  if (u === creds.user && p === creds.pass) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.remove('hidden');
    initAdmin();
  } else {
    err.classList.remove('hidden');
    setTimeout(() => err.classList.add('hidden'), 3000);
  }
}
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function logout() {
  document.getElementById('adminApp').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function changePassword() {
  const u = document.getElementById('newUser').value.trim();
  const p = document.getElementById('newPass').value;
  if (!u || !p) return showToast('⚠️ Enter both username and password');
  localStorage.setItem(CREDS_KEY, JSON.stringify({ user: u, pass: p }));
  showToast('✅ Credentials updated!');
  document.getElementById('newUser').value = '';
  document.getElementById('newPass').value = '';
}

// ── Panel Navigation ──
function switchPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  const link = document.querySelector(`[data-panel="${name}"]`);
  if (link) link.classList.add('active');
  document.getElementById('panelTitle').textContent = name.charAt(0).toUpperCase() + name.slice(1);
  // close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.sb-link[data-panel]').forEach(btn => {
  btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
});

document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── Init ──
function initAdmin() {
  renderDashboard();
  renderMachinesTable();
  renderGalleryAdmin();
  renderReviewsAdmin();
}

// ════════════════════════════════
//  DASHBOARD
// ════════════════════════════════
function renderDashboard() {
  document.getElementById('statMachines').textContent = SITE_DATA.machines.length;
  document.getElementById('statPhotos').textContent = SITE_DATA.gallery.photos.length;
  document.getElementById('statReviews').textContent = SITE_DATA.reviews.length;
  document.getElementById('statVideos').textContent = SITE_DATA.gallery.videos.length;

  const recent = document.getElementById('recentMachines');
  recent.innerHTML = SITE_DATA.machines.slice(-5).reverse().map(m => `
    <div class="recent-item">
      <img class="ri-img" src="${m.image}" alt="${m.name}" />
      <div>
        <div class="ri-name">${m.name}</div>
        <div class="ri-price">${m.price}</div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════
//  MACHINES
// ════════════════════════════════
function renderMachinesTable() {
  const container = document.getElementById('machinesTable');
  if (!SITE_DATA.machines.length) {
    container.innerHTML = '<p style="color:var(--text3);padding:20px">No machines yet. Add your first one!</p>';
    return;
  }
  container.innerHTML = SITE_DATA.machines.map((m, i) => `
    <div class="machine-row">
      <img class="mr-img" src="${m.image}" alt="${m.name}" />
      <div class="mr-info">
        <div class="mr-name">${m.name}</div>
        <div class="mr-meta">
          <span>${m.categoryLabel}</span>
          <span class="mr-price">${m.price}</span>
          <span class="badge-pill ${m.stock === 'in' ? 'badge-in' : 'badge-out'}">${m.stock === 'in' ? 'In Stock' : 'Out of Stock'}</span>
          ${m.badge ? `<span class="badge-pill" style="background:rgba(245,158,11,0.15);color:var(--amber);border:1px solid rgba(245,158,11,0.3)">${m.badge}</span>` : ''}
        </div>
      </div>
      <div class="mr-actions">
        <button class="btn-edit btn-sm" onclick="editMachine(${i})">✏️ Edit</button>
        <button class="btn-danger btn-sm" onclick="deleteMachine(${i})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

function showAddMachineForm() {
  document.getElementById('mFormTitle').textContent = 'Add New Machine';
  document.getElementById('mFormId').value = '';
  document.getElementById('mName').value = '';
  document.getElementById('mCategory').value = 'cnc';
  document.getElementById('mCategoryLabel').value = '';
  document.getElementById('mPrice').value = '';
  document.getElementById('mBadge').value = '';
  document.getElementById('mStock').value = 'in';
  document.getElementById('mDesc').value = '';
  document.getElementById('mImage').value = '';
  document.getElementById('mGallery').value = '';
  document.getElementById('mSpecs').value = '';
  document.getElementById('machineFormCard').classList.remove('hidden');
  document.getElementById('machineFormCard').scrollIntoView({ behavior: 'smooth' });
}

function cancelMachineForm() {
  document.getElementById('machineFormCard').classList.add('hidden');
}

function editMachine(idx) {
  const m = SITE_DATA.machines[idx];
  document.getElementById('mFormTitle').textContent = 'Edit Machine';
  document.getElementById('mFormId').value = idx;
  document.getElementById('mName').value = m.name;
  document.getElementById('mCategory').value = m.category;
  document.getElementById('mCategoryLabel').value = m.categoryLabel;
  document.getElementById('mPrice').value = m.price;
  document.getElementById('mBadge').value = m.badge || '';
  document.getElementById('mStock').value = m.stock;
  document.getElementById('mDesc').value = m.description;
  document.getElementById('mImage').value = m.image;
  document.getElementById('mGallery').value = (m.gallery || []).join('\n');
  document.getElementById('mSpecs').value = Object.entries(m.specs).map(([k,v]) => `${k}: ${v}`).join('\n');
  document.getElementById('machineFormCard').classList.remove('hidden');
  document.getElementById('machineFormCard').scrollIntoView({ behavior: 'smooth' });
}

function saveMachine() {
  const name = document.getElementById('mName').value.trim();
  const price = document.getElementById('mPrice').value.trim();
  const desc = document.getElementById('mDesc').value.trim();
  const image = document.getElementById('mImage').value.trim();
  if (!name || !price || !desc || !image) return showToast('⚠️ Fill all required fields');

  const specsRaw = document.getElementById('mSpecs').value.trim();
  const specs = {};
  specsRaw.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const k = line.substring(0, idx).trim();
      const v = line.substring(idx + 1).trim();
      if (k && v) specs[k] = v;
    }
  });

  const galleryRaw = document.getElementById('mGallery').value.trim();
  const gallery = galleryRaw ? galleryRaw.split('\n').map(s => s.trim()).filter(Boolean) : [image];

  const machine = {
    id: Date.now(),
    name,
    category: document.getElementById('mCategory').value,
    categoryLabel: document.getElementById('mCategoryLabel').value || document.getElementById('mCategory').value,
    price,
    badge: document.getElementById('mBadge').value.trim() || null,
    stock: document.getElementById('mStock').value,
    description: desc,
    image,
    gallery,
    specs
  };

  const idxStr = document.getElementById('mFormId').value;
  if (idxStr !== '') {
    SITE_DATA.machines[parseInt(idxStr)] = { ...machine, id: SITE_DATA.machines[parseInt(idxStr)].id };
    showToast('✅ Machine updated!');
  } else {
    SITE_DATA.machines.push(machine);
    showToast('✅ Machine added!');
  }
  saveAll();
  cancelMachineForm();
  renderMachinesTable();
  renderDashboard();
}

function deleteMachine(idx) {
  if (!confirm(`Delete "${SITE_DATA.machines[idx].name}"? This cannot be undone.`)) return;
  SITE_DATA.machines.splice(idx, 1);
  saveAll();
  renderMachinesTable();
  renderDashboard();
  showToast('🗑️ Machine deleted');
}

// ════════════════════════════════
//  GALLERY
// ════════════════════════════════
function renderGalleryAdmin() {
  // Photos
  const grid = document.getElementById('galleryAdminGrid');
  grid.innerHTML = SITE_DATA.gallery.photos.map((p, i) => `
    <div class="ga-item">
      <img src="${p.src}" alt="${p.caption}" loading="lazy" />
      <div class="ga-footer">
        <span class="ga-caption">${p.caption || 'No caption'}</span>
        <button class="btn-danger btn-sm" onclick="deletePhoto(${i})">✕</button>
      </div>
    </div>
  `).join('');

  // Videos
  const vgrid = document.getElementById('videoAdminGrid');
  vgrid.innerHTML = SITE_DATA.gallery.videos.map((v, i) => `
    <div class="ga-item">
      <a href="https://youtube.com/watch?v=${v.id}" target="_blank" class="video-thumb">▶️</a>
      <div class="ga-footer">
        <span class="ga-caption">${v.caption || 'YouTube Video'}</span>
        <button class="btn-danger btn-sm" onclick="deleteVideo(${i})">✕</button>
      </div>
    </div>
  `).join('');
}

function addPhoto() {
  const url = document.getElementById('gPhotoUrl').value.trim();
  const caption = document.getElementById('gPhotoCaption').value.trim();
  if (!url) return showToast('⚠️ Enter an image URL');
  SITE_DATA.gallery.photos.push({ src: url, caption });
  saveAll();
  renderGalleryAdmin();
  renderDashboard();
  document.getElementById('gPhotoUrl').value = '';
  document.getElementById('gPhotoCaption').value = '';
  showToast('✅ Photo added!');
}

function deletePhoto(idx) {
  SITE_DATA.gallery.photos.splice(idx, 1);
  saveAll();
  renderGalleryAdmin();
  renderDashboard();
  showToast('🗑️ Photo removed');
}

function addVideo() {
  const id = document.getElementById('gVideoId').value.trim();
  const caption = document.getElementById('gVideoCaption').value.trim();
  if (!id) return showToast('⚠️ Enter a YouTube video ID');
  SITE_DATA.gallery.videos.push({ type: 'youtube', id, caption });
  saveAll();
  renderGalleryAdmin();
  renderDashboard();
  document.getElementById('gVideoId').value = '';
  document.getElementById('gVideoCaption').value = '';
  showToast('✅ Video added!');
}

function deleteVideo(idx) {
  SITE_DATA.gallery.videos.splice(idx, 1);
  saveAll();
  renderGalleryAdmin();
  renderDashboard();
  showToast('🗑️ Video removed');
}

// Gallery tab switching
document.querySelectorAll('.ga-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ga-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const isPhotos = tab.dataset.gtab === 'photos';
    document.getElementById('ga-photos').classList.toggle('hidden', !isPhotos);
    document.getElementById('ga-videos').classList.toggle('hidden', isPhotos);
  });
});

// ════════════════════════════════
//  REVIEWS
// ════════════════════════════════
function renderReviewsAdmin() {
  const list = document.getElementById('reviewsAdminList');
  if (!SITE_DATA.reviews.length) {
    list.innerHTML = '<p style="color:var(--text3);padding:20px">No reviews yet.</p>';
    return;
  }
  list.innerHTML = SITE_DATA.reviews.map((r, i) => `
    <div class="review-row">
      <div class="rr-info">
        <div class="rr-name">${r.name}</div>
        <div class="rr-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        <div class="rr-text">"${r.text}"</div>
        <div class="rr-meta">${r.company} · ${r.product}</div>
      </div>
      <div class="rr-actions">
        <button class="btn-edit btn-sm" onclick="editReview(${i})">✏️</button>
        <button class="btn-danger btn-sm" onclick="deleteReview(${i})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function showAddReviewForm() {
  document.getElementById('rFormTitle').textContent = 'Add Review';
  document.getElementById('rFormIdx').value = '-1';
  document.getElementById('rName').value = '';
  document.getElementById('rCompany').value = '';
  document.getElementById('rRating').value = '5';
  document.getElementById('rProduct').value = '';
  document.getElementById('rText').value = '';
  document.getElementById('reviewFormCard').classList.remove('hidden');
  document.getElementById('reviewFormCard').scrollIntoView({ behavior: 'smooth' });
}

function cancelReviewForm() {
  document.getElementById('reviewFormCard').classList.add('hidden');
}

function editReview(idx) {
  const r = SITE_DATA.reviews[idx];
  document.getElementById('rFormTitle').textContent = 'Edit Review';
  document.getElementById('rFormIdx').value = idx;
  document.getElementById('rName').value = r.name;
  document.getElementById('rCompany').value = r.company;
  document.getElementById('rRating').value = r.rating;
  document.getElementById('rProduct').value = r.product;
  document.getElementById('rText').value = r.text;
  document.getElementById('reviewFormCard').classList.remove('hidden');
  document.getElementById('reviewFormCard').scrollIntoView({ behavior: 'smooth' });
}

function saveReview() {
  const name = document.getElementById('rName').value.trim();
  const text = document.getElementById('rText').value.trim();
  if (!name || !text) return showToast('⚠️ Name and review text required');

  const review = {
    name,
    company: document.getElementById('rCompany').value.trim(),
    rating: parseInt(document.getElementById('rRating').value),
    product: document.getElementById('rProduct').value.trim(),
    text,
    avatar: null
  };

  const idx = parseInt(document.getElementById('rFormIdx').value);
  if (idx >= 0) {
    SITE_DATA.reviews[idx] = review;
    showToast('✅ Review updated!');
  } else {
    SITE_DATA.reviews.push(review);
    showToast('✅ Review added!');
  }
  saveAll();
  cancelReviewForm();
  renderReviewsAdmin();
  renderDashboard();
}

function deleteReview(idx) {
  if (!confirm('Delete this review?')) return;
  SITE_DATA.reviews.splice(idx, 1);
  saveAll();
  renderReviewsAdmin();
  renderDashboard();
  showToast('🗑️ Review deleted');
}

// ════════════════════════════════
//  SETTINGS
// ════════════════════════════════
function saveSettings() {
  SITE_DATA.settings = {
    phone: document.getElementById('setPhone').value.trim(),
    email: document.getElementById('setEmail').value.trim(),
    address: document.getElementById('setAddress').value.trim()
  };
  saveAll();
  showToast('✅ Settings saved!');
}

// ════════════════════════════════
//  DATA MANAGEMENT
// ════════════════════════════════
function saveAll() {
  saveSiteData();
}

function exportData() {
  const blob = new Blob([JSON.stringify(SITE_DATA, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'steelcraft_data_' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  showToast('📤 Data exported!');
}

function resetData() {
  if (!confirm('This will DELETE all your changes and reset to factory defaults. Are you sure?')) return;
  localStorage.removeItem('steelcraft_data');
  location.reload();
}

// ════════════════════════════════
//  TOAST
// ════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('adminToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
                       }
