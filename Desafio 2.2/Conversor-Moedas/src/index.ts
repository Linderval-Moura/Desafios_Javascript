import { ConversorMoeda } from './models/ConversorMoeda';
import { CurrencyValidator } from './utils/CurrencyValidator';
import readlineSync from 'readline-sync';

async function executarConversor(): Promise<void> {
  const conversor = new ConversorMoeda();

  while (true) {
    const moedaOrigem: string = readlineSync.question('Moeda origem: ');

    if (!moedaOrigem) {
      console.log('Encerrando o programa...');
      break;
    }

    const moedaDestino: string = readlineSync.question('Moeda destino: ');
    const valorStr: string = readlineSync.question('Valor: ');
    const valor: number = parseFloat(valorStr);

    const moedasValidas = CurrencyValidator.validarMoedas(moedaOrigem, moedaDestino);

    if (!moedasValidas) {
      console.log('Moeda de origem e destino devem ter exatamente 3 caracteres e serem diferentes.');
      continue;
    }

    try {
      const { result, info } = await conversor.converterMoeda(moedaOrigem, moedaDestino, valor);
      console.log(`${moedaOrigem} ${valor.toFixed(2)} => ${moedaDestino} ${result.toFixed(2)}`);
      console.log(`Taxa: ${info.rate.toFixed(6)}`);
      //console.log(`Response: ${Response}`);
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }
}

// Inicia a execução do conversor
executarConversor();
