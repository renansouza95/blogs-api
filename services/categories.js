const { Category } = require('../models');

const getAll = async () => {
  try {
    const [categories] = await Category.findAll();
    return { status: 200, message: categories };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ name }) => {
  try {
    if (!name) return { status: 400, message: '"name" is required' }; // JOGAR PARA O MIDDLEWARE
    const created = await Category.create({ name });
    return { status: 200, message: created };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, create };