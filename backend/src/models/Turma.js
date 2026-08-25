import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Turma = sequelize.define(
  'Turma',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serie: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    anoLetivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    turno: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Manhã',
    },
  },
  {
    tableName: 'turmas',
    timestamps: true,
  }
);

export default Turma;