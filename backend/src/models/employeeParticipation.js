const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OWNED BY: Dev B. Tracks employee involvement in CSR Activities ONLY
// (Challenge participation is a separate model - see challengeParticipation.js)
class EmployeeParticipation extends Model {}

EmployeeParticipation.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  employeeId: { type: DataTypes.UUID, allowNull: false },
  csrActivityId: { type: DataTypes.UUID, allowNull: false },
  proofUrl: { type: DataTypes.STRING, allowNull: true },
  approvalStatus: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  pointsEarned: { type: DataTypes.INTEGER, defaultValue: 0 },
  completionDate: { type: DataTypes.DATEONLY, allowNull: true },
}, { sequelize, modelName: 'employeeParticipation', tableName: 'employee_participations' });

module.exports = EmployeeParticipation;
