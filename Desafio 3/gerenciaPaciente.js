const prompt = require("prompt-sync")({ sigint: true });
// Modelo Paciente do Sequelize
const Paciente = require('./models/paciente'); 

class GerenciaPaciente {
  constructor(sequelize) {
    this.Paciente = Paciente;
    this.sequelize = sequelize;
  }

  async cadastrarPaciente(cpf, nome, dataNascimento) {
    console.log('Cadastrar novo paciente');
    cpf = prompt('CPF: ');
    
    // Verifica se já existe um paciente cadastrado com o CPF informado
    const pacienteExistente = await this.Paciente.findOne({ where: { cpf } });
    if (pacienteExistente) {
      console.log('Já existe um paciente cadastrado com esse CPF.\n');
      this.cadastrarPaciente();
      return;
    } 

    // Verifica se o CPF é válido
    if (!this.validarCPF(cpf)) {
      console.log('CPF inválido. Por favor, tente novamente.\n');
      this.cadastrarPaciente();
      return;
    }

    nome = prompt('Nome: ');
    // Verifica se o nome tem pelo menos 5 caracteres
    if (nome.length < 5) {
      console.log('Nome inválido. O nome deve ter pelo menos 5 caracteres.\n');
      this.cadastrarPaciente();
      return;
    }

    dataNascimento = prompt('Data de Nascimento (DD/MM/AAAA): ');
    
    // Formata a data de nascimento
    const dataNascimentoFormatada = await this.formatarData(dataNascimento);
    
    // Verifica se a data de nascimento é válida
    if (!dataNascimentoFormatada) {
      console.log('Data de Nascimento inválida. Por favor, tente novamente.\n');
      this.cadastrarPaciente();
      return;
    }

    try {
      // Cria um novo paciente no banco de dados
      const novoPaciente = await this.Paciente.create({
        cpf,
        nome,
        dataNascimento: dataNascimentoFormatada, // Salva a data formatada no banco de dados
      });
      console.log('Paciente cadastrado com sucesso!\n');
      this.menuCadastroPacientes();
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      this.cadastrarPaciente();
    }
  }

  async excluirPaciente(cpf) {
    console.log('Excluir paciente');
    cpf = prompt('Digite o CPF do paciente: ');
    paciente = this.encontrarPaciente(cpf);

    try {
      // Encontra o paciente pelo CPF
      const paciente = await this.Paciente.findOne({ where: { cpf } });
      // Verifica se o paciente foi encontrado
      if (!paciente) {
        console.log(`Não foi encontrado um paciente com o CPF ${cpf}.\n`);
        this.excluirPaciente();
        return;
      }

      const consultaAgendada = this.encontrarConsultaAgendada(paciente.cpf);
      if (consultaAgendada) {
        console.log('O paciente possui uma consulta agendada. Não é possível excluí-lo.\n');
        this.mostrarMenuCadastroPacientes();
        return;
      }

      // Remove o paciente do banco de dados
      await paciente.destroy();
      console.log('Paciente excluído com sucesso!\n');
      this.mostrarMenuCadastroPacientes();
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      this.mostrarMenuCadastroPacientes();
    }
  }

  async listarPacientes(ordem) {
    try {
      console.log('Listagem de Pacientes');
      console.log('------------------------------------------------------------');
      console.log('CPF       Nome                                     Dt.Nasc. Idade');
      console.log('------------------------------------------------------------');

      let pacientesOrdenados;
      if (ordem === 'cpf') {
        pacientesOrdenados = this.pacientes.slice().sort((a, b) => a.cpf.localeCompare(b.cpf));
      } else if (ordem === 'nome') {
        pacientesOrdenados = this.pacientes.slice().sort((a, b) => a.nome.localeCompare(b.nome));
      } 
      
      pacientesOrdenados.forEach((paciente) => {
        console.log(`${paciente.cpf.padEnd(14)} ${paciente.nome.padEnd(30)} ${paciente.dataNascimento}  ${this.calcularIdade(paciente.dataNascimento)}`);
        const consultaFutura = this.encontrarConsultaAgendada(paciente.cpf);
        if (consultaFutura) {
          console.log(`Agendado para: ${consultaFutura.data}`);
          console.log(`${consultaFutura.horaInicial} às ${consultaFutura.horaFinal}\n`);
        }
      });
      console.log('------------------------------------------------------------\n');
      this.menuCadastroPacientes();
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      this.menuCadastroPacientes();
    }
  };

  async validarCPF(cpf) {
    // Verificar se possui 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1*$/.test(cpf)) {
      return false;
    }

    // Calcular o primeiro dígito verificador (J)
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let j = 11 - (soma % 11);
    if (j === 10 || j === 11) {
      j = 0;
    }
    if (j !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Calcular o segundo dígito verificador (K)
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let k = 11 - (soma % 11);
    if (k === 10 || k === 11) {
      k = 0;
    }
    if (k !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  async formatarData(data) {
    // Verifica se a data possui o formato DD/MM/AAAA
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dataRegex.test(data)) {
      console.log('Formato de data inválido. Use o formato DD/MM/AAAA.');
      return null;
    }

    const [, dia, mes, ano] = data.match(dataRegex);
    const dataFormatada = new Date(`${ano}-${mes}-${dia}`);

    if (isNaN(dataFormatada.getTime())) {
      console.log('Data de nascimento inválida. Por favor, insira uma data válida.');
      return null;
    }

    return dataFormatada;
  }

  async pacienteJaCadastrado(cpf) {
    return this.pacientes.some((paciente) => paciente.cpf === cpf);
  }

  async encontrarPaciente(cpf) {
    return this.pacientes.find((paciente) => paciente.cpf === cpf);
  }

  async calcularIdade(dataNascimento) {
    const [diaNasc, mesNasc, anoNasc] = dataNascimento.split('/').map(Number);
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();

    let idade = anoAtual - anoNasc;

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }

    return idade;
  }
}

module.exports = GerenciaPaciente;