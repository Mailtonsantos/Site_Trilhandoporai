import {json,database,stats} from '../_lib/core.js';
export async function onRequestGet({env}){
 try{const result=await stats(database(env));return json({total:result.total});}catch{return json({error:'Contador ainda não ativado.'},503);}
}
export async function onRequestPost({request,env}){
 if(request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'Origem inválida.'},403);
 try{
  if(Number(request.headers.get('Content-Length')||0)>2048)return json({error:'Dados excedem o limite.'},413);
  const body=await request.text();if(body.length>2048)return json({error:'Dados excedem o limite.'},413);
  const {path}=JSON.parse(body);
  if(typeof path!=='string'||path.length>250||!/^\/(?:[a-zA-Z0-9_.%À-ÿ -]+\/)*[a-zA-Z0-9_.%À-ÿ -]*$/.test(path)||path.startsWith('/painel')||path.startsWith('/api/'))return json({error:'Página inválida.'},400);
  const db=database(env);
  await db.prepare("INSERT INTO page_views(day,path,views) VALUES(date('now'),?,1) ON CONFLICT(day,path) DO UPDATE SET views=views+1").bind(path).run();
  const row=await db.prepare('SELECT SUM(views) AS total FROM page_views').first();return json({total:row.total});
 }catch{return json({error:'Não foi possível registrar a visualização.'},503);}
}
