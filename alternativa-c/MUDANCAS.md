# Alternativa C: o que muda em relação à B e à A

A alternativa A segue `docs/especificacao-prototipo.md`. A B (`alternativa-b/`) é a tradução fiel do esboço à mão e fica congelada como registro. A C parte de uma cópia da B e aplica a revisão de `docs/especificacao-alternativa-c.md`. Ela tem só o **Início** e o **quiz**; o menu, os links das seções e o agendamento levam às páginas da A.

Publicação: `https://ludgero-lab.github.io/percurso-prototipo/alternativa-c/` (quiz em `alternativa-c/quiz.html`)

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início da C |
| `quiz.html` | Quiz de autoconhecimento |
| `estilo-c.css` | Só o que muda em relação a `../estilo.css` (linha visual da C) |
| `comum-c.js` | Avisos, menu, barra em pílula e o componente de baralho (usado no Início e no quiz) |
| `inicio-c.js` | Chips de sentimentos, flash cards e regra da barra em pílula no Início |
| `quiz-c.js` | Perguntas, resultado, e-mail simulado e "Refazer o quiz" |

## Estrutura do Início

| Ordem | Seção | Em relação à B |
|---|---|---|
| — | Cabeçalho só com o botão de menu (redondo) | Igual; o menu agora leva às páginas da A |
| 1 | Topo em tela cheia: espaço reservado da imagem da identidade visual, nome em serifa, "Parapsicóloga clínica" em itálico, h1, apoio e ações | Novo |
| 2 | "Com o que você está chegando hoje?": chips e resposta na própria página | Substitui o seletor em arco e o "Continuar" |
| 3 | Baralho de flash cards: O que é, Como pode ajudar, Como é uma sessão, Quem sou eu | Substitui os cards em rolagem e "Como é uma sessão" em lista |
| 4 | Convite para o quiz de autoconhecimento | Substitui o convite para o teste de perfil |
| 5 | Acolhimento e sigilo | Igual |
| 6 | Online ou presencial | Links para a A |
| 7 | O que dizem no Google | Igual |
| 8 | No YouTube, em temporadas | Link para a A |
| 9 | Quer conversar antes de marcar? | "Agendar sessão" leva ao agendamento da A |
| 10 | Rodapé com o CVV discreto e a linha de registro | Mudança global (também na A) |
| — | Barra flutuante em pílula com WhatsApp e Agendar sessão | Substitui o botão flutuante de WhatsApp |

Só o topo tem a altura da tela e "encaixa" na rolagem; as demais seções têm a altura do próprio conteúdo.

## Linha visual (estrutura, não estética)

A C segue a referência de estrutura e cartões, ainda em tons de cinza, para que a fase visual parta de uma estrutura já alinhada:

- Cantos bem arredondados (24 px em cartões e blocos, 16 px em controles) e respiro generoso entre seções, sem linhas divisórias.
- Todos os botões em pílula; botões só de ícone são redondos (menu, Voltar, WhatsApp do topo).
- Topo com a imagem em tela cheia e a tipografia grande por cima, num painel claro semitransparente.
- Cartões empilhados com os de trás deslocados: a mesma peça serve aos flash cards, às perguntas do quiz, ao resultado e ao convite do quiz.
- Etiqueta em pílula para o apoio dos cartões ("Toque para ver a resposta").
- Barra flutuante em pílula na base da tela.
- O rodapé tem os cantos de cima arredondados e o aviso do CVV num bloco discreto, como na referência do rodapé.
- A única fonte nova é a serifa do sistema (`ui-serif, Georgia, serif`) no nome e na profissão do topo.

## Comportamento

- **Animação de entrada:** nome, profissão, título, apoio e ações aparecem com fade de 400 ms, um 150 ms depois do outro (cerca de 1 s no total), uma vez ao abrir. Com "reduzir movimento", tudo aparece sem animação.
- **Chips:** rádios nativos num `fieldset` com legenda escondida, nenhum marcado. A resposta aparece numa área `aria-live="polite"`; trocar de opção troca o texto. Só "Tristeza" mostra a linha do 188. "Ver como funciona" rola até o baralho e leva o foco ao título dele.
- **Flash cards:**
  - "Cartão X de 4" é anunciado por leitor de tela. "Anterior" e "Próximo" ficam desativados nas pontas; se o botão com foco for desativado, o foco vai para o cartão.
  - Cada cartão é um botão (`aria-expanded`) que cobre o cartão inteiro. O verso fica no DOM, fora do alcance do leitor de tela enquanto fechado (`inert`), e o link dele continua clicável.
  - Giro em Y de 450 ms; a troca de cartão desliza em 300 ms. Com "reduzir movimento", os dois viram troca de opacidade.
  - Deslizar o dedo para os lados é atalho para Anterior e Próximo, nunca a única forma.
  - O novo cartão aparece sempre pela frente. Atrás do cartão da frente aparecem os que ainda faltam; no último, não há nada atrás.
- **Barra em pílula:** no Início, só aparece depois que as ações do topo saem da tela. No quiz, segue a mesma regra com as ações da própria tela ("Começar", "Voltar"/"Próxima" e as ações do resultado), para não cobrir os botões do quiz. Fade de 200 ms, sem animação com "reduzir movimento". O rodapé tem espaço no fim para ela.
- **Quiz:**
  - O h1 fica sempre visível. Ao começar, somem o texto de abertura e o "Começar".
  - "Próxima" fica desativado sem escolha; "Voltar" mantém a resposta; o foco vai para o título da pergunta.
  - No cartão do resultado não há contador nem "Próxima"; "Voltar" continua e devolve à pergunta 6.
  - O resultado vira uma vez só, e o foco vai para o título. O título aparece sem a letra do tema.
  - Em empate, os temas aparecem um abaixo do outro, na ordem A, B, C, D.
  - "Este quiz não é um diagnóstico…", as ações e o formulário ficam abaixo do baralho e aparecem depois de virar o resultado.
  - E-mail simulado com validação própria; o envio válido troca o formulário pela mensagem (`role="status"`). Nada é enviado nem guardado.
  - "Refazer o quiz" volta à abertura e limpa respostas, resultado e formulário.
- **Ligação com a A:**
  - "Agendar online" usa `../#/agendar/online`, rota de apoio da A que abre o passo 1 com Online marcado.
  - Quando o agendamento é aberto pela C, "Voltar" no passo 1 e "Voltar ao início" no passo 3 retornam para a C.
  - O "Início" do cabeçalho e do menu da A continua levando ao Início da A (risco para o teste: quem navega da C para Sobre e toca em Início cai no Início da A).

## Textos

Todos os textos vêm de `docs/especificacao-alternativa-c.md` ou de `docs/especificacao-prototipo.md`. Estão em **rascunho**, a validar com a Maria Clara: biografia, trajetória, respostas dos sentimentos, versos dos cartões, perguntas e resultados do quiz.

## Em aberto (para validar com a Maria Clara)

1. Textos em rascunho: biografia, trajetória, respostas dos sentimentos, versos dos cartões, perguntas e resultados do quiz.
2. Lista final de sentimentos.
3. Se o quiz entra no MVP (estava previsto para a V2).
4. Texto do aviso do CVV no rodapé.
5. Evolução para um segundo momento: dar à Maria Clara acesso às respostas do quiz de quem autorizar. Exige guardar dados sobre sentimentos, consentimento específico e destacado e revisão de LGPD.
