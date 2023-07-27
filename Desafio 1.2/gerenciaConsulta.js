const prompt = require("prompt-sync")({ sigint: true });
// Importando classes
const Consulta = require('./consulta')
const GerenciaPaciente = require('./gerenciaPaciente')

class GerenciaConsulta {
  constructor() {
    this.consultas = [];
  }

  agendarConsulta(paciente, data, horaInicial, horaFinal) {
    console.log('Agendamento de consulta');
    cpf = prompt('CPF do paciente: ');

    // Procura o paciente na lista de pacientes
    paciente = this.encontrarPaciente(cpf);
    if (!paciente) {
      console.log('Paciente não cadastrado.\n');
      this.mostrarMenuAgenda();
      return;
    }

    data = prompt('Data da consulta (DD/MM/AAAA): ');
    // Verifica se data é válida
    if (!this.validarData(data)) {
      console.log('Data inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    horaInicial = prompt('Hora inicial (HHMM): ');
    // Verifica se hora inicial é válida
    if (!this.validarHora(horaInicial)) {
      console.log('Hora inicial inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    horaFinal = prompt('Hora final (HHMM): ');
    // Verifica se hora final é válida
    if (!this.validarHora(horaFinal)) {
      console.log('Hora final inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    // Verifica se período da consulta é válido
    if (!this.validarPeriodoConsulta(data, horaInicial, horaFinal)) {
      console.log('Período de consulta inválido. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    // Verifica se paciente possui agendamento futuro
    if (this.pacientePossuiAgendamentoFuturo(cpf)) {
      console.log('O paciente já possui um agendamento futuro. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    // Verifica se existe agendamento sobreposto
    if (this.agendamentoSobreposto(data, horaInicial, horaFinal)) {
      console.log('Já existe um agendamento no mesmo período. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    // Cria um novo objeto Consulta
    consulta = new Consulta(paciente, data, horaInicial, horaFinal);
    // Adiciona a consulta à lista de consultas
    this.consultas.push(consulta);
    console.log('Agendamento realizado com sucesso!\n');
    this.mostrarMenuAgenda();
  }

  cancelarAgendamento() {
    console.log('Cancelamento de agendamento');
    cpf = prompt('CPF do paciente: ');

    // Procura paciente na lista de pacientes
    paciente = this.encontrarPaciente(cpf);
    if (!paciente) {
      console.log('Paciente não cadastrado.\n');
      this.mostrarMenuAgenda();
      return;
    }

    // Procura consulta agendada para o paciente
    consulta = this.encontrarConsultaAgendada(cpf);
    if (!consulta) {
      console.log('Não há agendamento para o paciente.\n');
      this.mostrarMenuAgenda();
      return;
    }

    // Verifica se consulta já passou
    if (!this.consultaFutura(consulta)) {
      console.log('O agendamento já passou. Não é possível cancelar.\n');
      this.mostrarMenuAgenda();
      return;
    }

    // Remove consulta da lista de consultas
    this.consultas = this.consultas.filter((c) => c.paciente.cpf !== cpf);
    console.log('Agendamento cancelado com sucesso!\n');
    this.mostrarMenuAgenda();
  }

  listarAgenda() {
    console.log('Listagem da Agenda');
    console.log('-------------------------------------------------------------');
    console.log('Data       H.Ini H.Fim Tempo Nome                          Dt.Nasc.');
    console.log('-------------------------------------------------------------');
    const apresentarAgenda = prompt('Apresentar a agenda (T-Toda ou P-Período): ');

    // Exibe agenda completa
    if (apresentarAgenda.toUpperCase() === 'T') {
      this.consultas.forEach((consulta) => {
        console.log(`${consulta.data} ${consulta.horaInicial.padEnd(5)} ${consulta.horaFinal.padEnd(5)} ${this.calcularTempoConsulta(consulta.horaInicial, consulta.horaFinal)} ${consulta.paciente.nome.padEnd(30)} ${consulta.paciente.dataNascimento}`);
      });
    }
    // Exibe a agenda em um período específico
    else if (apresentarAgenda.toUpperCase() === 'P') {
      const dataInicial = prompt('Data inicial (DD/MM/AAAA): ');
      // Verifica se data inicial é válida
      if (!this.validarData(dataInicial)) {
        console.log('Data inicial inválida. Tente novamente.\n');
        this.listarAgenda();
        return;
      }

      const dataFinal = prompt('Data final (DD/MM/AAAA): ');
      // Verifica se data final é válida
      if (!this.validarData(dataFinal)) {
        console.log('Data final inválida. Tente novamente.\n');
        this.listarAgenda();
        return;
      }

      const consultasPeriodo = this.consultas.filter((consulta) =>
        this.compararDatas(consulta.data, dataInicial) >= 0 && this.compararDatas(consulta.data, dataFinal) <= 0
      );

      // Exibe as consultas no período especificado
      consultasPeriodo.forEach((consulta) => {
        console.log(`${consulta.data} ${consulta.horaInicial.padEnd(5)} ${consulta.horaFinal.padEnd(5)} ${this.calcularTempoConsulta(consulta.horaInicial, consulta.horaFinal)} ${consulta.paciente.nome.padEnd(30)} ${consulta.paciente.dataNascimento}`);
      });
    } else {
      console.log('Opção inválida. Tente novamente.\n');
      this.listarAgenda();
      return;
    }

    console.log('-------------------------------------------------------------\n');
    this.mostrarMenuAgenda();
  }

  validarData(data) {
    return true;
  }

  validarHora(hora) {
    return true;
  }

  validarPeriodoConsulta(data, horaInicial, horaFinal) {
    return true;
  }

  encontrarConsultaAgendada(cpf) {
    // Busca consulta agendada para o paciente pelo CPF
    return this.consultas.find((consulta) => consulta.paciente.cpf === cpf);
  }

  pacientePossuiAgendamentoFuturo(cpf) {
    // Verifica se paciente possui um agendamento futuro
    return this.consultas.some(
      (consulta) => consulta.paciente.cpf === cpf && this.consultaFutura(consulta)
    );
  }

  consultaFutura(consulta) {
    const dataAtual = new Date();
    const dataConsulta = this.stringParaData(consulta.data);
    const horaInicialConsulta = this.stringParaHora(consulta.horaInicial);

    return (
      // Verifica se consulta está agendada
      dataConsulta > dataAtual ||
      (dataConsulta.getTime() === dataAtual.getTime() && 
      horaInicialConsulta > dataAtual.getHours())
    );
  }

  agendamentoSobreposto(data, horaInicial, horaFinal) {
    // Verifica se existe agendamento sobreposto
    return this.consultas.some((consulta) =>
      consulta.data === data &&
      (
        (consulta.horaInicial >= horaInicial && 
        consulta.horaInicial < horaFinal) ||
        (consulta.horaFinal > horaInicial && 
        consulta.horaFinal <= horaFinal)
      )
    );
  }

  compararDatas(data1, data2) {
    const [dia1, mes1, ano1] = data1.split('/').map(Number);
    const [dia2, mes2, ano2] = data2.split('/').map(Number);

    if (ano1 !== ano2) {
      return ano1 - ano2;
    } else if (mes1 !== mes2) {
      return mes1 - mes2;
    } else {
      return dia1 - dia2;
    }
  }

  calcularTempoConsulta(horaInicial, horaFinal) {
    const [horasIni, minutosIni] = horaInicial.match(/.{1,2}/g).map(Number);
    const [horasFim, minutosFim] = horaFinal.match(/.{1,2}/g).map(Number);

    const minutosConsulta = (horasFim - horasIni) * 60 + (minutosFim - minutosIni);
    const horasConsulta = Math.floor(minutosConsulta / 60);
    const minutosRestantes = minutosConsulta % 60;

    // Calcula o tempo de consulta
    return `${horasConsulta.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
  }

  stringParaData(dataString) {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    // Converte string de data para um objeto Date
    return new Date(ano, mes - 1, dia);
  }

  stringParaHora(horaString) {
    const [horas, minutos] = horaString.match(/.{1,2}/g).map(Number);
    // Converte a string de hora para um valor numérico representando o tempo em milissegundos
    // Inicio em 1º de janeiro de 1970
    return new Date().setHours(horas, minutos);
  }

}

formatarData

// Exporta a classe GerenciaConsulta
module.exports = GerenciaConsulta;