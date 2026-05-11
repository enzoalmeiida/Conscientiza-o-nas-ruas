// Rolagem suave para links do menu e botões
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

// Fade-in ao rolar usando IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Pequena melhoria: ajustar link ativo conforme rolagem
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.menu a');
const setActive = () => {
  let idx = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    if (rect.top > 80) { idx = i; break; }
    idx = i;
  }
  navLinks.forEach(a => a.classList.remove('active'));
  const id = sections[idx]?.id;
  const activeLink = document.querySelector(`.menu a[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');
};
window.addEventListener('scroll', setActive, {passive:true});
setActive();
