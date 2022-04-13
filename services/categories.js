const Categories = require('../models/categories');

const getAll = async () => {
  const [categories] = await Categories.findAll();
  return { status: 200, categories };
};

const create = async ({ name }) => {
  if (!name) return { status: 400, message: '"name" is required' }; // JOGAR PARA O MIDDLEWARE
  const created = await Categories.create({ name });
  return { status: 200, created };
};

module.exports = { getAll, create };