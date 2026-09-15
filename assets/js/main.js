// ===== كتابة متحركة للدور (الصفحة الرئيسية فقط) =====
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = ['تطوير ويب', 'تصميم واجهات', 'تطبيقات جوال', 'استشارات تقنية'];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    if (deleting) {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 50);
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
        return;
      }
      setTimeout(typeRole, 110);
    }
  }
  typeRole();
}

// ===== قائمة الجوال =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu(open) {
  if (!navLinks) return;
  navLinks.classList.toggle('open', open);
  navOverlay && navOverlay.classList.toggle('show', open);
  if (menuToggle) {
    const icon = menuToggle.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }
}

menuToggle && menuToggle.addEventListener('click', () => {
  toggleMenu(!navLinks.classList.contains('open'));
});

navOverlay && navOverlay.addEventListener('click', () => toggleMenu(false));
navLinks && navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// ===== الوضع الليلي/النهاري =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ===== تظليل الرابط النشط عند التمرير (مُخفّف بـ rAF) =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.15)' : 'none';
    }
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ===== زر العودة للأعلى =====
const backToTopBtn = document.getElementById('backToTop');
backToTopBtn && backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== أنيميشن الظهور عند التمرير =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-card')) {
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) bar.style.width = bar.dataset.level;
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== عدّاد الأرقام =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = count + (target >= 100 ? '%' : '+');
      }, 30);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// ===== أزرار مشاركة المقال =====
const shareBtns = document.querySelectorAll('.share-btn[data-url]');
shareBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    const type = btn.dataset.type;
    const title = btn.dataset.title || document.title;
    let shareUrl = '';
    if (type === 'whatsapp') shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    else if (type === 'telegram') shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    else if (type === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    else if (type === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        const icon = btn.querySelector('i');
        const original = icon.className;
        icon.className = 'fa-solid fa-check';
        setTimeout(() => { icon.className = original; }, 2000);
      });
      return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener');
  });
});

// ===== رسالة نجاح إرسال النموذج =====
const params = new URLSearchParams(window.location.search);
if (params.get('sent') === 'true') {
  const formWrap = document.querySelector('.contact-form-wrap');
  if (formWrap) {
    formWrap.innerHTML = '<div style="text-align:center;padding:20px;"><i class="fa-solid fa-circle-check" style="font-size:3rem;color:#22c55e;margin-bottom:16px;"></i><h3 style="margin-bottom:8px;">تم إرسال رسالتك بنجاح!</h3><p style="color:var(--text-muted);">سأعود إليك في أقرب وقت إن شاء الله.</p></div>';
    formWrap.scrollIntoView({ behavior: 'smooth' });
  }
}
