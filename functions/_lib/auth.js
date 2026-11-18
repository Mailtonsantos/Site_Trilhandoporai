import {json} from './core.js';
const allowedEmail='trilhandoporai.of@gmail.com';
const cache=new Map();
const bytes=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
const decode=s=>JSON.parse(new TextDecoder().decode(bytes(s)));
export async function authorize(request,env){
 const issuer=(env.ACCESS_ISSUER||'').replace(/\/$/,'');const audience=env.ACCESS_AUD;
 if(!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer)||!audience)return json({error:'A proteção de acesso ainda precisa ser configurada no Cloudflare.'},503);
 try{
  const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token)throw 0;
  const parts=token.split('.');if(parts.length!==3)throw 0;
  const header=decode(parts[0]),claims=decode(parts[1]),now=Date.now()/1000;
  if(header.alg!=='RS256'||claims.iss!==issuer||!Number.isFinite(claims.exp)||claims.exp<=now||claims.nbf>now||!(Array.isArray(claims.aud)?claims.aud:[claims.aud]).includes(audience)||claims.email?.toLowerCase()!==allowedEmail)throw 0;
  let entry=cache.get(issuer);
  if(!entry||entry.expires<Date.now()||!entry.keys.some(k=>k.kid===header.kid)){
   const res=await fetch(issuer+'/cdn-cgi/access/certs');if(!res.ok)throw 0;
   const body=await res.json();entry={keys:body.keys||[],expires:Date.now()+300000};cache.set(issuer,entry);
  }
  const jwk=entry.keys.find(k=>k.kid===header.kid&&k.kty==='RSA');if(!jwk)throw 0;
  const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
  if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,bytes(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1])))throw 0;
  return null;
 }catch{return json({error:'Acesso restrito. Entre com o e-mail autorizado pelo Cloudflare Access.'},403);}
}
export function sameOrigin(request){return request.headers.get('Origin')===new URL(request.url).origin;}
