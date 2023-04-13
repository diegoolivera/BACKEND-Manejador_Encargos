const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mssql',
      dialectOptions: {
        instanceName: 'SQLEXPRESS',
        options: {
          encrypt: false,
          enableArithAbort: true,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Conexión establecida con éxito');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw new Error('No se pudo conectar a la base de datos');
    }
  }

  async disconnect() {
    try {
      await this.sequelize.close();
      console.log('Conexión cerrada con éxito');
    } catch (error) {
      console.error('Error al cerrar la conexión con la base de datos:', error);
      throw new Error('No se pudo cerrar la conexión con la base de datos');
    }
  }
}

module.exports = Database;
