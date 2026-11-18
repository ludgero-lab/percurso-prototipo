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
    'duvidas': { secao: 'duvidas' },
    'agendar/1': { secao: 'agendar-1', fluxo: 1, nomePasso: 'Modalidade, dia e horário', progresso: 33 },
    'agendar/2': { secao: 'agendar-2', fluxo: 2, nomePasso: 'Seus dados', progresso: 66 },
    'agendar/3': { secao: 'agendar-3', fluxo: 3, nomePasso: 'Solicitação enviada', progresso: 100 }
  };
  const ROTA_PADRAO = '#/inicio';

  // ---------------------------------------------------------------
  // Estado do agendamento (só em memória; nada é salvo nem enviado)
  // ---------------------------------------------------------------
  const FUSOS = {
    'brasilia': { nome: 'Brasília', deslocamento: 0 },
    'lisboa': { nome: 'Lisboa', deslocamento: 3 },
    'londres': { nome: 'Londres', deslocamento: 3 },
    'nova-york': { nome: 'Nova York', deslocamento: -2 }
  };
  const MODALIDADES = { online: 'Online', presencial: 'Presencial' };

  const estado = {};

  function zerarEstado() {
    const hoje = hojeMeiaNoite();
    estado.modalidade = null;
    estado.fuso = 'brasilia';
    estado.dia = null;       // 'AAAA-MM-DD'
    estado.horario = null;   // horário base, em Brasília
    estado.mesVisivel = { ano: hoje.getFullYear(), mes: hoje.getMonth() };
    estado.enviado = false;
  }

  function passo1Completo() {
    return Boolean(estado.modalidade && estado.dia && estado.horario);
  }

  // ---------------------------------------------------------------
  // Datas e horários
  // ---------------------------------------------------------------
  const DIAS_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const HORARIOS_BASE = ['9:00', '10:30', '14:00', '15:30'];
  const HORARIOS_NOITE = ['18:00', '19:30']; // terça a quinta

  function maiuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  function hojeMeiaNoite() {
    const agora = new Date();
    return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  }

  function paraChave(data) {
    return data.getFullYear() + '-' +
      String(data.getMonth() + 1).padStart(2, '0') + '-' +
      String(data.getDate()).padStart(2, '0');
  }

  function daChave(chave) {
    const [ano, mes, dia] = chave.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  // "quinta, 26 de novembro"
  function diaPorExtenso(data) {
    return DIAS_SEMANA[data.getDay()] + ', ' + data.getDate() + ' de ' + MESES[data.getMonth()];
  }

  // Terças a sextas, a partir de amanhã
  function diaDisponivel(data) {
    const semana = data.getDay();
    return semana >= 2 && semana <= 5 && data > hojeMeiaNoite();
  }

  function horariosDoDia(data) {
    const semana = data.getDay();
    return semana >= 2 && semana <= 4 ? HORARIOS_BASE.concat(HORARIOS_NOITE) : HORARIOS_BASE.slice();
  }

  // Deslocamento fixo a partir do horário de Brasília
  function converterHorario(base, fuso) {
    const [hora, minuto] = base.split(':').map(Number);
    return (hora + FUSOS[fuso].deslocamento) + ':' + String(minuto).padStart(2, '0');
  }

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

  let primeiraRota = true;
  zerarEstado();
  estado.origem = null; // última página fora do fluxo visitada nesta alternativa

  // Agendamento aberto a partir da alternativa C (outra página do mesmo site):
  // "Voltar" no passo 1 e "Voltar ao início" retornam para a C, e não para o Início da A.
  const paginaDaC = (function () {
    try {
      const ref = new URL(document.referrer);
      if (ref.origin === location.origin && /\/alternativa-c\//.test(ref.pathname)) {
        return { pagina: ref.href, inicio: new URL('./', ref).href };
      }
    } catch (erro) { /* sem referência: segue o comportamento da A */ }
    return null;
  })();

  // ---------------------------------------------------------------
  // Roteador
  // ---------------------------------------------------------------
  function lerRota() {
    return location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  }

  function aplicarRota() {
    const caminho = lerRota();

    // Rota de apoio para links de outras páginas (alternativa C): abre o passo 1 com Online marcado
    if (caminho === 'agendar/online') {
      zerarEstado();
      zerarFormularioDados();
      estado.modalidade = 'online';
      location.replace('#/agendar/1');
      return;
    }

    const rota = ROTAS[caminho];

    if (!rota) {
      location.replace(ROTA_PADRAO);
      return;
    }

    // Guardas do fluxo
    if (estado.enviado && rota.fluxo !== 3) {
      // Depois do envio, voltar (pelo navegador) leva ao Início, com o estado limpo
      zerarEstado();
      zerarFormularioDados();
      if (rota.fluxo) {
        location.replace(ROTA_PADRAO);
        return;
      }
    }
    if (rota.fluxo === 2 && !passo1Completo()) {
      location.replace('#/agendar/1');
      return;
    }
    if (rota.fluxo === 3 && !estado.enviado) {
      location.replace(ROTA_PADRAO);
      return;
    }
    if (!rota.fluxo) estado.origem = location.hash;

    fecharMenu(false);

    $$('[data-rota]').forEach((secao) => {
      secao.hidden = secao.dataset.rota !== rota.secao;
    });

    const noFluxo = Boolean(rota.fluxo);
    cabecalhoGlobal.hidden = noFluxo;
    rodape.classList.toggle('rodape-curto', noFluxo);
    barraFixa.hidden = noFluxo;
    cabecalhoFluxo.hidden = !noFluxo;
    if (noFluxo) atualizarCabecalhoFluxo(rota);

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
    if (rota && rota.fluxo === 2) {
      location.hash = '#/agendar/1';
    } else if (!estado.origem && paginaDaC) {
      location.href = paginaDaC.pagina;
    } else {
      location.hash = estado.origem || ROTA_PADRAO;
    }
  });

  // "Agendar sessão" (de fora do fluxo) começa do zero; "Agendar online" já marca Online
  document.addEventListener('click', (evento) => {
    const gatilho = evento.target.closest('[data-agendar]');
    if (!gatilho) return;
    zerarEstado();
    zerarFormularioDados();
    if (gatilho.dataset.agendar === 'online') estado.modalidade = 'online';
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
  // Agendar · passo 1: modalidade, fuso, calendário e horários
  // ---------------------------------------------------------------
  const formPasso1 = $('#form-passo1');
  const seletorFuso = $('#fuso');
  const mesNome = $('#mes-nome');
  const botaoMesAnterior = $('#mes-anterior');
  const botaoProximoMes = $('#proximo-mes');
  const corpoCalendario = $('#calendario-dias');
  const areaHorarios = $('#area-horarios');
  const tituloDia = $('#titulo-dia');
  const gradeHorarios = $('#grade-horarios');
  const erroPasso1 = $('#erro-passo1');

  function sincronizarPasso1() {
    $$('input[name="modalidade"]', formPasso1).forEach((radio) => {
      radio.checked = radio.value === estado.modalidade;
    });
    seletorFuso.value = estado.fuso;
    erroPasso1.textContent = '';
    desenharCalendario();
    desenharHorarios();
  }

  function desenharCalendario() {
    const { ano, mes } = estado.mesVisivel;
    const hoje = hojeMeiaNoite();
    mesNome.textContent = maiuscula(MESES[mes]) + ' de ' + ano;

    const noMesAtual = ano === hoje.getFullYear() && mes === hoje.getMonth();
    if (noMesAtual && document.activeElement === botaoMesAnterior) botaoProximoMes.focus();
    botaoMesAnterior.disabled = noMesAtual;

    corpoCalendario.textContent = '';
    const deslocamentoInicial = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    let linha = null;

    for (let celula = 0; celula < deslocamentoInicial + diasNoMes; celula++) {
      if (celula % 7 === 0) {
        linha = document.createElement('tr');
        corpoCalendario.appendChild(linha);
      }
      const td = document.createElement('td');
      linha.appendChild(td);
      if (celula < deslocamentoInicial) continue;

      const data = new Date(ano, mes, celula - deslocamentoInicial + 1);
      const chave = paraChave(data);
      if (diaDisponivel(data)) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'dia';
        botao.dataset.dia = chave;
        botao.textContent = String(data.getDate());
        botao.setAttribute('aria-label', maiuscula(diaPorExtenso(data)));
        botao.setAttribute('aria-pressed', String(chave === estado.dia));
        td.appendChild(botao);
      } else {
        const span = document.createElement('span');
        span.className = 'dia-indisponivel';
        span.textContent = String(data.getDate());
        td.appendChild(span);
      }
    }
    // Completa a última linha
    while (linha && linha.children.length < 7) linha.appendChild(document.createElement('td'));
  }

  function desenharHorarios() {
    if (!estado.dia) {
      areaHorarios.hidden = true;
      gradeHorarios.textContent = '';
      return;
    }
    const data = daChave(estado.dia);
    areaHorarios.hidden = false;
    tituloDia.textContent = maiuscula(diaPorExtenso(data));
    gradeHorarios.textContent = '';
    horariosDoDia(data).forEach((base) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'horario';
      botao.dataset.horario = base;
      botao.textContent = converterHorario(base, estado.fuso);
      botao.setAttribute('aria-pressed', String(base === estado.horario));
      gradeHorarios.appendChild(botao);
    });
  }

  function mudarMes(delta) {
    const { ano, mes } = estado.mesVisivel;
    const novo = new Date(ano, mes + delta, 1);
    estado.mesVisivel = { ano: novo.getFullYear(), mes: novo.getMonth() };
    desenharCalendario();
  }

  formPasso1.addEventListener('change', (evento) => {
    if (evento.target.name === 'modalidade') estado.modalidade = evento.target.value;
    if (evento.target === seletorFuso) {
      estado.fuso = seletorFuso.value;
      desenharHorarios(); // a grade e o horário escolhido mudam de fuso
    }
    erroPasso1.textContent = '';
  });

  botaoMesAnterior.addEventListener('click', () => mudarMes(-1));
  botaoProximoMes.addEventListener('click', () => mudarMes(1));

  corpoCalendario.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.dia');
    if (!botao) return;
    if (estado.dia !== botao.dataset.dia) estado.horario = null; // sextas não têm 18:00 e 19:30
    estado.dia = botao.dataset.dia;
    $$('.dia', corpoCalendario).forEach((b) => {
      b.setAttribute('aria-pressed', String(b === botao));
    });
    desenharHorarios();
    erroPasso1.textContent = '';
    areaHorarios.scrollIntoView({ block: 'nearest' });
  });

  gradeHorarios.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.horario');
    if (!botao) return;
    estado.horario = botao.dataset.horario;
    $$('.horario', gradeHorarios).forEach((b) => {
      b.setAttribute('aria-pressed', String(b === botao));
    });
    erroPasso1.textContent = '';
  });

  formPasso1.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (passo1Completo()) {
      location.hash = '#/agendar/2';
      return;
    }
    // Limpa e repõe para o leitor de tela anunciar de novo
    erroPasso1.textContent = '';
    setTimeout(() => {
      erroPasso1.textContent = 'Escolha a modalidade, um dia e um horário para continuar.';
    }, 50);
  });

  ROTAS['agendar/1'].aoEntrar = sincronizarPasso1;

  // ---------------------------------------------------------------
  // Resumo da escolha (passos 2 e 3)
  // ---------------------------------------------------------------
  // "Online · quinta, 26 de novembro, 14:00" / "Fuso Brasília · cerca de 1h30"
  function linhasDaEscolha() {
    return [
      MODALIDADES[estado.modalidade] + ' · ' + diaPorExtenso(daChave(estado.dia)) + ', ' +
        converterHorario(estado.horario, estado.fuso),
      'Fuso ' + FUSOS[estado.fuso].nome + ' · cerca de 1h30'
    ];
  }

  function preencherResumo(idLinha1, idLinha2) {
    const [linha1, linha2] = linhasDaEscolha();
    $('#' + idLinha1).textContent = linha1;
    $('#' + idLinha2).textContent = linha2;
  }

  // ---------------------------------------------------------------
  // Agendar · passo 2: dados (nada é salvo nem enviado)
  // ---------------------------------------------------------------
  const formPasso2 = $('#form-passo2');
  const MSG_VAZIO = 'Preencha este campo.';
  const MSG_EMAIL = 'Digite um e-mail válido.';
  const MSG_PRIVACIDADE = 'Confirme que leu a política de privacidade.';

  const CAMPOS = [
    { id: 'nome', validar: (c) => (c.value.trim() ? '' : MSG_VAZIO) },
    { id: 'email', validar: (c) => (!c.value.trim() ? MSG_VAZIO : (c.value.includes('@') ? '' : MSG_EMAIL)) },
    { id: 'whatsapp', validar: (c) => (c.value.trim() ? '' : MSG_VAZIO) },
    { id: 'como-conheceu', validar: (c) => (c.value ? '' : MSG_VAZIO) },
    { id: 'privacidade', validar: (c) => (c.checked ? '' : MSG_PRIVACIDADE) }
  ];

  function marcarErro(campo, mensagem) {
    $('#erro-' + campo.id).textContent = mensagem;
    if (mensagem) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }

  function zerarFormularioDados() {
    formPasso2.reset();
    CAMPOS.forEach(({ id }) => marcarErro($('#' + id), ''));
  }

  formPasso2.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let primeiroComErro = null;
    CAMPOS.forEach(({ id, validar }) => {
      const campo = $('#' + id);
      const mensagem = validar(campo);
      marcarErro(campo, mensagem);
      if (mensagem && !primeiroComErro) primeiroComErro = campo;
    });
    if (primeiroComErro) {
      primeiroComErro.focus();
      return;
    }
    estado.enviado = true;
    location.hash = '#/agendar/3';
  });

  // O erro some quando a pessoa corrige o campo
  ['input', 'change'].forEach((tipo) => {
    formPasso2.addEventListener(tipo, (evento) => {
      const regra = CAMPOS.find((c) => c.id === evento.target.id);
      if (regra && evento.target.hasAttribute('aria-invalid') && !regra.validar(evento.target)) {
        marcarErro(evento.target, '');
      }
    });
  });

  ROTAS['agendar/2'].aoEntrar = () => preencherResumo('resumo-linha1', 'resumo-linha2');

  // ---------------------------------------------------------------
  // Agendar · passo 3: solicitação enviada
  // ---------------------------------------------------------------
  ROTAS['agendar/3'].aoEntrar = () => preencherResumo('confirmacao-linha1', 'confirmacao-linha2');

  $('#voltar-inicio').addEventListener('click', () => {
    zerarEstado();
    zerarFormularioDados();
    if (!estado.origem && paginaDaC) {
      location.href = paginaDaC.inicio;
      return;
    }
    location.hash = ROTA_PADRAO;
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
