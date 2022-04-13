const Categories = require('../models/categories');

const getAll = async () => {
  try {
    const [categories] = await Categories.findAll();
    return { status: 200, categories };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ name }) => {
  try {
    if (!name) return { status: 400, message: '"name" is required' }; // JOGAR PARA O MIDDLEWARE
    const created = await Categories.create({ name });
    return { status: 200, created };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, create };