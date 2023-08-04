"use strict";
// src/auxilios/ExchangerateAPI.ts
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
exports.ExchangerateAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class ExchangerateAPI {
    constructor() {
        this.baseUrl = 'https://api.exchangerate.host';
    }
    converteMoeda(origem, destino, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.baseUrl}/convert?from=${origem}&to=${destino}&amount=${valor}`);
            // Incluindo a taxa de conversão no objeto de resposta
            const { result, rate } = response.data;
            return { result, rate };
        });
    }
}
exports.ExchangerateAPI = ExchangerateAPI;