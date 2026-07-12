const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev C (Gamification)
class Challenge extends Model { }

Challenge.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    categoryId: { type: DataTypes.UUID, allowNull: false },
    description: { type: DataTypes.TEXT },
    xp: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), defaultValue: 'easy' },
    evidenceRequired: { type: DataTypes.BOOLEAN, defaultValue: false },
    deadline: { type: DataTypes.DATEONLY, allowNull: true },
    status: { type: DataTypes.ENUM('draft', 'active', 'under_review', 'completed', 'archived'), defaultValue: 'draft' },
}, { sequelize, modelName: 'challenge', tableName: 'challenges' });

module.exports = Challenge;
