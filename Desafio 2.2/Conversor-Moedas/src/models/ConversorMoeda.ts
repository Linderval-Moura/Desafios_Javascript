import axios from 'axios';

interface ConversionResult {
  result: number;
  info: {
    rate: number;
  };
}

export class ConversorMoeda {
  private baseUrl: string = 'https://api.exchangerate.host';

  async converterMoeda(origem: string, destino: string, valor: number): Promise<ConversionResult> {
    const response = await axios.get<ConversionResult>(
      `${this.baseUrl}/convert?from=${origem}&to=${destino}&amount=${valor}`
    );

    return response.data;
  }
}
