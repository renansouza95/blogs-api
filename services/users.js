const { User } = require('../models');

const getAll = async () => {
  try {
    const [users] = await User.findAll();
    return { status: 200, users };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return { status: 404, message: 'User does not exist' };
    return { status: 200, user };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ displayName, email, password, image }) => {
  try {
    const exist = await User.findAll({
      where: { email },
    });
    if (exist) return { status: 409, message: 'User already registered' };
    const created = await User.create({
      displayName,
      email,
      password,
      image,
    });
    return { status: 201, created };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, getById, create };