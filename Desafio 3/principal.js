const sequelize = require('./sequelize');
const Consultorio = require('./consultorio');

(async () => {
  try {
    await sequelize.sync(); // Cria as tabelas no banco de dados
    const consultorio = new Consultorio();
    consultorio.iniciar();
  } catch (error) {
    console.error('Erro ao sincronizar as tabelas:', error);
  }
})();
