const prompt = require("prompt-sync")({ sigint: true });
const { Op } = require('sequelize');
// Importe do modelo Consulta do Sequelize
const Consulta = require('./models/consulta'); 


class GerenciaConsulta {
  constructor(sequelize) {
    this.Consulta = Consulta;
    this.sequelize = sequelize;
  }

  async agendarConsulta(pacienteCPF, data, horaInicial, horaFinal) {
    console.log('Agendamento de consulta');
    pacienteCPF = prompt('CPF do paciente: ');

    // Procura o paciente na lista de pacientes
    try {
      // Encontra o paciente pelo CPF
      const paciente = await this.Paciente.findOne({ where: { cpf: pacienteCPF } });
      if (!paciente) {
        console.log('Paciente não cadastrado.\n');
        this.MenuAgenda();
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

      // Cria uma nova consulta no banco de dados
      await this.Consulta.create({
        pacienteCPF: paciente.cpf,
        data,
        horaInicial,
        horaFinal,
      });
      console.log('Agendamento realizado com sucesso!\n');
      this.MenuAgenda();
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      this.agendarConsulta();
    }
  }

  async cancelarAgendamento() {
    console.log('Cancelamento de agendamento');

    try {
      cpf = prompt('CPF do paciente: ');

      // Procura paciente na lista de pacientes
      paciente = this.encontrarPaciente(cpf);
      if (!paciente) {
        console.log('Paciente não cadastrado.\n');
        this.MenuAgenda();
        return;
      }

      // Encontra a consulta agendada pelo CPF do paciente
      const consulta = await this.Consulta.findOne({ where: { pacienteCpf: cpf } });

      if (!consulta) {
        console.log('Não há agendamento para o paciente.\n');
        this.MenuAgenda();
        return;
      }

      // Verifica se consulta já passou
      if (!this.consultaFutura(consulta)) {
        console.log('O agendamento já passou. Não é possível cancelar.\n');
        this.MenuAgenda();
        return;
      }

      // Remove a consulta do banco de dados
      await consulta.destroy();
      console.log('Agendamento cancelado com sucesso!\n');
      this.MenuAgenda();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      this.MenuAgenda();
    }
  }

  async listarAgenda() {
    try {
      console.log('Listagem da Agenda');
      console.log('-------------------------------------------------------------');
      console.log('Data       H.Ini H.Fim Tempo Nome                          Dt.Nasc.');
      console.log('-------------------------------------------------------------');
      const apresentarAgenda = prompt('Apresentar a agenda (T-Toda ou P-Período): ');

      // Exibe agenda completa
      if (apresentarAgenda.toUpperCase() === 'T') {
        const consultas = await this.Consulta.findAll();
        this.consultas.forEach((consulta) => {
          console.log(`${consulta.data} ${consulta.horaInicial.padEnd(5)} ${consulta.horaFinal.padEnd(5)} ${this.calcularTempoConsulta(consulta.horaInicial, consulta.horaFinal)} ${consulta.paciente.nome.padEnd(30)} ${consulta.paciente.dataNascimento}`);
        });
      }
      // Exibe a agenda em um período específico
      else if (apresentarAgenda.toUpperCase() === 'P') {
        const consultasPeriodo = await this.Consulta.findAll({
          where: {
            data: { [Op.between]: [dataInicial, dataFinal] }
          },
          order: [['data', 'ASC'], ['horaInicial', 'ASC']]
        });

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
      this.MenuAgenda();
    } catch (error) {
      console.error('Erro ao listar agenda:', error);
      this.MenuAgenda();
    }
  }

  async validarData(data) {
    return true;
  }

  async validarHora(hora) {
    return true;
  }

  async validarPeriodoConsulta(data, horaInicial, horaFinal) {
    return true;
  }

  async encontrarConsultaAgendada(cpf) {
    // Busca consulta agendada para o paciente pelo CPF
    try {
      const consulta = await this.Consulta.findOne({ where: { pacienteCpf: cpf } });
      return consulta;
    } catch (error) {
      console.error('Erro ao encontrar consulta agendada:', error);
      return null;
    }
  }

  async pacientePossuiAgendamentoFuturo(cpf) {
    // Verifica se paciente possui um agendamento futuro
    try {
      const consulta = await this.Consulta.findOne({
        where: {
          pacienteCpf: cpf,
          data: { [Op.gt]: new Date() }
        }
      });
      return consulta !== null;
    } catch (error) {
      console.error('Erro ao verificar agendamento futuro do paciente:', error);
      return false;
    }
  }

  async consultaFutura(consulta) {
    // Verifica se consulta está agendada
    try {
      const dataAtual = new Date();
      const consultaDataHora = new Date(`${consulta.data} ${consulta.horaInicial}`);
      return consultaDataHora > dataAtual;
    } catch (error) {
      console.error('Erro ao verificar se consulta é futura:', error);
      return false;
    }
  }

  async agendamentoSobreposto(data, horaInicial, horaFinal) {
    // Verifica se existe agendamento sobreposto
    try {
      const consultasSobrepostas = await this.Consulta.findAll({
        where: {
          data,
          [Op.or]: [
            { horaInicial: { [Op.between]: [horaInicial, horaFinal] } },
            { horaFinal: { [Op.between]: [horaInicial, horaFinal] } }
          ]
        }
      });
      return consultasSobrepostas.length > 0;
    } catch (error) {
      console.error('Erro ao verificar agendamentos sobrepostos:', error);
      return false;
    }
  }

  async compararDatas(data1, data2) {
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

  async calcularTempoConsulta(horaInicial, horaFinal) {
    const [horasIni, minutosIni] = horaInicial.match(/.{1,2}/g).map(Number);
    const [horasFim, minutosFim] = horaFinal.match(/.{1,2}/g).map(Number);

    const minutosConsulta = (horasFim - horasIni) * 60 + (minutosFim - minutosIni);
    const horasConsulta = Math.floor(minutosConsulta / 60);
    const minutosRestantes = minutosConsulta % 60;

    // Calcula o tempo de consulta
    return `${horasConsulta.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
  }

  async stringParaData(dataString) {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    // Converte string de data para um objeto Date
    return new Date(ano, mes - 1, dia);
  }

  async stringParaHora(horaString) {
    const [horas, minutos] = horaString.match(/.{1,2}/g).map(Number);
    // Converte a string de hora para um valor numérico representando o tempo em milissegundos
    // Inicio em 1º de janeiro de 1970
    return new Date().setHours(horas, minutos);
  }

}

// Exporta a classe GerenciaConsulta
module.exports = GerenciaConsulta;