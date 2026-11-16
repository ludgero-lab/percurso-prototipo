# Percurso: protótipo de teste (wireframe)

Protótipo navegável, em fidelidade baixa, do site da Maria Clara Vinotti, parapsicóloga clínica. Ele existe só para o teste de usabilidade de guerrilha com 5 pessoas, no celular. É descartável: o site final será outro repositório, com outra stack.

A especificação completa está em `docs/especificacao-prototipo.md`. Ela é a fonte da verdade para telas, textos e interações.

## Stack

- HTML, CSS e JavaScript puros, sem framework, sem build e sem dependências externas (nada de CDN).
- Um único `index.html` com rotas por hash (`#/inicio`, `#/sobre`, `#/agendar/1` etc.), para funcionar direto no GitHub Pages.
- Estado do agendamento guardado só em memória (variáveis JS). Nada de localStorage, cookies ou envio de dados.

## Regras de conteúdo

- Usar exatamente os textos da especificação. Não criar textos novos. Onde houver colchetes, manter o colchete como espaço reservado.
- Vocabulário: "cliente", nunca "paciente" nem "problema". Sem promessa de cura ou resultado. Sem preços.
- O aviso do CVV (188) aparece em todas as telas.

## Regras visuais

- Fidelidade baixa: só tons de cinza neutros, uma cor escura para botões principais, fonte `system-ui`.
- Sem cores de marca, ilustrações, fotos ou animações decorativas. Imagens e vídeos são caixas cinza tracejadas com rótulo entre colchetes.
- Mobile first (390 px). No desktop, centralizar com largura máxima de 480 px.

## Acessibilidade

- Áreas de toque com no mínimo 44 px de altura.
- Contraste WCAG AA, rótulos visíveis nos campos, títulos em ordem, foco visível, navegação por teclado.
- Mensagens de erro ligadas ao campo (`aria-describedby`) e o aviso temporário anunciado com `aria-live="polite"`.

## Privacidade e publicação

- `<meta name="robots" content="noindex, nofollow">` no `index.html` e um `robots.txt` bloqueando tudo.
- Nenhum analytics, nenhuma chamada de rede.

## Forma de trabalhar

- Commits pequenos, um por etapa, com mensagem em português.
- Ao terminar cada etapa, conferir os critérios de aceite da especificação e relatar o que passou e o que falhou.
