const UserService = require('../services/users');

const getAll = async (req, res) => {
  const { status, message } = await UserService.getAll();
  return res.status(status).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await UserService.getById(id);
  return res.status(status).json(message);
};

const create = async (req, res) => {
  const { status, message } = await UserService.create(req.body);
  return res.status(status).json(message);
};

module.exports = { getAll, getById, create };