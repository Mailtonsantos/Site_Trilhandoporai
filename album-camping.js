(() => {
  'use strict';
  const initialize = () => {
    const gallery = document.querySelector('#sec-6f9d .u-gallery');
    if (!gallery || gallery.dataset.albumReady) return;
    gallery.dataset.albumReady = 'true';
    gallery.classList.remove('u-lightbox');
    const photos = Array.from(gallery.querySelectorAll('img')).map(img => ({
      src: img.dataset.albumSrc || img.currentSrc || img.src,
      alt: img.alt || 'Foto do álbum de acampamentos'
    }));
    if (!photos.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'tpa-album';
    dialog.setAttribute('aria-label', 'Álbum de acampamentos');
    const icons = {
      previous: '<path d="M12 6 3 12l9 6V6Zm9 0-9 6 9 6V6Z"/>',
      next: '<path d="m3 6 9 6-9 6V6Zm9 0 9 6-9 6V6Z"/>',
      pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
      play: '<path d="M7 4v16l14-8L7 4Z"/>'
    };
    const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
    dialog.innerHTML = '<div class="tpa-album-panel"><button type="button" class="tpa-album-close" aria-label="Fechar álbum">×</button><figure><img class="tpa-album-photo" alt=""><figcaption aria-live="polite" aria-atomic="true"></figcaption></figure><div class="tpa-album-controls"><button type="button" data-action="previous">Anterior</button><button type="button" data-action="pause">Pausar</button><button type="button" data-action="next">Próximo</button></div></div>';
    document.body.append(dialog);
    [['previous', 'Foto anterior'], ['pause', 'Pausar sequência automática'], ['next', 'Próxima foto']].forEach(([action, label]) => {
      const button = dialog.querySelector(`[data-action="${action}"]`);
      button.innerHTML = icon(action);
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    const photo = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    const pause = dialog.querySelector('[data-action="pause"]');
    let index = 0, timer = null, playing = false, trigger = null;
    const stopTimer = () => { clearTimeout(timer); timer = null; };
    const schedule = () => {
      stopTimer();
      if (playing && dialog.open && !document.hidden && photo.complete) {
        timer = setTimeout(() => { show(index + 1); }, 3000);
      }
    };
    const show = value => {
      stopTimer();
      index = (value + photos.length) % photos.length;
      photo.alt = photos[index].alt;
      photo.src = photos[index].src;
      caption.textContent = `Foto ${index + 1} de ${photos.length}`;
      schedule();
      // Warm the next photo without waiting for it to display.
      const preload = new Image();
      preload.src = photos[(index + 1) % photos.length].src;
    };
    const setPlaying = value => {
      playing = value;
      pause.innerHTML = icon(playing ? 'pause' : 'play');
      pause.setAttribute('aria-label', playing ? 'Pausar sequência automática' : 'Reproduzir sequência a cada 3 segundos');
      pause.title = playing ? 'Pausar' : 'Reproduzir';
      schedule();
    };
    photo.addEventListener('load', schedule);
    photo.addEventListener('error', () => {
      caption.textContent = `Foto ${index + 1} de ${photos.length} — não foi possível carregar a imagem`;
      schedule();
    });
    const open = (value, element) => {
      trigger = element;
      dialog.showModal();
      document.documentElement.classList.add('tpa-album-open');
      show(value);
      setPlaying(true);
      dialog.querySelector('.tpa-album-close').focus();
    };
    gallery.querySelectorAll('.u-gallery-item').forEach((item, i) => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Ampliar foto ${i + 1} de ${photos.length}`);
      item.setAttribute('aria-haspopup', 'dialog');
      // Capture prevents Nicepage from opening a second lightbox.
      item.addEventListener('click', event => { event.preventDefault(); event.stopImmediatePropagation(); open(i, item); }, true);
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); event.stopPropagation(); open(i, item);
        }
      });
    });
    dialog.querySelector('.tpa-album-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-action="previous"]').addEventListener('click', () => show(index - 1));
    dialog.querySelector('[data-action="next"]').addEventListener('click', () => show(index + 1));
    pause.addEventListener('click', () => setPlaying(!playing));
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener('close', () => {
      stopTimer(); playing = false;
      document.documentElement.classList.remove('tpa-album-open');
      trigger?.focus();
    });
    document.addEventListener('visibilitychange', schedule);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
