# Especificação do protótipo de teste

## Objetivo do teste

Verificar se quem nunca ouviu falar de parapsicologia clínica entende a proposta, confia e consegue solicitar um agendamento sozinho, pelo celular. O protótipo precisa sustentar estas tarefas:

1. Descobrir como funciona uma sessão.
2. Encontrar sinais de confiança (formação, avaliações, sigilo).
3. Solicitar uma primeira sessão online numa quinta à tarde.
4. Entender que a sessão ainda não está confirmada.
5. Encontrar a rota para o atendimento presencial.
6. Encontrar como solicitar o pacote de 5 sessões.
7. (Participante remoto) Ver os horários convertidos para o fuso de Lisboa.

## Estrutura global

Vale para as páginas Início, Sobre, Atendimento, Conteúdo e Dúvidas.

- **Cabeçalho fixo:** à esquerda, "Maria Clara Vinotti" com "Parapsicóloga clínica" embaixo (leva ao Início). À direita, botão de menu (três linhas, `aria-label="Abrir menu"`).
- **Menu:** painel com Início, Sobre, Atendimento, Conteúdo, Dúvidas e botão "Fechar". Fecha com Esc e ao escolher um item. O foco vai para o painel ao abrir e volta ao botão ao fechar.
- **Barra fixa na base:** botão secundário "WhatsApp" e botão principal "Agendar sessão". O conteúdo da página tem espaço no fim para não ficar escondido atrás da barra.
- **Rodapé:** "Maria Clara Vinotti" / "Parapsicóloga clínica · Florianópolis e online"; links Início, Sobre, Atendimento, Conteúdo, Dúvidas; aviso do CVV; links "Política de privacidade" · "Termos de uso"; última linha "Registro FATECPR · Associada à ABPSIG".
- **Aviso do CVV:** parágrafo em texto pequeno (14 px), num bloco discreto com fundo levemente diferente do rodapé e cantos arredondados, sem borda, sem negrito, sem ícone e sem cor de destaque, com contraste AA: "Este site não oferece atendimento imediato em situações de crise. Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito, ou acesse cvv.org.br. Em emergência, procure o hospital mais próximo." "cvv.org.br" é um botão que mostra um aviso (ver Interações simuladas).
- Ao mudar de rota, a página volta ao topo e o foco vai para o título principal (h1).

## Página Início (`#/inicio`, rota padrão)

1. **Abertura:** [foto] pequena redonda + "Maria Clara Vinotti" / "Parapsicologia clínica, Sistema Grisa".
   - h1: "Parapsicologia clínica feita com acolhimento e parceria"
   - Texto: "Um espaço para olhar para os seus desafios no seu ritmo, entender a sua história e conduzir o seu caminho com mais consciência, online ou em Florianópolis."
   - Botões: "Agendar sessão" (principal) e "Conversar no WhatsApp" (secundário).
   - Apoio: "Sessões de cerca de 1h30, online ou presenciais."
2. **Vídeo:** rótulo "Vídeo de introdução"; h2 "Entenda como funciona, no seu ritmo"; caixa 16:9 com botão de play (`aria-label="Reproduzir vídeo de introdução"`); link "Ler a transcrição (legendas ativadas)".
3. **h2 "Como é uma sessão":** "Cerca de 1h30, online ou presencial. Você não chega para receber respostas prontas." Quatro cartões numerados:
   1. **Conhecer a sua história.** Ficha escrita e tabela familiar.
   2. **Olhar para os sentimentos** que mais marcam a sua vida.
   3. **Definir metas** a curto, médio e longo prazo, juntos.
   4. **Tarefas entre as sessões:** áudios, filmes e exercícios, no seu tempo.

   Link "Ver as 8 etapas" (vai para Atendimento, seção das etapas).
4. **h2 "Acolhimento e sigilo":**
   - **Ninguém é julgado.** Separar o ato da pessoa é a regra que ela segue.
   - **Sigilo absoluto.** O que você conta fica entre vocês.
   - **Cliente como sócio no processo.** Tarefas, áudios e filmes entre as sessões.
5. **h2 "Online ou presencial":**
   - Cartão **Online**: "Todo o Brasil e brasileiros no exterior. Por Google Meet ou WhatsApp, com o horário no seu fuso." Link "Agendar online" (abre o agendamento com Online já marcado).
   - Cartão **Presencial**: "Balneário, Estreito, Florianópolis (SC)." Link "Ver rota" (vai para Atendimento, seção Presencial).
6. **h2 "O que dizem no Google":** "[nota] · [nº] avaliações"; dois cartões em rolagem horizontal com "[texto da avaliação publicada no Google]" e "[nome] · [data]"; link "Ver todas no Google".
7. **Sobre resumido:** [foto]; h2 "Maria Clara Vinotti"; "Parapsicóloga clínica pelo Sistema Grisa." seguido da biografia curta (abaixo); link "Formação e vínculos" (vai para Sobre).

   **Biografia curta (rascunho):** "Professora de Letras (Português e Inglês), especialista em Gestão Escolar e especialista em análise, orientação e hipnoterapia em Parapsicologia Clínica pelo Sistema Grisa. Atendo há sete anos."
8. **h2 "No YouTube, em temporadas":** [miniatura do episódio]; "[Título do episódio]" / "Temporada [n] · Episódio [n]"; link "Ver todos os episódios" (vai para Conteúdo).
9. **h2 "Quer conversar antes de marcar?":** "Me chame no WhatsApp. Se já sabe o dia, escolha o horário aqui no site." Botões "Conversar no WhatsApp" e "Agendar sessão".

## Página Sobre (`#/sobre`)

- [foto profissional] grande (4:3); h1 "Maria Clara Vinotti"; "Parapsicóloga clínica pelo Sistema Grisa"; a biografia curta (ver Início, Sobre resumido); botão "Agendar sessão".
- **h2 "Formação e vínculos"**, quatro cartões:
  - **Sistema Grisa.** Formação inicial pelo IPAPPI e continuidade no Método Grisa.
  - **Registro FATECPR,** Curitiba.
  - **ABPSIG.** Associada, com carteira de parapsicóloga clínica.
  - **Aprimoramento em hipnose,** pelo Método Grisa.
- **h2 "Como cheguei à parapsicologia" (rascunho):** "A parapsicologia chegou em minha vida pela curiosidade que tinha sobre alguns fenômenos que aconteciam comigo. Compreender a minha história, me deparar com minhas inseguranças e tantos medos, me fez perceber quantos talentos haviam desabrochado."
- **h2 "Como eu trabalho":**
  - **Ninguém é julgado.** Separo o ato da pessoa.
  - **Sigilo absoluto.**
  - **Não prometo milagres.** Ofereço acolhimento e parceria.
- **h2 "Quer conversar antes de marcar?":** botões "Conversar no WhatsApp" e "Agendar sessão".

## Página Atendimento (`#/atendimento`)

- h1 "Atendimento"; "Sessões de cerca de 1h30, online ou presenciais."
- **h2 "Online ou presencial"** (âncora `presencial` no cartão Presencial):
  - **Online:** "Para todo o Brasil e brasileiros no exterior. Por Google Meet ou WhatsApp. Você escolhe o horário e vê no seu fuso."
  - **Presencial:** "Balneário, Estreito, Florianópolis (SC)."; [mapa do consultório]; botão "Ver rota no Google Maps".
- **h2 "Horários":** "Terça a sexta, das 9h às 17h. Terças a quintas, até 21h." Apoio: "Os horários livres aparecem na hora de agendar."
- **h2 "As 8 etapas do processo"** (âncora `etapas`): "Cada pessoa segue no seu ritmo." Lista numerada:
  1. **Sua história.** Ficha de anamnese escrita.
  2. **Tabela familiar.** A sua posição na família e a relação com os sentimentos.
  3. **Orientação.** Estudos, áudios, relaxamento e respiração.
  4. **Terapia eletrônica.** Áudios e filmes que ajudam a ver o passado com mais clareza.
  5. **Cinco maiores sentimentos** nas principais fases da sua vida.
  6. **Metas** a curto, médio e longo prazo.
  7. **Hipnose** para compreender melhor a situação.
  8. **Tarefas em casa,** no seu tempo, para organizar a mente.
- **h2 "Pacote de 5 sessões":** "Pensado para dar sequência ao trabalho, com até 15 dias entre uma sessão e a próxima." / "Em caso de imprevisto, avise sobre o cancelamento e remarque o quanto antes, para não perder a continuidade." Botão principal "Solicitar pacote pelo WhatsApp". Apoio: "Os valores são informados pelo WhatsApp."
- **h2 "Pronto para marcar?":** botões "Agendar sessão" e "Conversar no WhatsApp".

## Página Conteúdo (`#/conteudo`)

- h1 "Conteúdo"; "Um vídeo por semana, em temporadas, sobre um tema escolhido pela Maria Clara."
- Rótulo "Episódio em destaque"; vídeo 16:9 com play; "[Título do episódio]" / "Temporada [n] · Episódio [n]".
- **h2 "Temporadas":** botões "Temporada 1", "Temporada 2", "Temporada 3" (`aria-pressed`). Trocar a temporada troca a lista.
- Lista de 6 episódios: miniatura, "[Título do episódio n]", "[duração]".
- **h2 "Acompanhe no YouTube":** botão "Inscrever-se no canal".
- **h2 "Quer conversar antes de marcar?":** botões "Conversar no WhatsApp" e "Agendar sessão".

## Página Dúvidas (`#/duvidas`)

- h1 "Dúvidas"; "Respostas curtas para as perguntas de quem está chegando."
- Acordeão com `<details>`/`<summary>`, todos fechados no início:

| Pergunta | Resposta |
|---|---|
| O que é parapsicologia clínica? | [Explicação simples, com as palavras dela.] |
| Como é uma sessão? | Cerca de 1h30, online ou presencial. Começamos conhecendo a sua história e seguimos no seu ritmo, com metas definidas juntos. + link "Ver as 8 etapas" |
| Alguém vai me julgar? | Não. Aqui ninguém é julgado: a regra é separar o ato da pessoa. |
| Meus dados ficam em sigilo? | Sim. O sigilo é absoluto. |
| Como funciona o atendimento online? | Por Google Meet ou WhatsApp, com o horário mostrado no seu fuso. |
| Como funciona o pacote de 5 sessões? | São cinco sessões, com até 15 dias entre elas. Você solicita pelo WhatsApp. |
| Quanto custa e como pago? | Os valores são informados pelo WhatsApp. O pagamento é por Pix, dinheiro ou transferência. |
| E se eu precisar remarcar? | Avise assim que souber e remarque o quanto antes, para não perder a continuidade. |

- **h2 "Não encontrou a sua dúvida?":** botão "Perguntar no WhatsApp".

## Fluxo de agendamento (`#/agendar/1`, `#/agendar/2`, `#/agendar/3`)

Sem menu e sem barra fixa de WhatsApp/Agendar. Cabeçalho com seta "Voltar" (`aria-label="Voltar"`) e o título "Agendar sessão". Abaixo, o texto "Passo X de 3 · [nome do passo]" e uma barra de progresso (33%, 66%, 100%).

Os três passos têm um rodapé curto no fim do conteúdo, com o aviso do CVV e a linha "Política de privacidade · Termos de uso". No passo 1, o rodapé curto fica acima do espaço reservado à barra fixa do passo, sem ficar escondido por ela.

Quem chega de outra página (alternativa C) pode usar `#/agendar/online`, que abre o passo 1 com Online marcado. Se o fluxo foi aberto a partir da alternativa C, "Voltar" no passo 1 e "Voltar ao início" no passo 3 retornam para ela.

### Passo 1: "Modalidade, dia e horário"

- **"Como você prefere?"** (fieldset com legend): rádios em cartão "**Online** / Google Meet ou WhatsApp" e "**Presencial** / Balneário, Estreito". Nenhum marcado por padrão, exceto quando a pessoa chega por "Agendar online".
- **"Horários no seu fuso"** (select com label): Brasília (UTC−3), padrão; Lisboa (UTC+0); Londres (UTC+0); Nova York (UTC−5).
- **Calendário** do mês atual, com botões "Mês anterior" e "Próximo mês" e o nome do mês ("Novembro de 2026"). Cabeçalho D S T Q Q S S.
  - Disponíveis: terças, quartas, quintas e sextas a partir de amanhã. São botões com borda.
  - Indisponíveis: os demais dias, em texto apagado e não clicáveis.
  - Dia escolhido: preenchido e com `aria-pressed="true"`.
  - Legenda: "Dias com borda têm horário livre. Os demais estão ocupados ou fora do atendimento."
- **Horários:** depois de escolher o dia, aparece um título com o dia por extenso ("Quinta, 26 de novembro") e uma grade de horários.
  - Horários base, em Brasília: 9:00, 10:30, 14:00 e 15:30 em todos os dias disponíveis, mais 18:00 e 19:30 de terça a quinta.
  - Exibição convertida para o fuso escolhido, com deslocamento fixo: Lisboa e Londres +3 h, Nova York −2 h.
  - Ao trocar o fuso, a grade e qualquer horário já escolhido são atualizados.
  - Apoio: "Cada sessão dura cerca de 1h30."
- **Rodapé fixo do passo:** botão "Continuar"; link "Prefere conversar antes? WhatsApp".
- Se a pessoa tocar em "Continuar" sem modalidade, dia ou horário, mostrar a mensagem "Escolha a modalidade, um dia e um horário para continuar." perto do botão, sem avançar.

### Passo 2: "Seus dados"

- Cartão-resumo com a escolha: "Online · quinta, 26 de novembro, 14:00" / "Fuso Brasília · cerca de 1h30" (horário e fuso conforme o escolhido). Link "Alterar", que volta ao passo 1 mantendo todas as escolhas.
- Campos, todos com label visível:
  - "Nome completo".
  - "E-mail", com apoio "Para receber o convite com o link do Google Meet."
  - "WhatsApp" (`type="tel"`), com apoio "Com DDD, ou com o código do país se você mora fora."
  - "Como conheceu?": select com Pesquisa no Google, Indicação, YouTube, Redes sociais, Outro.
  - Caixa de seleção: "Li a política de privacidade. Nome, e-mail e telefone são usados só para marcar e confirmar a sessão, e vistos pela Maria Clara e pela ferramenta de agendamento."
- Botão "Enviar solicitação". Apoio: "Na primeira sessão, a Maria Clara confirma o horário."
- Validação ao enviar: campo vazio ou e-mail sem "@" mostra "Preencha este campo." ou "Digite um e-mail válido." abaixo do campo. A caixa de privacidade não marcada mostra "Confirme que leu a política de privacidade." O foco vai para o primeiro campo com erro.
- Nada do que for digitado é salvo nem enviado.

### Passo 3: "Solicitação enviada"

- Sem botão Voltar (o voltar do navegador leva ao Início).
- Ícone de confirmação; h1 "Solicitação enviada" (`role="status"`).
- "A Maria Clara recebeu o seu pedido e confirma o horário por e-mail e WhatsApp em até 1 dia útil." (prazo provisório, a confirmar com a Maria Clara).
- Cartão com a escolha feita (modalidade, dia, horário e fuso).
- **h2 "O que acontece agora":**
  1. Você recebe a confirmação do horário.
  2. Se for online, o convite com o link do Google Meet chega no seu e-mail. Se for presencial, a rota para o consultório.
  3. Na primeira sessão, você preenche uma ficha escrita sobre a sua história.
- Botões "Conversar no WhatsApp" e "Voltar ao início" (limpa o estado do agendamento).

## Interações simuladas

Botões que levariam para fora do site não abrem nada externo. Eles mostram um aviso discreto por 2,5 segundos na base da tela, acima da barra fixa, anunciado por leitor de tela:

| Botão | Aviso |
|---|---|
| WhatsApp (qualquer um) e "Solicitar pacote pelo WhatsApp" | Neste ponto abriria o WhatsApp. |
| Ver rota no Google Maps | Neste ponto abriria o Google Maps. |
| Vídeos e episódios | Neste ponto o vídeo começaria. |
| Ler a transcrição | Neste ponto abriria a transcrição do vídeo. |
| Ver todas no Google | Neste ponto abririam as avaliações no Google. |
| Inscrever-se no canal | Neste ponto abriria o canal no YouTube. |
| cvv.org.br (aviso do CVV no rodapé) | Neste ponto abriria o site do CVV. |
| Política de privacidade, Termos de uso | Esta página ainda não existe no protótipo. |

## Critérios de aceite

- [ ] Todas as rotas abrem e todos os links internos funcionam, incluindo as âncoras `presencial` e `etapas`.
- [ ] "Agendar online" abre o passo 1 com Online marcado.
- [ ] No passo 1, só terças a sextas a partir de amanhã são clicáveis; a navegação entre meses funciona.
- [ ] Trocar o fuso para Lisboa mostra 12:00, 13:30, 17:00 e 18:30 para os horários base de 9:00, 10:30, 14:00 e 15:30.
- [ ] "Continuar" sem escolhas mostra a mensagem e não avança.
- [ ] O resumo do passo 2 e o cartão do passo 3 mostram exatamente o que foi escolhido.
- [ ] "Alterar" volta ao passo 1 com as escolhas mantidas.
- [ ] A validação do passo 2 funciona e leva o foco ao primeiro erro.
- [ ] Todos os botões externos mostram o aviso correto.
- [ ] O CVV aparece só no rodapé, como aviso discreto, em todas as telas, incluindo os três passos do agendamento.
- [ ] A linha "Registro FATECPR · Associada à ABPSIG" aparece no rodapé.
- [ ] Nenhum texto fora desta especificação. Nenhuma cor além de cinzas e da cor escura dos botões.
- [ ] Áreas de toque com no mínimo 44 px; navegação por teclado funciona em todo o fluxo.
- [ ] `noindex` no HTML e `robots.txt` bloqueando tudo. Nenhuma chamada de rede.
