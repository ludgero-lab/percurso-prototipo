/* Percurso: protótipo de teste (alternativa A).
   Rotas por hash, estado só em memória, nenhuma chamada de rede.
   A lógica do agendamento (calendário, fusos, validação) está em agendamento.js. */
'use strict';

(function () {
  // ---------------------------------------------------------------
  // Rotas
  // ---------------------------------------------------------------
  const ROTAS = {
    'inicio': { secao: 'inicio' },
    'sobre': { secao: 'sobre' },
    'atendimento': { secao: 'atendimento' },
    'atendimento/presencial': { secao: 'atendimento', ancora: 'presencial' },
    'atendimento/etapas': { secao: 'atendimento', ancora: 'etapas' },
    'conteudo': { secao: 'conteudo' },
    'duvidas': { secao: 'duvidas' },
    'agendar/1': { secao: 'agendar-1', fluxo: 1, nomePasso: 'Modalidade, dia e horário', progresso: 33 },
    'agendar/2': { secao: 'agendar-2', fluxo: 2, nomePasso: 'Seus dados', progresso: 66 },
    'agendar/3': { secao: 'agendar-3', fluxo: 3, nomePasso: 'Solicitação enviada', progresso: 100 }
  };
  const ROTA_PADRAO = '#/inicio';

  // ---------------------------------------------------------------
  // Avisos das interações simuladas
  // ---------------------------------------------------------------
  const AVISOS = {
    whatsapp: 'Neste ponto abriria o WhatsApp.',
    maps: 'Neste ponto abriria o Google Maps.',
    video: 'Neste ponto o vídeo começaria.',
    transcricao: 'Neste ponto abriria a transcrição do vídeo.',
    avaliacoes: 'Neste ponto abririam as avaliações no Google.',
    youtube: 'Neste ponto abriria o canal no YouTube.',
    cvv: 'Neste ponto abriria o site do CVV.',
    pagina: 'Esta página ainda não existe no protótipo.'
  };

  // ---------------------------------------------------------------
  // Elementos
  // ---------------------------------------------------------------
  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));

  const cabecalhoGlobal = $('#cabecalho-global');
  const rodape = $('#rodape');
  const barraFixa = $('#barra-fixa');
  const principal = $('#conteudo-principal');
  const botaoMenu = $('#botao-menu');
  const menu = $('#menu');
  const menuFundo = $('#menu-fundo');
  const botaoFecharMenu = $('#botao-fechar-menu');
  const aviso = $('#aviso');
  const cabecalhoFluxo = $('#cabecalho-fluxo');
  const botaoVoltar = $('#botao-voltar');
  const tituloFluxo = $('#titulo-fluxo');
  const tituloFluxoTexto = $('#titulo-fluxo-texto');
  const passoTexto = $('#passo-texto');
  const progresso = $('.progresso', cabecalhoFluxo);
  const progressoBarra = $('#progresso-barra');

  // Agendamento (estado só em memória; nada é salvo nem enviado)
  const fluxo = window.Agendamento.criar({
    irParaPasso: (passo) => { location.hash = '#/agendar/' + passo; }
  });
  const estado = fluxo.estado;

  let primeiraRota = true;
  let origem = ROTA_PADRAO; // última página fora do fluxo, para onde "Voltar" leva

  // ---------------------------------------------------------------
  // Roteador
  // ---------------------------------------------------------------
  function lerRota() {
    return location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  }

  function aplicarRota() {
    const rota = ROTAS[lerRota()];

    if (!rota) {
      location.replace(ROTA_PADRAO);
      return;
    }

    // Guardas do fluxo
    if (estado.enviado && rota.fluxo !== 3) {
      // Depois do envio, voltar (pelo navegador) leva ao Início, com o estado limpo
      fluxo.zerar();
      if (rota.fluxo) {
        location.replace(ROTA_PADRAO);
        return;
      }
    }
    if (rota.fluxo === 2 && !fluxo.passo1Completo()) {
      location.replace('#/agendar/1');
      return;
    }
    if (rota.fluxo === 3 && !estado.enviado) {
      location.replace(ROTA_PADRAO);
      return;
    }
    if (!rota.fluxo) origem = location.hash;

    fecharMenu(false);

    $$('[data-rota]').forEach((secao) => {
      secao.hidden = secao.dataset.rota !== rota.secao;
    });

    const noFluxo = Boolean(rota.fluxo);
    cabecalhoGlobal.hidden = noFluxo;
    rodape.classList.toggle('rodape-curto', noFluxo);
    barraFixa.hidden = noFluxo;
    cabecalhoFluxo.hidden = !noFluxo;
    if (noFluxo) {
      atualizarCabecalhoFluxo(rota);
      fluxo.entrarNoPasso(rota.fluxo);
    }

    marcarPaginaAtual(rota.secao);
    atualizarAlturaBarra();
    levarFoco(rota);
    primeiraRota = false;
  }

  function levarFoco(rota) {
    const secao = $('[data-rota="' + rota.secao + '"]');
    if (rota.ancora) {
      const alvo = document.getElementById(rota.ancora);
      const titulo = alvo && (alvo.matches('h1, h2, h3') ? alvo : $('h2, h3', alvo));
      if (titulo) {
        alvo.scrollIntoView({ block: 'start' });
        titulo.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
    if (primeiraRota) return;
    const h1 = $$('h1').find(estaVisivel) || $('h1', secao);
    if (h1) h1.focus({ preventScroll: true });
  }

  function estaVisivel(el) {
    return el.getClientRects().length > 0;
  }

  function atualizarCabecalhoFluxo(rota) {
    const ultimoPasso = rota.fluxo === 3;
    // No passo 3 não há Voltar, e o h1 é "Solicitação enviada"
    botaoVoltar.hidden = ultimoPasso;
    tituloFluxo.hidden = ultimoPasso;
    tituloFluxoTexto.hidden = !ultimoPasso;
    passoTexto.textContent = 'Passo ' + rota.fluxo + ' de 3 · ' + rota.nomePasso;
    progresso.setAttribute('aria-valuenow', String(rota.progresso));
    progressoBarra.style.width = rota.progresso + '%';
  }

  botaoVoltar.addEventListener('click', () => {
    const rota = ROTAS[lerRota()];
    location.hash = rota && rota.fluxo === 2 ? '#/agendar/1' : origem;
  });

  // "Agendar sessão" (de fora do fluxo) começa do zero; "Agendar online" já marca Online
  document.addEventListener('click', (evento) => {
    const gatilho = evento.target.closest('[data-agendar]');
    if (!gatilho) return;
    fluxo.zerar();
    if (gatilho.dataset.agendar === 'online') estado.modalidade = 'online';
  });

  $('#voltar-inicio').addEventListener('click', () => {
    fluxo.zerar();
    location.hash = ROTA_PADRAO;
  });

  function marcarPaginaAtual(secao) {
    $$('#menu a').forEach((a) => {
      if (a.getAttribute('href') === '#/' + secao) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  // Clicar num link para a rota em que já se está também volta ao topo e foca o h1
  document.addEventListener('click', (evento) => {
    const link = evento.target.closest('a[href^="#/"]');
    if (!link) return;
    if (link.getAttribute('href') === location.hash) {
      evento.preventDefault();
      aplicarRota();
    }
  });

  // ---------------------------------------------------------------
  // Espaço para a barra fixa
  // ---------------------------------------------------------------
  const barrasFixas = [barraFixa, $('#rodape-passo1')];

  function atualizarAlturaBarra() {
    const visivel = barrasFixas.find(estaVisivel);
    const altura = visivel ? visivel.offsetHeight : 0;
    document.documentElement.style.setProperty('--altura-barra', altura + 'px');
  }

  if ('ResizeObserver' in window) {
    const observador = new ResizeObserver(atualizarAlturaBarra);
    barrasFixas.forEach((b) => observador.observe(b));
  }
  window.addEventListener('resize', atualizarAlturaBarra);

  // ---------------------------------------------------------------
  // Menu
  // ---------------------------------------------------------------
  const fundoInerte = [cabecalhoGlobal, principal, rodape, barraFixa];

  function abrirMenu() {
    menu.hidden = false;
    menuFundo.hidden = false;
    botaoMenu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-aberto');
    fundoInerte.forEach((el) => { el.inert = true; });
    menu.focus();
  }

  function fecharMenu(devolverFoco) {
    if (menu.hidden) return;
    menu.hidden = true;
    menuFundo.hidden = true;
    botaoMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-aberto');
    fundoInerte.forEach((el) => { el.inert = false; });
    if (devolverFoco) botaoMenu.focus();
  }

  botaoMenu.addEventListener('click', abrirMenu);
  botaoFecharMenu.addEventListener('click', () => fecharMenu(true));
  menuFundo.addEventListener('click', () => fecharMenu(true));

  menu.addEventListener('click', (evento) => {
    // Ao escolher um item, o menu fecha e o foco vai para o h1 da página (troca de rota)
    if (evento.target.closest('a')) fecharMenu(false);
  });

  document.addEventListener('keydown', (evento) => {
    if (menu.hidden) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      fecharMenu(true);
      return;
    }
    if (evento.key === 'Tab') {
      const focaveis = $$('a, button', menu);
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && (document.activeElement === primeiro || document.activeElement === menu)) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
  });

  // ---------------------------------------------------------------
  // Aviso temporário (2,5 s, anunciado por leitor de tela)
  // ---------------------------------------------------------------
  let temporizadorAviso = null;

  function mostrarAviso(texto) {
    clearTimeout(temporizadorAviso);
    aviso.textContent = '';
    // Pequena pausa para o leitor de tela anunciar de novo uma mensagem repetida
    setTimeout(() => {
      aviso.textContent = texto;
      temporizadorAviso = setTimeout(() => { aviso.textContent = ''; }, 2500);
    }, 50);
  }

  document.addEventListener('click', (evento) => {
    const gatilho = evento.target.closest('[data-aviso]');
    if (!gatilho) return;
    evento.preventDefault();
    const texto = AVISOS[gatilho.dataset.aviso];
    if (texto) mostrarAviso(texto);
  });

  // ---------------------------------------------------------------
  // Conteúdo: temporadas e lista de episódios
  // ---------------------------------------------------------------
  const listaEpisodios = $('#lista-episodios');
  const EPISODIOS_POR_TEMPORADA = 6;

  function mostrarTemporada(numero) {
    $$('[data-temporada]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.temporada === String(numero)));
    });
    listaEpisodios.textContent = '';
    // Numeração seguida entre temporadas (1–6, 7–12, 13–18) para a troca ser perceptível
    const primeiro = (numero - 1) * EPISODIOS_POR_TEMPORADA + 1;
    for (let n = primeiro; n < primeiro + EPISODIOS_POR_TEMPORADA; n++) {
      const item = document.createElement('li');
      item.innerHTML =
        '<button type="button" class="episodio" data-aviso="video">' +
          '<span class="reservado" aria-hidden="true">[miniatura do episódio]</span>' +
          '<span><span class="episodio-titulo">[Título do episódio ' + n + ']</span>' +
          '<span class="episodio-duracao">[duração]</span></span>' +
        '</button>';
      listaEpisodios.appendChild(item);
    }
  }

  $$('[data-temporada]').forEach((botao) => {
    botao.addEventListener('click', () => mostrarTemporada(Number(botao.dataset.temporada)));
  });
  mostrarTemporada(1);

  // ---------------------------------------------------------------
  // Início
  // ---------------------------------------------------------------
  window.addEventListener('hashchange', aplicarRota);

  if (!location.hash || location.hash === '#' || location.hash === '#/') {
    history.replaceState(null, '', ROTA_PADRAO);
  }
  aplicarRota();
})();
