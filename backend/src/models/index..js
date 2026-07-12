const sequelize = require('../config/db');

const Department = require('./department');
const Employee = require('./employee');
const Category = require('./category');
const EmissionFactor = require('./emissionFactor');
const CarbonTransaction = require('./carbonTransaction');
const EnvironmentalGoal = require('./environmentalGoal');
const CsrActivity = require('./csrActivity');
const EmployeeParticipation = require('./employeeParticipation');
const Policy = require('./policy');
const PolicyAcknowledgement = require('./policyAcknowledgement');
const Audit = require('./audit');
const ComplianceIssue = require('./complianceIssue');
const Challenge = require('./challenge');
const ChallengeParticipation = require('./challengeParticipation');
const Badge = require('./badge');
const Reward = require('./reward');
const DepartmentScore = require('./departmentScore');

// --- Associations ---
// Core
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Employee, { foreignKey: 'departmentId' });

// Environmental
CarbonTransaction.belongsTo(Department, { foreignKey: 'departmentId' });
CarbonTransaction.belongsTo(EmissionFactor, { foreignKey: 'emissionFactorId' });
EmissionFactor.hasMany(CarbonTransaction, { foreignKey: 'emissionFactorId' });
EnvironmentalGoal.belongsTo(Department, { foreignKey: 'departmentId' });

// Social
CsrActivity.belongsTo(Category, { foreignKey: 'categoryId' });
CsrActivity.belongsTo(Department, { foreignKey: 'departmentId' });
EmployeeParticipation.belongsTo(Employee, { foreignKey: 'employeeId' });
EmployeeParticipation.belongsTo(CsrActivity, { foreignKey: 'csrActivityId' });

// Governance
PolicyAcknowledgement.belongsTo(Policy, { foreignKey: 'policyId' });
PolicyAcknowledgement.belongsTo(Employee, { foreignKey: 'employeeId' });
ComplianceIssue.belongsTo(Audit, { foreignKey: 'auditId' });
Audit.belongsTo(Department, { foreignKey: 'departmentId' });

// Gamification
Challenge.belongsTo(Category, { foreignKey: 'categoryId' });
ChallengeParticipation.belongsTo(Challenge, { foreignKey: 'challengeId' });
ChallengeParticipation.belongsTo(Employee, { foreignKey: 'employeeId' });

// Scoring
DepartmentScore.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = {
  sequelize,
  Department,
  Employee,
  Category,
  EmissionFactor,
  CarbonTransaction,
  EnvironmentalGoal,
  CsrActivity,
  EmployeeParticipation,
  Policy,
  PolicyAcknowledgement,
  Audit,
  ComplianceIssue,
  Challenge,
  ChallengeParticipation,
  Badge,
  Reward,
  DepartmentScore,
};
