# percurso-prototipo

Protótipo de teste de usabilidade do Percurso: wireframe navegável, em fidelidade baixa, do site da Maria Clara Vinotti, para o teste de guerrilha com 5 pessoas no celular. É descartável: o site final será outro repositório.

## Alternativas

| Alternativa | O que é | Link | Fonte da verdade |
|---|---|---|---|
| A | Protótipo completo: todas as páginas e o agendamento | <https://ludgero-lab.github.io/percurso-prototipo/> | [`docs/especificacao-prototipo.md`](docs/especificacao-prototipo.md) |
| B | Início traduzido do esboço à mão. Congelada como registro | <https://ludgero-lab.github.io/percurso-prototipo/alternativa-b/> | [`alternativa-b/MUDANCAS.md`](alternativa-b/MUDANCAS.md) |
| C | Revisão da B: Início e quiz de autoconhecimento | <https://ludgero-lab.github.io/percurso-prototipo/alternativa-c/> | [`docs/especificacao-alternativa-c.md`](docs/especificacao-alternativa-c.md) e [`alternativa-c/MUDANCAS.md`](alternativa-c/MUDANCAS.md) |

A B e a C têm só o Início (a C também tem o quiz, em `alternativa-c/quiz.html`). O menu, os links das seções e o agendamento delas levam às páginas da A.

As regras do projeto (conteúdo, visual, acessibilidade e privacidade) estão em [`CLAUDE.md`](CLAUDE.md). O guia das imagens de referência da C está em [`docs/referencias-visuais.md`](docs/referencias-visuais.md).

## Arquivos

| Caminho | Conteúdo |
|---|---|
| `index.html`, `app.js` | Alternativa A: todas as telas, rotas por hash, agendamento (estado só em memória), calendário, fusos, validação e avisos |
| `estilo.css` | Base visual de todas as alternativas: tons de cinza, mobile first, até 480 px no desktop. B e C só acrescentam ao que está aqui |
| `alternativa-b/` | Alternativa B (não alterar) |
| `alternativa-c/` | Alternativa C: `index.html`, `quiz.html`, `estilo-c.css` e os scripts `comum-c.js`, `inicio-c.js` e `quiz-c.js` |
| `docs/` | Especificações e guia de referências visuais |
| `robots.txt`, `.nojekyll` | Bloqueia os buscadores; faz o GitHub Pages servir os arquivos como estão |

## Rotas da alternativa A

`#/inicio` (padrão), `#/sobre`, `#/atendimento`, `#/atendimento/presencial`, `#/atendimento/etapas`, `#/conteudo`, `#/duvidas`, `#/agendar/1`, `#/agendar/2`, `#/agendar/3`.

- As âncoras da especificação (`presencial` e `etapas`) viraram rotas para não conflitar com o roteamento por hash.
- `#/agendar/online` é uma rota de apoio para links da alternativa C: abre o passo 1 com Online marcado.

## Abrir no computador

Não há build nem dependências. Basta servir a pasta:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000/` (A), `/alternativa-b/` ou `/alternativa-c/`.

## Publicação

O GitHub Pages publica o branch `main`, pasta raiz, nos links da tabela acima. Todas as páginas têm `noindex` e o `robots.txt` bloqueia tudo, mas quem tiver o link consegue abrir.
