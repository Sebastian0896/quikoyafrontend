// ── NAV scroll effect ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ── NAV hamburger (mobile) ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
}

// ── CAROUSEL ──
const track = document.getElementById('track');
if (track) {
  const shots  = Array.from(track.querySelectorAll('.shot'));
  const dotsEl = document.getElementById('dots');
  let current  = 0;

  if (dotsEl) {
    shots.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Captura ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    });
  }

  function getDots() { return dotsEl ? Array.from(dotsEl.querySelectorAll('.dot')) : []; }

  function goTo(index) {
    current = Math.max(0, Math.min(index, shots.length - 1));
    const shot   = shots[current];
    const offset = shot.offsetLeft - (track.clientWidth / 2) + (shot.clientWidth / 2);
    track.scrollTo({ left: offset, behavior: 'smooth' });
    getDots().forEach((d, i) => d.classList.toggle('active', i === current));
  }

  window.addEventListener('load', () => goTo(0));

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  track.addEventListener('scroll', () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    shots.forEach((s, i) => {
      const dist = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== current) {
      current = closest;
      getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }
  });

  // Drag to scroll
  let isDown = false, startX, scrollStart;
  track.addEventListener('mousedown', e => {
    isDown = true; track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft; scrollStart = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup',    () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = scrollStart - (e.pageX - track.offsetLeft - startX) * 1.4;
  });

  // Touch swipe
  let touchStart = 0;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
}
