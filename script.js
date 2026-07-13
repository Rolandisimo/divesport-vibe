// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ Depth rail: track scroll position against section stops ============
const stops = Array.from(document.querySelectorAll('.depth-rail__stops li'));
const marker = document.getElementById('depthMarker');
const depthValue = document.getElementById('depthValue');
const heroGauge = document.getElementById('heroGauge');

const depthBySection = { top: 0, about: 5, courses: 18, travel: 30, gear: 40, gallery: 40, contact: 0 };

stops.forEach(li => {
  li.addEventListener('click', () => {
    const target = document.getElementById(li.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

const sections = Object.keys(depthBySection)
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateDepthRail() {
  const viewportMid = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0];
  for (const sec of sections) {
    if (sec.offsetTop <= viewportMid) current = sec;
  }
  const depth = depthBySection[current.id] ?? 0;
  if (marker) marker.style.top = ((sections.indexOf(current) / (sections.length - 1)) * 100) + '%';
  if (depthValue) depthValue.textContent = depth.toFixed(1);

  // highlight matching nav link
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateDepthRail(); ticking = false; });
    ticking = true;
  }
});
updateDepthRail();

// ============ Hero gauge: gentle ambient tick, purely decorative ============
if (heroGauge) {
  let base = 12.4;
  setInterval(() => {
    base += (Math.random() - 0.5) * 0.6;
    base = Math.max(2, Math.min(38, base));
    heroGauge.textContent = base.toFixed(1).padStart(5, '0');
  }, 1400);
}

// ============ Contact form ============
// Submission itself (validation, POST, success/error messages) is handled
// declaratively by the Formspree AJAX library — see the data-fs-* attributes
// on the form in index.html and the init call near the closing </body> tag.
// This just keeps the button's label in sync with the library's disabled state.
const submitBtn = document.getElementById('formSubmit');
if (submitBtn) {
  const defaultLabel = submitBtn.textContent;
  new MutationObserver(() => {
    submitBtn.textContent = submitBtn.disabled ? 'Sūta...' : defaultLabel;
  }).observe(submitBtn, { attributes: true, attributeFilter: ['disabled'] });
}
