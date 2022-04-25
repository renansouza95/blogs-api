const PostsService = require('../services/blogposts');

const getAll = async (req, res) => {
  const { status, posts, message } = await PostsService.getAll();
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, post, message } = await PostsService.getById(id);
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(post);
};

const create = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const { status, created, message } = await PostsService.create(
    title, content, categoryIds, authorization,
  );
  if (status >= 400) return res.status(status).json({ message });
  return res.status(status).json(created);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { status, message } = await PostsService.destroy(id, authorization);
  if (status >= 400) return res.status(status).json({ message });
  res.status(status).end();
};

module.exports = { getAll, getById, create, destroy };