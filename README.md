# percurso-prototipo

Protótipo de teste de usabilidade do Percurso: wireframe navegável, em fidelidade baixa, do site da Maria Clara Vinotti, para o teste de guerrilha com 5 pessoas no celular. É descartável.

A especificação está em [`docs/especificacao-prototipo.md`](docs/especificacao-prototipo.md) e as regras do projeto em [`CLAUDE.md`](CLAUDE.md).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Todas as telas, cabeçalhos, menu, barra fixa, rodapé e aviso |
| `estilo.css` | Visual em tons de cinza, mobile first, até 480 px no desktop |
| `app.js` | Rotas por hash, estado do agendamento (só em memória), calendário, fusos, validação e avisos |
| `robots.txt` | Bloqueia todos os buscadores |
| `.nojekyll` | Faz o GitHub Pages servir os arquivos como estão |

## Rotas

`#/inicio` (padrão), `#/sobre`, `#/atendimento`, `#/atendimento/presencial`, `#/atendimento/etapas`, `#/conteudo`, `#/duvidas`, `#/agendar/1`, `#/agendar/2`, `#/agendar/3`.

`#/agendar/online` é uma rota de apoio para links vindos de outras páginas (alternativa C): abre o passo 1 com Online marcado.

As âncoras da especificação (`presencial` e `etapas`) viraram rotas para não conflitar com o roteamento por hash.

## Abrir no computador

Não há build nem dependências. Basta servir a pasta:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000/`.

## Publicação

Publicado pelo GitHub Pages a partir do branch `main`, pasta raiz:
<https://ludgero-lab.github.io/percurso-prototipo/>

O site tem `noindex` e `robots.txt` bloqueando tudo, mas quem tiver o link consegue abrir.

## Alternativas

| Alternativa | O que é | Publicação | Diferenças |
|---|---|---|---|
| A | Protótipo completo, conforme a especificação | <https://ludgero-lab.github.io/percurso-prototipo/> | [`docs/especificacao-prototipo.md`](docs/especificacao-prototipo.md) |
| B | Início traduzido fielmente do esboço à mão (congelada como registro) | <https://ludgero-lab.github.io/percurso-prototipo/alternativa-b/> | [`alternativa-b/MUDANCAS.md`](alternativa-b/MUDANCAS.md) |
| C | Revisão da B: topo em tela cheia, chips de sentimentos, flash cards e quiz de autoconhecimento | <https://ludgero-lab.github.io/percurso-prototipo/alternativa-c/> (quiz em <https://ludgero-lab.github.io/percurso-prototipo/alternativa-c/quiz.html>) | [`alternativa-c/MUDANCAS.md`](alternativa-c/MUDANCAS.md) |

As alternativas B e C reaproveitam o `estilo.css` da A e acrescentam só o que muda. A C tem apenas o Início e o quiz: o menu, os links das seções e o agendamento levam às páginas da A. A especificação da C está em [`docs/especificacao-alternativa-c.md`](docs/especificacao-alternativa-c.md).
