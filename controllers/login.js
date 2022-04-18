const LoginService = require('../services/login');

const getByEmail = async (req, res) => {
  const { email } = req.body;
  const { status, message } = await LoginService.getByEmail(email);
  return res.status(status).json(message);
};

module.exports = { getByEmail };