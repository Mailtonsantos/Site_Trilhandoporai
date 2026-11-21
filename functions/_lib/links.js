// BLOCO LINKS — valores iniciais somente para configurações antigas sem esta seção.
export const linksDefaults = {
  "buttonWidth": 340,
  "buttonHeight": 70,
  "mobileBackground": "",
  "mobilePosition": 50,
  "mobileDarkness": 72,
  "cards": [
    {
      "title": "Nosso canal no YouTube",
      "subtitle": "Conheça o canal oficial",
      "url": "https://www.youtube.com/@TrilhandoPorAi-Oficial",
      "icon": "youtube",
      "visible": true,
      "highlight": true,
      "newTab": false
    },
    {
      "title": "Explore nosso site",
      "subtitle": "Expedições, fotos e nossa história",
      "url": "https://trilhandoporai.com",
      "icon": "site",
      "visible": true,
      "highlight": false,
      "newTab": false
    },
    {
      "title": "Instagram",
      "subtitle": "Fotos, trilhas e momentos da aventura",
      "url": "https://www.instagram.com/trilhandoporai.of/",
      "icon": "instagram",
      "visible": true,
      "highlight": false,
      "newTab": true
    },
    {
      "title": "Facebook",
      "subtitle": "Acompanhe nossas novidades",
      "url": "https://www.facebook.com/people/T%CA%80%C9%AA%CA%9F%CA%9C%E1%B4%80%C9%B4%E1%B4%85%E1%B4%8F-P%E1%B4%8F%CA%80-A%C9%AA%CC%81/61596188714932/",
      "icon": "facebook",
      "visible": true,
      "highlight": false,
      "newTab": true
    },
    {
      "title": "WhatsApp",
      "subtitle": "Fale com a gente sobre as expedições",
      "url": "https://wa.me/5583988813958?text=Ol%C3%A1%21%20Vim%20pelo%20site%20https%3A%2F%2Ftrilhandoporai.com%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20aventuras%20e%20expedi%C3%A7%C3%B5es.",
      "icon": "whatsapp",
      "visible": true,
      "highlight": false,
      "newTab": true
    }
  ]
};

export function validateLinks(value) {
 if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Confira a configuração de Links.');
 const number=(key,min,max)=>{const n=value[key];if(!Number.isInteger(n)||n<min||n>max)throw new Error('Confira '+key+' em Links ('+min+' a '+max+').');return n;};
 const address=(v,optional=false)=>{
  if(optional&&v==='')return '';
  if(typeof v!=='string'||v.length>2000)throw new Error('Confira o endereço em Links.');
  if(/^\/(?!\/)/.test(v)&&!/[\\\s]/.test(v))return v;
  try{const u=new URL(v);if(u.protocol==='https:'&&!u.username&&!u.password)return u.href;}catch{}
  throw new Error('Use um endereço HTTPS ou um caminho do site em Links.');
 };
 const text=(v,max,required=false)=>{if(typeof v!=='string'||v.length>max||(required&&!v.trim()))throw new Error('Confira os textos dos quadros de Links.');return v.trim();};
 if(!Array.isArray(value.cards)||value.cards.length>30)throw new Error('Confira os quadros de Links (máximo de 30).');
 return {
  buttonWidth:number('buttonWidth',240,560),buttonHeight:number('buttonHeight',56,160),
  mobileBackground:address(value.mobileBackground,true),mobilePosition:number('mobilePosition',0,100),mobileDarkness:number('mobileDarkness',0,90),
  cards:value.cards.map(c=>{
   if(!c||!['youtube','site','instagram','facebook','whatsapp','link'].includes(c.icon))throw new Error('Confira o ícone do quadro de Links.');
   for(const key of ['visible','highlight','newTab'])if(typeof c[key]!=='boolean')throw new Error('Confira as opções do quadro de Links.');
   return {title:text(c.title,120,true),subtitle:text(c.subtitle,180),url:address(c.url),icon:c.icon,visible:c.visible,highlight:c.highlight,newTab:c.newTab};
  })
 };
}
