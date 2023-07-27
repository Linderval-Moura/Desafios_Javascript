class Paciente {
  constructor(cpf, nome, dataNascimento) {
    this.cpf = cpf;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
  }
}

// Exporta a classe
module.exports = Paciente;