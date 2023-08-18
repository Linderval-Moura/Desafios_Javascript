const Sequelize = require('sequelize');
const database = require('./database'); // Importe sua configuração do Sequelize


const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: 'postgres',
  port: 5432,
});

// Sincronize as tabelas (criar automaticamente as tabelas)
sequelize.sync();

module.exports = sequelize;
