const UserModel = require('../models/users');

const getAll = async () => {
  try {
    const [users] = await UserModel.findAll();
    return { status: 200, users };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) return { status: 404, message: 'User does not exist' };
    return { status: 200, user };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ displayName, email, password, image }) => {
  try {
    const exist = await UserModel.findAll({
      where: { email },
    });
    if (exist) return { status: 409, message: 'User already registered' };
    const created = await UserModel.create({
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