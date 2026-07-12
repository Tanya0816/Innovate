const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Employee extends Model {}

Employee.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'manager', 'employee'), defaultValue: 'employee' },
  departmentId: { type: DataTypes.UUID, allowNull: true },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },          // gamification balance
  points: { type: DataTypes.INTEGER, defaultValue: 0 },      // redeemable points
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { sequelize, modelName: 'employee', tableName: 'employees' });

module.exports = Employee;
