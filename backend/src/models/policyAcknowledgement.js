const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev B
class PolicyAcknowledgement extends Model {}

PolicyAcknowledgement.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  policyId: { type: DataTypes.UUID, allowNull: false },
  employeeId: { type: DataTypes.UUID, allowNull: false },
  acknowledgedAt: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.ENUM('pending', 'acknowledged'), defaultValue: 'pending' },
}, { sequelize, modelName: 'policyAcknowledgement', tableName: 'policy_acknowledgements' });

module.exports = PolicyAcknowledgement;
