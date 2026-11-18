/* Percurso: alternativa C, Início.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

(function () {
  const { $, mostrarBarra, comportamentoRolagem, criarBaralho } = window.PercursoC;

  // ---------------------------------------------------------------
  // Com o que você está chegando hoje? (respostas em rascunho)
  // ---------------------------------------------------------------
  const RESPOSTAS = {
    culpa: 'Muitas pessoas chegam aqui com culpas que não deixam desfrutar da alegria de viver. Na parapsicologia clínica, olhamos para a sua história para entender de onde elas vêm, sem julgamento: a regra é separar o ato da pessoa.',
    raiva: 'A raiva que a gente não quer sentir costuma ter raízes em vivências antigas. Compreender essa história ajuda a mudar a forma como ela comanda a sua vida.',
    medo: 'O medo é uma forma de proteção que a mente aprendeu cedo. Na parapsicologia clínica, buscamos compreender esse medo para que ele deixe de decidir por você.',
    inseguranca: 'A sensação de não merecer ou de não ser capaz costuma vir de vivências antigas. O trabalho começa conhecendo a sua história, no seu ritmo.',
    tristeza: 'A tristeza merece ser olhada com cuidado. Aqui você encontra um espaço de acolhimento para entender a sua história e voltar a sentir prazer em viver.',
    magoa: 'Mágoas e ressentimentos pesam nas relações e na forma como nos vemos. Compreender o que ficou mal resolvido abre caminho para mais leveza.',
    conhecendo: 'Que bom ter você aqui. Os cartões abaixo explicam, em poucas palavras, como a parapsicologia clínica funciona.'
  };

  const areaResposta = $('#resposta-sentimento');
  let textoResposta = null;
  let linhaCvv = null;

  function criarCartaoResposta() {
    areaResposta.innerHTML =
      '<div class="cartao-c cartao-resposta">' +
        '<p id="texto-sentimento"></p>' +
        '<p class="resposta-cvv" id="resposta-cvv" hidden>Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito.</p>' +
        '<div class="resposta-acoes">' +
          '<a class="link" href="#baralho" id="ver-como-funciona">Ver como funciona</a>' +
          '<a class="link" href="quiz.html">Fazer o quiz de autoconhecimento</a>' +
        '</div>' +
      '</div>';
    textoResposta = $('#texto-sentimento');
    linhaCvv = $('#resposta-cvv');
  }

  $('#chips-sentimento').addEventListener('change', (evento) => {
    const valor = evento.target.value;
    if (!RESPOSTAS[valor]) return;
    if (!textoResposta) criarCartaoResposta();
    textoResposta.textContent = RESPOSTAS[valor];
    linhaCvv.hidden = valor !== 'tristeza';
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

  // ---------------------------------------------------------------
  // Barra em pílula: só aparece depois que as ações do topo saem da tela
  // ---------------------------------------------------------------
  const acoesTopo = $('#topo-acoes');
  const alturaCabecalho = $('#cabecalho').offsetHeight;

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => mostrarBarra(!entrada.isIntersecting));
    }, { rootMargin: '-' + alturaCabecalho + 'px 0px 0px 0px' });
    observador.observe(acoesTopo);
  } else {
    mostrarBarra(true);
  }
})();
