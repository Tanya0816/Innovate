const { CarbonTransaction } = require('../../models');
const { calculateCo2e } = require('./emissionCalculator');

// Creates a Carbon Transaction, auto-calculating co2eKg from the linked
// Emission Factor. This is what Settings > "Auto Emission Calculation"
// (Section 8 of the spec) should call when a Purchase/Manufacturing/
// Expense/Fleet record is saved.
async function createCarbonTransaction({
  departmentId,
  emissionFactorId,
  sourceModule,
  sourceReferenceId,
  quantity,
  transactionDate,
}) {
  const { co2eKg } = await calculateCo2e(emissionFactorId, quantity);

  return CarbonTransaction.create({
    departmentId,
    emissionFactorId,
    sourceModule,
    sourceReferenceId,
    quantity,
    co2eKg,
    transactionDate,
    autoCalculated: true,
  });
}

async function getDepartmentTotalCo2e(departmentId, { from, to } = {}) {
  const { Op } = require('sequelize');
  const where = { departmentId };
  if (from && to) where.transactionDate = { [Op.between]: [from, to] };

  const transactions = await CarbonTransaction.findAll({ where });
  return transactions.reduce((sum, t) => sum + Number(t.co2eKg), 0);
}

module.exports = { createCarbonTransaction, getDepartmentTotalCo2e };
