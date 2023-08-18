module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'consultorio_db',
    define: {
      timestamps: true, // Isso adiciona campos created_at e updated_at automaticamente
      underscored: true, // Isso define o padrão snake_case para colunas e tabelas
    },
  };
  