const BlogPosts = require('../models/blogposts');
const PostsCategories = require('../models/postscategories');

const getAll = async () => {
  const [posts] = await BlogPosts.findAll();
  return { status: 200, posts };
};

const getById = async (id) => {
  const post = await BlogPosts.findByPk(id);
  if (!post) return { status: 404, message: 'Post does not exist' };
  return { status: 200, post };
};

const create = async ({ title, content, userId, categoryIds }) => {
  // validar se os parametros estao sendo passados no body usando Middlewares
  const post = {
    title,
    content,
    userId,
  };
  const [{ insertId }] = await BlogPosts.create(post);
  categoryIds.forEach(async (category) => {
    await PostsCategories.create({
      postId: insertId,
      categoryId: category,
    });
  });
  return { status: 201, post };
};

module.exports = { getAll, getById, create };