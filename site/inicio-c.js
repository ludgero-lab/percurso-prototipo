/* Percurso: alternativa C, Início.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

(function () {
  const { $, comportamentoRolagem, criarBaralho } = window.PercursoC;

  // ---------------------------------------------------------------
  // Com o que você está chegando hoje? (respostas em rascunho)
  // ---------------------------------------------------------------
  // Textos das respostas ainda por escrever pela Maria Clara: ficam entre colchetes.
  // "Outros" não tem texto: abre um campo para a pessoa contar o motivo da busca.
  const RESPOSTAS = {
    merecimento: '[Resposta para Sensação de não merecimento]',
    sentido: '[Resposta para Encontrar sentido para a vida]',
    ansiedade: '[Resposta para Ansiedade]',
    depressao: '[Resposta para Depressão]',
    panico: '[Resposta para Síndrome do pânico]',
    traumas: '[Resposta para Traumas]',
    lugar: '[Resposta para Não encontro meu lugar no mundo]',
    outros: '',
    conhecendo: 'Que bom ter você aqui. Os cartões abaixo explicam, em poucas palavras, como a parapsicologia clínica funciona.'
  };
  // Opções que mostram a linha do CVV (188)
  const COM_CVV = ['depressao', 'panico'];

  const areaResposta = $('#resposta-sentimento');
  let textoResposta = null;
  let linhaCvv = null;
  let campoOutros = null;

  function criarCartaoResposta() {
    areaResposta.innerHTML =
      '<div class="cartao-c cartao-resposta">' +
        '<p id="texto-sentimento"></p>' +
        '<div class="campo campo-outros" id="campo-outros" hidden>' +
          '<label for="motivo-busca">Se quiser, conte o motivo da sua busca</label>' +
          '<textarea id="motivo-busca" rows="3"></textarea>' +
        '</div>' +
        '<p class="resposta-cvv" id="resposta-cvv" hidden>Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito.</p>' +
        '<div class="resposta-acoes">' +
          '<a class="link" href="#baralho" id="ver-como-funciona">Ver como funciona</a>' +
          '<a class="link" href="quiz.html">Fazer o quiz de autoconhecimento</a>' +
        '</div>' +
      '</div>';
    textoResposta = $('#texto-sentimento');
    linhaCvv = $('#resposta-cvv');
    campoOutros = $('#campo-outros');
  }

  $('#chips-sentimento').addEventListener('change', (evento) => {
    const valor = evento.target.value;
    if (!(valor in RESPOSTAS)) return;
    if (!textoResposta) criarCartaoResposta();
    textoResposta.textContent = RESPOSTAS[valor];
    textoResposta.hidden = !RESPOSTAS[valor];
    campoOutros.hidden = valor !== 'outros';
    linhaCvv.hidden = !COM_CVV.includes(valor);
  });

  // "Ver como funciona": rola até o baralho e leva o foco ao título dele
  areaResposta.addEventListener('click', (evento) => {
    if (!evento.target.closest('#ver-como-funciona')) return;
    evento.preventDefault();
    const baralho = $('#baralho');
    baralho.scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' });
    $('#titulo-baralho').focus({ preventScroll: true });
  });

  // ---------------------------------------------------------------
  // Baralho de flash cards
  // ---------------------------------------------------------------
  const contador = $('#contador-cartoes');
  const botaoAnterior = $('#cartao-anterior');
  const botaoProximo = $('#cartao-proximo');

  const baralho = criarBaralho($('#baralho-cartoes'), {
    deslizar: true,
    aoMudar(atual) {
      const total = baralho.total();
      contador.textContent = 'Cartão ' + (atual + 1) + ' de ' + total;
      const focoNumBotao = document.activeElement === botaoAnterior || document.activeElement === botaoProximo;
      botaoAnterior.disabled = atual === 0;
      botaoProximo.disabled = atual === total - 1;
      // Se o botão com foco ficou desativado (nas pontas), o foco vai para o cartão
      if (focoNumBotao && document.activeElement.disabled) {
        $('.carta-virar', baralho.carta()).focus({ preventScroll: true });
      }
    }
  });

  botaoAnterior.addEventListener('click', () => baralho.irPara(baralho.atual() - 1));
  botaoProximo.addEventListener('click', () => baralho.irPara(baralho.atual() + 1));

})();
