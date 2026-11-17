/* Percurso: alternativa B do Início.
   Página única, estado só em memória, nenhuma chamada de rede. */
'use strict';

(function () {
  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));

  // ---------------------------------------------------------------
  // Avisos das interações simuladas (mesmos textos da alternativa A)
  // ---------------------------------------------------------------
  const AVISOS = {
    whatsapp: 'Neste ponto abriria o WhatsApp.',
    video: 'Neste ponto o vídeo começaria.',
    avaliacoes: 'Neste ponto abririam as avaliações no Google.',
    pagina: 'Esta página ainda não existe no protótipo.'
  };
  const aviso = $('#aviso');
  let temporizadorAviso = null;

  function mostrarAviso(texto) {
    clearTimeout(temporizadorAviso);
    aviso.textContent = '';
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
  const fundoInerte = [$('#cabecalho'), $('#conteudo-principal'), $('#rodape'), $('#whatsapp-flutuante')];

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
  // Como você se sente hoje? (emoções em arco)
  // ---------------------------------------------------------------
  // Proposta de emoções, da mais difícil para a mais leve (a revisar com a Maria Clara)
  const OLHOS = '<circle cx="11.5" cy="13" r="1.5" fill="currentColor" stroke="none"/><circle cx="20.5" cy="13" r="1.5" fill="currentColor" stroke="none"/>';
  const EMOCOES = [
    { nome: 'Muito mal', rosto: OLHOS + '<path d="M9.5 10.5l4 1.5M22.5 10.5l-4 1.5"/><path d="M10.5 22.5Q16 17 21.5 22.5"/>' },
    { nome: 'Triste', rosto: OLHOS + '<path d="M11 21.5Q16 18 21 21.5"/>' },
    { nome: 'Com ansiedade', rosto: OLHOS + '<path d="M10.5 20.5q1.4-1.6 2.75 0t2.75 0t2.75 0t2.75 0"/>' },
    { nome: 'Mais ou menos', rosto: OLHOS + '<path d="M11 20h10"/>' },
    { nome: 'Em paz', rosto: '<path d="M9.5 13.5q2 1.6 4 0M18.5 13.5q2 1.6 4 0"/><path d="M12 19.5Q16 22 20 19.5"/>' },
    { nome: 'Feliz', rosto: OLHOS + '<path d="M10.5 18.5Q16 24 21.5 18.5"/>' },
    { nome: 'Muito bem', rosto: '<path d="M9.5 13.5q2-2 4 0M18.5 13.5q2-2 4 0"/><path d="M10 18h12q-1 6.5-6 6.5T10 18z" fill="currentColor"/>' }
  ];

  const mostrador = $('#mostrador');
  const arco = $('#mostrador-arco');
  const listaEmocoes = $('#emocoes');
  const rotuloEscolhido = $('#emocao-escolhida');
  const testePerfil = $('#teste-perfil');
  const SVG_NS = 'http://www.w3.org/2000/svg';
  let escolhida = null;

  EMOCOES.forEach((emocao, i) => {
    const label = document.createElement('label');
    label.className = 'emocao';
    label.dataset.indice = String(i);
    label.innerHTML =
      '<input type="radio" name="emocao" value="' + emocao.nome + '">' +
      '<span class="so-leitor">' + emocao.nome + '</span>' +
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="16" cy="16" r="13"/>' + emocao.rosto + '</svg>';
    listaEmocoes.appendChild(label);
  });

  // Ângulo de cada emoção no arco: 180° (esquerda) a 0° (direita)
  const angulo = (i) => 180 - i * (180 / (EMOCOES.length - 1));

  function geometria() {
    const largura = mostrador.clientWidth;
    const cx = largura / 2;
    const cy = 196;
    const raio = Math.min(150, cx - 30);
    return { largura, altura: mostrador.clientHeight, cx, cy, raio };
  }

  function ponto(g, graus, distancia) {
    const rad = graus * Math.PI / 180;
    return { x: g.cx + distancia * Math.cos(rad), y: g.cy - distancia * Math.sin(rad) };
  }

  function desenhar() {
    const g = geometria();
    arco.setAttribute('viewBox', '0 0 ' + g.largura + ' ' + g.altura);
    arco.textContent = '';

    // Marcas do mostrador
    for (let graus = 0; graus <= 180; graus += 7.5) {
      const longa = graus % 30 === 0;
      const a = ponto(g, graus, g.raio - (longa ? 66 : 60));
      const b = ponto(g, graus, g.raio - 50);
      const linha = document.createElementNS(SVG_NS, 'line');
      linha.setAttribute('class', 'marca-arco');
      linha.setAttribute('x1', a.x); linha.setAttribute('y1', a.y);
      linha.setAttribute('x2', b.x); linha.setAttribute('y2', b.y);
      arco.appendChild(linha);
    }

    // Ponteiro: aponta para a emoção escolhida (ou para cima, apagado, antes da escolha)
    const graus = escolhida === null ? 90 : angulo(escolhida);
    const ponta = ponto(g, graus, g.raio - 74);
    const ponteiro = document.createElementNS(SVG_NS, 'line');
    ponteiro.setAttribute('class', escolhida === null ? 'ponteiro ponteiro-vazio' : 'ponteiro');
    ponteiro.setAttribute('x1', g.cx); ponteiro.setAttribute('y1', g.cy);
    ponteiro.setAttribute('x2', ponta.x); ponteiro.setAttribute('y2', ponta.y);
    arco.appendChild(ponteiro);
    const centro = document.createElementNS(SVG_NS, 'circle');
    centro.setAttribute('class', 'centro');
    centro.setAttribute('cx', g.cx); centro.setAttribute('cy', g.cy); centro.setAttribute('r', '6');
    arco.appendChild(centro);

    // Emoções sobre o arco
    $$('.emocao', listaEmocoes).forEach((label) => {
      const p = ponto(g, angulo(Number(label.dataset.indice)), g.raio);
      label.style.left = p.x + 'px';
      label.style.top = p.y + 'px';
    });

    // Nome da emoção escolhida, centralizado abaixo do ponteiro
    rotuloEscolhido.style.left = g.cx + 'px';
    rotuloEscolhido.style.top = (g.cy + 20) + 'px';
  }

  listaEmocoes.addEventListener('change', (evento) => {
    const label = evento.target.closest('.emocao');
    if (!label) return;
    escolhida = Number(label.dataset.indice);
    rotuloEscolhido.textContent = EMOCOES[escolhida].nome;
    desenhar();
    // Logo após a resposta, oferece o teste de perfil
    if (testePerfil.hidden) {
      testePerfil.hidden = false;
      testePerfil.scrollIntoView({ block: 'nearest' });
    }
  });

  window.addEventListener('resize', desenhar);
  desenhar();
})();
