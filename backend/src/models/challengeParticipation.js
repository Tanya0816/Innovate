const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev C
class ChallengeParticipation extends Model {}

ChallengeParticipation.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  challengeId: { type: DataTypes.UUID, allowNull: false },
  employeeId: { type: DataTypes.UUID, allowNull: false },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0-100
  proofUrl: { type: DataTypes.STRING, allowNull: true },
  approvalStatus: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  xpAwarded: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { sequelize, modelName: 'challengeParticipation', tableName: 'challenge_participations' });

module.exports = ChallengeParticipation;
