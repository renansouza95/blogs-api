const LoginService = require('../services/login');

const signIn = async (req, res) => {
  const { email } = req.body;
  const { status, message, token } = await LoginService.getByEmail(email);
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

module.exports = { signIn };