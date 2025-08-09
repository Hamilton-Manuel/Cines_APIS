// models/index.js

// Cargamos el archivo de configuración con los datos de conexión
const dbConfig = require("../config/db.configs.js");

// Importamos Sequelize
const Sequelize = require("sequelize");

// Creamos la instancia de Sequelize con los parámetros de conexión
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  // Configuración SSL (si tu base lo requiere, como NeonDB o Render)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },

  // Configuración del pool de conexiones
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Objeto `db` para exportar
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importamos y registramos el modelo de cine
db.cines = require("./cine.model.js")(sequelize, Sequelize);

module.exports = db;