const CategoryServices = require('../services/categories');

const getAll = async (req, res) => {
  const { status, message } = await CategoryServices.getAll();
  return res.status(status).json(message);
};

const create = async (req, res) => {
  const { status, message } = await CategoryServices.create(req.body);
  return res.status(status).json(message);
};

module.exports = { getAll, create };