const UserModel = require('../models/users');

const getAll = async () => {
  const [users] = await UserModel.findAll();
  return { status: 200, users };
};

const getById = async (id) => {
  const user = await UserModel.findByPk(id);
  if (!user) return { status: 404, message: 'User does not exist' };
  return { status: 200, user };
};

const create = async ({ displayName, email, password, image }) => {
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
};

module.exports = { getAll, getById, create };