const PostsService = require('../services/blogposts');

const getAll = async (req, res) => {
  const { status, message } = await PostsService.getAll();
  return res.status(status).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await PostsService.getById(id);
  return res.status(status).json(message);
};

const create = async (req, res) => {
  // de onde vem o userId ?
  const { status, message } = await PostsService.create(req.body);
  return res.status(status).json(message);
};

module.exports = { getAll, getById, create };