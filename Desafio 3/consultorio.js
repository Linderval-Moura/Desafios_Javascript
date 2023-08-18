const prompt = require("prompt-sync")({ sigint: true });
// Importa as classes externas GerenciaPaciente e GerenciaConsulta
const GerenciaPaciente = require('./gerenciaPaciente');
const GerenciaConsulta = require('./gerenciaConsulta');

// Declaração da classe Consultorio
class Consultorio {
  constructor() {
    // Cria instâncias das classes GerenciaPaciente e GerenciaConsulta
    this.gerenciaPaciente = new GerenciaPaciente(sequelize);
    this.gerenciaConsulta = new GerenciaConsulta(sequelize);
  }

  // Método responsável pelo menu principal do sistema
  async menuPrincipal() {
    console.log('Menu Principal');
    console.log('1 - Cadastro de pacientes');
    console.log('2 - Agenda');
    console.log('3 - Fim');
    const opcao = prompt('Escolha uma opção: ');
    console.log('');

    // Verifica a opção escolhida e chama o método correspondente
    try {
      switch (opcao) {
        case '1':
          await this.menuCadastroPacientes();
          break;
        case '2':
          await this.menuAgenda();
          break;
        case '3':
          console.log('Encerrando o programa...');
          break;
        default:
          console.log('Opção inválida. Por favor, escolha uma opção válida.\n');
          await this.menuPrincipal();
          break;
      }
    } catch (error) {
      console.error('Erro no menu principal:', error);
    }
  }

  // Método responsável pelo menu de cadastro de pacientes
  async menuCadastroPacientes() {
    console.log('Menu do Cadastro de Pacientes');
    console.log('1 - Cadastrar novo paciente');
    console.log('2 - Excluir paciente');
    console.log('3 - Listar pacientes (ordenado por CPF)');
    console.log('4 - Listar pacientes (ordenado por nome)');
    console.log('5 - Voltar para o menu principal');
    const opcao = prompt('Escolha uma opção: ');
    console.log('');

    // Verifica a opção escolhida e chama o método correspondente
    try {
      switch (opcao) {
        case '1':
          await this.gerenciaPaciente.cadastrarPaciente();
          break;
        case '2':
          await this.excluirPaciente();
          break;
        case '3':
          await this.listarPacientes('cpf');
          break;
        case '4':
          await this.listarPacientes('nome');
          break;
        case '5':
          await this.menuPrincipal();
          break;
        default:
          console.log('Opção inválida. Por favor, escolha uma opção válida.\n');
          await this.menuCadastroPacientes();
          break;
      }
    } catch (error) {
      console.error('Erro no menu de cadastro de pacientes:', error);
    }
  }

  // Método responsável pelo menu de agenda
  async menuAgenda() {
    console.log('Agenda');
    console.log('1 - Agendar consulta');
    console.log('2 - Cancelar agendamento');
    console.log('3 - Listar agenda');
    console.log('4 - Voltar para o menu principal');
    const opcao = prompt('Escolha uma opção: ');

    // Verifica a opção escolhida e chama o método correspondente
    try {
      switch (opcao) {
        case '1':
          await this.agendarConsulta();
          break;
        case '2':
          await this.cancelarAgendamento();
          break;
        case '3':
          await this.listarAgenda();
          break;
        case '4':
          await this.menuPrincipal();
          break;
        default:
          console.log('Opção inválida. Tente novamente.\n');
          await this.menuAgenda();
      }
    } catch (error) {
      console.error('Erro no menu de agenda:', error);
    }
  }

  // Método responsável por iniciar o sistema do consultório
  async iniciar() {
    console.log('Bem-vindo(a) ao sistema de agendamento de consultório odontológico!\n');
    await this.menuPrincipal();
  }
}

// Cria uma instância da classe Consultorio e inicia o sistema
(async () => {
  try {
    await sequelize.sync();
    const consultorio = new Consultorio();
    await consultorio.iniciar();
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();