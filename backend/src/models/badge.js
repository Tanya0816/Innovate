const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev C. unlockRule is evaluated by services/gamification/badgeEngine.js
// e.g. { "type": "xp_gte", "value": 500 } or { "type": "challenges_completed_gte", "value": 5 }
class Badge extends Model {}

Badge.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING },
  unlockRule: { type: DataTypes.JSONB, allowNull: false },
}, { sequelize, modelName: 'badge', tableName: 'badges' });

module.exports = Badge;
