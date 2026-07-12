const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// Emission Factor: the multiplier used to convert an operational quantity
// (litres of fuel, kWh of electricity, km travelled) into CO2e.
class EmissionFactor extends Model {}

EmissionFactor.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },        // e.g. "Diesel - Fleet"
  sourceType: { type: DataTypes.STRING, allowNull: false },  // e.g. "fuel", "electricity", "travel"
  unit: { type: DataTypes.STRING, allowNull: false },        // e.g. "litre", "kWh", "km"
  co2ePerUnit: { type: DataTypes.DECIMAL(12, 6), allowNull: false }, // kg CO2e per unit
  validFrom: { type: DataTypes.DATEONLY, allowNull: false },
  validTo: { type: DataTypes.DATEONLY, allowNull: true },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, { sequelize, modelName: 'emissionFactor', tableName: 'emission_factors' });

module.exports = EmissionFactor;
