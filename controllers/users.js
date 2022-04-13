const UserService = require('../services/users');

const getAll = async (req, res) => {
  const { status, users } = await UserService.getAll();
  return res.status(status).json(users);
};

module.exports = { getAll };