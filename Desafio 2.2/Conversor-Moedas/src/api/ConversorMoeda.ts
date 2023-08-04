import axios from 'axios';
import { RespostaAPI } from './RespostaAPI';

export class ConversorMoeda {
  private baseUrl: string = 'https://api.exchangerate.host';

  async converterMoeda(origem: string, destino: string, valor: number): Promise<RespostaAPI> {
    const response = await axios.get<RespostaAPI>(
      `${this.baseUrl}/convert?from=${origem}&to=${destino}&amount=${valor}`
    );

    return response.data;
  }
}
