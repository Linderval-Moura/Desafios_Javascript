/*A classe contem os métodos para validar os campos do 
  cliente conforme as regras estabelecidas.*/

const { DateTime } = require('luxon');

validadorDados = class ValidadorDados {
    static validarNome(nome) {
        return nome.length >= 5 && nome.length <= 60;
    }

    static validarCPF(cpf) {
        // Verificar se possui 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1*$/.test(cpf)) {
            return false;
        }

        // Calcular o primeiro dígito verificador (J)
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let j = 11 - (soma % 11);
        if (j === 10 || j === 11) {
            j = 0;
        }
        if (j !== parseInt(cpf.charAt(9))) {
            return false;
        }

        // Calcular o segundo dígito verificador (K)
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let k = 11 - (soma % 11);
        if (k === 10 || k === 11) {
            k = 0;
        }
        if (k !== parseInt(cpf.charAt(10))) {
            return false;
        }

        return true;
    }

    // Valida a data de nascimento, verificando se ele tem pelo menos 18 anos.
    static validarDataNascimento(dataNascimento) {
        const dataNascimentoFormatada = DateTime.fromFormat(dataNascimento, 'ddMMyyyy');
        const dataAtual = DateTime.now();
        const idade = dataAtual.diff(dataNascimentoFormatada, 'years').years;
        return idade >= 18;
    }

    // Valida o formato da renda mensal e se o valor é maior ou igual a zero.
    static validarRendaMensal(rendaMensal) {
        const regex = /^\d+\.\d{2}$/;
        return regex.test(rendaMensal) && parseFloat(rendaMensal) >= 0;
    }

    // Valida o estado civil, verificando se ele é uma das opções válidas: 'C', 'S', 'V' ou 'D'.
    static validarEstadoCivil(estadoCivil) {
        const validos = ['C', 'S', 'V', 'D'];
        return estadoCivil && validos.includes(estadoCivil.toUpperCase());
    }
}

module.exports = validadorDados;
