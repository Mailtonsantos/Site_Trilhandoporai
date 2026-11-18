(() => {
  const dialog = document.getElementById('nossa-historia');
  const trigger = document.querySelector('[data-open-history]');
  if (!dialog || !trigger) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('history-open');
  });
  dialog.querySelector('.history-close').addEventListener('click', () => dialog.close());
  let startedOutside = false;
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', event => { startedOutside = outside(event); });
  dialog.addEventListener('click', event => {
    if (startedOutside && outside(event)) dialog.close();
    startedOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('history-open');
    trigger.focus({ preventScroll: true });
  });
})();
