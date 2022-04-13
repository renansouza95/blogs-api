const { BlogPost } = require('../models');
const PostsCategories = require('../models/postscategories');

const getAll = async () => {
  try {
    const [posts] = await BlogPost.findAll();
    return { status: 200, posts };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPost.findByPk(id);
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
    const [{ insertId }] = await BlogPost.create(post);
    console.log(insertId);
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