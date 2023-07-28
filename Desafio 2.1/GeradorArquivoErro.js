/*A classe é responsável por gerar o arquivo de saída 
  no formato especificado com os erros encontrados 
  durante a validação.*/

const fs = require('fs');
const { DateTime } = require('luxon');
const path = require('path');

class GeradorArquivoErro {
  // Gera um arquivo de erros no formato JSON com base nos erros de validação encontrados.
  static gerarArquivoErro(arquivoSaida, erros) {
    // Obtém o timestamp atual no formato 'ddMMyyyy-HHmmss'.
    const timestamp = DateTime.now().toFormat('ddMMyyyy-HHmmss');
    // Define o nome do arquivo de erros com base no timestamp.
    const nomeArquivo = `erros-${timestamp}.json`;
    // Cria um novo array 'dados' contendo apenas os dados e erros dos clientes.
    const dados = erros.map((erro) => ({ dados: erro.dados, erros: erro.erros }));

    try {
      const diretorioSaida = path.dirname(arquivoSaida);

      // Verifica se o diretório de saída não existe e cria-o, se necessário.
      if (!fs.existsSync(diretorioSaida)) {
        fs.mkdirSync(diretorioSaida, { recursive: true });
      }

      // Define o caminho completo para o arquivo de saída, incluindo o diretório e nome do arquivo.
      const caminhoArquivoSaida = path.join(diretorioSaida, nomeArquivo);

      // Escreve os dados no arquivo de saída no formato JSON, com indentação de 2 espaços.
      fs.writeFileSync(caminhoArquivoSaida, JSON.stringify(dados, null, 2));
      console.log(`Sucesso ao gerar arquivo de erros: ${caminhoArquivoSaida}`);
    
    } catch (error) {
      // Caso ocorra um erro durante a geração do arquivo de erros, uma exceção é lançada com uma mensagem de erro personalizada.
      throw new Error('Erro de geração do arquivo de erros: ' + error.message);
    }
  }
}

module.exports = GeradorArquivoErro;