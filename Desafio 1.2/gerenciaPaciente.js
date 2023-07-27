const prompt = require("prompt-sync")({ sigint: true });
// Importa as classe Paciente e GerenciaConsulta
const Paciente = require('./paciente')
const GerenciaConsulta = require('./gerenciaConsulta')

class GerenciaPaciente {
  constructor() {
    this.pacientes = [];
  }

  cadastrarPaciente(cpf, nome, dataNascimento) {
    console.log('Cadastrar novo paciente');
    cpf = prompt('CPF: ');

    // Verifica se o CPF é válido
    if (!this.validarCPF(cpf)) {
      console.log('CPF inválido. Por favor, tente novamente.\n');
      this.cadastrarPaciente();
      return;
    }

    // Verifica se já existe um paciente cadastrado com o CPF informado
    if (this.pacienteJaCadastrado(cpf)) {
      console.log('Já existe um paciente cadastrado com esse CPF.\n');
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
    dataNascimentoFormatada = this.formatarData(dataNascimento);
    
    // Verifica se a data de nascimento é válida
    if (!dataNascimentoFormatada) {
      console.log('Data de Nascimento inválida. Por favor, tente novamente.\n');
      this.cadastrarPaciente();
      return;
    }

    // Cria um novo objeto Paciente
    paciente = new Paciente(cpf, nome, dataNascimentoFormatada);
    
    // Adiciona o paciente à lista de pacientes
    this.pacientes.push(paciente);
    console.log('Paciente cadastrado com sucesso!\n');
    this.menuCadastroPacientes();
  }

  excluirPaciente(cpf) {
    console.log('Excluir paciente');
    cpf = prompt('Digite o CPF do paciente: ');
    paciente = this.encontrarPaciente(cpf);

    // Verifica se o paciente foi encontrado
    if (!paciente) {
      console.log('Não foi encontrado um paciente com esse CPF: ${cpf}.\n'+ cpf);
      this.excluirPaciente();
      return;
    }

    const consultaAgendada = this.encontrarConsultaAgendada(paciente.cpf);
    if (consultaAgendada) {
      console.log('O paciente possui uma consulta agendada. Não é possível excluí-lo.\n');
      this.mostrarMenuCadastroPacientes();
      return;
    }

    // Remove o paciente da lista de pacientes
    this.pacientes = this.pacientes.filter((p) => p.cpf !== paciente.cpf);
    // this.consultas = this.consultas.filter((c) => c.paciente.cpf !== cpf);
    console.log('Paciente excluído com sucesso!\n');
    this.mostrarMenuCadastroPacientes();
  }

  listarPacientes(ordem) {
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
  }

  validarCPF(cpf) {
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

  pacienteJaCadastrado(cpf) {
    return this.pacientes.some((paciente) => paciente.cpf === cpf);
  }

  encontrarPaciente(cpf) {
    return this.pacientes.find((paciente) => paciente.cpf === cpf);
  }

  calcularIdade(dataNascimento) {
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