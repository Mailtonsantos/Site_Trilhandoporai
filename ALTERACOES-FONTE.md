# Fonte local do título visual

Alteração realizada em 11/11/2026, sobre o ZIP fornecido: Trilhando por Aí.zip.

## Diagnóstico

O projeto já incluía fonts/Beloved.otf e uma declaração @font-face em index.css. O título principal da primeira seção de index.html já indicava Beloved. A configuração foi complementada, sem substituir a estrutura exportada pelo Nicepage.

## Arquivos alterados

- index.html: acrescentada a classe titulo-site ao h1 da seção sec-9cc6, preservando as classes existentes, o texto e os atributos de animação.
- index.css: declarado explicitamente o formato opentype no caminho relativo fonts/Beloved.otf e acrescentado font-display: swap, para mostrar o texto enquanto a fonte carrega. Incluída regra específica .u-section-1 .titulo-site com a família 'Beloved', cursive, peso 400 e estilo normal.
- Este documento foi adicionado para registrar a alteração.

Os tamanhos, margens, cores, animações e regras de responsividade existentes foram preservados. A regra específica altera apenas a tipografia do título principal da página inicial. Outros títulos não foram alterados. O elemento title continua como Trilhando Por Aí; a aparência da aba é controlada pelo navegador.

## Validação

Verificado no Microsoft Edge via servidor HTTP local em larguras de 1440, 1024, 768, 540, 390 e 320 px. A fonte local foi carregada com sucesso. Comparações antes/depois confirmaram que o tamanho da fonte e as dimensões do título foram mantidos nas seis larguras. Conferidas visualmente as versões de 1440 e 390 px.

Comparação de todos os arquivos originais: somente index.html e index.css foram modificados. O arquivo fonts/Beloved.otf e os demais arquivos, inclusive project.zip, foram mantidos sem alteração. O project.zip interno é o arquivo original do projeto e não incorpora estas edições manuais da exportação HTML.

## Uso e manutenção

Extraia o ZIP e use o conteúdo da pasta Trilhando por Aí como raiz do site. Mantenha fonts/Beloved.otf na mesma posição relativa a index.css, respeitando maiúsculas/minúsculas no servidor. A fonte do título não depende do Google Fonts; as demais fontes e dependências existentes continuam como no projeto original.

Uma nova exportação do Nicepage pode sobrescrever as edições. Nesse caso, reaplique a classe titulo-site ao h1 principal e as alterações de index.css descritas acima. A pasta original no computador não foi modificada.
