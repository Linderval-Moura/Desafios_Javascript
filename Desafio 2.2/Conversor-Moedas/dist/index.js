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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConversorMoeda_1 = require("./models/ConversorMoeda");
const CurrencyValidator_1 = require("./utils/CurrencyValidator");
const readline_sync_1 = __importDefault(require("readline-sync"));
function executarConversor() {
    return __awaiter(this, void 0, void 0, function* () {
        const conversor = new ConversorMoeda_1.ConversorMoeda();
        while (true) {
            const moedaOrigem = readline_sync_1.default.question('Moeda origem: ');
            if (!moedaOrigem) {
                console.log('Encerrando o programa...');
                break;
            }
            const moedaDestino = readline_sync_1.default.question('Moeda destino: ');
            const valorStr = readline_sync_1.default.question('Valor: ');
            const valor = parseFloat(valorStr);
            const moedasValidas = CurrencyValidator_1.CurrencyValidator.validarMoedas(moedaOrigem, moedaDestino);
            if (!moedasValidas) {
                console.log('Moeda de origem e destino devem ter exatamente 3 caracteres e serem diferentes.');
                continue;
            }
            try {
                const { result, info } = yield conversor.converterMoeda(moedaOrigem, moedaDestino, valor);
                console.log(`${moedaOrigem} ${valor.toFixed(2)} => ${moedaDestino} ${result.toFixed(2)}`);
                console.log(`Taxa: ${info.rate.toFixed(6)}`);
                //console.log(`Response: ${Response}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    console.error('Erro desconhecido:', error);
                }
            }
        }
    });
}
// Inicia a execução do conversor
executarConversor();
