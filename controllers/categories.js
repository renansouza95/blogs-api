const CategoryServices = require('../services/categories');

const getAll = async (req, res) => {
  const { status, categories, message } = await CategoryServices.getAll();
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(categories);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { status, created, message } = await CategoryServices.create(name);
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(created);
};

module.exports = { getAll, create };