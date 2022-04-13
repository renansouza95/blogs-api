const { User } = require('../models');

const getAll = async () => {
  try {
    const users = await User.findAll();
    return { status: 200, message: users };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return { status: 404, message: 'User does not exist' };
    return { status: 200, message: user };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ displayName, email, password, image }) => {
  try {
    const exists = await User.findAll({
      where: { email },
    });
    if (exists.length > 0) return { status: 409, message: 'User already registered' };
    const newUser = { displayName, email, password, image };
    await User.create({ newUser });
    return { status: 201, message: newUser };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, getById, create };