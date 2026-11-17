# Alternativa B: o que muda em relação à especificação

A alternativa A segue `docs/especificacao-prototipo.md`. A B parte de um esboço feito à mão e serve para avaliação interna. Por enquanto só existe o **Início**; as demais páginas da B serão derivadas depois que este Início for aprovado.

Publicação: `https://ludgero-lab.github.io/percurso-prototipo/alternativa-b/`

## Estrutura do Início

| Ordem | Seção | Origem |
|---|---|---|
| 1 | Cabeçalho só com o botão de menu | Esboço |
| 2 | Nome grande ("Maria Clara"), "Parapsicóloga clínica", frase e foto ao lado | Esboço + textos da especificação |
| 3 | Cards em rolagem horizontal: "Quem sou eu?", "A parapsicologia clínica", "Como a parapsicologia pode ajudar" | Esboço |
| 4 | Botão "Agendar uma sessão" | Esboço |
| 5 | "Como você se sente hoje?": 7 emoções num arco, com ponteiro, e "Continuar" depois da escolha | Esboço (emoções e "Continuar" propostos) |
| 6 | Convite para o teste de perfil, que aparece logo depois da resposta | Esboço |
| 7 | Como é uma sessão, Acolhimento e sigilo, Online ou presencial, O que dizem no Google, No YouTube, Quer conversar antes de marcar? | Alternativa A |
| 8 | Rodapé com o CVV | Alternativa A |
| — | Botão flutuante de WhatsApp no lugar da barra fixa | Esboço |

Saíram do Início, em relação à A: vídeo de introdução, "Sobre resumido" (coberto pelo card "Quem sou eu?") e a barra fixa na base.

## Textos novos (não estão na especificação)

- "Maria Clara" (o sobrenome Vinotti ficou fora do destaque, como no esboço; continua no rodapé)
- "Quem sou eu?", "A parapsicologia clínica", "Como a parapsicologia pode ajudar"
- "Agendar uma sessão" (na A é "Agendar sessão")
- "Como você se sente hoje?"
- Emoções propostas: Muito mal, Triste, Com ansiedade, Mais ou menos, Em paz, Feliz, Muito bem
- "Você gostaria de fazer um teste de perfil?", "É bem rapidinho!", "Fazer o teste", "O que é o teste de perfil?"
- "Continuar" (confirmação para descer até o teste de perfil)

## Blocos com a altura da tela

O topo da página é dividido em três blocos, cada um com a altura da tela do celular (menos o cabeçalho). A rolagem "encaixa" no início de cada bloco quando a pessoa para perto dele.

1. **Bloco 1:** nome, foto, cards e "Agendar uma sessão". O botão fica ancorado na base do bloco, acima do botão flutuante de WhatsApp.
2. **Bloco 2:** "Como você se sente hoje?", centralizado.
3. **Bloco 3:** convite para o teste de perfil, centralizado. Só aparece depois da escolha da emoção.

As seções seguintes (vindas da A) continuam com a altura do próprio conteúdo.

## Comportamento

- Nenhuma emoção vem marcada. Ao escolher uma, o ponteiro aponta para ela, o nome aparece embaixo e surge o botão **"Continuar"** (texto novo, proposta). Ele rola a página até o bloco 3 e leva o foco ao título "Você gostaria de fazer um teste de perfil?". Quem prefere rolar com o dedo também chega lá, porque o bloco 3 já fica liberado com a escolha.
- A rolagem do "Continuar" é suave, a não ser que o celular esteja configurado para reduzir movimento.
- Qualquer emoção leva ao mesmo convite (decisão do autor). O CVV continua no rodapé.
- O seletor usa rádios nativos: funciona com toque, com as setas do teclado e com leitor de tela.
- As páginas da B que ainda não existem (cards, menu, "Agendar uma sessão", "Fazer o teste", links das seções) mostram o aviso "Esta página ainda não existe no protótipo."

## Em aberto (a definir)

1. O que é o teste de perfil, quantas perguntas tem e o que a pessoa recebe no fim. O texto de "O que é o teste de perfil?" está como espaço reservado.
2. O que cada card leva: "Quem sou eu?" → Sobre? "A parapsicologia clínica" → explicação nova? "Como a parapsicologia pode ajudar" → Atendimento?
3. A lista final de emoções, a validar com a Maria Clara.
4. Se a resposta do seletor deve mudar algo (por exemplo, o convite ou um texto de acolhimento diferente para emoções difíceis).
5. Se "Agendar uma sessão" deve levar ao fluxo de agendamento da A enquanto o da B não existe.
