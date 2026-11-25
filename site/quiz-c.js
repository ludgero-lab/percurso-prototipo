/* Percurso: alternativa C, quiz de autoconhecimento.
   Respostas só em memória: nada é guardado nem enviado. */
'use strict';

(function () {
  const { $, criarBaralho } = window.PercursoC;

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

  // Resultados (rascunho). A letra é só a chave do tema e não aparece na tela.
  const ORDEM_TEMAS = ['A', 'B', 'C', 'D'];
  const RESULTADOS = {
    A: {
      titulo: 'A cobrança e o não merecimento',
      texto: 'Suas respostas mostram uma tendência a se cobrar muito e a sentir que coisas boas não são para você. Muitas vezes, essa sensação vem de vivências antigas, da infância ou da família, que seguem atuando sem que a gente perceba.',
      clinica: 'O trabalho começa conhecendo a sua história e a sua tabela familiar, para entender de onde vem essa cobrança e o que ela tem comandado na sua vida.'
    },
    B: {
      titulo: 'A mágoa e a raiva guardadas',
      texto: 'Suas respostas mostram mágoas e uma raiva que, talvez, você nem queira sentir. Esses sentimentos costumam ter origem em situações que ficaram mal resolvidas e voltam a aparecer nas relações de hoje.',
      clinica: 'A busca pelos cinco maiores sentimentos que marcam as fases da sua vida ajuda a entender o que alimenta essa raiva, sem julgamento: a regra é separar o ato da pessoa.'
    },
    C: {
      titulo: 'O medo de errar',
      texto: 'Suas respostas mostram insegurança e medo de errar, a ponto de travar ou evitar riscos. Esse medo costuma ser uma forma antiga de proteção, que um dia fez sentido e hoje pode estar limitando as suas escolhas.',
      clinica: 'O processo olha para a sua história e define metas a curto, médio e longo prazo, no seu ritmo, para você retomar a confiança nas próprias decisões.'
    },
    D: {
      titulo: 'A tristeza e a sensação de não ser valorizado',
      texto: 'Suas respostas mostram uma tristeza e a sensação de que falta alguma coisa, ou de não ser valorizado como gostaria. Sentimentos assim costumam ter raízes que vale a pena compreender com calma.',
      clinica: 'O trabalho busca compreender a sua história para que você volte a sentir prazer em viver, com tarefas, áudios e filmes entre as sessões.'
    }
  };

  // ---------------------------------------------------------------
  // Monta os cartões das perguntas (antes do cartão do resultado)
  // ---------------------------------------------------------------
  const raizBaralho = $('#baralho-quiz');
  const cartaResultado = $('#carta-resultado');

  PERGUNTAS.forEach((pergunta, i) => {
    const n = i + 1;
    const carta = document.createElement('div');
    carta.className = 'carta carta-quiz';
    carta.dataset.carta = '';
    carta.innerHTML =
      '<div class="carta-giro"><div class="carta-face carta-frente">' +
        '<fieldset class="quiz-pergunta">' +
          '<legend><h2 class="carta-pergunta" id="quiz-p' + n + '" tabindex="-1">' + pergunta.titulo + '</h2></legend>' +
          pergunta.opcoes.map(([texto, tema]) =>
            '<label class="cartao-radio opcao-quiz">' +
              '<input type="radio" name="p' + n + '" value="' + tema + '">' +
              '<span>' + texto + '</span>' +
            '</label>').join('') +
        '</fieldset>' +
      '</div></div>';
    raizBaralho.insertBefore(carta, cartaResultado);
  });

  // ---------------------------------------------------------------
  // Estado (só em memória)
  // ---------------------------------------------------------------
  let respostas = new Array(TOTAL).fill(null);

  const tituloQuiz = $('#titulo-quiz');
  const abertura = $('#quiz-abertura');
  const areaPerguntas = $('#quiz-perguntas');
  const contador = $('#quiz-contador');
  const botaoVoltar = $('#quiz-voltar');
  const botaoProxima = $('#quiz-proxima');
  const versoResultado = $('#resultado-verso');
  const botaoVirarResultado = $('.carta-virar', cartaResultado);
  const depois = $('#quiz-depois');

  const baralho = criarBaralho(raizBaralho, {
    aoMudar: atualizarNavegacao,
    aoVirar: mostrarResultado
  });

  function noResultado(indice) {
    return indice === TOTAL;
  }

  function atualizarNavegacao(atual) {
    const resultado = noResultado(atual);
    // No cartão do resultado não há contador nem "Próxima"; "Voltar" continua
    contador.hidden = resultado;
    botaoProxima.hidden = resultado;
    if (!resultado) contador.textContent = 'Pergunta ' + (atual + 1) + ' de ' + TOTAL;
    botaoVoltar.disabled = atual === 0;
    botaoProxima.disabled = !respostas[atual];
    if (resultado) prepararResultado();
    else limparResultado();
  }

  // Ao trocar de cartão, o foco vai para o título da pergunta (ou para o cartão do resultado)
  function focarCartao(indice) {
    if (noResultado(indice)) {
      botaoVirarResultado.focus();
      return;
    }
    const titulo = $('#quiz-p' + (indice + 1));
    if (titulo) titulo.focus();
  }

  $('#quiz-comecar').addEventListener('click', () => {
    abertura.hidden = true;
    areaPerguntas.hidden = false;
    atualizarNavegacao(baralho.atual());
    focarCartao(baralho.atual());
  });

  raizBaralho.addEventListener('change', (evento) => {
    if (!/^p\d$/.test(evento.target.name)) return;
    const indice = Number(evento.target.name.slice(1)) - 1;
    respostas[indice] = evento.target.value;
    if (indice === baralho.atual()) botaoProxima.disabled = false;
  });

  botaoProxima.addEventListener('click', () => {
    if (!respostas[baralho.atual()]) return;
    if (baralho.irPara(baralho.atual() + 1)) focarCartao(baralho.atual());
  });

  botaoVoltar.addEventListener('click', () => {
    if (baralho.irPara(baralho.atual() - 1)) focarCartao(baralho.atual());
  });

  // ---------------------------------------------------------------
  // Resultado: cada opção soma um ponto ao seu tema; empate mostra todos, na ordem A, B, C, D
  // ---------------------------------------------------------------
  function calcularTemas() {
    const pontos = { A: 0, B: 0, C: 0, D: 0 };
    respostas.forEach((tema) => { if (tema) pontos[tema] += 1; });
    const maximo = Math.max(...ORDEM_TEMAS.map((t) => pontos[t]));
    const empatados = ORDEM_TEMAS.filter((t) => pontos[t] === maximo);
    if (empatados.length === 1) return empatados;
    // Desempate pela pergunta 6, a única voltada ao futuro: o tema escolhido ali ganha.
    const temaP6 = respostas[5];
    if (temaP6 && empatados.includes(temaP6)) return [temaP6];
    // Se o tema da pergunta 6 não está entre os empatados, vale o primeiro da ordem.
    return [empatados[0]];
  }

  // O verso é preenchido ao chegar no cartão (a altura do cartão já fica certa antes do giro)
  function prepararResultado() {
    versoResultado.innerHTML = calcularTemas().map((tema) => {
      const r = RESULTADOS[tema];
      return '<div class="resultado-tema">' +
          '<h2 class="resultado-titulo" tabindex="-1">' + r.titulo + '</h2>' +
          '<p>' + r.texto + '</p>' +
          '<p><strong>Na parapsicologia clínica:</strong> ' + r.clinica + '</p>' +
        '</div>';
    }).join('');
  }

  // Ao sair do resultado (Voltar ou Refazer), o cartão volta fechado e as ações somem
  function limparResultado() {
    baralho.desvirar(cartaResultado);
    botaoVirarResultado.hidden = false;
    versoResultado.innerHTML = '';
    depois.hidden = true;
    fecharEmail();
  }

  // O resultado vira uma vez só (giro em Y de 450 ms, troca de opacidade com "reduzir movimento")
  function mostrarResultado(carta) {
    if (carta !== cartaResultado || carta.classList.contains('virada')) return;
    baralho.virar(carta, true);
    depois.hidden = false;
    $('.resultado-titulo', versoResultado).focus();
    botaoVirarResultado.hidden = true;
  }

  // ---------------------------------------------------------------
  // Envio do resultado por e-mail (simulado: nada é enviado nem guardado)
  // ---------------------------------------------------------------
  const botaoAbrirEmail = $('#abrir-email');
  const areaEmail = $('#area-email');
  const formEmail = $('#form-email');
  const campoEmail = $('#email-quiz');
  const campoConsentimento = $('#consentimento-quiz');
  const mensagemEnviado = $('#email-enviado');
  const MSG_VAZIO = 'Preencha este campo.';
  const MSG_EMAIL = 'Digite um e-mail válido.';
  const MSG_CONSENTIMENTO = 'Confirme que quer receber o resultado neste e-mail.';

  const CAMPOS = [
    { campo: campoEmail, erro: $('#erro-email-quiz'), validar: (c) => (!c.value.trim() ? MSG_VAZIO : (c.value.includes('@') ? '' : MSG_EMAIL)) },
    { campo: campoConsentimento, erro: $('#erro-consentimento-quiz'), validar: (c) => (c.checked ? '' : MSG_CONSENTIMENTO) }
  ];

  function marcarErro(regra, mensagem) {
    regra.erro.textContent = mensagem;
    if (mensagem) regra.campo.setAttribute('aria-invalid', 'true');
    else regra.campo.removeAttribute('aria-invalid');
  }

  function fecharEmail() {
    areaEmail.hidden = true;
    botaoAbrirEmail.setAttribute('aria-expanded', 'false');
    formEmail.reset();
    formEmail.hidden = false;
    CAMPOS.forEach((regra) => marcarErro(regra, ''));
    mensagemEnviado.textContent = '';
  }

  botaoAbrirEmail.addEventListener('click', () => {
    const abrir = areaEmail.hidden;
    areaEmail.hidden = !abrir;
    botaoAbrirEmail.setAttribute('aria-expanded', String(abrir));
    if (abrir && !formEmail.hidden) campoEmail.focus();
  });

  formEmail.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let primeiroComErro = null;
    CAMPOS.forEach((regra) => {
      const mensagem = regra.validar(regra.campo);
      marcarErro(regra, mensagem);
      if (mensagem && !primeiroComErro) primeiroComErro = regra.campo;
    });
    if (primeiroComErro) {
      primeiroComErro.focus();
      return;
    }
    // O formulário é trocado pela mensagem; nada é enviado nem guardado
    formEmail.reset();
    formEmail.hidden = true;
    mensagemEnviado.textContent = 'Pronto! Neste ponto o resultado seria enviado para o seu e-mail.';
    mensagemEnviado.focus();
  });

  // O erro some quando a pessoa corrige o campo
  ['input', 'change'].forEach((tipo) => {
    formEmail.addEventListener(tipo, (evento) => {
      const regra = CAMPOS.find((r) => r.campo === evento.target);
      if (regra && regra.campo.hasAttribute('aria-invalid') && !regra.validar(regra.campo)) marcarErro(regra, '');
    });
  });

  // ---------------------------------------------------------------
  // Refazer o quiz: volta à abertura e limpa tudo
  // ---------------------------------------------------------------
  $('#refazer-quiz').addEventListener('click', () => {
    respostas = new Array(TOTAL).fill(null);
    $('#form-quiz').reset();
    limparResultado();
    baralho.reiniciar();
    atualizarNavegacao(0);
    areaPerguntas.hidden = true;
    abertura.hidden = false;
    window.scrollTo(0, 0);
    tituloQuiz.focus({ preventScroll: true });
  });
})();
