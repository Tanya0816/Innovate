const { EmissionFactor } = require('../../models');
const ApiError = require('../../utils/ApiError');

// Pure calculation logic - no DB writes here, so it's independently testable.
async function calculateCo2e(emissionFactorId, quantity) {
  const factor = await EmissionFactor.findByPk(emissionFactorId);
  if (!factor) throw new ApiError(404, 'Emission factor not found');
  if (factor.status !== 'active') throw new ApiError(400, 'Emission factor is not active');

  const co2eKg = Number(quantity) * Number(factor.co2ePerUnit);
  return { co2eKg, factor };
}

module.exports = { calculateCo2e };
