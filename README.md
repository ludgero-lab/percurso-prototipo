# percurso-prototipo

Protótipo de teste de usabilidade do Percurso: wireframe navegável, em fidelidade baixa, do site da Maria Clara Vinotti, para o teste de guerrilha com 5 pessoas no celular. É descartável: o site final será outro repositório.

## Alternativas

| Alternativa | O que é | Link | Fonte da verdade |
|---|---|---|---|
| A | Protótipo completo: todas as páginas e o agendamento | <https://ludgero-lab.github.io/percurso-prototipo/> | [`docs/especificacao-prototipo.md`](docs/especificacao-prototipo.md) |
| B | Início traduzido do esboço à mão. Congelada como registro | <https://ludgero-lab.github.io/percurso-prototipo/alternativa-b/> | [`alternativa-b/MUDANCAS.md`](alternativa-b/MUDANCAS.md) |
| C | Revisão da B, com a linha visual da referência de cartões: Início, quiz de autoconhecimento, páginas internas e agendamento | <https://ludgero-lab.github.io/percurso-prototipo/site/> | [`docs/especificacao-alternativa-c.md`](docs/especificacao-alternativa-c.md) e [`site/MUDANCAS.md`](site/MUDANCAS.md) |

A B tem só o Início; o menu, os links e o agendamento dela levam às páginas da A. A C é completa: tem as próprias páginas internas, o quiz e o agendamento, e nenhum link sai dela.

As regras do projeto (conteúdo, visual, acessibilidade e privacidade) estão em [`CLAUDE.md`](CLAUDE.md). O guia das imagens de referência da C está em [`docs/referencias-visuais.md`](docs/referencias-visuais.md).

## Arquivos

| Caminho | Conteúdo |
|---|---|
| `index.html`, `app.js` | Alternativa A: todas as telas, rotas por hash, menu e avisos |
| `agendamento.js` | Lógica do agendamento, usada pela A e pela C: estado só em memória, calendário, fusos, horários, validação e resumo |
| `estilo.css` | Base visual de todas as alternativas: tons de cinza, mobile first, até 480 px no desktop. B e C só acrescentam ao que está aqui |
| `alternativa-b/` | Alternativa B (não alterar) |
| `site/` | Alternativa C: Início, quiz, páginas internas e agendamento (arquivos em [`site/MUDANCAS.md`](site/MUDANCAS.md)) |
| `docs/` | Especificações e guia de referências visuais |
| `robots.txt`, `.nojekyll` | Bloqueia os buscadores; faz o GitHub Pages servir os arquivos como estão |

## Rotas da alternativa A

`#/inicio` (padrão), `#/sobre`, `#/atendimento`, `#/atendimento/presencial`, `#/atendimento/etapas`, `#/conteudo`, `#/duvidas`, `#/agendar/1`, `#/agendar/2`, `#/agendar/3`.

- As âncoras da especificação (`presencial` e `etapas`) viraram rotas para não conflitar com o roteamento por hash.

## Abrir no computador

Não há build nem dependências. Basta servir a pasta:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000/` (A), `/alternativa-b/` ou `/site/`.

## Publicação

O GitHub Pages publica o branch `main`, pasta raiz, nos links da tabela acima. Todas as páginas têm `noindex` e o `robots.txt` bloqueia tudo, mas quem tiver o link consegue abrir.
