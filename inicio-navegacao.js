// A página inicial começa no primeiro bloco em cada abertura ou recarregamento.
(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // Remover a âncora inicial antes de o navegador tentar rolar até ela.
  if (window.location.hash) {
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  }
  const showTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  window.addEventListener('load', showTop, { once: true });
  window.addEventListener('pageshow', () => {
    showTop();
    window.requestAnimationFrame(showTop);
  });
})();
