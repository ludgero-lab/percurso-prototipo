/* Percurso: protótipo de teste.
   Rotas por hash, estado só em memória, nenhuma chamada de rede. */
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
    'duvidas': { secao: 'duvidas' }
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

  let primeiraRota = true;

  // ---------------------------------------------------------------
  // Roteador
  // ---------------------------------------------------------------
  function lerRota() {
    return location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  }

  function aplicarRota() {
    const caminho = lerRota();
    const rota = ROTAS[caminho];

    if (!rota) {
      location.replace(ROTA_PADRAO);
      return;
    }

    fecharMenu(false);

    $$('[data-rota]').forEach((secao) => {
      secao.hidden = secao.dataset.rota !== rota.secao;
    });

    const noFluxo = Boolean(rota.fluxo);
    cabecalhoGlobal.hidden = noFluxo;
    rodape.hidden = noFluxo;
    barraFixa.hidden = noFluxo;

    if (typeof rota.aoEntrar === 'function') rota.aoEntrar();

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
  const barrasFixas = [barraFixa];

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
  // Início
  // ---------------------------------------------------------------
  window.addEventListener('hashchange', aplicarRota);

  if (!location.hash || location.hash === '#' || location.hash === '#/') {
    history.replaceState(null, '', ROTA_PADRAO);
  }
  aplicarRota();
})();
