const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Paciente = require('./paciente');

const Consulta = sequelize.define('Consulta', {
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horaInicial: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horaFinal: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

Consulta.belongsTo(Paciente, { foreignKey: 'pacienteCPF', allowNull: false });

module.exports = Consulta;
