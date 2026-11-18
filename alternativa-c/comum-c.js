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

  return { $, $$, reduzirMovimento, mostrarAviso, mostrarBarra, comportamentoRolagem };
})();
