const { DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const Database = require('../config/db');

const db = new Database();
const sequelize = db.sequelize;

const Usuario = sequelize.define('usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'idUsuario'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre'
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'apellido'
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'dni'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password'
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: sequelize.fn('GETDATE'),
  //   field: 'createdAt'
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: sequelize.fn('GETDATE'),
  //   field: 'updatedAt'
  // }
}, {
  tableName: 'usuario', // aquí se define el nombre de la tabla en la base de datos
  timestamps: false
});

module.exports = Usuario;
