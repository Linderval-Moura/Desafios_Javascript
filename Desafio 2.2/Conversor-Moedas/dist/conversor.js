"use strict";
// conversor.ts
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
const ValidadorMoeda_1 = require("./auxilios/ValidadorMoeda");
const ConversorMoeda_1 = require("./api/ConversorMoeda");
const readline_sync_1 = __importDefault(require("readline-sync"));
// Função para exibir a mensagem de erro
function exibirErro(mensagem) {
    console.error(mensagem);
}
// Função para exibir o resultado da conversão
function exibirResultado(origem, destino, valor, resultado, taxa) {
    console.log(`${origem} ${valor.toFixed(2)} => ${destino} ${resultado.toFixed(2)}`);
    console.log(`Taxa: ${taxa.toFixed(6)}`);
}
// Função principal para interagir com o usuário e realizar a conversão
function executarConversor() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Conversor de Moedas');
        console.log('-------------------');
        // Solicita a moeda de origem
        while (true) {
            const moedaOrigem = readline_sync_1.default.question('Moeda origem: ');
            if (!moedaOrigem) {
                console.log('Encerrando o programa...');
                break;
            }
            const moedaDestino = readline_sync_1.default.question('Moeda destino: ');
            const valorStr = readline_sync_1.default.question('Valor: ');
            const valor = parseFloat(valorStr);
            // Validar as moedas de origem e destino
            if (!ValidadorMoeda_1.ValidadorMoeda.validarMoedas(moedaOrigem, moedaDestino)) {
                exibirErro('Moeda de origem e destino devem ser diferentes e conter exatamente 3 caracteres.');
                continue;
            }
            // Validar o valor de entrada
            if (isNaN(valor) || valor <= 0) {
                exibirErro('Valor inválido. O valor de entrada deve ser um número maior que zero.');
                continue;
            }
            // Realizar a conversão
            const conversor = new ConversorMoeda_1.ConversorMoeda();
            try {
                const { result, info } = yield conversor.converterMoeda(moedaOrigem, moedaDestino, valor);
                exibirResultado(moedaOrigem, moedaDestino, valor, result, info.rate);
            }
            catch (error) {
                switch (true) {
                    case Boolean(error.message):
                        exibirErro('Erro na conversão: ' + error.message);
                        break;
                    case Boolean(error.request):
                        exibirErro('Erro na comunicação com a API: ' + error.message);
                        break;
                    default:
                        exibirErro('Erro desconhecido: ' + error.message);
                        break;
                }
            }
        }
    });
}
// Inicia a execução do conversor
executarConversor();
