// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      history.replaceState(null, '', `#${targetId}`);
    }
  });
});

// IntersectionObserver for animated reveal (fade + slide)
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.hero-animate, .card-animate, .info-card, .stat-card').forEach(el => revealObserver.observe(el));

// Update active nav link based on scroll position
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.menu a'));
const onScroll = () => {
  const offset = window.innerHeight * 0.25;
  let current = sections[0];
  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= offset) current = sec;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Minor: lazy load images (set loading attr)
document.querySelectorAll('img').forEach(img => img.setAttribute('loading','lazy'));

// Hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

