const { User } = require('../models');
const Token = require('../middlewares/token');

const getByEmail = async (email) => {
  try {
    const [check] = await User.findAll({
      where: {
        email,
      },
    });
    if (check.length === 0) return { status: 400, message: 'Invalid fields' };
    const token = Token.generateToken(email);
    return { status: 200, message: token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getByEmail };