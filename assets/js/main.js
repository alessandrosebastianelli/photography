/* assets/js/main.js */

// ── Mobile nav ──
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham) ham.addEventListener('click', () => links.classList.toggle('open'));

  // Active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace(/^\/photography/, ''))) {
      a.classList.add('active');
    }
  });

  // ── Scroll-reveal ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(el);
  });

  document.querySelectorAll('.reveal.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });

  // Polyfill observe → visible on mutation
  const mo = new MutationObserver(() => {
    document.querySelectorAll('.reveal.visible').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
  mo.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});

// ── Filter pills ──
function initFilters(gallerySelector, itemSelector, attrName) {
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
  const lbImg = lb.querySelector('.lb-img');
  const lbCaption = lb.querySelector('.lb-caption');
  const lbClose = lb.querySelector('.lb-close');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');
  let items = [], current = 0;

  function open(i) {
    current = i;
    const it = items[i];
    lbImg.src = it.full;
    lbCaption.textContent = it.caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function prev() { open((current - 1 + items.length) % items.length); }
  function next() { open((current + 1) % items.length); }

  window.openLightbox = function(index, itemsArr) { items = itemsArr; open(index); };

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

document.addEventListener('DOMContentLoaded', initLightbox);

// ── Drag-scroll strip ──
function initDragScroll(el) {
  if (!el) return;
  let down = false, sx, sl;
  el.addEventListener('mousedown', e => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; el.style.cursor = 'grabbing'; });
  el.addEventListener('mouseleave', () => { down = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup', () => { down = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!down) return;
    e.preventDefault();
    el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.4;
  });
}
