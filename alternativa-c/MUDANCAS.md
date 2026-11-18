# Alternativa C: o que muda em relação à B e à A

A C parte de uma cópia da B (congelada como registro) e aplica a revisão de [`docs/especificacao-alternativa-c.md`](../docs/especificacao-alternativa-c.md), que é a fonte da verdade para telas, textos e interações. Este arquivo registra só o que a especificação não diz: as decisões de implementação, os riscos para o teste e o que ainda está em aberto.

Publicação: <https://ludgero-lab.github.io/percurso-prototipo/alternativa-c/> (quiz em `quiz.html`).

A C tem só o **Início** e o **quiz**. O menu, os links das seções e o agendamento levam às páginas da A.

## 1. Em aberto (para validar com a Maria Clara)

1. Textos em rascunho: biografia, trajetória, respostas dos sentimentos, versos dos cartões, perguntas e resultados do quiz.
2. Lista final de sentimentos.
3. Se o quiz entra no MVP (estava previsto para a V2).
4. Texto do aviso do CVV no rodapé.
5. Evolução para um segundo momento: dar à Maria Clara acesso às respostas do quiz de quem autorizar. Exige guardar dados sobre sentimentos, consentimento específico e destacado e revisão de LGPD.

## 2. Riscos para o teste

- **Volta para a A:** o "Início" do cabeçalho e do menu da A leva ao Início da A. Quem sai da C para Sobre e toca em Início cai na outra alternativa. Só o agendamento sabe voltar para a C (ver decisões).
- **Altura do baralho do quiz:** os cartões ocupam a mesma célula, então o cartão do resultado tem a altura da pergunta mais longa e fica com espaço em branco quando há um só tema.

## 3. Decisões que a especificação não definia

**Ligação com a A**
- "Agendar online" usa `../#/agendar/online`, rota de apoio da A que abre o passo 1 com Online marcado (o estado da A fica só em memória e se perderia na troca de página).
- Quando o agendamento é aberto pela C, "Voltar" no passo 1 e "Voltar ao início" no passo 3 retornam para a C.
- Os links do rodapé também levam às páginas da A; o "Início" leva ao Início da C.

**Barra em pílula**
- No quiz não há ações no topo. Ela segue a mesma regra do Início com as ações da própria tela ("Começar", "Voltar"/"Próxima" e as ações do resultado), para não cobrir os botões do quiz.

**Baralho**
- Atrás do cartão da frente aparecem os que ainda faltam (até dois); no último, não há nada atrás.
- A troca de flash card usa o mesmo deslize de 300 ms das perguntas do quiz.
- Se o botão com foco é desativado (nas pontas), o foco vai para o cartão.
- O cartão é um botão que cobre o cartão inteiro, e não o cartão dentro de um botão: o verso tem links, que não podem ficar dentro de um botão. O verso fica `inert` e `aria-hidden` enquanto fechado.

**Animação de entrada**
- Cada elemento começa 150 ms depois do anterior (cerca de 1 s no total), em vez de um depois do outro (2 s), para não atrasar as ações.

**Quiz**
- O h1 fica sempre visível; ao começar, somem o texto de abertura e o "Começar".
- No cartão do resultado não há contador nem "Próxima"; "Voltar" continua e devolve à pergunta 6.
- O resultado vira uma vez só. O título aparece sem a letra do tema.
- "Este quiz não é um diagnóstico…", as ações e o formulário ficam abaixo do baralho e aparecem depois de virar o resultado. "Agendar sessão" é a ação principal; "Refazer o quiz" é um link.

## 4. Estrutura do Início em relação à B

| Ordem | Seção | Em relação à B |
|---|---|---|
| — | Cabeçalho só com o botão de menu | Igual; o menu leva às páginas da A |
| 1 | Topo em tela cheia | Novo |
| 2 | "Com o que você está chegando hoje?" (chips) | Substitui o seletor em arco e o "Continuar" |
| 3 | Baralho de flash cards | Substitui os cards em rolagem e "Como é uma sessão" em lista |
| 4 | Convite para o quiz | Substitui o convite para o teste de perfil |
| 5–9 | Acolhimento e sigilo, Online ou presencial, O que dizem no Google, No YouTube, Quer conversar antes de marcar? | Iguais, com links para a A e "Agendar sessão" |
| 10 | Rodapé com o CVV discreto e a linha de registro | Mudança global (também na A) |
| — | Barra flutuante em pílula | Substitui o botão flutuante de WhatsApp |

Só o topo tem a altura da tela e "encaixa" na rolagem.

## 5. Linha visual (estrutura, não estética)

A C segue a referência de estrutura e cartões em tons de cinza, para que a fase visual parta de uma estrutura já alinhada:

- **Formas:** cantos de 24 px em cartões e blocos e 16 px em controles; botões com texto em pílula; botões só de ícone redondos (menu, Voltar, WhatsApp do topo).
- **Cartões empilhados:** a mesma peça serve aos flash cards, às perguntas e ao resultado do quiz e ao convite do quiz.
- **Hierarquia de títulos:** h1 do quiz (32 px) > título das seções e do topo (24 px) > título dentro dos cartões (22 px) > texto (16 px) > apoio (14 a 15 px).
- **Espaço:** respiro generoso entre seções, sem linhas divisórias.
- **Moldura:** barra flutuante em pílula na base; rodapé com os cantos de cima arredondados e o aviso do CVV num bloco discreto.
- **Fonte:** a única fonte nova é a serifa do sistema (`ui-serif, Georgia, serif`), no nome e na profissão do topo.

## 6. Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início |
| `quiz.html` | Quiz de autoconhecimento |
| `estilo-c.css` | Só o que muda em relação a `../estilo.css`, em ordem: tokens, componentes, moldura, Início, baralho, quiz, movimento |
| `comum-c.js` | Avisos, menu, barra em pílula e o componente de baralho |
| `inicio-c.js` | Chips de sentimentos e flash cards |
| `quiz-c.js` | Perguntas, resultado, e-mail simulado e "Refazer o quiz" |
