/* Percurso: alternativa C. Partes comuns ao Início e ao quiz.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

window.PercursoC = (function () {
  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------------------------------------------------------------
  // Avisos das interações simuladas (mesmos textos da alternativa A)
  // ---------------------------------------------------------------
  const AVISOS = {
    whatsapp: 'Neste ponto abriria o WhatsApp.',
    video: 'Neste ponto o vídeo começaria.',
    avaliacoes: 'Neste ponto abririam as avaliações no Google.',
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
    if (!menu.hidden) fecharMenu(true);
    const texto = AVISOS[gatilho.dataset.aviso];
    if (texto) mostrarAviso(texto);
  });

  // ---------------------------------------------------------------
  // Menu (foco no painel ao abrir, Esc fecha, foco volta ao botão)
  // ---------------------------------------------------------------
  const botaoMenu = $('#botao-menu');
  const menu = $('#menu');
  const menuFundo = $('#menu-fundo');
  const barraPilula = $('#barra-pilula');
  const fundoInerte = [$('#cabecalho'), $('#conteudo-principal'), $('#rodape'), barraPilula];

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

  // ---------------------------------------------------------------
  // Barra flutuante em pílula (fade de 200 ms no CSS, sem animação com "reduzir movimento")
  // ---------------------------------------------------------------
  function mostrarBarra(visivel) {
    barraPilula.classList.toggle('visivel', visivel);
  }

  // Rolagem suave, a não ser que o celular peça para reduzir movimento
  function comportamentoRolagem() {
    return reduzirMovimento.matches ? 'auto' : 'smooth';
  }

  // ---------------------------------------------------------------
  // Baralho de cartões empilhados (flash cards do Início e perguntas do quiz)
  // ---------------------------------------------------------------
  // Cada [data-carta] recebe data-pos conforme a distância até o cartão atual:
  // "0" na frente, "1" e "2" atrás (deslocados), "atras" escondido, "saiu" fora pela esquerda.
  // Só o cartão da frente fica fora do inert. Cartões que viram têm um botão
  // .carta-virar (aria-expanded) e um .carta-verso, que fica inert enquanto fechado.
  const DURACAO_TROCA = 300;

  function virarCarta(carta, aberta) {
    carta.classList.toggle('virada', aberta);
    const botao = $('.carta-virar', carta);
    const verso = $('.carta-verso', carta);
    if (botao) botao.setAttribute('aria-expanded', String(aberta));
    if (verso) verso.inert = !aberta;
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

  return { $, $$, reduzirMovimento, mostrarAviso, mostrarBarra, comportamentoRolagem, criarBaralho };
})();
