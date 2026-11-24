/* Percurso: alternativa C, Início.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

(function () {
  const { $, comportamentoRolagem, criarBaralho } = window.PercursoC;

  // ---------------------------------------------------------------
  // Com o que você está chegando hoje?
  // Opções e respostas vêm de conteudo-seletor.js (textos da cliente, fora do HTML).
  // ---------------------------------------------------------------
  const OPCOES = window.PercursoConteudo.seletor;
  const grupo = $('#chips-sentimento');

  OPCOES.forEach((opcao) => {
    const rotulo = document.createElement('label');
    rotulo.className = 'chip';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'sentimento';
    radio.value = opcao.id;
    const texto = document.createElement('span');
    texto.textContent = opcao.rotulo;
    rotulo.append(radio, texto);
    grupo.append(rotulo);
  });

  const areaResposta = $('#resposta-sentimento');
  let textoResposta = null;
  let campo = null;
  let rotuloCampo = null;

  // O campo (hoje só em "Outro motivo") tem rótulo visível vindo do conteúdo e,
  // abaixo, "Conversar no WhatsApp" (aviso simulado; no site final, a mensagem
  // vai pré-preenchida com o texto escrito)
  function criarCartaoResposta() {
    areaResposta.innerHTML =
      '<div class="cartao-c cartao-resposta">' +
        '<p id="texto-sentimento"></p>' +
        '<div class="campo campo-outros" id="campo-outros" hidden>' +
          '<label for="motivo-busca" id="rotulo-motivo"></label>' +
          '<textarea id="motivo-busca" rows="3"></textarea>' +
          '<button type="button" class="botao botao-secundario" data-aviso="whatsapp">Conversar no WhatsApp</button>' +
        '</div>' +
        '<div class="resposta-acoes">' +
          '<a class="link" href="#baralho" id="ver-como-funciona">Ver como funciona</a>' +
          '<a class="link" href="quiz.html">Fazer o quiz de autoconhecimento</a>' +
        '</div>' +
      '</div>';
    textoResposta = $('#texto-sentimento');
    campo = $('#campo-outros');
    rotuloCampo = $('#rotulo-motivo');
  }

  grupo.addEventListener('change', (evento) => {
    const opcao = OPCOES.find((item) => item.id === evento.target.value);
    if (!opcao) return;
    if (!textoResposta) criarCartaoResposta();
    textoResposta.textContent = opcao.texto;
    campo.hidden = !opcao.campo;
    rotuloCampo.textContent = opcao.campo || '';
    mostrarResposta();
  });

  // Com muitas opções, a resposta pode nascer abaixo da dobra (e da barra em pílula):
  // rola só o necessário para ela aparecer, sem tirar o título do cartão da tela
  function mostrarResposta() {
    const cartao = areaResposta.firstElementChild;
    if (!cartao) return;
    const caixa = cartao.getBoundingClientRect();
    const limiteBaixo = window.innerHeight - 112;   // espaço da barra em pílula
    const deslocar = Math.min(caixa.bottom - limiteBaixo, caixa.top - 96);
    if (deslocar > 0) window.scrollBy({ top: deslocar, behavior: comportamentoRolagem() });
  }

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
