# Histórico consolidado de ajustes

Consolidado inicialmente em 19/11/2026; atualizado em 20/11/2026 para reunir site, /links e painel. Os registros de “somente local” descrevem o estado de cada etapa; as publicações posteriores estão registradas abaixo. Inclui trabalho realizado nesta conversa e os pontos manuais identificados. O Git contém os detalhes exatos de cada versão.

## Publicação e organização

- Arquivos locais copiados para o repositório Site_Trilhandoporai sem sobrescrever os originais; primeiro envio com 158 arquivos.
- GitHub conectado ao Cloudflare Pages; domínio trilhandoporai.com ativado.
- Pasta oficial migrada para C:\App\Site\Trilhando por Aí\Site_Trilhandoporai; antiga cópia do repositório comparada (172 arquivos idênticos na ocasião) e enviada à Lixeira.

## Página inicial e navegação

- Bloco do Monte Roraima extraído da página inicial para Expedicao-Monte-Roraima.html.
- Prévia Nossas Expedições com cartões Roraima/Patagônia adaptada do modelo local.
- Entrada e zoom nos cartões em desktop; cantos reduzidos para 14px nos cartões e 10px nas imagens.
- Comentários identificando os blocos do index.html; preservação dos ajustes manuais do proprietário.
- Links Início corrigidos para index.html, inclusive nas subpastas blog/products.
- Menus, formulários, botões e outros textos traduzidos; trechos de preenchimento identificados como conteúdo em preparação.
- Redes sociais adicionadas à página inicial e Sobre nós; posição no início ajustada conforme preferência do proprietário.
- Menu da página inicial mantido visível na rolagem; bloco inicial ajustado à tela em desktop.
- Abertura/recarregamento da página inicial retorna ao primeiro bloco. Links internos funcionam durante a navegação, mas âncoras do endereço inicial são removidas ao carregar.

Arquivos principais: index.html, index.css (base), inicio-responsivo.css, inicio-navegacao.js, redes-sociais.css.

## Celular

- Galeria Onde já acampamos, cartões de expedições e fotos de Atividades esportivas em duas colunas.
- Fontes, espaços e botão de voltar ao topo reduzidos.
- Botões Nossa história/Contate-nos lado a lado, com larguras equivalentes.
- Ícones das quatro categorias menores e nomes sem partir palavras.
- Foto vertical da barraca/fogueira dimensionada a 100% da largura, mantendo proporção 717:1080 sem corte.
- Remoção dos atrasos de entrada em todas as páginas HTML; desktop mantém as animações.
- Redução do vazio acima do título; textos e ações aproximados do menu.

Arquivos: ajustes-celular.css, conteudo-celular.css, conteudo-celular.js, expedicoes.js.

## Expedições

- Roraima preserva o bloco original e os cartões do diário existentes.
- Patagônia criada com diário em preparação; proprietário acrescentou dois quadros Dia 00 e atualizou datas. As datas são preservadas no HTML atual.
- Centralização das linhas de cartões, inclusive a linha com dois quadros.
- Aviso Página em construção, vídeo e banner fornecidos via Drive incorporados como arquivos locais.
- Link do cartão da Patagônia corrigido para a página própria.

Arquivos: Expedicao-Monte-Roraima.html, Expedicao-Patagonia.html, expedicoes.css, expedicoes.js, patagonia.css, images/patagonia-banner.mp4, images/patagonia-banner.png, images/expedicao-patagonia.jpeg.

## Contato e WhatsApp

- Formulário inicial encaminha a trilhandoporai.of@gmail.com via FormSubmit.
- Assunto: [SITE Trilhando por Aí] Novo contato. Inclui campo Origem.
- Endereço substituído por Assunto; texto do bloco atualizado; campos com contraste corrigido.
- Formulário usa validação nativa, proteção de campo-armadilha e página contato-enviado.html. Ativação e recebimento confirmados pelo proprietário.
- WhatsApp provisório +55 83 98881-3958 adicionado ao início e Sobre nós.
- Mensagem do botão: Olá! Vim pelo site https://trilhandoporai.com e gostaria de saber mais sobre as aventuras e expedições.
- Nome com espaços e acento seguido de .com deixou de ser usado como URL, para evitar link incorreto Aí.com.
- Link de divulgação no Instagram foi preparado separadamente, identificando origem Instagram.
- Saudação de boas-vindas foi entregue como texto; a configuração dela é feita no WhatsApp Business e não equivale à mensagem preenchida do botão do site.

Arquivos: index.html, Sobre.html, contato-formulario.css, contato-enviado.html, redes-sociais.css. Os valores publicados pelo painel podem substituir os valores estáticos desses HTMLs.

## Nossa história e créditos

- Janela acionada por Nossa história: rolagem interna, foco, fechamento por X, clique externo e Esc.
- Transparência aumentada: fundo claro com opacidade .58 e desfoque 3px.
- Texto inicial provisório, preparado para substituição pelo proprietário.
- 34 referências Freepik removidas em 7 páginas HTML; lista de origem preservada para reunir créditos em Nossa equipe. Essa inclusão ainda está pendente.

Arquivos: nossa-historia.css, nossa-historia.js, index.html, configuracao/CREDITOS-PENDENTES.md.

## Painel privado e contador público

- Painel em /painel, autenticado por Cloudflare Access, restrito a trilhandoporai.of@gmail.com e One-time PIN.
- Dados D1: rascunho/publicado separados, revisões para evitar sobrescrever mudanças de outra janela.
- Parâmetros: nome, título inicial, título de cada página, logomarca, contato, WhatsApp/mensagem, Instagram/Facebook e redes adicionais, história, expedições e contador.
- Botões para adicionar/remover redes e expedições. Cartão novo permite link de destino opcional; não gera diário HTML.
- Salvar rascunho → Revisar e publicar. Publicação via painel grava D1, não GitHub.
- Contador no rodapé, ocultável pelo painel; estatísticas privadas de total, hoje em UTC e páginas mais acessadas.
- Sem visitantes únicos estimados: mede carregamentos registrados, incluindo recarregamentos, a partir da ativação.
- Proteção de backend valida assinatura JWT, emissor, audiência, expiração e e-mail; acesso direto por pages.dev também foi bloqueado em conferência.
- Functions compiladas com Wrangler; comportamento de autenticação, validação, persistência, publicação e renderização testado localmente.
- Em 18/11, proprietário confirmou painel e contador funcionando em produção.

Arquivos: functions/_lib/*, functions/painel/[[path]].js, functions/api/config.js, functions/api/views.js, functions/api/admin/[[action]].js, configuracoes-site.js, configuracoes-site.css, _routes.json, configuracao/schema.sql.

## Referência de versões publicadas

- 3bdc69f: publicação inicial.
- 10c2dac: expedições, português e contato.
- 96e0230: celular, redes sociais e navegação.
- dbc9f7f: WhatsApp, abertura inicial e atrasos no celular.
- 004f7ac: início compacto no celular.
- ab956bf: painel, contador, história e demais ajustes acumulados (versão histórica).
- dc8819d: primeira publicação de /links, com cinco quadros e largura manual preservada.
- ea5b4b0: controles de Links e fundo móvel no painel; versão atual e última publicação verificada em 20/11/2026.

Alterações posteriores pelo painel devem ser consultadas no D1; elas não aparecem nesse histórico de commits.

## 20/11/2026 — Página de links (somente local)

- Adicionados links.html e links.css, seguindo a estrutura estática existente. O endereço público previsto é /links, usando a resolução de HTML sem extensão do Cloudflare Pages.
- Identidade reaproveitada: logomarca, foto TP-01.jpg, fonte Beloved e tons do site. Layout responsivo, navegação por teclado e metadados de compartilhamento.
- Apenas dois destinos confirmados: https://www.youtube.com/@TrilhandoPorAi-Oficial e https://trilhandoporai.com. Ambos abrem na mesma aba.
- Reutilizado configuracoes-site.js para logomarca publicada e contador existente; sem alterações no painel, Functions, banco D1 ou rotas. Os links funcionam também sem JavaScript.
- Documentação e alterações locais anteriores preservadas. Sem commit, push ou publicação. Para prévia direta, abrir links.html; a rota /links será conferida no domínio apenas após publicação autorizada.
- Verificação local: página carregada em navegador, logomarca visível e destinos conferidos; tela estreita de 320 px sem transbordamento horizontal. git diff --check sem erros. Contador/D1 não testados no servidor estático local.

## 20/11/2026 — Identificação dos blocos da página de links

- Preservadas as inclusões manuais de Instagram, Facebook e WhatsApp feitas pelo proprietário em links.html.
- Comentários padronizados como BLOCO + nome em maiúsculas + separador, seguindo index.html: apresentação, links oficiais, YouTube, site, Instagram, Facebook, WhatsApp, rodapé e contador.
- Mantido o aviso do WhatsApp temporário. Conferência confirmou que apenas comentários foram alterados no HTML, sem mudanças em conteúdo, destinos, atributos ou visual. Sem publicação.

## 20/11/2026 — Subtítulos e ícones dos links

- Instagram, Facebook e WhatsApp receberam título em destaque e segunda linha descritiva, no padrão dos cartões YouTube e Site.
- Corrigidos os SVGs de Instagram e WhatsApp com fundo transparente e contorno na cor do texto, eliminando o preenchimento preto que ocultava os desenhos.
- Destinos dos links e comentários de identificação preservados. Alteração somente local, sem publicação.

## 20/11/2026 — Quadros de links mais compactos

- Reduzidos os espaços internos dos cartões e o intervalo entre eles (16 para 12 px), mantendo fontes, ícones e largura responsiva.
- Altura usual passou de aproximadamente 94 para 70 px (26% menor). Em telas estreitas, a altura continua automática para acomodar as quebras dos subtítulos.
- Conferidos 320, 390, 500 e 1440 px no navegador, sem rolagem horizontal. Alterações locais, sem publicação.

## 20/11/2026 — Largura dos quadros de links

- Largura máxima dos cartões reduzida de 560 para 420 px (25%), com centralização horizontal. Em telas menores, respeita 100% da área disponível para manter a leitura.
- Preservados textos, ícones, altura compacta e cabeçalho. Alteração local, sem publicação.

## 20/11/2026 — Tentativa de publicação de /links

- Preservado ajuste manual do proprietário: largura máxima de 21.25rem (340 px).
- Criado commit dc8819d com links.html e links.css. Documentação local anterior mantida fora desse commit.
- Envio ao GitHub bloqueado por falta de autenticação para escrita neste computador. origin/main permanece em ab956bf; publicação ainda não realizada.

## 20/11/2026 — Publicação confirmada de /links

- Proprietário realizou o push; confirmado origin/main no commit dc8819dfccd7b5bf751ea059cca106c409db1704.
- https://trilhandoporai.com/links abre a nova página com os cinco cartões e os ajustes manuais de largura.
- Conferência no navegador em viewport de 390 px: sem rolagem horizontal, logomarca carregada e contador público funcionando. Registro acrescentado localmente após publicação.

## 20/11/2026 — Links no painel (implementação local)

- Nova seção Links: largura máxima (240–560 px), altura mínima (56–160 px), edição de título/subtítulo/endereço/ícone, destaque, nova aba, visibilidade, inclusão, remoção e ordenação de até 30 quadros.
- Fundo móvel (até 760 px): imagem opcional por caminho/HTTPS, enquadramento horizontal e escurecimento, com prévia. Fundo do computador preservado.
- A logomarca de Identidade e páginas é compartilhada com /links e aplicada após publicação das configurações. Sem um campo duplicado de logomarca.
- Compatibilidade com D1 antigo: seção Links acrescentada somente à leitura quando ausente, preservando os demais parâmetros. Nenhum SQL de instalação/migração executado. Salvamento de abas antigas preserva a seção nova.
- Valores iniciais mantêm os cinco quadros e a largura manual de 340 px. Altura mínima inicial de 70 px; altura cresce para acomodar texto. HTML original continua como alternativa se a API falhar.
- Testes locais passaram para validação de URLs/limites, acesso anônimo bloqueado, dados antigos, rascunho separado de publicado, conflito de revisão e preservação em clientes antigos. Navegador: inclusão, ordenação, remoção, visibilidade, salvar/recarregar, publicação simulada, troca da logomarca e responsividade em 320, 390 e 1280 px.
- Testes usam dados em memória, sem acesso ao D1 de produção. Código ainda não publicado.
- Compilação das Cloudflare Pages Functions concluída com Wrangler 4.166.0, sem publicação.

## 20/11/2026 — Publicação dos controles de Links confirmada

- Push realizado pelo proprietário; origin/main confirmado em ea5b4b0ba91265aa531958ef8b4f3fdb5e4762e7.
- /links em produção carrega links-painel.js e aplica os parâmetros publicados: largura de 340 px, altura mínima de 70 px e enquadramento móvel inicial de 50%. Contador funcionando.
- /painel continua protegido pelo Cloudflare Access. A interface privada em produção não foi inspecionada nesta sessão por exigir login; interface e fluxo de edição foram testados localmente antes da publicação.

## 20/11/2026 — Consolidação da documentação compartilhada

- Consultado o chat “Site - Links - Trilhando por aí (GitHub)” e centralizada a continuidade no chat “Site - Trilhando por aí (GitHub)”, usando a mesma pasta oficial. Nenhum projeto ou serviço duplicado.
- HEAD, origin/main e main no GitHub conferidos em ea5b4b0ba91265aa531958ef8b4f3fdb5e4762e7. Preservadas as referências históricas a ab956bf e dc8819d e todas as etapas locais/publicadas anteriores.
- CONTINUIDADE.md atualizado com a versão atual, controles de Links e limites da conferência anterior de produção; README.md passou a incluir /links; ATIVACAO-PAINEL.md corrigido para indicar Links já publicado.
- AGENTS.md estabelece documentação única para site, links e painel e atualização após cada melhoria e publicação, com distinção entre trabalho local e publicação verificada.
- Consolidação apenas documental e local, sem commit, push, deploy ou alterações no D1. Documentos pendentes de envio: AGENTS.md, README.md, CONTINUIDADE.md, HISTORICO-AJUSTES.md, configuracao/ATIVACAO-PAINEL.md e configuracao/CREDITOS-PENDENTES.md (este último preservado sem edição).

## 20/11/2026 — Envio da documentação autorizado

- Proprietário autorizou publicar a consolidação no GitHub e no Cloudflare pelo fluxo existente da branch main.
- Preparados os seis documentos compartilhados; ajustes de espaços finais apenas em README.md e CREDITOS-PENDENTES.md. Nenhum código funcional ou dado do D1 alterado.
- Este registro antecede o envio: confirmação do commit remoto e do deploy deve ser feita após o push, sem tratar autorização como publicação concluída.
