# Alternativa C: o que muda em relação à B e à A

A C parte de uma cópia da B (congelada como registro) e aplica a revisão de [`docs/especificacao-alternativa-c.md`](../docs/especificacao-alternativa-c.md), que é a fonte da verdade para telas, textos e interações. Este arquivo registra só o que a especificação não diz: as decisões de implementação, os riscos para o teste e o que ainda está em aberto.

Publicação: <https://ludgero-lab.github.io/percurso-prototipo/site/>

A pasta se chama `site/` (antes `alternativa-c/`) para o link do teste não mostrar "alternativa C" às pessoas participantes. O nome "alternativa C" continua na documentação.

A C é um site completo: Início, quiz, páginas internas (Sobre, Atendimento, Conteúdo, Dúvidas) e agendamento, todos com a mesma linha visual e de usabilidade. Nenhum link sai da C.

## 1. Em aberto (para validar com a Maria Clara)

1. Textos em rascunho: biografia, trajetória, respostas dos sentimentos, versos dos cartões, perguntas e resultados do quiz, e os textos novos de "Aqui você pode falar à vontade", "Online ou no consultório: você escolhe", "Conheça meu canal no YouTube" com o texto de convite (confirmar se os temas citados estão no canal) e a abertura de Conteúdo.
2. Respostas das opções novas de "Com o que você está chegando hoje?" (hoje entre colchetes) e se o texto escrito em "Outros" deve seguir para algum lugar no site final (por exemplo, a mensagem do WhatsApp).
3. Se o quiz entra no MVP (estava previsto para a V2).
4. Texto do aviso do CVV no rodapé.
5. Evolução para um segundo momento: dar à Maria Clara acesso às respostas do quiz de quem autorizar. Exige guardar dados sobre sentimentos, consentimento específico e destacado e revisão de LGPD.
6. Conferir a adaptação do retorno de 23/11 (seção 3, "Retorno da Maria Clara"), em especial os trechos que ficaram de fora por prometerem resultado.

## 2. Riscos para o teste

- **Altura do baralho do quiz:** os cartões ocupam a mesma célula, então o cartão do resultado tem a altura da pergunta mais longa e fica com espaço em branco quando há um só tema.

- **Termos clínicos nas opções:** "Depressão", "Síndrome do pânico" e "Ansiedade" vêm da Maria Clara. Podem levar a pessoa a esperar um tratamento de saúde; as duas primeiras mostram a linha do CVV (188). Observar no teste como as pessoas leem essas opções.

## 3. Decisões que a especificação não definia

**Retorno da Maria Clara (23/11): onde cada pedido entrou**
- Regra seguida: o topo, área mais nobre, não muda; o que é complementar desce de nível (cartão, página Dúvidas).
- **Três frases para o Início** ("conduzir o seu caminho…", "sintonizar…", "aliviar tensões…"): viraram a lista do verso do cartão "Como ela pode ajudar?", no lugar do texto antigo, que repetia os sentimentos já listados nas opções. Ficou "Sem prometer milagres" na abertura, para manter o equilíbrio.
- **Opções de "Com o que você está chegando hoje?"**: as oito dela, com rótulos curtos de chip ("Traumas" em vez de "Traumas diversos", "Não encontro meu lugar no mundo" em primeira pessoa, "Síndrome do pânico" com a grafia usual). "Só estou conhecendo" continua, como saída para quem não quer se rotular.
- **"O que é parapsicologia clínica?"**: o cartão traz um resumo de três frases, com as duas que ela destacou em negrito; o texto completo fica em Dúvidas, que o link "Mais dúvidas" abre já na pergunta.
- **"Mais dúvidas"**: dividido em duas dúvidas novas, para cada resposta caber num cartão que abre: "Como o Sistema Grisa vê a pessoa?" e "E os fenômenos paranormais?". As perguntas são nossas; as respostas são o texto dela.
- **Revisão:** só grafia e concordância, sem mudar o sentido: "funciona como dois - 0 consciente" → "funciona como duas: a consciente"; "através da" → "por meio da"; "alheio" → "alheios"; "livre arbítrio" → "livre-arbítrio"; "ordem físico" → "ordem física"; "programações ameaçadores" → "ameaçadoras"; "telepatias desconfortantes" → "desconfortáveis"; frases longas divididas.
- **Fora, por prometerem resultado (regra do projeto):** "para começar a desfrutar de resultados melhores, podendo inclusive ajudar pessoas que se encontram em situação de perigo" e "significando que você pode mudar ou alterar o resultado final". Voltam se a Maria Clara confirmar, com a redação dela.

**Estrutura**
- Cabeçalho, menu, rodapé, barra em pílula, voltar ao topo e aviso são montados uma vez só por `comum-c.js`, a partir de `<body data-pagina>`. Cada página traz só o próprio conteúdo.
- O agendamento usa a mesma lógica da A (`../agendamento.js`); a C cuida só da navegação entre os passos e do visual.
- "Voltar" no cabeçalho das páginas internas e do quiz leva ao Início da C. No agendamento, "Voltar" no passo 1 devolve à página da C de onde a pessoa veio.

**Imagem do topo**
- A foto original (paisagem, busto à esquerda, em cores) foi convertida para tons de cinza e recortada em retrato com o busto no centro e a parede de cima reduzida, para a figura caber inteira acima do painel de texto no celular (390 × 844). A mesa continua para baixo com a cor média dela, numa mistura gradual. Em telas mais baixas (667 px), o painel cobre parte do busto.

**Vídeo do canal**
- O player é criado só no toque, a partir de `youtube-nocookie.com`; antes disso, nenhuma chamada ao YouTube. O título do iframe é o título do vídeo mostrado abaixo dele (h3).
- "Inscreva-se no canal" é secundário no Início: a ação principal (escura) continua reservada para "Agendar sessão". Na página Conteúdo da C, o mesmo botão também diz "Inscreva-se no canal", para a C falar do mesmo jeito.

**Barra em pílula e voltar ao topo**
- Uma regra para todas as páginas: a barra aparece quando as ações marcadas com `data-acoes` (as de agendar e conversar de cada tela; no quiz, também "Começar" e "Voltar"/"Próxima") estão fora de vista.
- O voltar ao topo aparece depois de meia tela de rolagem, à direita e acima da barra.

**Baralho**
- Atrás do cartão da frente aparecem os que ainda faltam (até dois); no último, não há nada atrás.
- Se o botão com foco é desativado (nas pontas), o foco vai para o cartão.
- O cartão anda no sentido da seta: "Próximo" (›) o leva para fora pela direita; "Anterior" (‹) o leva para a esquerda e para trás da pilha, e o anterior sobe da pilha (em vez de voltar atravessando a tela, o que cruzaria dois cartões em sentidos opostos). O deslize com o dedo segue o mesmo sentido: para a direita avança, para a esquerda volta.
- No Início, a navegação é só por setas em botões redondos discretos, padrão de carrossel conhecido; o nome fica no `aria-label` e o contador "Cartão X de 4" continua visível. No quiz, "Voltar" e "Próxima" mantêm o texto com a seta ao lado, porque ali são passos de formulário.
- O cartão é um botão que cobre o cartão inteiro, e não o cartão dentro de um botão: o verso tem links, que não podem ficar dentro de um botão. O verso fica `inert` e `aria-hidden` enquanto fechado.

**Animação de entrada**
- Cada elemento começa 150 ms depois do anterior (cerca de 1 s no total), em vez de um depois do outro (2 s), para não atrasar a ação.

**Quiz**
- O h1 fica sempre visível; ao começar, somem o texto de abertura e o "Começar".
- No cartão do resultado não há contador nem "Próxima"; "Voltar" continua e devolve à pergunta 6.
- O resultado vira uma vez só. O título aparece sem a letra do tema.
- "Este quiz não é um diagnóstico…", as ações e o formulário ficam abaixo do baralho e aparecem depois de virar o resultado. "Agendar sessão" é a ação principal; "Refazer o quiz" é um link.

## 4. Estrutura do Início em relação à B

| Ordem | Seção | Em relação à B |
|---|---|---|
| — | Cabeçalho só com o botão de menu | Igual |
| 1 | Topo em tela cheia, só com "Agendar sessão" | Novo |
| 2 | "Com o que você está chegando hoje?" (chips) | Substitui o seletor em arco e o "Continuar" |
| 3 | Baralho de flash cards | Substitui os cards em rolagem e "Como é uma sessão" em lista |
| 4 | Convite para o quiz | Substitui o convite para o teste de perfil |
| 5–6 | "Aqui você pode falar à vontade" e "Online ou no consultório: você escolhe" | Mesmo conteúdo, textos novos (rascunho) |
| 7 | O que dizem no Google | Igual |
| 8 | "Conheça meu canal no YouTube" | Título novo (rascunho) |
| 9 | Quer conversar antes de marcar? | "Agendar sessão" |
| 10 | Rodapé com o CVV discreto e a linha de registro | Mudança global (também na A) |
| — | Barra flutuante em pílula e voltar ao topo | Substituem o botão flutuante de WhatsApp |

Só o topo tem a altura da tela. Na rolagem, o topo sobe inteiro, com a imagem e o quadro de texto juntos. Os efeitos de imagem parada testados (quadro de texto subindo sobre a imagem) saíram por ora e ficam para a implementação final; o encaixe na rolagem herdado da B também saiu.

## 5. Linha visual (estrutura, não estética)

A C segue a referência de estrutura e cartões em tons de cinza, para que a fase visual parta de uma estrutura já alinhada:

- **Formas:** cantos de 24 px em cartões e blocos e 16 px em controles; botões com texto em pílula; botões só de ícone redondos (menu, Voltar, voltar ao topo, meses do calendário).
- **Cartões:** só o quadro, sem sombra. A sombra fica só no que flutua (barra em pílula, voltar ao topo, bloco do passo 1).
- **Baralho:** cartões empilhados e alinhados na vertical, com hierarquia tonal (quanto mais ao fundo, mais escuro) e troca para os lados, no mesmo sentido do deslize do dedo. A mesma peça serve aos flash cards, às perguntas e ao resultado do quiz.
- **Componentes repetidos em todas as páginas:** chips (sentimentos, temporadas), listas em cartões, listas numeradas com o número num círculo, cartão de destaque para as ações finais, Dúvidas em cartões que abrem, dias e horários em pílula.
- **Hierarquia de títulos:** h1 das páginas internas e do quiz (32 px) > título das seções e do topo (24 px) > título dentro dos cartões (22 px) > texto (16 px) > apoio (14 a 15 px).
- **Espaço:** respiro generoso entre seções, sem linhas divisórias.
- **Fonte:** a única fonte nova é a serifa do sistema (`ui-serif, Georgia, serif`), no nome e na profissão do topo.

## 6. Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início |
| `quiz.html` | Quiz de autoconhecimento |
| `sobre.html`, `atendimento.html`, `conteudo.html`, `duvidas.html` | Páginas internas |
| `agendar.html` | Agendamento (passos `#/1`, `#/2`, `#/3`) |
| `estilo-c.css` | Só o que muda em relação a `../estilo.css`, em ordem: tokens, componentes, moldura, Início, páginas internas, agendamento, baralho, quiz, movimento |
| `comum-c.js` | Moldura da página (cabeçalho, menu, rodapé, barra, voltar ao topo, aviso) e o componente de baralho |
| `inicio-c.js` | Chips de sentimentos e flash cards |
| `quiz-c.js` | Perguntas, resultado, e-mail simulado e "Refazer o quiz" |
| `conteudo-c.js` | Temporadas e lista de episódios |
| `agendar-c.js` | Navegação entre os passos do agendamento (a lógica está em `../agendamento.js`) |
