/* Percurso: alternativa C, conteúdo do seletor "Com o que você está chegando hoje?".
   Único lugar destes textos: o Início (inicio-c.js) monta as opções e as respostas a partir daqui.
   Os textos são da Maria Clara (retorno de 24/11): não reescrever, não completar.

   Campos de cada item:
   - id: valor do rádio (só letras minúsculas, sem acento)
   - rotulo: texto do chip
   - texto: resposta que aparece no cartão ao escolher a opção
   - campo (opcional): rótulo do campo de texto que abre com a opção
   - status: "aprovado" (texto e rótulo da cliente), "rotulo-provisorio" (texto aprovado,
     rótulo ainda em definição) ou "rascunho" (texto nosso, ainda não validado pela cliente)

   A ordem da lista é a ordem dos chips. */
'use strict';

window.PercursoConteudo = window.PercursoConteudo || {};

window.PercursoConteudo.seletor = [
  {
    id: 'merecimento',
    rotulo: 'Sensação de não merecimento',
    texto: 'É não se permitir amar nem receber amor, ter sucesso, ser feliz, como se houvesse algo errado com você. A insegurança gera o medo de errar e de não estar à altura do outro; na sessão, buscamos a percepção de onde tudo começou.',
    status: 'aprovado'
  },
  {
    id: 'sentido',
    rotulo: 'Falta de sentido na vida',
    texto: 'Sentir-se fora do ninho, ameaçado pelo fantasma da rejeição, num mundo solitário e triste. O vazio existencial é alerta para um encontro com as qualidades dentro de você: o que você é, o que você tem e o que faz. Quando foi a primeira vez que se percebeu assim?',
    status: 'rotulo-provisorio'
  },
  {
    id: 'ansiedade',
    rotulo: 'Ansiedade',
    texto: 'A ansiedade acontece pelo medo do resultado, de que não dê certo, e pelo medo de resultados futuros; assim, está vinculada à depressão. Criar mecanismos que tragam de volta a calma pode ser o início de um aprendizado.',
    status: 'aprovado'
  },
  {
    id: 'depressao',
    rotulo: 'Depressão',
    texto: 'Tudo parece difícil, sem graça, sem sentido. É possível olhar para o sentimento que desencadeia esse resultado, e paralelo à terapia é necessário, inicialmente, uma avaliação médica especializada.',
    status: 'aprovado'
  },
  {
    id: 'panico',
    rotulo: 'Síndrome do pânico',
    texto: 'Ela surge em pessoas que vivenciaram ou tiveram percepção de ameaça de morte, na gestação ou no momento do nascimento. Ligada à depressão, poderá precisar de avaliação médica, e a terapia trabalha com técnicas específicas para essa sensação tão difícil de viver.',
    status: 'aprovado'
  },
  {
    id: 'traumas',
    rotulo: 'Traumas diversos',
    texto: 'Todo trauma tem uma porta, que pode ser real ou imaginária. A verdade é que dói enquanto não percebe a superação.',
    status: 'aprovado'
  },
  {
    id: 'outro',
    rotulo: 'Outro motivo',
    texto: 'Sofremos ou temos medo porque nos perdemos, e é preciso encontrar o caminho de volta.',
    campo: 'Escreva com as suas palavras o que te trouxe aqui.',
    status: 'rotulo-provisorio'
  },
  {
    id: 'conhecendo',
    rotulo: 'Só estou conhecendo',
    texto: 'Que bom ter você aqui. Os cartões abaixo explicam, em poucas palavras, como a parapsicologia clínica funciona.',
    status: 'rascunho'
  }
];
