# Especificação da alternativa C

Esta especificação cria a alternativa C, em `alternativa-c/`, a partir da alternativa B. A B (`alternativa-b/`) é a tradução fiel do esboço à mão e fica **congelada como registro**: não alterar nenhum arquivo dela. A C parte de uma cópia da B e aplica a revisão abaixo. A alternativa A continua seguindo `docs/especificacao-prototipo.md`, com as mudanças globais da seção 1.

Todos os textos marcados como **(rascunho)** foram escritos a partir das respostas da Maria Clara no briefing e ainda serão validados por ela. Use-os exatamente como estão; não crie outros textos.

## 1. Mudanças globais (alternativas A e C)

### 1.1 CVV discreto, só no rodapé

O CVV deixa de aparecer em destaque. Ele fica em todas as telas, mas apenas no rodapé, como aviso discreto.

- Remover a caixa "Em sofrimento intenso? / Ligue 188 (CVV), 24 horas, gratuito." do rodapé (A e C).
- Remover as linhas "Em sofrimento intenso? Ligue 188 (CVV)." dos passos 1 e 2 do agendamento e a caixa do CVV do passo 3.
- No rodapé de todas as telas, depois dos links e antes de "Política de privacidade · Termos de uso", incluir um parágrafo em texto pequeno (14 px), num bloco discreto com fundo levemente diferente do rodapé e cantos arredondados, sem borda, sem negrito, sem ícone e sem cor de destaque, com contraste AA (ver `docs/referencias-visuais.md`, referência 4):

  > Este site não oferece atendimento imediato em situações de crise. Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito, ou acesse cvv.org.br. Em emergência, procure o hospital mais próximo.

  "cvv.org.br" é um botão que mostra o aviso "Neste ponto abriria o site do CVV."
- Na última linha do rodapé, incluir: "Registro FATECPR · Associada à ABPSIG".
- As telas do agendamento (passos 1, 2 e 3) passam a ter um rodapé curto no fim do conteúdo, com o aviso do CVV e a linha de privacidade e termos. O rodapé fica acima do espaço reservado à barra fixa do passo, sem ficar escondido por ela.

### 1.2 Biografia (alternativa A)

Substituir os espaços reservados:

- Início, bloco "Sobre resumido": trocar "Parapsicóloga clínica pelo Sistema Grisa. [Bio curta, com as palavras dela]" por "Parapsicóloga clínica pelo Sistema Grisa." seguido do texto da biografia curta abaixo.
- Sobre, abaixo de "Parapsicóloga clínica pelo Sistema Grisa": trocar o espaço reservado da biografia pelo texto da biografia curta.
- Sobre, seção "Como cheguei à parapsicologia": trocar "[Trajetória pessoal, nas palavras dela.]" pelo texto da trajetória.

**Biografia curta (rascunho):** "Professora de Letras (Português e Inglês), especialista em Gestão Escolar e especialista em análise, orientação e hipnoterapia em Parapsicologia Clínica pelo Sistema Grisa. Atendo há sete anos."

**Trajetória (rascunho):** "A parapsicologia chegou em minha vida pela curiosidade que tinha sobre alguns fenômenos que aconteciam comigo. Compreender a minha história, me deparar com minhas inseguranças e tantos medos, me fez perceber quantos talentos haviam desabrochado."

### 1.3 Regras atualizadas

- Atualizar no `CLAUDE.md` a regra do CVV: "O aviso do CVV (188) aparece no rodapé de todas as telas, de forma discreta."
- Atualizar em `docs/especificacao-prototipo.md` a estrutura global e o fluxo de agendamento conforme a seção 1.1.

## 2. Alternativa C: estrutura do Início

| Ordem | Seção |
|---|---|
| 1 | Topo em tela cheia: imagem da identidade visual, composição tipográfica e ações |
| 2 | "Com o que você está chegando hoje?": escolha de um sentimento e resposta na própria página |
| 3 | Baralho de flash cards: O que é, Como pode ajudar, Como é uma sessão, Quem sou eu |
| 4 | Convite para o quiz de autoconhecimento |
| 5 | Acolhimento e sigilo |
| 6 | Online ou presencial |
| 7 | O que dizem no Google |
| 8 | No YouTube, em temporadas |
| 9 | Quer conversar antes de marcar? |
| 10 | Rodapé (seção 1.1) |
| — | Barra flutuante em pílula com WhatsApp e Agendar sessão |

Em relação à B, sai do Início: o seletor em arco com emoções, o botão "Continuar" e a seção "Como é uma sessão" em lista (ela vira um cartão do baralho). Os blocos de tela cheia com rolagem que encaixa ficam só no topo (seção 1); as demais seções têm a altura do próprio conteúdo.

O cabeçalho continua só com o botão de menu. O menu leva às páginas da alternativa A (`../#/sobre`, `../#/atendimento`, `../#/conteudo`, `../#/duvidas`), já que a C só tem o Início e o quiz.

Todo "Agendar sessão" da C leva ao fluxo de agendamento da A (`../#/agendar/1`). "Agendar online" leva a `../#/agendar/1` com Online marcado, como na A. "Ver rota" leva a `../#/atendimento/presencial`. Usar sempre "Agendar sessão" (não "Agendar uma sessão").

### 2.1 Topo

- Ocupa a altura da tela do celular (menos o cabeçalho).
- Fundo: espaço reservado em tela cheia, cinza com borda tracejada, com o rótulo "[imagem da identidade visual: busto com flores, do header do YouTube]". O texto fica por cima, numa área com fundo claro semitransparente que garante contraste AA.
- Composição tipográfica, de cima para baixo:
  - "Maria Clara Vinotti" em tamanho grande (40 px no celular), fonte serifada do sistema (`ui-serif, Georgia, serif`), sem fontes externas.
  - "Parapsicóloga clínica" em itálico, mesma família serifada, 20 px.
  - h1: "Parapsicologia clínica feita com acolhimento e parceria" (fonte do sistema, 24 px).
  - Apoio: "Um espaço para olhar para os seus desafios no seu ritmo, entender a sua história e conduzir o seu caminho com mais consciência, online ou em Florianópolis."
- Ações, lado a lado na base do bloco: pílula principal "Agendar sessão" e botão redondo de 48 px com ícone do WhatsApp (`aria-label="Conversar no WhatsApp"`, mostra o aviso do WhatsApp).
- Animação de entrada (só como marcação de intenção): os textos aparecem com um fade de 400 ms, em sequência (nome, profissão, título, apoio, ações), uma vez ao abrir a página. Com "reduzir movimento" ativado, tudo aparece sem animação. A animação da imagem fica para a fase visual e não entra no protótipo.

### 2.2 "Com o que você está chegando hoje?"

- h2: "Com o que você está chegando hoje?"
- Apoio: "Escolha uma opção. Sua resposta não é guardada."
- Opções em chips (rádios nativos estilizados como chips, num `fieldset` com legenda escondida igual ao título), nenhuma marcada no início: Culpa · Raiva · Medo · Insegurança · Tristeza · Mágoa · Só estou conhecendo.
- Ao escolher, aparece abaixo, numa área `aria-live="polite"`, um cartão de resposta com o texto correspondente e duas ações:
  - Link "Ver como funciona": rola até o baralho de flash cards e leva o foco ao título dele.
  - Link "Fazer o quiz de autoconhecimento": abre o quiz.
- Trocar de opção troca o texto da resposta.

**Respostas (rascunho):**

| Opção | Texto |
|---|---|
| Culpa | Muitas pessoas chegam aqui com culpas que não deixam desfrutar da alegria de viver. Na parapsicologia clínica, olhamos para a sua história para entender de onde elas vêm, sem julgamento: a regra é separar o ato da pessoa. |
| Raiva | A raiva que a gente não quer sentir costuma ter raízes em vivências antigas. Compreender essa história ajuda a mudar a forma como ela comanda a sua vida. |
| Medo | O medo é uma forma de proteção que a mente aprendeu cedo. Na parapsicologia clínica, buscamos compreender esse medo para que ele deixe de decidir por você. |
| Insegurança | A sensação de não merecer ou de não ser capaz costuma vir de vivências antigas. O trabalho começa conhecendo a sua história, no seu ritmo. |
| Tristeza | A tristeza merece ser olhada com cuidado. Aqui você encontra um espaço de acolhimento para entender a sua história e voltar a sentir prazer em viver. |
| Mágoa | Mágoas e ressentimentos pesam nas relações e na forma como nos vemos. Compreender o que ficou mal resolvido abre caminho para mais leveza. |
| Só estou conhecendo | Que bom ter você aqui. Os cartões abaixo explicam, em poucas palavras, como a parapsicologia clínica funciona. |

Só na resposta de **Tristeza**, acrescentar uma linha final em texto pequeno, sem destaque: "Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito."

### 2.3 Baralho de flash cards

- h2: "Para entender em poucas palavras" (com `tabindex="-1"`, para receber o foco vindo de "Ver como funciona").
- Quatro cartões empilhados: o da frente inteiro e os de trás levemente deslocados para baixo e para os lados, mostrando que há mais cartões.
- Acima do baralho: "Cartão X de 4". Abaixo: botões "Anterior" e "Próximo" (desativados nas pontas). Deslizar o cartão com o dedo para os lados é um atalho, nunca a única forma de navegar.
- Frente de cada cartão: a pergunta em destaque e o apoio "Toque para ver a resposta".
- Tocar na frente vira o cartão (giro em Y de 450 ms) e mostra o verso. Tocar de novo volta para a frente. O cartão é um `button` com `aria-expanded`; o verso fica no DOM e é lido por leitor de tela quando aberto. Com "reduzir movimento", o giro vira uma troca de opacidade.
- Ao trocar de cartão, o novo aparece sempre pela frente.

**Conteúdo dos cartões:**

1. **Frente:** "O que é a parapsicologia clínica?"
   **Verso (rascunho):** "A parapsicologia do Sistema Grisa busca entender como funciona a mente humana. A mente é uma só, mas funciona como duas: a consciente, racional, e a subconsciente, emocional. Ela dialoga com a psicologia, a psicanálise e a psiquiatria como aliadas importantes."
   Link: "Mais dúvidas" → `../#/duvidas`.
2. **Frente:** "Como ela pode ajudar?"
   **Verso (rascunho):** "Quem procura costuma trazer angústia, ansiedade, raiva, culpa ou a sensação de não merecer as próprias conquistas. Não prometemos milagres: o caminho é ficar mais consciente do próprio poder de pensar, decidir e conduzir a própria vida."
   Link: "Ver o atendimento" → `../#/atendimento`.
3. **Frente:** "Como é uma sessão?"
   **Verso:** "Cerca de 1h30, online ou presencial." e a lista numerada: 1. Conhecer a sua história. 2. Olhar para os sentimentos que mais marcam a sua vida. 3. Definir metas a curto, médio e longo prazo, juntos. 4. Tarefas entre as sessões, no seu tempo.
   Link: "Ver as 8 etapas" → `../#/atendimento/etapas`.
4. **Frente:** "Quem sou eu?"
   **Verso:** a biografia curta (seção 1.2).
   Link: "Formação e vínculos" → `../#/sobre`.

### 2.4 Convite para o quiz

- h2: "Quiz de autoconhecimento"
- Texto: "São 6 perguntas rápidas sobre como você tem vivido os seus desafios. Leva cerca de 2 minutos."
- Pílula "Começar o quiz" → abre o quiz.
- `details` "O que é o quiz?": "Não é um diagnóstico: é um convite para olhar para a sua história com mais atenção. Nada é guardado sem a sua permissão."

### 2.5 Demais seções

"Acolhimento e sigilo", "Online ou presencial", "O que dizem no Google", "No YouTube, em temporadas" e "Quer conversar antes de marcar?" ficam como estão na B, só com os links corrigidos para as páginas da A (seção 2) e "Agendar sessão" no lugar de "Agendar uma sessão".

### 2.6 Barra flutuante em pílula

- Substitui o botão flutuante de WhatsApp.
- Pílula flutuante centralizada, a 16 px da base, com dois botões: "WhatsApp" (secundário, mostra o aviso) e "Agendar sessão" (principal).
- Só aparece depois que as ações do topo saem da tela (usar IntersectionObserver), para não repetir os mesmos botões na mesma tela. Aparece e some com fade de 200 ms (sem animação com "reduzir movimento").
- O conteúdo e o rodapé têm espaço no fim para não ficarem escondidos atrás dela.

## 3. Quiz de autoconhecimento

Página própria da C: `alternativa-c/quiz.html`, com o mesmo cabeçalho, rodapé e barra flutuante. "Voltar" no cabeçalho leva ao Início da C.

### 3.1 Abertura

- h1: "Quiz de autoconhecimento"
- Texto: "São 6 perguntas rápidas sobre como você tem vivido os seus desafios. Não existe resposta certa, e não é um diagnóstico: é um convite para olhar para a sua história com mais atenção. Nada é guardado sem a sua permissão."
- Pílula "Começar". Apoio: "Leva cerca de 2 minutos."

### 3.2 Perguntas em baralho

- Mesma linguagem visual do baralho do Início: cartão da frente com a pergunta e os de trás deslocados.
- Acima do baralho: "Pergunta X de 6".
- Opções como botões grandes (rádios nativos estilizados, mínimo 44 px de altura). Tocar numa opção marca a escolha.
- "Próxima" (desativado até haver escolha) faz o cartão deslizar para fora (300 ms) e revela o próximo. "Voltar" traz o cartão anterior de volta, com a resposta mantida. Com "reduzir movimento", deslize vira troca de opacidade.
- Ao trocar de cartão, o foco vai para o título da pergunta.
- A ordem das opções abaixo é a de exibição. A letra indica o tema e não aparece na tela.

| # | Pergunta | Opções (tema) |
|---|---|---|
| 1 | Quando algo dá certo na sua vida, o que costuma acontecer depois? | Sinto que não mereço e acabo perdendo o que conquistei. (A) · Me irrito porque ninguém reconhece o meu esforço. (B) · Fico com medo de que dê errado a qualquer momento. (C) · Parece que ninguém percebeu, e isso me entristece. (D) |
| 2 | Em uma discussão, o que você costuma fazer? | Travo: a voz some e as palavras não saem. (C) · Peço desculpas, mesmo quando não errei. (A) · Me afasto e sinto que ninguém me ouve. (D) · Explodo ou guardo a raiva por muito tempo. (B) |
| 3 | Nas suas relações, com família, amizades ou amor, o que mais se repete? | Decepções com quem eu confiava. (B) · Sinto que não me valorizam como eu gostaria. (D) · Cuido de todo mundo e fico por último. (A) · Medo de me entregar e me machucar. (C) |
| 4 | Quando você pensa no futuro, o que aparece primeiro? | Um vazio, como se faltasse alguma coisa. (D) · A insegurança de errar e não ter como voltar atrás. (C) · Cansaço de sempre ter que brigar pelas coisas. (B) · A sensação de que coisas boas não são para mim. (A) |
| 5 | Qual frase combina mais com você hoje? | Eu me cobro demais. (A) · Eu evito arriscar. (C) · Eu guardo mágoas que não queria sentir. (B) · Eu me sinto só, mesmo entre pessoas. (D) |
| 6 | O que você gostaria de sentir mais? | Confiança para decidir. (C) · Alegria de viver. (D) · Que eu mereço o que conquisto. (A) · Paz nas minhas relações. (B) |

### 3.3 Resultado

- Cada opção soma um ponto ao seu tema. O resultado é o tema com mais pontos. Em empate, mostrar os temas empatados, um abaixo do outro, na ordem A, B, C, D.
- Depois da sexta pergunta, o último cartão do baralho mostra na frente "Seu resultado está pronto" e "Toque para ver". Ao tocar, o cartão vira (giro em Y de 450 ms, troca de opacidade com "reduzir movimento") e mostra o resultado. O foco vai para o título do resultado.

**Resultados (rascunho):**

- **A. A cobrança e o não merecimento.** "Suas respostas mostram uma tendência a se cobrar muito e a sentir que coisas boas não são para você. Muitas vezes, essa sensação vem de vivências antigas, da infância ou da família, que seguem atuando sem que a gente perceba." **Na parapsicologia clínica:** "O trabalho começa conhecendo a sua história e a sua tabela familiar, para entender de onde vem essa cobrança e o que ela tem comandado na sua vida."
- **B. A mágoa e a raiva guardadas.** "Suas respostas mostram mágoas e uma raiva que, talvez, você nem queira sentir. Esses sentimentos costumam ter origem em situações que ficaram mal resolvidas e voltam a aparecer nas relações de hoje." **Na parapsicologia clínica:** "A busca pelos cinco maiores sentimentos que marcam as fases da sua vida ajuda a entender o que alimenta essa raiva, sem julgamento: a regra é separar o ato da pessoa."
- **C. O medo de errar.** "Suas respostas mostram insegurança e medo de errar, a ponto de travar ou evitar riscos. Esse medo costuma ser uma forma antiga de proteção, que um dia fez sentido e hoje pode estar limitando as suas escolhas." **Na parapsicologia clínica:** "O processo olha para a sua história e define metas a curto, médio e longo prazo, no seu ritmo, para você retomar a confiança nas próprias decisões."
- **D. A tristeza e a sensação de não ser valorizado.** "Suas respostas mostram uma tristeza e a sensação de que falta alguma coisa, ou de não ser valorizado como gostaria. Sentimentos assim costumam ter raízes que vale a pena compreender com calma." **Na parapsicologia clínica:** "O trabalho busca compreender a sua história para que você volte a sentir prazer em viver, com tarefas, áudios e filmes entre as sessões."

Abaixo do resultado:

- "Este quiz não é um diagnóstico. Ele é um ponto de partida para uma conversa."
- Ações: "Receber o resultado por e-mail" (abre o formulário da seção 3.4), "Conversar com a Maria Clara" (aviso do WhatsApp), "Agendar sessão" (`../#/agendar/1`) e "Refazer o quiz" (volta à abertura e limpa as respostas).

### 3.4 Envio do resultado por e-mail (simulado)

- Formulário curto, que aparece abaixo das ações:
  - Campo "Seu e-mail" (`type="email"`, label visível).
  - Caixa obrigatória: "Quero receber meu resultado neste e-mail. O e-mail é usado só para este envio e não fica guardado."
  - Botão "Enviar resultado".
- Validação própria (`novalidate`), como no agendamento: campo vazio mostra "Preencha este campo."; e-mail sem "@" mostra "Digite um e-mail válido."; caixa desmarcada mostra "Confirme que quer receber o resultado neste e-mail." O foco vai para o primeiro erro.
- Envio válido: o formulário é trocado pela mensagem "Pronto! Neste ponto o resultado seria enviado para o seu e-mail." (`role="status"`). Nada é enviado nem guardado.

## 4. Fidelidade e regras

Valem as regras do `CLAUDE.md`: tons de cinza, uma cor escura para ações principais, nenhuma fonte externa, nenhuma chamada de rede, estado só em memória, alvos de toque de no mínimo 44 px, contraste AA, foco visível e navegação por teclado. A única exceção nova é a fonte serifada do sistema no nome e na profissão do topo (seção 2.1).

## 5. Criar `alternativa-c/MUDANCAS.md`

Criar o arquivo da C, no mesmo formato do da B, com o que muda em relação à B e à A: estrutura, comportamento, textos em rascunho e a lista de pontos em aberto abaixo.

**Em aberto (para validar com a Maria Clara):**

1. Textos em rascunho: biografia, trajetória, respostas dos sentimentos, versos dos cartões, perguntas e resultados do quiz.
2. Lista final de sentimentos.
3. Se o quiz entra no MVP (estava previsto para a V2).
4. Texto do aviso do CVV no rodapé.
5. Evolução para um segundo momento: dar à Maria Clara acesso às respostas do quiz de quem autorizar. Exige guardar dados sobre sentimentos, consentimento específico e destacado e revisão de LGPD.

## 6. Critérios de aceite

- [ ] O CVV aparece só no rodapé, como aviso discreto, em todas as telas da A e da C, incluindo os três passos do agendamento. Nenhuma caixa "Em sofrimento intenso?" restante.
- [ ] A linha "Registro FATECPR · Associada à ABPSIG" aparece no rodapé da A e da C.
- [ ] Biografia e trajetória substituem os espaços reservados na A.
- [ ] Topo da C: nome em serifa, "Parapsicóloga clínica" em itálico, h1 e apoio sobre o espaço reservado da imagem, com contraste AA; pílula "Agendar sessão" e botão redondo do WhatsApp.
- [ ] Animação de entrada só acontece uma vez e não acontece com "reduzir movimento".
- [ ] Os 7 chips funcionam com toque e teclado; cada um mostra a resposta certa; só "Tristeza" mostra a linha do 188.
- [ ] "Ver como funciona" rola até o baralho e leva o foco ao título.
- [ ] Baralho: "Cartão X de 4", Anterior e Próximo, giro com toque e teclado, verso lido por leitor de tela, troca de opacidade com "reduzir movimento".
- [ ] Os links dos cartões e do menu levam às páginas certas da A.
- [ ] A barra flutuante só aparece depois que as ações do topo saem da tela e não esconde conteúdo nem o rodapé.
- [ ] Quiz: 6 perguntas em baralho, "Próxima" desativado sem escolha, "Voltar" mantém a resposta, resultado correto para respostas todas A, todas B, todas C, todas D e para um empate.
- [ ] Resultado vira ao toque; e-mail simulado valida os três erros e mostra a mensagem de sucesso sem enviar nada.
- [ ] "Refazer o quiz" limpa tudo.
- [ ] Nenhum texto fora desta especificação e da especificação da A; nenhuma cor além dos cinzas e da cor escura; nenhuma chamada de rede.
- [ ] Nenhum arquivo de `alternativa-b/` foi alterado.
- [ ] `alternativa-c/MUDANCAS.md` criado; `CLAUDE.md` e `docs/especificacao-prototipo.md` atualizados.
- [ ] O README do repositório lista as três alternativas com os links publicados.
