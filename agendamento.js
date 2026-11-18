/* Percurso: lógica do agendamento, compartilhada pelas alternativas A e C.
   Liga os passos 1, 2 e 3 a uma página que tenha os mesmos ids (form-passo1, fuso,
   calendario-dias, grade-horarios, form-passo2, nome, email…). Cada alternativa
   cuida só da navegação entre os passos (opção irParaPasso).
   Estado só em memória: nada é salvo nem enviado. */
'use strict';

window.Agendamento = (function () {
  // ---------------------------------------------------------------
  // Fusos, modalidades, datas e horários
  // ---------------------------------------------------------------
  const FUSOS = {
    'brasilia': { nome: 'Brasília', deslocamento: 0 },
    'lisboa': { nome: 'Lisboa', deslocamento: 3 },
    'londres': { nome: 'Londres', deslocamento: 3 },
    'nova-york': { nome: 'Nova York', deslocamento: -2 }
  };
  const MODALIDADES = { online: 'Online', presencial: 'Presencial' };
  const DIAS_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const HORARIOS_BASE = ['9:00', '10:30', '14:00', '15:30'];
  const HORARIOS_NOITE = ['18:00', '19:30']; // terça a quinta

  const maiuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

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
  // Fluxo ligado à página
  // ---------------------------------------------------------------
  function criar(opcoes) {
    const $ = (sel, raiz) => (raiz || document).querySelector(sel);
    const $$ = (sel, raiz) => Array.from((raiz || document).querySelectorAll(sel));
    const irParaPasso = opcoes.irParaPasso;
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

    const passo1Completo = () => Boolean(estado.modalidade && estado.dia && estado.horario);

    // ---------- Passo 1: modalidade, fuso, calendário e horários ----------
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
        irParaPasso(2);
        return;
      }
      // Limpa e repõe para o leitor de tela anunciar de novo
      erroPasso1.textContent = '';
      setTimeout(() => {
        erroPasso1.textContent = 'Escolha a modalidade, um dia e um horário para continuar.';
      }, 50);
    });

    // ---------- Resumo da escolha (passos 2 e 3) ----------
    // "Online · quinta, 26 de novembro, 14:00" / "Fuso Brasília · cerca de 1h30"
    function preencherResumo(idLinha1, idLinha2) {
      $('#' + idLinha1).textContent = MODALIDADES[estado.modalidade] + ' · ' +
        diaPorExtenso(daChave(estado.dia)) + ', ' + converterHorario(estado.horario, estado.fuso);
      $('#' + idLinha2).textContent = 'Fuso ' + FUSOS[estado.fuso].nome + ' · cerca de 1h30';
    }

    // ---------- Passo 2: dados (nada é salvo nem enviado) ----------
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
      irParaPasso(3);
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

    zerarEstado();

    return {
      estado,
      passo1Completo,
      // Começa do zero: escolhas e formulário de dados
      zerar() {
        zerarEstado();
        zerarFormularioDados();
      },
      // Prepara a tela de cada passo ao entrar nele
      entrarNoPasso(passo) {
        if (passo === 1) sincronizarPasso1();
        if (passo === 2) preencherResumo('resumo-linha1', 'resumo-linha2');
        if (passo === 3) preencherResumo('confirmacao-linha1', 'confirmacao-linha2');
      }
    };
  }

  return { criar };
})();
