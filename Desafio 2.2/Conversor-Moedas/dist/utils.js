"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirResultado = exports.getInput = exports.formatarNumero = void 0;
function formatarNumero(valor) {
    return valor.toFixed(2).replace('.', ',');
}
exports.formatarNumero = formatarNumero;
// Função para ler a entrada do usuário
function getInput(message) {
    const readlineSync = require('readline-sync');
    return readlineSync.question(message);
}
exports.getInput = getInput;
// Função para exibir o resultado da conversão
function exibirResultado(moedaOrigem, valorOrigem, moedaDestino, valorDestino, taxa) {
    if (!moedaOrigem || isNaN(valorOrigem) || !moedaDestino || isNaN(valorDestino) || isNaN(taxa)) {
        console.error('Erro na conversão: Valores inválidos.');
        return;
    }
    const valorOrigemFormatado = formatarNumero(valorOrigem);
    const valorDestinoFormatado = formatarNumero(valorDestino);
    const taxaFormatada = taxa;
    console.log(`${moedaOrigem} ${valorOrigemFormatado} => ${moedaDestino} ${valorDestinoFormatado}`);
    console.log(`Taxa: ${taxaFormatada}`);
}
exports.exibirResultado = exibirResultado;
