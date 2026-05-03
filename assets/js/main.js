/* assets/js/main.js — shared JS for all pages */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav ──
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
  }

  // ── Active nav link ──
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    // strip baseurl for comparison
    const rel = href.replace(/^\/photography/, '') || '/';
    const cur = path.replace(/^\/photography/, '') || '/';
    if (rel !== '/' && cur.startsWith(rel)) a.classList.add('active');
    if (rel === '/' && (cur === '/' || cur === '')) a.classList.add('active');
  });

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Lightbox ──
  initLightbox();
});

// ── Filter pills ──
function initFilters(containerSelector, itemSelector, attrName) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tag = pill.dataset.tag;
      document.querySelectorAll(itemSelector).forEach(item => {
        const tags = (item.getAttribute(attrName) || '').split(' ');
        item.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
      });
    });
  });
}

// ── Lightbox ──
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg     = lb.querySelector('.lb-img');
  const lbCaption = lb.querySelector('.lb-caption');
  const lbClose   = lb.querySelector('.lb-close');
  const lbPrev    = lb.querySelector('.lb-prev');
  const lbNext    = lb.querySelector('.lb-next');
  let items = [], current = 0;

  function open(i) {
    current = i;
    lbImg.src = items[i].full;
    lbCaption.textContent = items[i].caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function prev() { open((current - 1 + items.length) % items.length); }
  function next() { open((current + 1) % items.length); }

  window.openLightbox = (index, arr) => { items = arr; open(index); };
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

// ── Drag-scroll strip ──
function initDragScroll(el) {
  if (!el) return;
  let down = false, sx, sl;
  el.addEventListener('mousedown', e => { down = true; el.style.cursor = 'grabbing'; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; });
  el.addEventListener('mouseleave', () => { down = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup',    () => { down = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!down) return;
    e.preventDefault();
    el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.4;
  });
}
