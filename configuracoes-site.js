// Usar somente configurações publicadas; manter o HTML original se a API estiver indisponível.
(() => {
 if(location.protocol==='file:'||location.pathname.startsWith('/painel'))return;
 const timeout=AbortSignal.timeout(5000);
 fetch('/api/config',{signal:timeout,cache:'no-store'}).then(r=>{if(!r.ok)throw new Error();return r.json()}).then(({config:c})=>{
  // BLOCO LINKS — somente a configuração publicada da página dedicada.
  if(document.querySelector('.links-page')&&typeof window.renderLinksPage==='function')window.renderLinksPage(c.linksPage);
  let path;try{path=decodeURIComponent(location.pathname)}catch{path=location.pathname}
  if(path.endsWith('/'))path+='index.html';else if(!path.split('/').pop().includes('.'))path+='.html';
  if(c.pageTitles?.[path])document.title=c.pageTitles[path];
  document.querySelectorAll('header .u-logo-image').forEach(img=>{img.src=c.logo;img.alt=c.title});
  const hero=document.querySelector('#sec-9cc6 h1');if(hero)hero.textContent=c.heroTitle;
  document.querySelectorAll('.site-social a').forEach(a=>{
   if(a.href.includes('instagram.com'))a.href=c.instagram;
   else if(a.href.includes('facebook.com'))a.href=c.facebook;
   else if(a.href.includes('wa.me/'))a.href='https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(c.whatsappMessage);
  });
  document.querySelectorAll('.site-social-links').forEach(group=>{
   group.querySelectorAll('[data-extra-social]').forEach(a=>a.remove());
   for(const item of c.extraSocials||[]){const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.dataset.extraSocial='true';a.setAttribute('aria-label',item.name+' do '+c.title+' (abre em nova aba)');a.textContent=item.name+' ↗';group.append(a)}
  });
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(f=>f.action='https://formsubmit.co/'+encodeURIComponent(c.contactEmail));
  const history=document.querySelector('#nossa-historia .history-content');
  if(history){history.replaceChildren();for(const text of c.history.split(/\n\s*\n/)){const p=document.createElement('p');p.textContent=text;history.append(p)}}
  document.querySelectorAll('.expeditions-preview .u-repeater-1').forEach(group=>{
   const template=group.querySelector('.u-list-item');if(!template)return;
   const cards=c.expeditions.filter(e=>e.visible).map(e=>{
    const card=template.cloneNode(true);
    card.classList.remove('expedition-enter','expedition-visible','animated','u-invisible');card.removeAttribute('style');
    card.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    card.querySelector('.expedition-date')?.remove();
    const heading=card.querySelector('h4'),subtitle=card.querySelector('h6'),image=card.querySelector('img');
    if(heading){const anchor=heading.querySelector('a');if(anchor&&e.link)anchor.textContent=e.title;else heading.textContent=e.title;}
    if(subtitle)subtitle.textContent=e.subtitle;
    if(image){image.src=e.image;image.alt=e.title;}
    card.querySelectorAll('a').forEach(a=>{if(e.link)a.href=e.link;else a.replaceWith(...a.childNodes)});
    if(e.startDate){const date=document.createElement('p');date.className='expedition-date';date.textContent='Início: '+new Date(e.startDate+'T00:00:00Z').toLocaleDateString('pt-BR',{timeZone:'UTC'});card.querySelector('.u-container-layout').append(date);}
    return card;
   });
   group.replaceChildren(...cards);
  });
  return fetch('/api/views',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path}),signal:AbortSignal.timeout(5000)}).then(r=>{if(!r.ok)throw new Error();return r.json()}).then(({total})=>{
   const counter=document.querySelector('.site-view-count');if(counter&&c.showCounter&&Number.isFinite(total)){counter.hidden=false;counter.textContent='Visualizações do site: '+total.toLocaleString('pt-BR');}
  });
 }).catch(()=>{});
})();
