const prompt = require("prompt-sync")({ sigint: true });
// Importa as classes externas GerenciaPaciente e GerenciaConsulta
const GerenciaPaciente = require('./gerenciaPaciente');
const GerenciaConsulta = require('./gerenciaConsulta');

// Declaração da classe Consultorio
class Consultorio {
  constructor() {
    // Cria instâncias das classes GerenciaPaciente e GerenciaConsulta
    this.gerenciaPaciente = new GerenciaPaciente();
    this.gerenciaConsulta = new GerenciaConsulta();
  }

  // Método responsável pelo menu principal do sistema
  menuPrincipal() {
    console.log('Menu Principal');
    console.log('1 - Cadastro de pacientes');
    console.log('2 - Agenda');
    console.log('3 - Fim');
    const opcao = prompt('Escolha uma opção: ');
    console.log('');

    // Verifica a opção escolhida e chama o método correspondente
    switch (opcao) {
      case '1':
        this.menuCadastroPacientes();
        break;
      case '2':
        this.menuAgenda();
        break;
      case '3':
        console.log('Encerrando o programa...');
        break;
      default:
        console.log('Opção inválida. Por favor, escolha uma opção válida.\n');
        this.menuPrincipal();
        break;
    }
  }

  // Método responsável pelo menu de cadastro de pacientes
  menuCadastroPacientes() {
    console.log('Menu do Cadastro de Pacientes');
    console.log('1 - Cadastrar novo paciente');
    console.log('2 - Excluir paciente');
    console.log('3 - Listar pacientes (ordenado por CPF)');
    console.log('4 - Listar pacientes (ordenado por nome)');
    console.log('5 - Voltar para o menu principal');
    const opcao = prompt('Escolha uma opção: ');
    console.log('');

    // Verifica a opção escolhida e chama o método correspondente
    switch (opcao) {
      case '1':
        this.gerenciaPaciente.cadastrarPaciente();
        break;
      case '2':
        this.excluirPaciente();
        break;
      case '3':
        this.listarPacientes('cpf');
        break;
      case '4':
        this.listarPacientes('nome');
        break;
      case '5':
        this.menuPrincipal();
        break;
      default:
        console.log('Opção inválida. Por favor, escolha uma opção válida.\n');
        this.menuCadastroPacientes();
        break;
    }
  }

  // Método responsável pelo menu de agenda
  menuAgenda() {
    console.log('Agenda');
    console.log('1 - Agendar consulta');
    console.log('2 - Cancelar agendamento');
    console.log('3 - Listar agenda');
    console.log('4 - Voltar para o menu principal');
    const opcao = prompt('Escolha uma opção: ');

    // Verifica a opção escolhida e chama o método correspondente
    switch (opcao) {
      case '1':
        this.agendarConsulta();
        break;
      case '2':
        this.cancelarAgendamento();
        break;
      case '3':
        this.listarAgenda();
        break;
      case '4':
        this.menuPrincipal();
        break;
      default:
        console.log('Opção inválida. Tente novamente.\n');
        this.menuAgenda();
    }
  }

  // Método responsável por iniciar o sistema do consultório
  iniciar() {
    console.log('Bem-vindo(a) ao sistema de agendamento de consultório odontológico!\n');
    this.menuPrincipal();
  }
}

// Cria uma instância da classe Consultorio e inicia o sistema
consultorio = new Consultorio();
consultorio.iniciar();
