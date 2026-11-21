// BLOCO LINKS PUBLICADOS — preservar o HTML se a API estiver indisponível.
(() => {
 const group=document.querySelector('.links-list');
 if(!group)return;
 const icons={};
 ['youtube','site','instagram','facebook','whatsapp'].forEach((name,index)=>{
  const svg=group.querySelectorAll('a svg')[index];if(svg)icons[name]=svg.cloneNode(true);
 });
 icons.link=icons.site;
 window.renderLinksPage=function(config){
  if(!config||!Array.isArray(config.cards))return;
  const number=(v,min,max)=>Number.isInteger(v)&&v>=min&&v<=max;
  if(!number(config.buttonWidth,240,560)||!number(config.buttonHeight,56,160)||!number(config.mobilePosition,0,100)||!number(config.mobileDarkness,0,90))return;
  const safeURL=value=>{
   if(typeof value!=='string')throw new Error('Endereço inválido');
   if(value.startsWith('/')&&!value.startsWith('//')&&!/[\\\s]/.test(value))return new URL(value,location.origin).href;
   const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)throw new Error('Endereço inválido');return u.href;
  };
  try {
   const background=config.mobileBackground?safeURL(config.mobileBackground):null;
   const cards=config.cards.filter(c=>c.visible).map(item=>{
    const a=document.createElement('a');a.className='links-card'+(item.highlight?' links-card-primary':'');a.href=safeURL(item.url);
    if(item.newTab){a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',item.title+' (abre em nova aba)');}
    const icon=(icons[item.icon]||icons.link)?.cloneNode(true);if(icon)a.append(icon);
    const text=document.createElement('span'),title=document.createElement('strong');title.textContent=item.title;text.append(title);
    if(item.subtitle){const subtitle=document.createElement('span');subtitle.textContent=item.subtitle;text.append(subtitle);}a.append(text);return a;
   });
   const style=document.documentElement.style;
   style.setProperty('--links-width',config.buttonWidth+'px');
   style.setProperty('--links-height',config.buttonHeight+'px');
   style.setProperty('--links-mobile-position',config.mobilePosition+'%');
   style.setProperty('--links-mobile-darkness',config.mobileDarkness/100);
   style.setProperty('--links-mobile-darkness-bottom',Math.min(.98,config.mobileDarkness/100+.16));
   if(background)style.setProperty('--links-mobile-background','url('+JSON.stringify(background)+')');else style.removeProperty('--links-mobile-background');
   group.replaceChildren(...cards);
  } catch { /* Configuração inválida: conservar a página atual. */ }
 };
})();
