import {json,state,database} from '../_lib/core.js';
export async function onRequestGet({env}){
 try{const published=await state(database(env),'published');return json({config:published.config,revision:published.revision});}
 catch{return json({error:'Configurações ainda não ativadas.'},503);}
}
