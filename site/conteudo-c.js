/* Percurso: alternativa C, Conteúdo. Trocar a temporada troca a lista de episódios. */
'use strict';

(function () {
  const { $, $$ } = window.PercursoC;
  const lista = $('#lista-episodios');
  const EPISODIOS_POR_TEMPORADA = 6;

  function mostrarTemporada(numero) {
    $$('[data-temporada]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.temporada === String(numero)));
    });
    lista.textContent = '';
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
      lista.appendChild(item);
    }
  }

  $$('[data-temporada]').forEach((botao) => {
    botao.addEventListener('click', () => mostrarTemporada(Number(botao.dataset.temporada)));
  });
  mostrarTemporada(1);
})();
