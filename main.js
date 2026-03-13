// ═══════════════════════════════════════════════
//  STEELCRAFT WORKSHOP — MAIN JS
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ── DOM refs ──
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const machinesGrid = document.getElementById('machinesGrid');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalInner = document.getElementById('modalInner');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryVideoGrid = document.getElementById('galleryVideoGrid');
  const loadMoreBtn = document.getElementById('loadMoreGallery');
  const lightbox = document.getElementById('lightbox');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbContent = document.getElementById('lbContent');
  const lbCounter = document.getElementById('lbCounter');
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsDots = document.getElementById('reviewsDots');
  const contactForm = document.getElementById('contactForm');
  const backTop = document.getElementById('backTop');
  const toast = document.getElementById('toast');

  let lbImages = [];
  let lbIndex = 0;
  let reviewIndex = 0;
  let reviewTimer = null;
  let galleryPage = 1;
  const GALLERY_PER_PAGE = 8;

  // ════════════════════════════════
  //  NAVBAR
  // ════════════════════════════════
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backTop.classList.toggle('visible', window.scrollY > 400);
  });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ════════════════════════════════
  //  COUNTER ANIMATION
  // ════════════════════════════════
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count >= target) clearInterval(interval);
    }, 30);
  }
  const counters = document.querySelectorAll('.stat-num');
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { counters.forEach(animateCounter); heroObs.disconnect(); }
    });
  }, { threshold: 0.5 });
  if (counters.length) heroObs.observe(counters[0].closest('.hero-stats'));

  // ════════════════════════════════
  //  MACHINES
  // ════════════════════════════════
  function renderMachines(filter = 'all') {
    machinesGrid.innerHTML = '';
    const list = filter === 'all' ? SITE_DATA.machines : SITE_DATA.machines.filter(m => m.category === filter);
    list.forEach((m, i) => {
      const card = document.createElement('div');
      card.className = 'machine-card';
      card.style.animationDelay = (i * 0.07) + 's';
      card.innerHTML = `
        <div class="card-image">
          <img src="${m.image}" alt="${m.name}" loading="lazy" />
          ${m.badge ? `<span class="card-badge">${m.badge}</span>` : ''}
          <span class="card-stock ${m.stock}">${m.stock === 'in' ? '✔ In Stock' : '✗ Out of Stock'}</span>
        </div>
        <div class="card-body">
          <div class="card-category">${m.categoryLabel}</div>
          <div class="card-title">${m.name}</div>
          <div class="card-desc">${m.description.substring(0, 110)}…</div>
          <div class="card-specs">
            ${Object.entries(m.specs).slice(0, 3).map(([k,v]) => `<span class="spec-chip">${k}: ${v}</span>`).join('')}
          </div>
          <div class="card-footer">
            <div class="card-price">
              <span class="price-label">Starting from</span>
              <span class="price-value">${m.price}</span>
            </div>
            <button class="card-contact" data-id="${m.id}">Details →</button>
          </div>
        </div>
      `;
      card.querySelector('.card-contact').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(m.id);
      });
      card.addEventListener('click', () => openModal(m.id));
      machinesGrid.appendChild(card);
    });
    if (list.length === 0) {
      machinesGrid.innerHTML = '<p style="color:var(--text3);text-align:center;grid-column:1/-1;padding:40px">No machines in this category yet.</p>';
    }
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMachines(btn.dataset.filter);
    });
  });

  // ════════════════════════════════
  //  MACHINE MODAL
  // ════════════════════════════════
  function openModal(id) {
    const m = SITE_DATA.machines.find(x => x.id === id);
    if (!m) return;
    const wa = `https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(m.name)}%20(${encodeURIComponent(m.price)})`;
    const specsRows = Object.entries(m.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    const galleryImgs = m.gallery.map(src => `<img src="${src}" alt="${m.name}" loading="lazy" />`).join('');
    modalInner.innerHTML = `
      <div class="modal-gallery">${galleryImgs}</div>
      <div class="modal-category" style="font-size:.75rem;color:var(--amber);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">${m.categoryLabel}</div>
      <div class="modal-title">${m.name}</div>
      <div class="modal-price">${m.price}</div>
      <div class="modal-desc">${m.description}</div>
      <div class="modal-specs-title">Technical Specifications</div>
      <table class="specs-table"><tbody>${specsRows}</tbody></table>
      <div class="modal-actions">
        <a href="${wa}" target="_blank" class="modal-wa btn-primary">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Enquiry
        </a>
        <a href="tel:+919876543210" class="btn-ghost">📞 Call Now</a>
      </div>
    `;
    // Gallery lightbox inside modal
    const imgs = modalInner.querySelectorAll('.modal-gallery img');
    imgs.forEach((img, i) => {
      img.addEventListener('click', () => {
        lbImages = m.gallery;
        lbIndex = i;
        openLightbox();
      });
    });
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

  // ════════════════════════════════
  //  GALLERY
  // ════════════════════════════════
  function renderGallery() {
    const photos = SITE_DATA.gallery.photos;
    const visible = photos.slice(0, galleryPage * GALLERY_PER_PAGE);
    galleryGrid.innerHTML = '';
    visible.forEach((p, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.animationDelay = (i % GALLERY_PER_PAGE * 0.05) + 's';
      item.innerHTML = `<img src="${p.src}" alt="${p.caption}" loading="lazy" />`;
      item.addEventListener('click', () => {
        lbImages = photos.map(x => x.src);
        lbIndex = i;
        openLightbox();
      });
      galleryGrid.appendChild(item);
    });
    loadMoreBtn.style.display = visible.length < photos.length ? 'block' : 'none';
  }

  function renderVideos() {
    galleryVideoGrid.innerHTML = '';
    SITE_DATA.gallery.videos.forEach(v => {
      const item = document.createElement('div');
      item.className = 'video-item';
      if (v.type === 'youtube') {
        item.innerHTML = `
          <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${v.id}" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-caption">${v.caption}</div>
        `;
      }
      galleryVideoGrid.appendChild(item);
    });
  }

  loadMoreBtn.addEventListener('click', () => {
    galleryPage++;
    renderGallery();
  });

  document.querySelectorAll('.gtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const isPhotos = tab.dataset.gtab === 'photos';
      galleryGrid.classList.toggle('hidden', !isPhotos);
      galleryVideoGrid.classList.toggle('hidden', isPhotos);
      loadMoreBtn.style.display = isPhotos ? '' : 'none';
    });
  });

  // ════════════════════════════════
  //  LIGHTBOX
  // ════════════════════════════════
  function openLightbox() {
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function updateLightbox() {
    lbContent.innerHTML = `<img src="${lbImages[lbIndex]}" alt="Gallery image ${lbIndex+1}" />`;
    lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
  }
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); });
  lbNext.addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); }
  });

  // ════════════════════════════════
  //  REVIEWS SLIDER
  // ════════════════════════════════
  function renderReviews() {
    reviewsTrack.innerHTML = '';
    reviewsDots.innerHTML = '';
    SITE_DATA.reviews.forEach((r, i) => {
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const initials = r.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-stars">${stars}</div>
        <div class="review-text">"${r.text}"</div>
        <div class="review-author">
          <div class="author-avatar">${initials}</div>
          <div>
            <div class="author-name">${r.name}</div>
            <div class="author-meta">${r.company} · ${r.product}</div>
          </div>
        </div>
      `;
      reviewsTrack.appendChild(card);
      const dot = document.createElement('button');
      dot.addEventListener('click', () => goToReview(i));
      reviewsDots.appendChild(dot);
    });
    goToReview(0);
    startReviewTimer();
  }

  function goToReview(idx) {
    reviewIndex = idx;
    const cards = reviewsTrack.querySelectorAll('.review-card');
    const dots = reviewsDots.querySelectorAll('button');
    const cardW = cards[0] ? cards[0].offsetWidth + 24 : 0;
    reviewsTrack.style.transform = `translateX(-${idx * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function startReviewTimer() {
    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => {
      const next = (reviewIndex + 1) % SITE_DATA.reviews.length;
      goToReview(next);
    }, 5000);
  }

  window.addEventListener('resize', () => {
    if (SITE_DATA.reviews.length) goToReview(reviewIndex);
  });

  // ════════════════════════════════
  //  CONTACT FORM
  // ════════════════════════════════
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const phone = document.getElementById('cf-phone').value;
    const product = document.getElementById('cf-product').value;
    const message = document.getElementById('cf-message').value;
    const text = `Hello SteelCraft! My name is ${name}. Phone: ${phone}. I am interested in: ${product || 'your machinery'}. ${message}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
    showToast('✅ Redirecting to WhatsApp…');
    contactForm.reset();
  });

  // ════════════════════════════════
  //  TOAST
  // ════════════════════════════════
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ════════════════════════════════
  //  SCROLL REVEAL
  // ════════════════════════════════
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });

  // ════════════════════════════════
  //  TRUST BAR — duplicate for seamless loop
  // ════════════════════════════════
  const trustInner = document.querySelector('.trust-inner');
  if (trustInner) {
    trustInner.innerHTML += trustInner.innerHTML;
  }

  // ════════════════════════════════
  //  INIT
  // ════════════════════════════════
  renderMachines();
  renderGallery();
  renderVideos();
  renderReviews();

})();
