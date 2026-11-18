/* Percurso: alternativa C, Início.
   Estado só em memória, nenhuma chamada de rede. */
'use strict';

(function () {
  const { $, mostrarBarra } = window.PercursoC;

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
