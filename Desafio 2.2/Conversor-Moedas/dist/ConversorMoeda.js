"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExchangerateAPI_1 = require("./api/ExchangerateAPI");
const utils_1 = require("./utils");
class ConversorMoeda {
    constructor() {
        this.api = new ExchangerateAPI_1.ExchangerateAPI();
    }
    converterMoeda() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const moedaOrigem = (0, utils_1.getInput)('Moeda origem: ');
                if (!moedaOrigem) {
                    console.log('Encerrando o programa...');
                    break;
                }
                const moedaDestino = (0, utils_1.getInput)('Moeda destino: ');
                const valorStr = (0, utils_1.getInput)('Valor: ');
                const valor = parseFloat(valorStr.replace(',', '.'));
                if (isNaN(valor) || valor <= 0) {
                    console.log('Valor de entrada inválido.');
                    continue;
                }
                if (moedaOrigem === moedaDestino) {
                    console.log('Moeda de origem e destino não podem ser iguais.');
                    continue;
                }
                if (moedaOrigem.length !== 3 || moedaDestino.length !== 3) {
                    console.log('As moedas devem ter exatamente 3 caracteres.');
                    continue;
                }
                try {
                    const result = yield this.api.converteMoeda(moedaOrigem, moedaDestino, valor);
                    if (result && result.result !== undefined && result.rate !== undefined) {
                        const taxa = result.rate;
                        (0, utils_1.exibirResultado)(moedaOrigem, valor, moedaDestino, result.result, taxa);
                    }
                    else {
                        console.error('Erro na conversão: Resposta inválida da API.');
                    }
                }
                catch (error) {
                    console.error(error.message);
                }
            }
        });
    }
}
exports.default = ConversorMoeda;
