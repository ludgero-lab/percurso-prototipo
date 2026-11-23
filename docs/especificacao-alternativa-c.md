# Especificação da alternativa C

Esta especificação cria a alternativa C, em `site/`, a partir da alternativa B. A B (`alternativa-b/`) é a tradução fiel do esboço à mão e fica **congelada como registro**: não alterar nenhum arquivo dela. A C parte de uma cópia da B e aplica a revisão abaixo. A alternativa A continua seguindo `docs/especificacao-prototipo.md`, com as mudanças globais da seção 1.

Todos os textos marcados como **(rascunho)** foram escritos a partir das respostas da Maria Clara no briefing e ainda serão validados por ela. Use-os exatamente como estão; não crie outros textos.

**Revisão 2 (aprovada):** a C passa a ter também as páginas internas e o agendamento próprios (seção 3A), com a mesma linha visual e de usabilidade do Início. Entraram também seis ajustes no Início: sem o botão redondo do WhatsApp no topo (2.1), baralho alinhado na vertical com troca para cima e para baixo (2.3), convite do quiz só com o quadro (2.4), novos textos em rascunho para três seções (2.5) e o botão de voltar ao topo (2.7).

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
| 1 | Topo em tela cheia: imagem da identidade visual, composição tipográfica e "Agendar sessão" |
| 2 | "Com o que você está chegando hoje?": escolha de um sentimento e resposta na própria página |
| 3 | Baralho de flash cards: O que é, Como pode ajudar, Como é uma sessão, Quem sou eu |
| 4 | Convite para o quiz de autoconhecimento |
| 5 | Acolhimento e sigilo ("Aqui você pode falar à vontade") |
| 6 | Online ou presencial ("Online ou no consultório: você escolhe") |
| 7 | O que dizem no Google |
| 8 | YouTube ("Conheça meu canal no YouTube") |
| 9 | Quer conversar antes de marcar? |
| 10 | Rodapé (seção 1.1) |
| — | Barra flutuante em pílula com WhatsApp e Agendar sessão (2.6) e botão de voltar ao topo (2.7) |

Em relação à B, sai do Início: o seletor em arco com emoções, o botão "Continuar" e a seção "Como é uma sessão" em lista (ela vira um cartão do baralho). Só o topo (seção 1) tem a altura da tela; as demais seções têm a altura do próprio conteúdo. Não há encaixe na rolagem (ver seção 2.1).

O cabeçalho do Início continua só com o botão de menu. O menu e o rodapé levam às páginas da própria C (seção 3A): `sobre.html`, `atendimento.html`, `conteudo.html` e `duvidas.html`.

Todo "Agendar sessão" da C leva ao agendamento da C (`agendar.html`). "Agendar online" leva a `agendar.html?modalidade=online`, que abre o passo 1 com Online marcado. "Ver rota" leva a `atendimento.html#presencial`. Usar sempre "Agendar sessão" (não "Agendar uma sessão").

### 2.1 Topo

- Ocupa a altura da tela do celular (menos o cabeçalho).
- Rolagem: o topo rola inteiro, com a imagem e o quadro de texto juntos, sem efeito. Sem encaixe na rolagem. (Efeitos de imagem parada ficam para a implementação final.)
- Fundo: a imagem da identidade visual (busto com flores), em tons de cinza, em `site/img/topo.jpg`, no lugar do espaço reservado. Ela foi recortada em retrato com o busto no centro da faixa de cima, acima do painel de texto; abaixo, a superfície da mesa continua sem emenda. É decorativa (`alt=""`), local (sem chamada de rede) e a única foto do protótipo. O texto fica por cima, numa área com fundo claro semitransparente que garante contraste AA.
- Composição tipográfica, de cima para baixo:
  - "Maria Clara Vinotti" em tamanho grande (40 px no celular), fonte serifada do sistema (`ui-serif, Georgia, serif`), sem fontes externas.
  - "Parapsicóloga clínica" em itálico, mesma família serifada, 20 px.
  - h1: "Parapsicologia clínica feita com acolhimento e parceria" (fonte do sistema, 24 px).
  - Apoio: "Um espaço para olhar para os seus desafios no seu ritmo, entender a sua história e conduzir o seu caminho com mais consciência, online ou em Florianópolis."
- Ação na base do bloco: pílula principal "Agendar sessão". (Revisão 2: sai o botão redondo do WhatsApp; o WhatsApp continua na barra em pílula e em "Quer conversar antes de marcar?".)
- Animação de entrada (só como marcação de intenção): os textos aparecem com um fade de 400 ms, em sequência (nome, profissão, título, apoio, ações), uma vez ao abrir a página. Com "reduzir movimento" ativado, tudo aparece sem animação. A animação da imagem fica para a fase visual e não entra no protótipo.

### 2.2 "Com o que você está chegando hoje?"

- h2: "Com o que você está chegando hoje?"
- Apoio: "Escolha uma opção. Sua resposta não é guardada."
- Opções em chips (rádios nativos estilizados como chips, num `fieldset` com legenda escondida igual ao título), nenhuma marcada no início: Sensação de não merecimento · Encontrar sentido para a vida · Ansiedade · Depressão · Síndrome do pânico · Traumas · Não encontro meu lugar no mundo · Outros · Só estou conhecendo (lista da Maria Clara, retorno de 23/11).
- Ao escolher, aparece abaixo, numa área `aria-live="polite"`, um cartão de resposta com o texto correspondente e duas ações:
  - Link "Ver como funciona": rola até o baralho de flash cards e leva o foco ao título dele.
  - Link "Fazer o quiz de autoconhecimento": abre o quiz.
- Trocar de opção troca o texto da resposta.

**Respostas:** a Maria Clara ainda vai escrever as respostas de cada opção; até lá, cada uma mostra o espaço reservado "[Resposta para <opção>]". "Só estou conhecendo" mantém: "Que bom ter você aqui. Os cartões abaixo explicam, em poucas palavras, como a parapsicologia clínica funciona."

**Outros:** não tem resposta; abre um campo de texto com o rótulo "Se quiser, conte o motivo da sua busca" (adaptado de "Se a resposta for outros, explique o motivo de sua busca") e, abaixo, o botão secundário "Conversar no WhatsApp" (aviso simulado). No site final, o texto escrito vai pré-preenchido na mensagem do WhatsApp; no protótipo, nada é guardado nem enviado.

**Resposta visível:** ao escolher uma opção, se o cartão de resposta ficar abaixo da dobra ou atrás da barra em pílula, a página rola só o necessário para mostrá-lo, sem tirar da tela a opção tocada (sem animação com "reduzir movimento").

Nas respostas de **Depressão** e **Síndrome do pânico**, acrescentar uma linha final em texto pequeno, sem destaque: "Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito."

### 2.3 Baralho de flash cards

- h2: "Para entender em poucas palavras" (com `tabindex="-1"`, para receber o foco vindo de "Ver como funciona").
- Quatro cartões empilhados: o da frente inteiro e os de trás alinhados no centro, um pouco mais estreitos e deslocados para baixo, mostrando que há mais cartões. **Regra de hierarquia tonal:** quanto mais ao fundo, mais escuro o cartão (frente #f2f2f2, primeiro de trás #e0e0e0, último #cbcbcb). Os cartões não têm sombra: só o quadro.
- Troca de cartão para os lados: o cartão anda no sentido da seta tocada. Em "Próximo" (seta da direita), o cartão da frente desliza inteiro para fora pela direita, girando de leve, e some só no fim, enquanto o seguinte sobe para o lugar; em "Anterior" (seta da esquerda), o movimento se espelha: o cartão da frente desliza para a esquerda e volta para trás da pilha, enquanto o anterior sobe da pilha para a frente. Movimento evidente e suave (650 ms, começa e termina devagar). Com "reduzir movimento", vira troca de opacidade.
- Acima do baralho: "Cartão X de 4". Abaixo, centralizados: dois botões redondos discretos de 48 px, só com a seta (‹ e ›), contorno fino e nome para leitor de tela ("Cartão anterior" e "Próximo cartão"); desativados nas pontas. Deslizar o cartão com o dedo é um atalho (no mesmo sentido das setas: para a direita, próximo; para a esquerda, anterior), nunca a única forma de navegar.
- Frente de cada cartão: a pergunta em destaque e o apoio "Toque para ver a resposta".
- Tocar na frente vira o cartão (giro em Y de 450 ms) e mostra o verso. Tocar de novo volta para a frente. O cartão é um `button` com `aria-expanded`; o verso fica no DOM e é lido por leitor de tela quando aberto. Com "reduzir movimento", o giro vira uma troca de opacidade.
- Ao trocar de cartão, o novo aparece sempre pela frente.

**Conteúdo dos cartões:**

1. **Frente:** "O que é a parapsicologia clínica?"
   **Verso (resumo do texto da Maria Clara):** "A mente é uma só, mas funciona como duas: a consciente e a subconsciente. A parapsicologia clínica ajuda a entender e dar sentido ao que gerou conflitos, por meio da compreensão. Com orientação parapsicológica e hipnose, é possível reprogramar o que age sem a sua vontade consciente."
   Link: "Mais dúvidas" → `duvidas.html#o-que-e` (a dúvida chega aberta, com o foco na pergunta). O texto completo fica lá.
2. **Frente:** "Como ela pode ajudar?"
   **Verso:** "Sem prometer milagres, o trabalho busca ajudar você a:" e a lista: Conduzir o seu caminho, com novas percepções diante das dificuldades. · Sintonizar com o seu jeito de ser e estar hoje, sem as sombras do passado. · Aliviar tensões e pressões que alimentam o medo de sofrer e o medo de morrer. (As três frases que a Maria Clara pediu para o Início; o topo fica curto.)
   Link: "Ver o atendimento" → `atendimento.html`.
3. **Frente:** "Como é uma sessão?"
   **Verso:** "Cerca de 1h30, online ou presencial." e a lista numerada: 1. Conhecer a sua história. 2. Olhar para os sentimentos que mais marcam a sua vida. 3. Definir metas a curto, médio e longo prazo, juntos. 4. Tarefas entre as sessões, no seu tempo.
   Link: "Ver as 8 etapas" → `atendimento.html#etapas`.
4. **Frente:** "Quem sou eu?"
   **Verso:** a biografia curta (seção 1.2).
   Link: "Formação e vínculos" → `sobre.html`.

### 2.4 Convite para o quiz

- h2: "Quiz de autoconhecimento"
- Texto: "São 6 perguntas rápidas sobre como você tem vivido os seus desafios. Leva cerca de 2 minutos."
- Pílula "Começar o quiz" → abre o quiz.
- `details` "O que é o quiz?": "Não é um diagnóstico: é um convite para olhar para a sua história com mais atenção. Nada é guardado sem a sua permissão."
- Só o quadro do cartão, sem formas atrás nem sombra.

### 2.5 Demais seções

"O que dizem no Google" e "Quer conversar antes de marcar?" ficam como estão na B, só com os links para as páginas da C (seção 2) e "Agendar sessão" no lugar de "Agendar uma sessão".

As outras três seções ganham textos novos, na voz da Maria Clara (primeira pessoa, como "Me chame no WhatsApp" e "Quem sou eu?"), para ficarem mais naturais.

**Acolhimento e sigilo (rascunho):**
- h2: "Aqui você pode falar à vontade"
- **Sem julgamentos.** O que você fez não define quem você é: aqui, a regra é separar o ato da pessoa.
- **Tudo fica entre nós.** O que você conta nas sessões é guardado em sigilo absoluto.
- **Construímos o caminho juntos.** Entre uma sessão e outra, você recebe tarefas, áudios e filmes para seguir no seu ritmo.

**Online ou presencial (rascunho):**
- h2: "Online ou no consultório: você escolhe"
- Cartão **Online**: "De qualquer lugar do Brasil ou do exterior, por Google Meet ou WhatsApp. Você vê os horários no seu fuso." Link "Agendar online".
- Cartão **Presencial**: "No consultório no Balneário, Estreito, em Florianópolis (SC)." Link "Ver rota".

**YouTube (rascunho):**
- h2: "Conheça meu canal no YouTube" (no lugar de "No YouTube, em temporadas"): um convite a conhecer o canal, sem prometer uma frequência de vídeos.
- Texto de convite (rascunho): "No canal, eu explico de um jeito simples como funciona a parapsicologia clínica e converso sobre sentimentos que pesam no dia a dia, como culpa, medo e mágoa. Comece por este vídeo e fique à vontade para explorar."
- Vídeo: o espaço mostra uma capa cinza com o botão de play. Ao tocar, entra o player do vídeo https://youtu.be/3LOUZY9A1qo, carregado de `youtube-nocookie.com` (sem cookies de rastreio), e o foco vai para ele. Antes do toque não há nenhuma chamada ao YouTube. É a única exceção à regra de "nenhuma chamada de rede".
- Abaixo do vídeo, o título real do vídeo como h3 (abaixo do h2 da seção): "Introdução à Parapsicologia Clínica | Sistema Grisa". Temporada e episódio ficam ocultos por ora.
- No lugar de "Ver todos os episódios", um convite ao canal: o texto "Aproveite também para se inscrever no canal." (rascunho) e o botão secundário em pílula "Inscreva-se no canal" (mostra o aviso "Neste ponto abriria o canal no YouTube."). Na página Conteúdo da C, o botão do canal também passa a "Inscreva-se no canal".

### 2.6 Barra flutuante em pílula

- Substitui o botão flutuante de WhatsApp.
- Pílula flutuante centralizada, a 16 px da base, com dois botões: "WhatsApp" (secundário, mostra o aviso) e "Agendar sessão" (principal).
- Só aparece depois que as ações principais da tela saem de vista (usar IntersectionObserver), para não repetir os mesmos botões nem cobrir os da página. No Início, são as ações do topo e de "Quer conversar antes de marcar?"; nas demais páginas, as ações de cada uma. Aparece e some com fade de 200 ms (sem animação com "reduzir movimento").
- Está em todas as páginas da C, exceto no agendamento.
- O conteúdo e o rodapé têm espaço no fim para não ficarem escondidos atrás dela.

### 2.7 Voltar ao topo

- Botão redondo de 48 px com seta para cima (`aria-label="Voltar ao topo"`), à direita, acima da barra em pílula.
- Aparece quando a página desce (depois de meia tela) e some no topo, com o mesmo fade da barra.
- Leva ao topo (rolagem suave, sem animação com "reduzir movimento") e o foco ao h1 da página.
- Está em todas as páginas da C, exceto no agendamento.

## 3. Quiz de autoconhecimento

Página própria da C: `site/quiz.html`, com o mesmo cabeçalho, rodapé e barra flutuante. "Voltar" no cabeçalho leva ao Início da C.

### 3.1 Abertura

- h1: "Quiz de autoconhecimento"
- Texto: "São 6 perguntas rápidas sobre como você tem vivido os seus desafios. Não existe resposta certa, e não é um diagnóstico: é um convite para olhar para a sua história com mais atenção. Nada é guardado sem a sua permissão."
- Pílula "Começar". Apoio: "Leva cerca de 2 minutos."

### 3.2 Perguntas em baralho

- Mesma linguagem visual do baralho do Início: cartão da frente com a pergunta e os de trás deslocados.
- Acima do baralho: "Pergunta X de 6".
- Opções como botões grandes (rádios nativos estilizados, mínimo 44 px de altura). Tocar numa opção marca a escolha.
- "Próxima" (desativado até haver escolha) faz o cartão deslizar para fora pela direita e revela o próximo, com o mesmo movimento dos flash cards (seção 2.3). "Voltar" espelha o movimento (o cartão vai para a esquerda e o anterior volta da pilha), com a resposta mantida. Os dois botões mantêm o texto, com a seta ao lado: aqui são decisões de um formulário, não só navegação. Com "reduzir movimento", vira troca de opacidade.
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

## 3A. Páginas internas e agendamento da C

A C tem as mesmas páginas da A, em arquivos próprios: `sobre.html`, `atendimento.html` (âncoras `#presencial` e `#etapas`), `conteudo.html`, `duvidas.html` e `agendar.html` (passos `#/1`, `#/2` e `#/3`).

- **Conteúdo e textos:** os da especificação da A, com as mudanças globais da seção 1. Três exceções, para a C falar do mesmo jeito em todas as páginas: em Atendimento, a seção "Online ou presencial" usa o título e os textos da seção 2.5; em Dúvidas, "O que é parapsicologia clínica?" traz o texto completo da Maria Clara (o primeiro flash card é o resumo dele), seguido de duas dúvidas novas com o texto "Mais dúvidas" dela: "Como o Sistema Grisa vê a pessoa?" e "E os fenômenos paranormais?" (ver `site/MUDANCAS.md`); em Conteúdo, o texto de abertura passa a "Vídeos em temporadas, sobre temas escolhidos pela Maria Clara." (rascunho), sem prometer um vídeo por semana.
- **Linha visual e usabilidade:** as mesmas do Início e do quiz: cabeçalho com Voltar (leva ao Início da C) e menu redondos, menu com a página atual, título da página como o do quiz, seções em cartões arredondados, listas numeradas com o número num círculo, temporadas em chips, Dúvidas em cartões que abrem, ações finais em cartão de destaque, barra em pílula (2.6), voltar ao topo (2.7) e o mesmo rodapé.
- **Agendamento:** mesmo comportamento da A, com a linha visual da C (progresso em pílula, calendário num cartão, dias e horários em pílula, bloco do passo 1 flutuante). Sem menu, sem barra em pílula e com o rodapé curto. "Voltar" no passo 1 devolve à página da C de onde a pessoa veio; "Voltar ao início" leva ao Início da C. A lógica do agendamento é a mesma da A (`agendamento.js`).

## 4. Fidelidade e regras

Valem as regras do `CLAUDE.md`: tons de cinza, uma cor escura para ações principais, nenhuma fonte externa, nenhuma chamada de rede, estado só em memória, alvos de toque de no mínimo 44 px, contraste AA, foco visível e navegação por teclado. A única exceção nova é a fonte serifada do sistema no nome e na profissão do topo (seção 2.1).

## 5. Criar `site/MUDANCAS.md`

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
- [ ] Topo da C: nome em serifa, "Parapsicóloga clínica" em itálico, h1 e apoio sobre o espaço reservado da imagem, com contraste AA; pílula "Agendar sessão", sem o botão redondo do WhatsApp.
- [ ] Animação de entrada só acontece uma vez e não acontece com "reduzir movimento".
- [ ] Os 9 chips funcionam com toque e teclado; cada um mostra a resposta certa; só "Depressão" e "Síndrome do pânico" mostram a linha do 188; "Outros" abre o campo do motivo.
- [ ] "Ver como funciona" rola até o baralho e leva o foco ao título.
- [ ] Baralho: "Cartão X de 4", setas de anterior e próximo com nome acessível, giro com toque e teclado, verso lido por leitor de tela, troca de opacidade com "reduzir movimento".
- [ ] Baralho alinhado na vertical, sem sombra, com hierarquia tonal (cada cartão de trás mais escuro) e troca para os lados, evidente e suave; o mesmo no quiz.
- [ ] Os links dos cartões, das seções e do menu levam às páginas certas da C; nenhum link sai da C.
- [ ] A barra flutuante só aparece depois que as ações principais da tela saem de vista e não esconde conteúdo nem o rodapé.
- [ ] O botão de voltar ao topo aparece quando a página desce, leva ao topo e o foco ao h1.
- [ ] Páginas internas da C com o conteúdo da A e a linha visual da C; âncoras `#presencial` e `#etapas` levam o foco ao título.
- [ ] Agendamento da C cumpre os critérios do agendamento da A ("Agendar online", calendário, Lisboa, "Continuar" sem escolhas, resumo, "Alterar", validação, passo 3).
- [ ] Quiz: 6 perguntas em baralho, "Próxima" desativado sem escolha, "Voltar" mantém a resposta, resultado correto para respostas todas A, todas B, todas C, todas D e para um empate.
- [ ] Resultado vira ao toque; e-mail simulado valida os três erros e mostra a mensagem de sucesso sem enviar nada.
- [ ] "Refazer o quiz" limpa tudo.
- [ ] Nenhum texto fora desta especificação e da especificação da A; nenhuma cor além dos cinzas e da cor escura; nenhuma chamada de rede, exceto o vídeo do canal depois do toque no play.
- [ ] Nenhum arquivo de `alternativa-b/` foi alterado.
- [ ] `site/MUDANCAS.md` criado; `CLAUDE.md` e `docs/especificacao-prototipo.md` atualizados.
- [ ] O README do repositório lista as três alternativas com os links publicados.
