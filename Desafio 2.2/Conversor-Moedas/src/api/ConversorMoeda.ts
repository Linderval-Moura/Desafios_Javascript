import axios from 'axios';
import { RespostaAPI } from './RespostaAPI';

// classe para realizar a conversão de valores entre moedas
export class ConversorMoeda {
  private baseUrl: string = 'https://api.exchangerate.host';

  // Método que realiza a conversão
  async converterMoeda(origem: string, destino: string, valor: number): Promise<RespostaAPI> {
    
    // Requisição HTTP usando o método GET
    const response = await axios.get<RespostaAPI>(
      `${this.baseUrl}/convert?from=${origem}&to=${destino}&amount=${valor}`
    );

    return response.data;
  }
}
