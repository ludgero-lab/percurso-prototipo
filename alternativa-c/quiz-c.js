/* Percurso: alternativa C, quiz de autoconhecimento.
   Respostas só em memória: nada é guardado nem enviado. */
'use strict';

(function () {
  const { $, $$, criarBaralho, mostrarBarra } = window.PercursoC;

  // A ordem das opções é a de exibição. A letra indica o tema e não aparece na tela.
  const PERGUNTAS = [
    {
      titulo: 'Quando algo dá certo na sua vida, o que costuma acontecer depois?',
      opcoes: [
        ['Sinto que não mereço e acabo perdendo o que conquistei.', 'A'],
        ['Me irrito porque ninguém reconhece o meu esforço.', 'B'],
        ['Fico com medo de que dê errado a qualquer momento.', 'C'],
        ['Parece que ninguém percebeu, e isso me entristece.', 'D']
      ]
    },
    {
      titulo: 'Em uma discussão, o que você costuma fazer?',
      opcoes: [
        ['Travo: a voz some e as palavras não saem.', 'C'],
        ['Peço desculpas, mesmo quando não errei.', 'A'],
        ['Me afasto e sinto que ninguém me ouve.', 'D'],
        ['Explodo ou guardo a raiva por muito tempo.', 'B']
      ]
    },
    {
      titulo: 'Nas suas relações, com família, amizades ou amor, o que mais se repete?',
      opcoes: [
        ['Decepções com quem eu confiava.', 'B'],
        ['Sinto que não me valorizam como eu gostaria.', 'D'],
        ['Cuido de todo mundo e fico por último.', 'A'],
        ['Medo de me entregar e me machucar.', 'C']
      ]
    },
    {
      titulo: 'Quando você pensa no futuro, o que aparece primeiro?',
      opcoes: [
        ['Um vazio, como se faltasse alguma coisa.', 'D'],
        ['A insegurança de errar e não ter como voltar atrás.', 'C'],
        ['Cansaço de sempre ter que brigar pelas coisas.', 'B'],
        ['A sensação de que coisas boas não são para mim.', 'A']
      ]
    },
    {
      titulo: 'Qual frase combina mais com você hoje?',
      opcoes: [
        ['Eu me cobro demais.', 'A'],
        ['Eu evito arriscar.', 'C'],
        ['Eu guardo mágoas que não queria sentir.', 'B'],
        ['Eu me sinto só, mesmo entre pessoas.', 'D']
      ]
    },
    {
      titulo: 'O que você gostaria de sentir mais?',
      opcoes: [
        ['Confiança para decidir.', 'C'],
        ['Alegria de viver.', 'D'],
        ['Que eu mereço o que conquisto.', 'A'],
        ['Paz nas minhas relações.', 'B']
      ]
    }
  ];
  const TOTAL = PERGUNTAS.length;

  // ---------------------------------------------------------------
  // Monta os cartões das perguntas
  // ---------------------------------------------------------------
  const raizBaralho = $('#baralho-quiz');

  PERGUNTAS.forEach((pergunta, i) => {
    const n = i + 1;
    const carta = document.createElement('div');
    carta.className = 'carta carta-quiz';
    carta.dataset.carta = '';
    carta.innerHTML =
      '<div class="carta-giro"><div class="carta-face carta-frente">' +
        '<fieldset class="quiz-pergunta">' +
          '<legend><h2 class="carta-pergunta quiz-titulo" id="quiz-p' + n + '" tabindex="-1">' + pergunta.titulo + '</h2></legend>' +
          pergunta.opcoes.map(([texto, tema]) =>
            '<label class="cartao-radio opcao-quiz">' +
              '<input type="radio" name="p' + n + '" value="' + tema + '">' +
              '<span>' + texto + '</span>' +
            '</label>').join('') +
        '</fieldset>' +
      '</div></div>';
    raizBaralho.appendChild(carta);
  });

  // ---------------------------------------------------------------
  // Estado (só em memória)
  // ---------------------------------------------------------------
  let respostas = new Array(TOTAL).fill(null);

  const abertura = $('#quiz-abertura');
  const areaPerguntas = $('#quiz-perguntas');
  const contador = $('#quiz-contador');
  const botaoVoltar = $('#quiz-voltar');
  const botaoProxima = $('#quiz-proxima');

  const baralho = criarBaralho(raizBaralho, { aoMudar: atualizarNavegacao });

  function atualizarNavegacao(atual) {
    contador.textContent = 'Pergunta ' + (atual + 1) + ' de ' + TOTAL;
    botaoVoltar.disabled = atual === 0;
    botaoProxima.disabled = !respostas[atual];
  }

  // Ao trocar de cartão, o foco vai para o título da pergunta
  function focarPergunta(indice) {
    const titulo = $('#quiz-p' + (indice + 1));
    if (titulo) titulo.focus();
  }

  $('#quiz-comecar').addEventListener('click', () => {
    abertura.hidden = true;
    areaPerguntas.hidden = false;
    atualizarNavegacao(baralho.atual());
    focarPergunta(baralho.atual());
  });

  raizBaralho.addEventListener('change', (evento) => {
    const indice = Number(evento.target.name.slice(1)) - 1;
    respostas[indice] = evento.target.value;
    if (indice === baralho.atual()) botaoProxima.disabled = false;
  });

  botaoProxima.addEventListener('click', () => {
    if (!respostas[baralho.atual()]) return;
    if (baralho.irPara(baralho.atual() + 1)) focarPergunta(baralho.atual());
  });

  botaoVoltar.addEventListener('click', () => {
    if (baralho.irPara(baralho.atual() - 1)) focarPergunta(baralho.atual());
  });

  // ---------------------------------------------------------------
  // Barra em pílula: como no Início, só aparece quando as ações da tela saíram de vista
  // (assim ela não cobre "Voltar" e "Próxima" nem repete os botões do resultado)
  // ---------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const visiveis = new Set();
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) visiveis.add(entrada.target);
        else visiveis.delete(entrada.target);
      });
      mostrarBarra(visiveis.size === 0);
    }, { rootMargin: '-' + $('#cabecalho').offsetHeight + 'px 0px 0px 0px' });
    $$('[data-acoes-quiz]').forEach((el) => observador.observe(el));
  } else {
    mostrarBarra(true);
  }
})();
