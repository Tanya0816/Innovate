const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev C (Scoring Engine). Aggregated per department, per period.
// totalScore = env*0.4 + social*0.3 + gov*0.3 (weights configurable - see services/score/scoreEngine.js)
class DepartmentScore extends Model {}

DepartmentScore.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  departmentId: { type: DataTypes.UUID, allowNull: false },
  periodStart: { type: DataTypes.DATEONLY, allowNull: false },
  periodEnd: { type: DataTypes.DATEONLY, allowNull: false },
  environmentalScore: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  socialScore: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  governanceScore: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  totalScore: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
}, { sequelize, modelName: 'departmentScore', tableName: 'department_scores' });

module.exports = DepartmentScore;
