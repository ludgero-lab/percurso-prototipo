# Percurso: protótipo de teste (wireframe)

Protótipo navegável, em fidelidade baixa, do site da Maria Clara Vinotti, parapsicóloga clínica. Ele existe só para o teste de usabilidade de guerrilha com 5 pessoas, no celular. É descartável: o site final será outro repositório, com outra stack.

## Alternativas e fontes da verdade

| Alternativa | Onde | Fonte da verdade para telas, textos e interações |
|---|---|---|
| A | Raiz (`index.html`) | `docs/especificacao-prototipo.md` |
| B | `alternativa-b/` | Congelada como registro: não alterar nenhum arquivo |
| C | `alternativa-c/` | `docs/especificacao-alternativa-c.md`, com o guia `docs/referencias-visuais.md` |

- Cada alternativa registra no próprio `MUDANCAS.md` o que muda em relação às outras e as decisões que a especificação não definia.
- B e C reaproveitam o `estilo.css` da A. Nele, só acrescentar regras, para não mudar a aparência da B.

## Stack

- HTML, CSS e JavaScript puros, sem framework, sem build e sem dependências externas (nada de CDN).
- A alternativa A é um único `index.html` com rotas por hash (`#/inicio`, `#/sobre`, `#/agendar/1` etc.), para funcionar direto no GitHub Pages. A B tem só o Início e usa as rotas da A para o resto. A C tem uma página por tela, na própria pasta, e a moldura comum (cabeçalho, menu, rodapé, barra) é montada por `alternativa-c/comum-c.js`.
- A lógica do agendamento (calendário, fusos, validação) fica em `agendamento.js`, usada pela A e pela C.
- Estado guardado só em memória (variáveis JS). Nada de localStorage, cookies ou envio de dados.

## Regras de conteúdo

- Usar exatamente os textos da especificação. Não criar textos novos. Onde houver colchetes, manter o colchete como espaço reservado.
- Vocabulário: "cliente", nunca "paciente" nem "problema". Sem promessa de cura ou resultado. Sem preços.
- O aviso do CVV (188) aparece no rodapé de todas as telas, de forma discreta.

## Regras visuais

- Fidelidade baixa: só tons de cinza neutros, uma cor escura para botões principais, fonte `system-ui`.
- Sem cores de marca, ilustrações, fotos ou animações decorativas. Imagens e vídeos são caixas cinza tracejadas com rótulo entre colchetes.
- Mobile first (390 px). No desktop, centralizar com largura máxima de 480 px.
- Exceções da C, definidas na especificação dela: serifa do sistema no nome e na profissão do topo, e animações só como marcação de intenção (entrada do topo, giro e troca vertical dos cartões, barra flutuante, voltar ao topo), sempre desligadas com "reduzir movimento".

## Acessibilidade

- Áreas de toque com no mínimo 44 px de altura.
- Contraste WCAG AA, rótulos visíveis nos campos, títulos em ordem, foco visível, navegação por teclado.
- Mensagens de erro ligadas ao campo (`aria-describedby`) e o aviso temporário anunciado com `aria-live="polite"`.

## Privacidade e publicação

- `<meta name="robots" content="noindex, nofollow">` em todas as páginas HTML e um `robots.txt` bloqueando tudo.
- Nenhum analytics, nenhuma chamada de rede. Única exceção, na C: o vídeo do canal no Início, que só carrega de `youtube-nocookie.com` quando a pessoa toca no play.

## Forma de trabalhar

- Commits pequenos, um por etapa, com mensagem em português.
- Ao terminar cada etapa, conferir os critérios de aceite da especificação e relatar o que passou e o que falhou.
