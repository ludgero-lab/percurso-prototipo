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

## Alternativa B

Uma segunda proposta do Início, para avaliação, está em [`alternativa-b/`](alternativa-b/) e é publicada em <https://ludgero-lab.github.io/percurso-prototipo/alternativa-b/>. Ela reaproveita o `estilo.css` da alternativa A. As diferenças em relação à especificação estão em [`alternativa-b/MUDANCAS.md`](alternativa-b/MUDANCAS.md).
