const { User } = require('../models');
const Token = require('../middlewares/token');

const getByEmail = async (email) => {
  try {
    const [check] = await User.findAll({
      where: { email },
    });
    if (!check) return { status: 400, message: 'Invalid fields' };
    const token = Token.generateToken(email);
    return { status: 200, token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getByEmail };