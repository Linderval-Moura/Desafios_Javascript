import axios from 'axios';
import { ConversionResult } from './ConversionResult';

export class ExchangerateAPI {
  private baseUrl: string = 'https://api.exchangerate.host';

  async converteMoeda(origem: string, destino: string, valor: number): Promise<ConversionResult> {
    const response = await axios.get<ConversionResult>(
      `${this.baseUrl}/convert?from=${origem}&to=${destino}&amount=${valor}`
    );

    console.log(response);
    return response.data;
  }
}
