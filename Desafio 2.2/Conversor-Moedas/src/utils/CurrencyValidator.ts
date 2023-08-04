export class CurrencyValidator {
    static validarMoedas(origem: string, destino: string): boolean {
        return origem.length === 3 && destino.length === 3 && origem !== destino;
    }
}
  