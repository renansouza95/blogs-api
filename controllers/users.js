const UserService = require('../services/users');

// Tive ajuda do Pedro para fazer a condicional do 'status'
// A mensagem de erro retornava uma string (retorno esperado é um objeto)
// A 'message' estava dando conflito com o retorno esperado caso a funcao obtinha exito

const getAll = async (req, res) => {
  const { status, users, message } = await UserService.getAll();
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, user, message } = await UserService.getById(id);
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(user);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, message, token } = await UserService.create(displayName, email, password, image);
  if (status >= 400) return res.status(status).json({ message });
  res.status(status).json({ token });
};

module.exports = { getAll, getById, create };