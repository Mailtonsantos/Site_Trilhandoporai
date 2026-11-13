// Links antigos de Início devem abrir o topo, antes da rolagem até a âncora.
(() => {
  if (window.location.hash !== '#sec-9cc6') return;
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  const showTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  window.addEventListener('load', showTop, { once: true });
  window.addEventListener('pageshow', showTop, { once: true });
})();
