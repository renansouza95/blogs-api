const BlogPosts = require('../models/blogposts');
const PostsCategories = require('../models/postscategories');

const getAll = async () => {
  try {
    const [posts] = await BlogPosts.findAll();
    return { status: 200, posts };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPosts.findByPk(id);
    if (!post) return { status: 404, message: 'Post does not exist' };
    return { status: 200, post };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const create = async ({ title, content, userId, categoryIds }) => {
  // validar se os parametros estao sendo passados no body usando Middlewares
  try {
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
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { getAll, getById, create };