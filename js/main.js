/* =========================================================
   CONFIGURAÇÃO — edite aqui seus dados de contato
   ========================================================= */
const CONFIG = {
  // Número com DDI + DDD, só dígitos. Ex.: 5511999998888
  whatsapp: '5518996430853',
  mensagem: 'Olá! Vim pelo site da CMDevSolutions e gostaria de solicitar um orçamento.',
  instagram: 'cmdevsolutions',            // usuário, sem @
  email: 'contato@cmdevsolutions.com.br',
  cnpj: '',                               // ex.: '00.000.000/0001-00' (vazio = oculto)
};

/* ---------- Links de contato ---------- */
const waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;

document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  a.href = waUrl;
  a.target = '_blank';
  a.rel = 'noopener';
});
document.querySelectorAll('[data-instagram]').forEach((a) => {
  a.href = `https://instagram.com/${CONFIG.instagram}`;
});
document.querySelectorAll('[data-email]').forEach((a) => {
  a.href = `mailto:${CONFIG.email}`;
});
if (CONFIG.cnpj) {
  document.querySelector('[data-cnpj]').textContent = CONFIG.cnpj;
  document.querySelector('[data-cnpj-wrap]').hidden = false;
}
document.getElementById('ano').textContent = new Date().getFullYear();

/* ---------- Tema claro / escuro ---------- */
const root = document.documentElement;
const isDark = () =>
  root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('cm-theme', next); } catch (e) {}
});

/* ---------- Menu mobile ---------- */
const menuBtn = document.getElementById('menu-toggle');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('#menu a').forEach((a) =>
  a.addEventListener('click', () => {
    header.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

/* ---------- Sombra do header ao rolar ---------- */
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Botão flutuante do WhatsApp ---------- */
// Esconde o botão enquanto o CTA do topo ou a chamada final estão visíveis,
// para não duplicar o mesmo botão na tela.
const waFloat = document.querySelector('.wa-float');
const waTargets = document.querySelectorAll('.hero__actions, #contato');
if (waFloat && waTargets.length && 'IntersectionObserver' in window) {
  const visible = new Set();
  const waIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    waFloat.classList.toggle('is-hidden', visible.size > 0);
  });
  waTargets.forEach((el) => waIo.observe(el));
}

/* ---------- Animação de entrada ---------- */
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}
