/* Percurso: alternativa C, agendamento em três passos (#/1, #/2, #/3).
   A lógica dos passos (calendário, fusos, validação, resumo) vem de ../agendamento.js;
   aqui ficam só a navegação, o cabeçalho do fluxo e o bloco flutuante do passo 1.
   Estado só em memória: nada é salvo nem enviado. */
'use strict';

(function () {
  const { $, $$ } = window.PercursoC;

  const PASSOS = {
    1: { nome: 'Modalidade, dia e horário', progresso: 33 },
    2: { nome: 'Seus dados', progresso: 66 },
    3: { nome: 'Solicitação enviada', progresso: 100 }
  };

  const fluxo = window.Agendamento.criar({
    irParaPasso: (passo) => { location.hash = '#/' + passo; }
  });
  const estado = fluxo.estado;

  const botaoVoltar = $('#botao-voltar');
  const tituloFluxo = $('#titulo-fluxo');
  const tituloFluxoTexto = $('#titulo-fluxo-texto');
  const passoTexto = $('#passo-texto');
  const progresso = $('.progresso');
  const progressoBarra = $('#progresso-barra');
  const blocoPasso1 = $('#rodape-passo1');

  // De onde a pessoa veio: "Voltar" no passo 1 devolve a essa página da C
  const origem = (function () {
    try {
      const ref = new URL(document.referrer);
      if (ref.origin === location.origin && ref.pathname.includes('/alternativa-c/') && !ref.pathname.endsWith('agendar.html')) {
        return ref.href;
      }
    } catch (erro) { /* sem referência */ }
    return './';
  })();

  // "Agendar online" chega com ?modalidade=online: abre o passo 1 com Online marcado
  if (new URLSearchParams(location.search).get('modalidade') === 'online') {
    estado.modalidade = 'online';
  }
  if (location.search || !/^#\/[123]$/.test(location.hash)) {
    history.replaceState(null, '', location.pathname + '#/1');
  }

  let primeiraVez = true;

  function aplicarPasso() {
    const passo = Number(location.hash.replace('#/', ''));
    if (!PASSOS[passo]) {
      location.replace('#/1');
      return;
    }
    // Depois do envio, voltar (pelo navegador) leva ao Início
    if (estado.enviado && passo !== 3) {
      fluxo.zerar();
      location.replace('./');
      return;
    }
    if (passo === 2 && !fluxo.passo1Completo()) {
      location.replace('#/1');
      return;
    }
    if (passo === 3 && !estado.enviado) {
      location.replace('#/1');
      return;
    }

    $$('[data-passo]').forEach((secao) => { secao.hidden = Number(secao.dataset.passo) !== passo; });

    // Cabeçalho: no passo 3 não há Voltar, e o h1 é "Solicitação enviada"
    const ultimo = passo === 3;
    botaoVoltar.hidden = ultimo;
    tituloFluxo.hidden = ultimo;
    tituloFluxoTexto.hidden = !ultimo;
    passoTexto.textContent = 'Passo ' + passo + ' de 3 · ' + PASSOS[passo].nome;
    progresso.setAttribute('aria-valuenow', String(PASSOS[passo].progresso));
    progressoBarra.style.width = PASSOS[passo].progresso + '%';

    fluxo.entrarNoPasso(passo);
    atualizarEspacoBloco();

    window.scrollTo(0, 0);
    if (!primeiraVez) {
      const h1 = $$('h1').find((el) => el.getClientRects().length > 0);
      if (h1) h1.focus({ preventScroll: true });
    }
    primeiraVez = false;
  }

  botaoVoltar.addEventListener('click', () => {
    if (location.hash === '#/2') location.hash = '#/1';
    else location.href = origem;
  });

  $('#voltar-inicio').addEventListener('click', () => {
    fluxo.zerar();
    location.href = './';
  });

  // Espaço no fim da página para o bloco flutuante do passo 1 não esconder o rodapé
  function atualizarEspacoBloco() {
    const visivel = blocoPasso1.getClientRects().length > 0;
    const altura = visivel ? blocoPasso1.offsetHeight + 16 : 0;
    document.documentElement.style.setProperty('--altura-barra', altura + 'px');
  }
  if ('ResizeObserver' in window) new ResizeObserver(atualizarEspacoBloco).observe(blocoPasso1);
  window.addEventListener('resize', atualizarEspacoBloco);

  window.addEventListener('hashchange', aplicarPasso);
  aplicarPasso();
})();
