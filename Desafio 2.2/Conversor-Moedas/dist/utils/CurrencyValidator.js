"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyValidator = void 0;
class CurrencyValidator {
    static validarMoedas(origem, destino) {
        return origem.length === 3 && destino.length === 3 && origem !== destino;
    }
}
exports.CurrencyValidator = CurrencyValidator;
