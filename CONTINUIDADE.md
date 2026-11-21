# Continuidade e transferência de computador

Atualizado em 20/11/2026. Documentação única de site, /links e painel, consolidada a partir dos arquivos locais, Git e registros dos chats “Site - Trilhando por aí (GitHub)” e “Site - Links - Trilhando por aí (GitHub)”. O desenvolvimento passa a ser centralizado no primeiro chat.

## Estado atual

- Site publicado: https://trilhandoporai.com.
- GitHub: https://github.com/Mailtonsantos/Site_Trilhandoporai.git, branch `main`.
- Versão atual de código: `ea5b4b0ba91265aa531958ef8b4f3fdb5e4762e7` (`ea5b4b0`) — controles de Links e fundo móvel no painel. Em 20/11/2026, HEAD, origin/main e a branch main consultada diretamente no GitHub coincidem nesse commit.
- Última publicação verificada: `ea5b4b0`, conforme conferência de produção registrada no chat de Links em 20/11/2026. A consolidação atual conferiu o Git; não realizou nova inspeção do site ou do painel em produção.
- `/links`: https://trilhandoporai.com/links, publicada inicialmente em `dc8819d`. `ab956bf` é a versão histórica que introduziu painel e contador, não a versão atual.
- Em 18/11, o proprietário confirmou acesso normal ao painel e funcionamento do contador público. O FormSubmit também foi ativado e teve entrega de e-mail confirmada anteriormente.
- Documentação iniciada localmente em 19/11 e consolidada em 20/11. Publicação desta consolidação autorizada pelo proprietário em 20/11/2026; o resultado do envio e do deploy deve ser conferido no GitHub e Cloudflare. A versão de código funcional continua sendo ea5b4b0; o commit documental posterior não altera o funcionamento do site.

## Links e painel — estado publicado

- A seção Links já foi publicada em `ea5b4b0`: largura máxima de 240–560 px e altura mínima de 56–160 px dos botões; a altura cresce quando o texto precisa de espaço.
- Gerenciamento de até 30 quadros: adicionar, remover, reordenar, editar título, subtítulo, endereço, ícone, destaque, visibilidade e abertura em nova aba.
- Fundo móvel até 760 px: imagem por caminho/HTTPS, enquadramento horizontal e escurecimento, preservando o fundo do computador.
- Logomarca compartilhada com Identidade e páginas, sem campo duplicado. Salvar rascunho não altera o público; Revisar e publicar grava os parâmetros no D1.
- Compatibilidade com configurações antigas sem reinstalar ou migrar o D1; não executar schema.sql para ativar Links. Valores iniciais de 340 px de largura e 70 px de altura mínima não substituem os valores atuais publicados no banco.
- A conferência anterior em produção confirmou aplicação dos parâmetros em /links e contador funcionando. O painel permaneceu protegido pelo Cloudflare Access; sua interface privada não foi inspecionada em produção naquela sessão, mas o fluxo foi testado localmente.
- Arquivos principais: links.html, links.css, links-painel.js, configuracoes-site.js, functions/_lib/links.js, functions/_lib/core.js, functions/_lib/panel.js e functions/api/admin/[[action]].js.

## Pasta oficial

`C:\App\Site\Trilhando por Aí\Site_Trilhandoporai`

Somente essa pasta é a cópia de trabalho. O antigo repositório em `C:\Users\mailton.santos\Desktop\Mailton\HTML\Trilhando por Aí\Site_Trilhandoporai` foi comparado com a nova cópia e enviado à Lixeira. A pasta pai com arquivos originais e o projeto modelo não são a cópia de trabalho atual.

## O que copiar

Copiar a pasta Site_Trilhandoporai inteira, incluindo `.git`, todos os arquivos ocultos, `functions`, `configuracao`, `images`, `fonts`, `files`, `blog` e `products`. README.md, CONTINUIDADE.md e HISTORICO-AJUSTES.md devem acompanhar a cópia. Não há necessidade de copiar a pasta de trabalho temporária do chat.

O projeto não depende do nome do perfil de usuário. É recomendável manter o mesmo caminho C:\App no outro computador, mas outro caminho também funciona. Informar o caminho correto ao retomar as edições.

## O que permanece na nuvem

Trocar de computador NÃO move o site nem exige recriar os serviços:

- Cloudflare Pages: projeto `site-trilhandoporai`; publicação automática da branch main.
- D1: banco `trilhando-configuracoes`, associado como `SITE_DB`.
- D1 armazena o rascunho, configurações publicadas e contagem de visualizações. Esses dados NÃO são incluídos na cópia da pasta nem em um clone Git.
- Cloudflare Access: aplicativo Painel Trilhando por Aí, permitindo o e-mail `trilhandoporai.of@gmail.com`, com login One-time PIN.
- Caminhos protegidos: `/painel`, `/painel/*`, `/api/admin/*`.
- `ACCESS_ISSUER`: `https://little-recipe-72bd.cloudflareaccess.com`.
- `ACCESS_AUD`: configurado nas variáveis do Pages. A referência é a Tag de AUD do aplicativo existente. Não criar um aplicativo novo sem atualizar esse valor.
- FormSubmit: destino `trilhandoporai.of@gmail.com`, já ativado.

Para trabalhar de casa no MESMO site, não é necessário exportar/reimportar o D1. Exportar o banco é uma providência de backup ou migração de infraestrutura, não um requisito da mudança de computador.

## No outro computador

1. Instalar Git, se necessário, e copiar a pasta completa.
2. Abrir a pasta oficial do projeto na ferramenta de edição.
3. Conferir `git status`, `git remote -v` e `git log -1 --oneline` antes de editar.
4. Se houver alterações locais, preservá-las antes de atualizar a cópia pelo GitHub. Não usar reset destrutivo nem sobrescrever arquivos para sincronizar.
5. Autenticar no GitHub quando necessário para enviar alterações. A pasta `.git` preserva histórico e destino, mas não garante que as credenciais do computador anterior sejam transferidas.
6. Para administração: entrar no painel com o e-mail autorizado e o código recebido. Não compartilhar códigos de login.

## Dois fluxos distintos

### Alterações no código

Editar arquivos → conferir computador/celular → registrar commit → enviar ao GitHub quando autorizado → aguardar Cloudflare → verificar no domínio público.

Salvar arquivos NÃO publica o site. Não executar push forçado. Documentar mudanças manuais relevantes feitas fora do painel. Após editar em um computador, enviar ou copiar a versão atual antes de continuar no outro; evitar duas cópias editadas simultaneamente.

### Alterações no painel

Editar campos → Salvar rascunho → Revisar e publicar. O rascunho não deve afetar o site. Publicar configurações modifica o D1 e NÃO gera commit no GitHub. As próximas aberturas das páginas recebem os valores publicados.

`functions/_lib/defaults.js` e `configuracao/schema.sql` são valores iniciais, não um backup atualizado do D1. Não sobrescrever configurações atuais com esses arquivos. A instalação SQL usa INSERT OR IGNORE para preservar registros existentes.

## Visualização e verificação

- Abrir index.html diretamente permite conferir o HTML local; a integração de configurações e contador é ignorada em file://.
- Para testar Functions e D1 localmente, usar Cloudflare Wrangler com bindings de desenvolvimento. Não copiar credenciais de produção para arquivos públicos.
- Sem banco/proteção configurados, o painel deve recusar acesso e o site conserva o HTML original. Não criar bypass de autenticação para facilitar testes.
- Os testes automatizados usados na conversa foram executados em arquivos temporários do computador anterior. Eles não constituem uma suíte instalada no repositório. A compilação das Functions e os fluxos principais foram verificados antes da publicação.

## Conferência após futuras publicações

- Página inicial abre no topo e o menu não cobre o título.
- No celular: imagens em duas colunas, palavras inteiras, botões proporcionais e conteúdo sem atraso de entrada.
- Nossa história: abrir, rolar, fechar pelo X, clique externo e Esc.
- Redes sociais/WhatsApp: endereços e número corretos; não enviar mensagens de teste sem necessidade.
- Contato: assunto identificado e confirmação; troca de e-mail requer ativação do novo destino no FormSubmit.
- Painel: login correto, rascunho separado, revisão e publicação.
- /links: quadros e destinos, dimensões responsivas, fundo móvel, logomarca compartilhada e aplicação das configurações publicadas.
- Contador no rodapé: visualizações reais, incluindo recarregamentos; não é número de pessoas únicas.

## Preferências e pendências

- Trabalhar por etapas, com linguagem simples e preservando ajustes manuais.
- Alterações de celular devem preservar desktop, exceto quando o pedido incluir ambos.
- Avisar claramente quando uma mudança está apenas local. Publicar após solicitação do proprietário.
- WhatsApp atual é provisório: +55 83 98881-3958. Substituir pelo oficial quando informado.
- História completa ainda será fornecida; existe texto provisório na janela. Se já tiver sido preenchida pelo painel, consultar o D1/painel antes de editar o HTML.
- Créditos Freepik foram retirados dos blocos; falta reuni-los em Nossa equipe. Referências preservadas em configuracao/CREDITOS-PENDENTES.md.
- Novos cartões de expedições podem ser adicionados pelo painel; a página HTML de detalhes não é criada automaticamente.
- Logomarca por caminho/URL: ainda não existe upload de arquivo pelo painel.
- Banner da Patagônia informa 15 dias, enquanto o subtítulo inicial informa 16 dias. Essa divergência foi comunicada; confirmar a duração antes de uniformizar as peças.
