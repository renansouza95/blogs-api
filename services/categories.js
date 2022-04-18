const { Category } = require('../models');

const getAll = async () => {
  try {
    const categories = await Category.findAll();
    return { status: 200, categories };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async (name) => {
  try {
    const created = await Category.create({ name });
    return { status: 201, created };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, create };