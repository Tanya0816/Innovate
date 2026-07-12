const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Category extends Model {}

Category.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('csr_activity', 'challenge'), allowNull: false },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { sequelize, modelName: 'category', tableName: 'categories' });

module.exports = Category;
