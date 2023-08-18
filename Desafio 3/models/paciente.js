const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Paciente = sequelize.define('Paciente', {
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Paciente;
