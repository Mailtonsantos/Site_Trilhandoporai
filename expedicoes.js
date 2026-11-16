(() => {
  const cards = document.querySelectorAll('.expeditions-preview .u-list-item');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (window.matchMedia('(max-width: 767px)').matches || !cards.length || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('expedition-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  cards.forEach((card, index) => {
    card.style.setProperty('--expedition-delay', `${index * 160}ms`);
    card.classList.add('expedition-enter');
    observer.observe(card);
  });
})();
