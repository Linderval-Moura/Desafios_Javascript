/*A classe lê o arquivo JSON e retorna 
  seu conteúdo para validação.*/

const fs = require('fs');

class LeitorArquivo {
  static lerArquivoJSON(caminhoArquivo) {
    try {
      // Lê conteúdo de um arquivo no formato UTF-8
      const dadosArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
      // Analisa o conteúdo do arquivo JSON e retorna um objeto
      return JSON.parse(dadosArquivo);

    } catch (error) {
      // Se a leitura falhar ou o conteúdo do arquivo não seja válido,
      // a exceção é lançada com uma mensagem de erro.
      throw new Error('Erro de leitura do arquivo de entrada: ' + error.message);
    }
  }
}

module.exports = LeitorArquivo;
  