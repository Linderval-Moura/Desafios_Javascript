// Classe para validar moedas
export class ValidadorMoeda {
    static validarMoedas(origem: string, destino: string): boolean {
        // Verifica diferença entre moedas e se tem 3 caracteres
        return origem !== destino && origem.length === 3 && destino.length === 3;
    }
}
