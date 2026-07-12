const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');
const config = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

function signToken(employee) {
  return jwt.sign(
    { id: employee.id, email: employee.email, role: employee.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
}

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, departmentId, role } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'name, email and password are required');

  const existing = await Employee.findOne({ where: { email } });
  if (existing) throw new ApiError(409, 'An employee with this email already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const employee = await Employee.create({ name, email, passwordHash, departmentId, role });

  const token = signToken(employee);
  res.status(201).json({ token, employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ where: { email } });
  if (!employee) throw new ApiError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(password, employee.passwordHash);
  if (!valid) throw new ApiError(401, 'Invalid credentials');

  const token = signToken(employee);
  res.json({ token, employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role } });
});
