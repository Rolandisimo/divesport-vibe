// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openNav() {
    navLinks.classList.add('open');
    navToggle.classList.add('active');
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });
  backdrop.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeNav);
  });
}

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

// ============ Lightbox: click any gallery/destination photo to view full-size ============
(function initLightbox() {
  const items = document.querySelectorAll('.gallery__item, .dest-card');
  if (!items.length) return;

  const isRussian = document.documentElement.lang === 'ru';
  const fallbackAlt = isRussian ? 'Фотография' : 'Fotogrāfija';
  const closeLabel = isRussian ? 'Закрыть' : 'Aizvērt';

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="${closeLabel}">✕</button>
    <div class="lightbox__frame">
      <img class="lightbox__img" alt="">
    </div>
    <p class="lightbox__caption"></p>
  `;
  document.body.appendChild(overlay);
  const img = overlay.querySelector('.lightbox__img');
  const caption = overlay.querySelector('.lightbox__caption');
  const closeBtn = overlay.querySelector('.lightbox__close');

  function extractUrl(el) {
    const bg = getComputedStyle(el).backgroundImage;
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  }

  function open(el) {
    const url = extractUrl(el);
    if (!url) return;
    const label = el.querySelector('span')?.textContent?.trim() || '';
    img.src = url;
    img.alt = label || fallbackAlt;
    caption.textContent = label;
    overlay.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-open');
  }

  items.forEach(el => {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    if (!el.hasAttribute('aria-label')) {
      const label = el.querySelector('span')?.textContent?.trim();
      el.setAttribute('aria-label', label ? `${fallbackAlt}: ${label}` : fallbackAlt);
    }
    el.addEventListener('click', () => open(el));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(el);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();

// ============ Hero gauge: gentle ambient tick, purely decorative ============
if (heroGauge) {
  let base = 12.4;
  setInterval(() => {
    base += (Math.random() - 0.5) * 0.6;
    base = Math.max(2, Math.min(38, base));
    heroGauge.textContent = base.toFixed(1).padStart(5, '0');
  }, 1400);
}

// ============ Prefill contact form from a course booking link ============
// Course cards link here as e.g. kontakti.html?course=PADI%20Open%20Water%20Diver&price=400%E2%82%AC
// so the visitor lands with the category and message already filled in.
(function prefillFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const course = params.get('course');
  if (!course) return;

  const isRussian = document.documentElement.lang === 'ru';
  const price = params.get('price');
  const priceText = price ? ` (${price})` : '';

  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    const targetLabel = isRussian ? 'Обучение' : 'Apmācība';
    for (const opt of categorySelect.options) {
      if (opt.textContent.trim() === targetLabel) {
        categorySelect.value = opt.value;
        break;
      }
    }
  }

  const messageField = document.getElementById('message');
  if (messageField && !messageField.value) {
    messageField.value = isRussian
      ? `Здравствуйте! Меня интересует курс: ${course}${priceText}. Пожалуйста, свяжитесь со мной, чтобы обсудить доступные даты.`
      : `Sveiki! Mani interesē kurss: ${course}${priceText}. Lūdzu, sazinieties ar mani, lai pārrunātu pieejamos datumus.`;
  }

  document.getElementById('name')?.focus();
})();

// ============ Contact form ============
// Submits to Web3Forms (https://web3forms.com) — a free form-to-email API,
// so messages land in the club's inbox with no server of our own to run.
//
// SETUP (2 minutes):
//   1. Go to https://web3forms.com and enter the destination email address.
//   2. Web3Forms emails you an Access Key (a UUID) — no account/login needed.
//   3. In index.html, find the hidden input named "access_key" inside
//      <form id="contactForm"> and paste the key in as its value, replacing
//      "YOUR_ACCESS_KEY_HERE".
//   4. Confirm the verification email Web3Forms sends the first time — after
//      that, submissions arrive normally.
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmit');
const successBox = document.getElementById('formSuccess');
const errorBox = document.getElementById('formError');
const defaultLabel = submitBtn?.textContent;

function showBanner(box, message) {
  successBox.textContent = '';
  errorBox.textContent = '';
  if (box) box.textContent = message;
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: if this hidden checkbox got checked (bots tend to fill/check
  // every field), silently drop the submission instead of sending it.
  if (form.botcheck?.checked) {
    form.reset();
    return;
  }

  const accessKey = form.access_key?.value || '';
  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
    showBanner(errorBox, 'Forma vēl nav pievienota Web3Forms — pievieno savu access_key vērtību index.html failā.');
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  // Web3Forms uses a field named "subject" for the email subject line;
  // build a clearer one from the category dropdown instead of sending it raw.
  data.subject = `Divesport — ${data.category || 'Jautājums'} — ${data.name}`;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sūta...';
  showBanner(null, '');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => null);

    if (response.ok && result?.success) {
      showBanner(successBox, 'Paldies! Ziņa nosūtīta — atbildēsim tuvākajā laikā.');
      form.reset();
    } else {
      showBanner(errorBox, result?.message || 'Neizdevās nosūtīt. Pamēģini vēlreiz vai raksti tieši uz e-pastu.');
    }
  } catch (err) {
    showBanner(errorBox, 'Nav interneta savienojuma vai serveris nav sasniedzams. Pamēģini vēlreiz.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = defaultLabel;
  }
});
