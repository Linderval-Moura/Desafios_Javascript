// ValidadorMoeda.ts

// Classe para validar moedas
export class ValidadorMoeda {
    static validarMoedas(origem: string, destino: string): boolean {
        // Verifica diferença entre moedas e se tem 3 caracteres
        return origem !== destino && origem.length === 3 && destino.length === 3;
    }

    static validarValor(valor: number): boolean {
        // Verifica se o valor é maior que zero
        return valor > 0;
    }
  }
  