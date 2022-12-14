const db = require('../models');
const Token = require('../middlewares/token');

// como excluir um atributo ao retornar findAll
// https://stackoverflow.com/questions/31679838/sequelizejs-findall-exclude-field

const getAll = async () => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return { status: 200, users };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) return { status: 404, message: 'User does not exist' };
    return { status: 200, user };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getUserId = async (email) => {
  try {
    const [check] = await db.User.findAll({
      where: { email },
    });
    return check.dataValues.id; // dataValues sao os registros no db
  } catch (error) {
    return { status: 500, message: error };
  }
};

const create = async (displayName, email, password, image) => {
  try {
    const [exists] = await db.User.findAll({
      where: { email },
    });
    if (exists) return { status: 409, message: 'User already registered' };
    const newUser = { displayName, email, password, image };
    await db.User.create(newUser);
    const token = Token.generateToken(email);
    return { status: 201, token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const destroy = async (authorization) => {
  const { data } = Token.decodeToken(authorization); // object.data = email do usuario
  const id = await getUserId(data);
  await db.User.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = { getAll, getById, create, destroy };