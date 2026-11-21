# Ativação do painel de configurações

Estado em 20/11/2026: painel, contador e seção Links publicados; versão atual `ea5b4b0`. O proprietário confirmou acesso e contador funcionando em 18/11. As instruções abaixo são referência para manutenção ou reinstalação; não recriar os serviços para trocar de computador.

## 1. Banco de dados

Criar um banco Cloudflare D1 (sugestão: trilhando-configuracoes). Executar `configuracao/schema.sql` uma única vez pelo console do D1. O script cria as tabelas de configurações e visualizações e copia os valores atuais para rascunho e publicado. Rodá-lo novamente não substitui configurações existentes.

Em Workers & Pages > site-trilhandoporai > Configurações > Associações, conectar esse D1 com o nome `SITE_DB`. Repetir no ambiente de prévia se ele for usado. Sem o vínculo, o site mantém seu HTML original e não mostra um contador inventado.

## 2. Acesso privado

Em Cloudflare Zero Trust / Access, criar uma aplicação para o domínio trilhandoporai.com, protegendo os caminhos `/painel`, `/painel/*` e `/api/admin/*` na mesma aplicação (mesma audiência). Permitir somente o e-mail `trilhandoporai.of@gmail.com`. Habilitar login por código enviado ao e-mail ou provedor de identidade apropriado.

Nas variáveis do projeto Pages, configurar:

- `ACCESS_ISSUER`: domínio HTTPS da equipe, como `https://nome-da-equipe.cloudflareaccess.com` (sem caminho).
- `ACCESS_AUD`: Application Audience (AUD) da aplicação de acesso.

Nenhum valor de exemplo está habilitado. Mesmo se alguém acessar o domínio pages.dev diretamente, as funções verificam assinatura, emissor, audiência, validade e e-mail do JWT. Sem configuração, o painel recusa o acesso. Somente o cabeçalho de e-mail não é aceito como autenticação.

## 3. Publicação e conferência

Enviar os arquivos ao GitHub somente quando autorizado a publicar. O Cloudflare deve compilar a pasta `functions/` junto com o site. O `_routes.json` limita funções aos caminhos de painel e API; as páginas e imagens continuam estáticas.

Após publicar e vincular os serviços:

1. Acessar `https://trilhandoporai.com/painel` e entrar com o e-mail autorizado.
2. Confirmar que sessão anônima ou outro e-mail não acessa painel e API privada.
3. Salvar uma alteração de rascunho e confirmar que ela ainda não aparece no site.
4. Usar Revisar e publicar; verificar a mudança no site e, depois, restaurar o valor se era um teste.
5. Abrir uma página pública e conferir o contador público e a estatística privada.

## Parâmetros da primeira versão

- Nome do site e título do primeiro bloco.
- Logomarca por caminho de imagem já existente ou URL HTTPS; não há upload nesta versão.
- Título da aba de cada página.
- E-mail do formulário (trocas requerem nova ativação no FormSubmit), WhatsApp e mensagem inicial.
- Instagram e Facebook, mais botão para adicionar ou remover outras redes (nome e endereço HTTPS).
- História em texto simples, sem executar HTML inserido.
- Adicionar/remover expedições, com título, subtítulo, imagem, destino opcional, data de início opcional e visibilidade. Criar um cartão não cria automaticamente um diário HTML. Os diários continuam nas páginas próprias e podem ganhar parâmetros depois.
- Mostrar/ocultar o contador de visualizações.

Rascunhos e configurações publicadas ficam no D1, separados. O botão Publicar não envia commits para o GitHub: ele publica os parâmetros no banco. Ao migrar a infraestrutura do site, exportar também o D1; copiar a pasta ou clonar o GitHub não inclui as configurações gravadas no banco. Para mudar apenas de computador e continuar no mesmo Cloudflare, o banco permanece ativo e não precisa ser recriado ou importado.

A contagem começa quando o banco e as funções são ativados. Ela mede carregamentos registrados, inclui recarregamentos, depende do JavaScript e pode incluir robôs. Não representa visitantes únicos. Não há IPs, cookies ou identificação de visitantes gravados. A indicação Hoje usa o dia em UTC, explicitado na interface.

## Verificação realizada

Compilação das funções com Wrangler concluída. Testes locais cobriram assinatura JWT, usuário incorreto, sessão ausente/expirada, origem da requisição, URLs inválidas, conflito de rascunho, separação de rascunho/publicado, contagem com SQLite e interface no computador/celular. Em produção, foram conferidos os endpoints públicos e o bloqueio da API privada pelo domínio alternativo; o proprietário confirmou o login e o contador funcionando.

Documentação: https://developers.cloudflare.com/pages/functions/bindings/ e https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/

## Seção Links — publicada em 20/11/2026 (ea5b4b0)

A aba Links para ajustar /links já foi publicada no commit ea5b4b0. A publicação e a aplicação dos parâmetros públicos foram conferidas no chat “Site - Links - Trilhando por aí (GitHub)”; a tela privada em produção não foi inspecionada naquela sessão por exigir login. O fluxo de edição foi testado localmente antes da publicação. Não reexecutar schema.sql: a compatibilidade com configurações antigas é automática e preserva os dados atuais.

- Largura máxima e altura mínima dos quadros em pixels; telas pequenas respeitam o espaço disponível e textos longos aumentam a altura.
- Adicionar/remover/reordenar quadros e editar título, subtítulo, endereço, ícone, destaque, visibilidade e abertura em nova aba.
- Imagem opcional do fundo móvel por caminho ou HTTPS, posição horizontal e escurecimento. Em branco, usa a imagem atual. O ajuste móvel vale até 760 px e não altera o fundo do computador.
- A imagem da logomarca vem de Identidade e páginas e também é atualizada em /links após publicar.
- Salvar rascunho não altera o site. Revisar e publicar aplica as configurações nas próximas aberturas. Não é preciso reenviar código para cada ajuste pois a versão com esses controles já está instalada.
