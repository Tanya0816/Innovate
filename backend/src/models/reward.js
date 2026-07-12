const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev C. Redemption deducts `pointsRequired` from employee.points
// inside a DB transaction (see services/gamification/rewardService.js) -
// stock must be checked and decremented atomically.
class Reward extends Model {}

Reward.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  pointsRequired: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { sequelize, modelName: 'reward', tableName: 'rewards' });

module.exports = Reward;
