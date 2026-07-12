const { EmissionFactor, CarbonTransaction, EnvironmentalGoal } = require('../models');
const { createCarbonTransaction, getDepartmentTotalCo2e } = require('../services/environmental/carbonService');
const asyncHandler = require('../utils/asyncHandler');

// --- Emission Factors ---
exports.listEmissionFactors = asyncHandler(async (req, res) => {
  const factors = await EmissionFactor.findAll();
  res.json(factors);
});

exports.createEmissionFactor = asyncHandler(async (req, res) => {
  const factor = await EmissionFactor.create(req.body);
  res.status(201).json(factor);
});

exports.updateEmissionFactor = asyncHandler(async (req, res) => {
  const factor = await EmissionFactor.findByPk(req.params.id);
  if (!factor) return res.status(404).json({ message: 'Not found' });
  await factor.update(req.body);
  res.json(factor);
});

// --- Carbon Transactions ---
exports.listCarbonTransactions = asyncHandler(async (req, res) => {
  const { departmentId } = req.query;
  const where = departmentId ? { departmentId } : {};
  const transactions = await CarbonTransaction.findAll({ where, order: [['transactionDate', 'DESC']] });
  res.json(transactions);
});

exports.createCarbonTransaction = asyncHandler(async (req, res) => {
  const transaction = await createCarbonTransaction(req.body);
  res.status(201).json(transaction);
});

exports.getDepartmentEmissions = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const { from, to } = req.query;
  const totalCo2eKg = await getDepartmentTotalCo2e(departmentId, { from, to });
  res.json({ departmentId, totalCo2eKg });
});

// --- Environmental Goals ---
exports.listGoals = asyncHandler(async (req, res) => {
  const goals = await EnvironmentalGoal.findAll();
  res.json(goals);
});

exports.createGoal = asyncHandler(async (req, res) => {
  const goal = await EnvironmentalGoal.create(req.body);
  res.status(201).json(goal);
});
