const { Department } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.list = asyncHandler(async (req, res) => {
    const departments = await Department.findAll();
    res.json(departments);
});

exports.create = asyncHandler(async (req, res) => {
    const department = await Department.create(req.body);
    res.status(201).json(department);
});

exports.update = asyncHandler(async (req, res) => {
    const department = await Department.findByPk(req.params.id);
    if (!department) throw new ApiError(404, 'Department not found');
    await department.update(req.body);
    res.json(department);
});

exports.remove = asyncHandler(async (req, res) => {
    const department = await Department.findByPk(req.params.id);
    if (!department) throw new ApiError(404, 'Department not found');
    await department.destroy();
    res.status(204).send();
});
