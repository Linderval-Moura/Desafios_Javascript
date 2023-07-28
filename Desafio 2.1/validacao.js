const LeitorArquivo = require('./LeitorArquivo');
const ValidadorDados = require('./ValidadorDados');
const GeradorArquivoErro = require('./GeradorArquivoErro');

/* Função principal para validar os clientes no arquivo 
 * JSON de entrada. 
 */

function validarClientes(arquivoEntrada) {
  // Lê os dados do arquivo JSON e armazena em uma const
  const clientes = LeitorArquivo.lerArquivoJSON(arquivoEntrada);

  // Verifica se o conteúdo do arquivo não é um Array
  if (!Array.isArray(clientes)) {
    throw new Error('O arquivo de entrada não contem um Array!');
  }

  // Array para armazenar os que não passaram na validação
  const erros = [];

  // Itera sobre cada cliente para realizar a validação dos dados
  clientes.forEach((cliente) => {
    const { nome, cpf, dt_nascimento, renda_mensal, estado_civil } = cliente;
    const errosCliente = [];

    // Verifica se o nome do cliente não está de acordo com as regras de validação
    if (!ValidadorDados.validarNome(nome)) {
      errosCliente.push({ campo: 'nome', mensagem: 'Deve ter entre 5 e 60 caracteres.' });
    }

    // Verifica se o CPF do cliente não está de acordo com as regras de validação
    if (!ValidadorDados.validarCPF(cpf)) {
      errosCliente.push({ campo: 'cpf', mensagem: 'CPF inválido.' });
    }

    // Verifica se a data de nascimento do cliente não está de acordo com as regras de validação
    if (!ValidadorDados.validarDataNascimento(dt_nascimento)) {
      errosCliente.push({ campo: 'dt_nascimento', mensagem: 'Data de nascimento inválida ou menor de 18 anos.' });
    }

    // Verifica se a renda mensal do cliente não está de acordo com as regras de validação
    if (!ValidadorDados.validarRendaMensal(renda_mensal)) {
      errosCliente.push({ campo: 'renda_mensal', mensagem: 'Formato inválido de renda mensal.' });
    }

    // Verifica se o estado civil do cliente não está de acordo com as regras de validação
    if (!ValidadorDados.validarEstadoCivil(estado_civil)) {
      errosCliente.push({ campo: 'estado_civil', mensagem: 'Estado civil inválido.' });
    }

    // Se houver erros para o cliente, adiciona ao array de erros
    if (errosCliente.length > 0) {
      erros.push({ dados: cliente, erros: errosCliente });
    }
  });

  // Verifica se houve erros na validação
  if (erros.length > 0) {
    // Se houver erros, gera o arquivo de erros com as informações encontradas
    GeradorArquivoErro.gerarArquivoErro(arquivoEntrada, erros);

  } else {
    // Caso contrário, exibe uma mensagem informando que não foram encontrados erros
    console.log('Nenhum erro encontrado, arquivo de saída gerado com array vazio.');
  }
}

// Executa a validação passando o arquivo de entrada como argumento
if (process.argv.length !== 3) {
  console.error('Informe o caminho do arquivo JSON de entrada como argumento.');
  process.exit(1);
}

const arquivoEntrada = process.argv[2];
validarClientes(arquivoEntrada);
