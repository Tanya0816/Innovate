const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev B (Governance)
class Audit extends Model {}

Audit.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  departmentId: { type: DataTypes.UUID, allowNull: true },
  auditDate: { type: DataTypes.DATEONLY, allowNull: false },
  auditor: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('scheduled', 'in_progress', 'completed'), defaultValue: 'scheduled' },
}, { sequelize, modelName: 'audit', tableName: 'audits' });

module.exports = Audit;
