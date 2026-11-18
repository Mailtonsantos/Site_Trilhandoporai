# Ativação do painel de configurações

O código foi preparado localmente. Não publicar como se o acesso privado e o contador já estivessem ativados.

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

Rascunhos e configurações publicadas ficam no D1, separados. O botão Publicar não envia commits para o GitHub: ele publica os parâmetros no banco. Ao migrar o site, exportar também o D1; copiar a pasta ou clonar o GitHub não inclui as configurações gravadas no banco.

A contagem começa quando o banco e as funções são ativados. Ela mede carregamentos registrados, inclui recarregamentos, depende do JavaScript e pode incluir robôs. Não representa visitantes únicos. Não há IPs, cookies ou identificação de visitantes gravados. A indicação Hoje usa o dia em UTC, explicitado na interface.

## Verificação realizada

Compilação das funções com Wrangler concluída. Testes locais cobriram assinatura JWT, usuário incorreto, sessão ausente/expirada, origem da requisição, URLs inválidas, conflito de rascunho, separação de rascunho/publicado, contagem com SQLite e interface no computador/celular. A conferência em produção depende da ativação descrita acima.

Documentação: https://developers.cloudflare.com/pages/functions/bindings/ e https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
