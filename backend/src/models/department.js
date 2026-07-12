const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Department extends Model {}

Department.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  head: { type: DataTypes.STRING },              // employee id/name heading the dept
  parentDepartmentId: { type: DataTypes.UUID, allowNull: true },
  employeeCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { sequelize, modelName: 'department', tableName: 'departments' });

module.exports = Department;
