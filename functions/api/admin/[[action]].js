import {authorize,sameOrigin} from '../../_lib/auth.js';
import {json,database,state,validate,stats} from '../../_lib/core.js';
export async function onRequest({request,env,params}){
 const denied=await authorize(request,env);if(denied)return denied;
 const action=(Array.isArray(params.action)?params.action.join('/'):params.action)||'';
 try{
  const db=database(env);
  if(request.method==='GET'&&action==='settings')return json({draft:await state(db,'draft'),published:await state(db,'published'),stats:await stats(db)});
  if(request.method!=='POST')return json({error:'Rota inválida.'},404);
  if(!sameOrigin(request))return json({error:'Origem inválida.'},403);
  if(Number(request.headers.get('Content-Length')||0)>50000)return json({error:'Conteúdo muito extenso.'},413);
  const raw=await request.text();if(raw.length>50000)return json({error:'Conteúdo muito extenso.'},413);
  const body=JSON.parse(raw);
  if(!Number.isInteger(body.revision)||body.revision<0)return json({error:'Recarregue as configurações.'},400);
  if(action==='settings'){
   const config=validate(body.config);
   const result=await db.prepare("UPDATE site_state SET value=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE id='draft' AND revision=?").bind(JSON.stringify(config),body.revision).run();
   if(!result.meta.changes)return json({error:'O rascunho mudou em outra janela. Recarregue antes de salvar.'},409);
   return json({draft:await state(db,'draft')});
  }
  if(action==='publish'){
   const result=await db.prepare("UPDATE site_state SET value=(SELECT value FROM site_state WHERE id='draft'),revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE id='published' AND EXISTS(SELECT 1 FROM site_state WHERE id='draft' AND revision=?)").bind(body.revision).run();
   if(!result.meta.changes)return json({error:'O rascunho mudou. Recarregue antes de publicar.'},409);
   return json({published:await state(db,'published')});
  }
  return json({error:'Rota inválida.'},404);
 }catch(e){return json({error:e.message==='Configuração inválida.'||e.message?.startsWith('Confira')||e.message?.startsWith('Informe')||e.message?.startsWith('Use um')?e.message:'Não foi possível concluir. Confira a configuração do banco de dados.'},400);}
}
