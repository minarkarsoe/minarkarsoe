// ===== TYPED TEXT =====
const phrases = [
  'Senior .NET Backend Engineer',
  'AWS Serverless Architect',
  'Microservices Specialist',
  'Event-Driven Systems Builder',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(5,8,17,0.95)'
    : 'rgba(5,8,17,0.8)';
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.skill-card, .tl-item, .project-card, .contact-card, .about-grid, .achievement-card, .hero-stats'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});
