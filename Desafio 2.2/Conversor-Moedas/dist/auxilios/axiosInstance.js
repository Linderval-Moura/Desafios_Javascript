"use strict";
// src/auxilios/axiosInstance.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axiosInstance = axios_1.default.create({
    baseURL: 'https://api.exchangerate.host',
});
exports.default = axiosInstance;
