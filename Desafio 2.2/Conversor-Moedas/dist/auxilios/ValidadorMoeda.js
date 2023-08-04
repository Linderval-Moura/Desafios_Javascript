"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorMoeda = void 0;
// Classe para validar moedas
class ValidadorMoeda {
    static validarMoedas(origem, destino) {
        // Verifica diferença entre moedas e se tem 3 caracteres
        return origem !== destino && origem.length === 3 && destino.length === 3;
    }
}
exports.ValidadorMoeda = ValidadorMoeda;
