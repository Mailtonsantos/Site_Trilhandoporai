import { defaults } from './defaults.js';
export const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export function database(env) { if (!env.SITE_DB) throw new Error('Banco de dados ainda não conectado.'); return env.SITE_DB; }
export async function state(db,id) {
 const row=await db.prepare('SELECT value,revision,updated_at FROM site_state WHERE id=?').bind(id).first();
 if (!row) throw new Error('Estrutura do banco ainda não instalada.');
 return {config:JSON.parse(row.value),revision:row.revision,updatedAt:row.updated_at};
}
export function validate(input) {
 if (!input || typeof input!=='object') throw new Error('Configuração inválida.');
 const output={};
 const text=(key,max=500)=>{const v=input[key]; if(typeof v!=='string'||v.length>max)throw new Error('Confira o campo '+key+'.'); return v.trim();};
 output.title=text('title',120); output.heroTitle=text('heroTitle',120);
 if(!output.title||!output.heroTitle)throw new Error('Informe os títulos.');
 output.contactEmail=text('contactEmail',254);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(output.contactEmail))throw new Error('Informe um e-mail válido.');
 output.whatsapp=text('whatsapp',20).replace(/\D/g,'');
 if(!/^\d{10,15}$/.test(output.whatsapp))throw new Error('Informe WhatsApp com país e DDD.');
 output.whatsappMessage=text('whatsappMessage',2000);output.history=text('history',20000);
 const url=(value,image=false)=>{
  if(typeof value!=='string'||value.length>2000)throw new Error('Endereço inválido.');
  if(value.startsWith('/')&&!value.startsWith('//')&&!/[\\\s]/.test(value))return value;
  try{const u=new URL(value);if(u.protocol==='https:'&&!u.username&&!u.password)return u.href;}catch{}
  throw new Error('Use um endereço HTTPS ou um caminho como /images/logo.png.');
 };
 output.logo=url(input.logo,true);output.instagram=url(input.instagram);output.facebook=url(input.facebook);
 output.showCounter=input.showCounter===true;
 output.pageTitles={};
 for(const path of Object.keys(defaults.pageTitles)){
  const value=input.pageTitles?.[path];
  if(typeof value!=='string'||!value.trim()||value.length>160)throw new Error('Confira o título da página '+path+'.');
  output.pageTitles[path]=value.trim();
 }
 const socials=input.extraSocials||[];
 if(!Array.isArray(socials)||socials.length>30)throw new Error('Confira as redes sociais (máximo de 30 adicionais).');
 output.extraSocials=socials.map(item=>{
  if(!item||typeof item.name!=='string'||!item.name.trim()||item.name.length>60)throw new Error('Confira o nome da rede social.');
  const link=url(item.url);if(!link.startsWith('https://'))throw new Error('Use um endereço HTTPS para a rede social.');
  return {name:item.name.trim(),url:link};
 });
 if(!Array.isArray(input.expeditions)||input.expeditions.length>30)throw new Error('Confira as expedições (máximo de 30).');
 output.expeditions=input.expeditions.map(e=>{
  if(!e||typeof e.title!=='string'||!e.title.trim()||e.title.length>120||typeof e.subtitle!=='string'||e.subtitle.length>180)throw new Error('Confira os textos das expedições.');
  const startDate=e.startDate||'';
  if(typeof startDate!=='string'||(startDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(startDate)||new Date(startDate+'T00:00:00Z').toISOString().slice(0,10)!==startDate)))throw new Error('Confira a data da expedição.');
  return {title:e.title.trim(),subtitle:e.subtitle.trim(),image:url(e.image,true),link:e.link?url(e.link):'',visible:e.visible===true,startDate};
 });
 return output;
}
export async function stats(db){
 const total=await db.prepare('SELECT COALESCE(SUM(views),0) AS total FROM page_views').first();
 const today=await db.prepare("SELECT COALESCE(SUM(views),0) AS total FROM page_views WHERE day=date('now')").first();
 const pages=await db.prepare('SELECT path,SUM(views) AS views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 20').all();
 return {total:total.total,today:today.total,pages:pages.results,dayTimezone:'UTC'};
}
