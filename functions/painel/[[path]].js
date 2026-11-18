import panel from '../_lib/panel.js';
import { authorize } from '../_lib/auth.js';
export async function onRequest({request,env}) {
 const denied=await authorize(request,env);if(denied)return denied;
 return new Response(panel,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; img-src 'self' https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Referrer-Policy':'same-origin'}});
}
