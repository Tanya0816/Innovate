const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev B (Governance)
class Policy extends Model {}

Policy.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  version: { type: DataTypes.STRING, defaultValue: '1.0' },
  effectiveDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('draft', 'published', 'archived'), defaultValue: 'draft' },
}, { sequelize, modelName: 'policy', tableName: 'policies' });

module.exports = Policy;
