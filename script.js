/* ─── NAVIGATION ─── */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── ROLE TICKER ─── */
const roles = document.querySelectorAll('.role-item');
let currentRole = 0;

function rotateRole() {
  roles[currentRole].classList.remove('active');
  currentRole = (currentRole + 1) % roles.length;
  roles[currentRole].classList.add('active');
}

setInterval(rotateRole, 2800);

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal, .reveal-right'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── FEATURE BAR ANIMATION ─── */
const bars = document.querySelectorAll('.fv-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

/* ─── STEP HOVER HIGHLIGHT ─── */
const steps = document.querySelectorAll('.step');
steps.forEach(step => {
  step.addEventListener('mouseenter', () => {
    steps.forEach(s => s.querySelector('.step-number').style.color = '#e0deda');
    step.querySelector('.step-number').style.color = '#1a6bff';
  });
  step.addEventListener('mouseleave', () => {
    steps.forEach(s => s.querySelector('.step-number').style.color = '');
  });
});

/* ─── PARALLAX HERO BG (subtle) ─── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

/* ─── ACTIVE NAV LINK on SCROLL ─── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#0a0a0a';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));