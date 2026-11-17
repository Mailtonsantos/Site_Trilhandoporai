// Desativar entradas demoradas no celular antes da inicialização do modelo.
(() => {
  if (!window.matchMedia('(max-width: 767px)').matches) return;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animation-name]').forEach(element => {
      element.classList.add('mobile-instant');
      ['data-animation-name', 'data-animation-duration', 'data-animation-delay', 'data-animation-direction'].forEach(name => element.removeAttribute(name));
      element.classList.remove('u-invisible');
    });
  }, { once: true });
})();
