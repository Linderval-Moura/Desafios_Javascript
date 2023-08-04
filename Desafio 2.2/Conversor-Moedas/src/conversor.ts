// conversor.ts

import { ValidadorMoeda } from './auxilios/ValidadorMoeda';
import { ConversorMoeda } from './api/ConversorMoeda';
import readlineSync from 'readline-sync';

// Função para exibir a mensagem de erro
function exibirErro(mensagem: string): void {
  console.error(mensagem);
}

// Função para exibir o resultado da conversão
function exibirResultado(origem: string, destino: string, valor: number, resultado: number, taxa: number): void {
  console.log(`${origem} ${valor.toFixed(2)} => ${destino} ${resultado.toFixed(2)}`);
  console.log(`Taxa: ${taxa.toFixed(6)}`);
}

// Função principal para interagir com o usuário e realizar a conversão
async function executarConversor(): Promise<void> {
  console.log('Conversor de Moedas');
  console.log('-------------------');

  // Solicita a moeda de origem
  while (true) {
    const moedaOrigem = readlineSync.question('Moeda origem: ');
    if (!moedaOrigem) {
      console.log('Encerrando o programa...');
      break;
    }

    const moedaDestino = readlineSync.question('Moeda destino: ');
    const valorStr = readlineSync.question('Valor: ');
    const valor = parseFloat(valorStr);

    // Validar as moedas de origem e destino
    if (!ValidadorMoeda.validarMoedas(moedaOrigem, moedaDestino)) {
      exibirErro('Moeda de origem e destino devem ser diferentes e conter exatamente 3 caracteres.');
      continue;
    }

    // Validar o valor de entrada
    if (isNaN(valor) || valor <= 0) {
      exibirErro('Valor inválido. O valor de entrada deve ser um número maior que zero.');
      continue;
    }

    // Realizar a conversão
    const conversor = new ConversorMoeda();
    try {
      const { result, info } = await conversor.converterMoeda(moedaOrigem, moedaDestino, valor);
      exibirResultado(moedaOrigem, moedaDestino, valor, result, info.rate);
    } catch (error: any) {
      switch (true) {
        case Boolean(error.message):
          exibirErro('Erro na conversão: ' + error.message);
          break;
        case Boolean(error.request):
          exibirErro('Erro na comunicação com a API: ' + error.message);
          break;
        default:
          exibirErro('Erro desconhecido: ' + error.message);
          break;
      }
    }
  }
}

// Inicia a execução do conversor
executarConversor();
