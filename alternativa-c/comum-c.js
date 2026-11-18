/* Percurso: alternativa C. Moldura e componentes comuns a todas as páginas.
   Cada página declara quem é em <body data-pagina="..."> e traz só o próprio conteúdo
   (<div class="app"><main>…</main></div>). Este arquivo monta, uma vez para todas:
   cabeçalho, menu, rodapé, barra em pílula, botão de voltar ao topo e aviso.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

window.PercursoC = (function () {
  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pagina = document.body.dataset.pagina;
  const noAgendamento = pagina === 'agendar';

  // Rolagem suave, a não ser que o celular peça para reduzir movimento
  function comportamentoRolagem() {
    return reduzirMovimento.matches ? 'auto' : 'smooth';
  }

  // ---------------------------------------------------------------
  // Moldura: páginas, ícones e marcação comum
  // ---------------------------------------------------------------
  const PAGINAS = [
    { id: 'inicio', href: './', nome: 'Início' },
    { id: 'sobre', href: 'sobre.html', nome: 'Sobre' },
    { id: 'atendimento', href: 'atendimento.html', nome: 'Atendimento' },
    { id: 'conteudo', href: 'conteudo.html', nome: 'Conteúdo' },
    { id: 'duvidas', href: 'duvidas.html', nome: 'Dúvidas' }
  ];
  const ICONES = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
    voltar: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    topo: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
  };

  const listaPaginas = () => PAGINAS.map((p) =>
    '<li><a href="' + p.href + '"' + (p.id === pagina ? ' aria-current="page"' : '') + '>' + p.nome + '</a></li>'
  ).join('');

  // Cabeçalho: no Início, só o menu; nas demais, Voltar (Início da C) e menu.
  // O agendamento tem o cabeçalho próprio do fluxo, no HTML da página.
  const CABECALHO =
    '<header class="cabecalho cabecalho-c' + (pagina === 'inicio' ? '' : ' cabecalho-voltar') + '" id="cabecalho">' +
      (pagina === 'inicio' ? '' : '<a class="botao-icone botao-redondo" href="./" aria-label="Voltar">' + ICONES.voltar + '</a>') +
      '<button type="button" class="botao-icone botao-redondo" id="botao-menu" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">' + ICONES.menu + '</button>' +
    '</header>';

  // Rodapé: completo nas páginas; curto no agendamento (só o aviso do CVV e a linha legal)
  const RODAPE =
    '<footer class="rodape rodape-c' + (noAgendamento ? ' rodape-curto' : '') + '" id="rodape">' +
      (noAgendamento ? '' :
        '<p class="rodape-nome">Maria Clara Vinotti</p>' +
        '<p>Parapsicóloga clínica · Florianópolis e online</p>' +
        '<ul>' + listaPaginas() + '</ul>') +
      '<p class="aviso-crise">Este site não oferece atendimento imediato em situações de crise. Se precisar de ajuda agora, ligue 188 (CVV), 24 horas e gratuito, ou acesse <button type="button" class="link-inline" data-aviso="cvv">cvv.org.br</button>. Em emergência, procure o hospital mais próximo.</p>' +
      '<p class="rodape-legal">' +
        '<button type="button" class="link" data-aviso="pagina">Política de privacidade</button>' +
        '<span aria-hidden="true">·</span>' +
        '<button type="button" class="link" data-aviso="pagina">Termos de uso</button>' +
      '</p>' +
      (noAgendamento ? '' : '<p class="rodape-registro">Registro FATECPR · Associada à ABPSIG</p>') +
    '</footer>';

  // Elementos flutuantes e menu (fora do agendamento, que não tem menu nem barra)
  const FLUTUANTES = noAgendamento ? '' :
    '<div class="barra-pilula" id="barra-pilula">' +
      '<button type="button" class="botao botao-secundario" data-aviso="whatsapp">WhatsApp</button>' +
      '<a class="botao botao-principal" href="agendar.html">Agendar sessão</a>' +
    '</div>' +
    '<button type="button" class="botao-icone botao-redondo botao-redondo-contorno botao-topo" id="botao-topo" aria-label="Voltar ao topo">' + ICONES.topo + '</button>' +
    '<div class="menu-fundo" id="menu-fundo" hidden></div>' +
    '<nav class="menu menu-c" id="menu" tabindex="-1" hidden>' +
      '<ul>' + listaPaginas() + '</ul>' +
      '<button type="button" class="botao botao-secundario" id="botao-fechar-menu">Fechar</button>' +
    '</nav>';

  const app = $('.app');
  if (!noAgendamento) app.insertAdjacentHTML('afterbegin', CABECALHO);
  app.insertAdjacentHTML('beforeend', RODAPE);
  document.body.insertAdjacentHTML('beforeend', FLUTUANTES +
    '<div class="aviso" id="aviso" role="status" aria-live="polite"></div>');

  // ---------------------------------------------------------------
  // Avisos das interações simuladas (mesmos textos da alternativa A)
  // ---------------------------------------------------------------
  const AVISOS = {
    whatsapp: 'Neste ponto abriria o WhatsApp.',
    maps: 'Neste ponto abriria o Google Maps.',
    video: 'Neste ponto o vídeo começaria.',
    avaliacoes: 'Neste ponto abririam as avaliações no Google.',
    youtube: 'Neste ponto abriria o canal no YouTube.',
    cvv: 'Neste ponto abriria o site do CVV.',
    pagina: 'Esta página ainda não existe no protótipo.'
  };
  const aviso = $('#aviso');
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
    if (menu && !menu.hidden) fecharMenu(true);
    const texto = AVISOS[gatilho.dataset.aviso];
    if (texto) mostrarAviso(texto);
  });

  // ---------------------------------------------------------------
  // Vídeo do YouTube: o player só é criado quando a pessoa toca no play
  // (nenhuma chamada ao YouTube antes disso; domínio sem cookies de rastreio)
  // ---------------------------------------------------------------
  document.addEventListener('click', (evento) => {
    const play = evento.target.closest('[data-video]');
    if (!play) return;
    const caixa = play.parentElement;
    const titulo = play.getAttribute('aria-labelledby');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(play.dataset.video) + '?autoplay=1&rel=0';
    iframe.title = titulo && document.getElementById(titulo) ? document.getElementById(titulo).textContent.trim() : 'YouTube';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    caixa.classList.add('video-carregado');
    caixa.replaceChildren(iframe);
    iframe.focus();
  });

  // ---------------------------------------------------------------
  // Menu (foco no painel ao abrir, Esc fecha, foco volta ao botão)
  // ---------------------------------------------------------------
  const botaoMenu = $('#botao-menu');
  const menu = $('#menu');
  const menuFundo = $('#menu-fundo');
  const barraPilula = $('#barra-pilula');
  const botaoTopo = $('#botao-topo');
  const fundoInerte = [$('#cabecalho'), $('#conteudo-principal'), $('#rodape'), barraPilula, botaoTopo];

  function abrirMenu() {
    menu.hidden = false;
    menuFundo.hidden = false;
    botaoMenu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-aberto');
    fundoInerte.forEach((el) => { if (el) el.inert = true; });
    menu.focus();
  }

  function fecharMenu(devolverFoco) {
    if (menu.hidden) return;
    menu.hidden = true;
    menuFundo.hidden = true;
    botaoMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-aberto');
    fundoInerte.forEach((el) => { if (el) el.inert = false; });
    if (devolverFoco) botaoMenu.focus();
  }

  if (menu) {
    botaoMenu.addEventListener('click', abrirMenu);
    $('#botao-fechar-menu').addEventListener('click', () => fecharMenu(true));
    menuFundo.addEventListener('click', () => fecharMenu(true));
    menu.addEventListener('click', (evento) => {
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
  }

  // ---------------------------------------------------------------
  // Barra flutuante em pílula: só aparece quando as ações principais da tela
  // (marcadas com data-acoes) estão fora de vista, para não repetir os mesmos
  // botões nem cobrir os da página. Fade de 200 ms; sem animação com "reduzir movimento".
  // ---------------------------------------------------------------
  if (barraPilula) {
    const acoes = $$('[data-acoes]');
    if (!('IntersectionObserver' in window) || acoes.length === 0) {
      barraPilula.classList.add('visivel');
    } else {
      const visiveis = new Set();
      const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) visiveis.add(entrada.target);
          else visiveis.delete(entrada.target);
        });
        barraPilula.classList.toggle('visivel', visiveis.size === 0);
      }, { rootMargin: '-' + $('#cabecalho').offsetHeight + 'px 0px 0px 0px' });
      acoes.forEach((el) => observador.observe(el));
    }
  }

  // ---------------------------------------------------------------
  // Voltar ao topo: aparece quando a página desce; leva ao topo e o foco ao h1
  // ---------------------------------------------------------------
  if (botaoTopo) {
    let agendado = false;
    const atualizarTopo = () => {
      agendado = false;
      botaoTopo.classList.toggle('visivel', window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', () => {
      if (!agendado) { agendado = true; requestAnimationFrame(atualizarTopo); }
    }, { passive: true });
    atualizarTopo();
    botaoTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: comportamentoRolagem() });
      const titulo = $('h1');
      if (titulo) titulo.focus({ preventScroll: true });
    });
  }

  // ---------------------------------------------------------------
  // Âncoras (#presencial, #etapas): ao chegar, o foco vai para o título da seção
  // ---------------------------------------------------------------
  function focarAncora() {
    const alvo = location.hash.length > 1 && !location.hash.startsWith('#/') && document.getElementById(location.hash.slice(1));
    if (!alvo) return;
    const titulo = alvo.matches('h1, h2, h3') ? alvo : $('h2, h3', alvo);
    if (titulo) titulo.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', focarAncora);
  window.addEventListener('load', focarAncora);

  // ---------------------------------------------------------------
  // Baralho de cartões empilhados (flash cards do Início e perguntas do quiz)
  // ---------------------------------------------------------------
  // Cada [data-carta] recebe data-pos conforme a distância até o cartão atual:
  // "0" na frente, "1" e "2" atrás (alinhados, um pouco abaixo), "atras" escondido, "saiu" (saiu pela esquerda).
  // Só o cartão da frente fica fora do inert. Cartões que viram têm um botão
  // .carta-virar (aria-expanded) e um .carta-verso, que fica inert enquanto fechado.
  const DURACAO_TROCA = 650; // igual a --duracao-troca no CSS

  function virarCarta(carta, aberta) {
    carta.classList.toggle('virada', aberta);
    const botao = $('.carta-virar', carta);
    const verso = $('.carta-verso', carta);
    if (botao) botao.setAttribute('aria-expanded', String(aberta));
    if (verso) {
      // inert tira do foco e da árvore de acessibilidade; aria-hidden reforça para leitores mais antigos
      verso.inert = !aberta;
      if (aberta) verso.removeAttribute('aria-hidden');
      else verso.setAttribute('aria-hidden', 'true');
    }
  }

  // Volta à frente sem mostrar o giro (cartão que já saiu da frente)
  function desvirarSemAnimacao(carta) {
    carta.classList.add('sem-transicao');
    virarCarta(carta, false);
    void carta.offsetWidth;
    carta.classList.remove('sem-transicao');
  }

  function criarBaralho(raiz, opcoes) {
    opcoes = opcoes || {};
    let atual = 0;
    let ignorarClique = false;
    const cartas = () => $$('[data-carta]', raiz);

    function posicionar() {
      cartas().forEach((carta, i) => {
        const distancia = i - atual;
        carta.dataset.pos = distancia < 0 ? 'saiu' : (distancia > 2 ? 'atras' : String(distancia));
        carta.inert = distancia !== 0;
      });
    }

    function irPara(indice) {
      const lista = cartas();
      if (indice < 0 || indice >= lista.length || indice === atual) return false;
      const anterior = lista[atual];
      const tinhaFoco = anterior.contains(document.activeElement);
      atual = indice;
      posicionar();
      // O novo cartão aparece sempre pela frente; o que saiu desvira depois de sair de vista
      if (anterior.classList.contains('virada')) {
        setTimeout(() => {
          if (cartas().indexOf(anterior) !== atual) desvirarSemAnimacao(anterior);
        }, reduzirMovimento.matches ? 0 : DURACAO_TROCA + 20);
      }
      if (tinhaFoco) {
        const botao = $('.carta-virar', lista[atual]);
        if (botao) botao.focus({ preventScroll: true });
      }
      if (opcoes.aoMudar) opcoes.aoMudar(atual);
      return true;
    }

    // Depois de deslizar o dedo, o toque que o navegador gera não vira o cartão
    raiz.addEventListener('click', (evento) => {
      if (!ignorarClique) return;
      ignorarClique = false;
      evento.preventDefault();
      evento.stopPropagation();
    }, true);

    raiz.addEventListener('click', (evento) => {
      const botao = evento.target.closest('.carta-virar');
      if (!botao) return;
      const carta = botao.closest('[data-carta]');
      if (opcoes.aoVirar) opcoes.aoVirar(carta);
      else virarCarta(carta, !carta.classList.contains('virada'));
    });

    // Deslizar para os lados é só um atalho para Anterior e Próximo
    if (opcoes.deslizar) {
      let inicio = null;
      raiz.addEventListener('pointerdown', (evento) => {
        if (evento.pointerType === 'mouse' && evento.button !== 0) return;
        inicio = { x: evento.clientX, y: evento.clientY, id: evento.pointerId };
      });
      raiz.addEventListener('pointerup', (evento) => {
        if (!inicio || evento.pointerId !== inicio.id) return;
        const dx = evento.clientX - inicio.x;
        const dy = evento.clientY - inicio.y;
        inicio = null;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        ignorarClique = true;
        setTimeout(() => { ignorarClique = false; }, 400);
        irPara(atual + (dx < 0 ? 1 : -1));
      });
      raiz.addEventListener('pointercancel', () => { inicio = null; });
    }

    posicionar();
    return {
      irPara,
      atual: () => atual,
      total: () => cartas().length,
      carta: (i) => cartas()[i === undefined ? atual : i],
      virar: virarCarta,
      desvirar: desvirarSemAnimacao,
      reiniciar() {
        cartas().forEach(desvirarSemAnimacao);
        atual = 0;
        posicionar();
      }
    };
  }

  return { $, $$, comportamentoRolagem, criarBaralho };
})();
