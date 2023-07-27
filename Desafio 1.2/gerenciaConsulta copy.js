const Consulta = require('./consulta'); // Importa a classe Consulta do arquivo 'consulta.js'
const GerenciaPaciente = require('./gerenciaPaciente'); // Importa a classe GerenciaPaciente do arquivo 'gerenciaPaciente.js'

class GerenciaConsulta {
  constructor() {
    this.consultas = []; // Inicializa a lista de consultas vazia
  }

  agendarConsulta(paciente, data, horaInicial, horaFinal) {
    console.log('Agendamento de consulta');
    const cpf = prompt('CPF do paciente: '); // Solicita o CPF do paciente para agendar a consulta

    const paciente = this.encontrarPaciente(cpf); // Procura o paciente na lista de pacientes
    if (!paciente) {
      console.log('Paciente não cadastrado.\n');
      this.mostrarMenuAgenda();
      return;
    }

    const data = prompt('Data da consulta (DD/MM/AAAA): '); // Solicita a data da consulta
    if (!this.validarData(data)) { // Verifica se a data é válida
      console.log('Data inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    const horaInicial = prompt('Hora inicial (HHMM): '); // Solicita a hora inicial da consulta
    if (!this.validarHora(horaInicial)) { // Verifica se a hora inicial é válida
      console.log('Hora inicial inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    const horaFinal = prompt('Hora final (HHMM): '); // Solicita a hora final da consulta
    if (!this.validarHora(horaFinal)) { // Verifica se a hora final é válida
      console.log('Hora final inválida. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    if (!this.validarPeriodoConsulta(data, horaInicial, horaFinal)) { // Verifica se o período da consulta é válido
      console.log('Período de consulta inválido. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    if (this.pacientePossuiAgendamentoFuturo(cpf)) { // Verifica se o paciente já possui um agendamento futuro
      console.log('O paciente já possui um agendamento futuro. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    if (this.agendamentoSobreposto(data, horaInicial, horaFinal)) { // Verifica se existe um agendamento sobreposto
      console.log('Já existe um agendamento no mesmo período. Tente novamente.\n');
      this.agendarConsulta();
      return;
    }

    const consulta = new Consulta(paciente, data, horaInicial, horaFinal); // Cria um novo objeto Consulta
    this.consultas.push(consulta); // Adiciona a consulta à lista de consultas
    console.log('Agendamento realizado com sucesso!\n');
    this.mostrarMenuAgenda();
  }

  cancelarAgendamento() {
    console.log('Cancelamento de agendamento');
    const cpf = prompt('CPF do paciente: '); // Solicita o CPF do paciente para cancelar o agendamento

    const paciente = this.encontrarPaciente(cpf); // Procura o paciente na lista de pacientes
    if (!paciente) {
      console.log('Paciente não cadastrado.\n');
      this.mostrarMenuAgenda();
      return;
    }

    const consulta = this.encontrarConsultaAgendada(cpf); // Procura a consulta agendada para o paciente
    if (!consulta) {
      console.log('Não há agendamento para o paciente.\n');
      this.mostrarMenuAgenda();
      return;
    }

    if (!this.consultaFutura(consulta)) { // Verifica se a consulta já passou
      console.log('O agendamento já passou. Não é possível cancelar.\n');
      this.mostrarMenuAgenda();
      return;
    }

    this.consultas = this.consultas.filter((c) => c.paciente.cpf !== cpf); // Remove a consulta da lista de consultas
    console.log('Agendamento cancelado com sucesso!\n');
    this.mostrarMenuAgenda();
  }

  listarAgenda() {
    console.log('Listagem da Agenda');
    console.log('-------------------------------------------------------------');
    console.log('Data       H.Ini H.Fim Tempo Nome                          Dt.Nasc.');
    console.log('-------------------------------------------------------------');
    const apresentarAgenda = prompt('Apresentar a agenda (T-Toda ou P-Período): '); // Solicita a opção para apresentar a agenda completa ou em um período específico

    if (apresentarAgenda.toUpperCase() === 'T') { // Exibe a agenda completa
      this.consultas.forEach((consulta) => {
        console.log(`${consulta.data} ${consulta.horaInicial.padEnd(5)} ${consulta.horaFinal.padEnd(5)} ${this.calcularTempoConsulta(consulta.horaInicial, consulta.horaFinal)} ${consulta.paciente.nome.padEnd(30)} ${consulta.paciente.dataNascimento}`);
      });
    } else if (apresentarAgenda.toUpperCase() === 'P') { // Exibe a agenda em um período específico
      const dataInicial = prompt('Data inicial (DD/MM/AAAA): '); // Solicita a data inicial
      if (!this.validarData(dataInicial)) { // Verifica se a data inicial é válida
        console.log('Data inicial inválida. Tente novamente.\n');
        this.listarAgenda();
        return;
      }

      const dataFinal = prompt('Data final (DD/MM/AAAA): '); // Solicita a data final
      if (!this.validarData(dataFinal)) { // Verifica se a data final é válida
        console.log('Data final inválida. Tente novamente.\n');
        this.listarAgenda();
        return;
      }

      const consultasPeriodo = this.consultas.filter((consulta) =>
        this.compararDatas(consulta.data, dataInicial) >= 0 && this.compararDatas(consulta.data, dataFinal) <= 0
      );

      consultasPeriodo.forEach((consulta) => { // Exibe as consultas no período especificado
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
    // Implemente a validação da data
    return true; // Retorna true temporariamente para evitar erros de execução
  }

  validarHora(hora) {
    // Implemente a validação da hora
    return true; // Retorna true temporariamente para evitar erros de execução
  }

  validarPeriodoConsulta(data, horaInicial, horaFinal) {
    // Implemente a validação do período da consulta
    return true; // Retorna true temporariamente para evitar erros de execução
  }

  encontrarConsultaAgendada(cpf) {
    return this.consultas.find((consulta) => consulta.paciente.cpf === cpf); // Procura uma consulta agendada para o paciente com o CPF especificado
  }

  pacientePossuiAgendamentoFuturo(cpf) {
    return this.consultas.some(
      (consulta) => consulta.paciente.cpf === cpf && this.consultaFutura(consulta)
    ); // Verifica se o paciente possui um agendamento futuro
  }

  consultaFutura(consulta) {
    const dataAtual = new Date();
    const dataConsulta = this.stringParaData(consulta.data);
    const horaInicialConsulta = this.stringParaHora(consulta.horaInicial);

    return (
      dataConsulta > dataAtual ||
      (dataConsulta.getTime() === dataAtual.getTime() && horaInicialConsulta > dataAtual.getHours())
    ); // Verifica se a consulta está agendada para o futuro
  }

  agendamentoSobreposto(data, horaInicial, horaFinal) {
    return this.consultas.some((consulta) =>
      consulta.data === data &&
      (
        (consulta.horaInicial >= horaInicial && consulta.horaInicial < horaFinal) ||
        (consulta.horaFinal > horaInicial && consulta.horaFinal <= horaFinal)
      )
    ); // Verifica se existe um agendamento sobreposto
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

    return `${horasConsulta.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`; // Calcula o tempo de consulta
  }

  stringParaData(dataString) {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia); // Converte a string de data para um objeto Date
  }

  stringParaHora(horaString) {
    const [horas, minutos] = horaString.match(/.{1,2}/g).map(Number);
    return new Date().setHours(horas, minutos); // Converte a string de hora para um valor numérico representando o tempo em milissegundos desde 1º de janeiro de 1970
  }

}

module.exports = GerenciaConsulta; // Exporta a classe GerenciaConsulta para uso em outros arquivos
