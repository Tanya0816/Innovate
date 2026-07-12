const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev B (Social & Governance)
class CsrActivity extends Model {}

CsrActivity.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.UUID, allowNull: false },
  description: { type: DataTypes.TEXT },
  departmentId: { type: DataTypes.UUID, allowNull: true },
  eventDate: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM('draft', 'active', 'completed', 'archived'), defaultValue: 'draft' },
}, { sequelize, modelName: 'csrActivity', tableName: 'csr_activities' });

module.exports = CsrActivity;
