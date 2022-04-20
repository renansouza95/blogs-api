const { BlogPost, PostCategory, Category, User } = require('../models');
const Token = require('../middlewares/token');

const getAll = async () => {
  try {
    const posts = await BlogPost.findAll();
    return { status: 200, posts };
  } catch (error) {
    return { status: 500, message: error };
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPost.findByPk(id);
    if (!post) return { status: 404, message: 'Post does not exist' };
    return { status: 200, post };
  } catch (error) {
    return { status: 500, message: error };
  }
};

// Feito com a ajuda do Iago na monitoria
// obs: forEach nao retorna nada, enquanto map retorna um array
const fetchCategoryId = async (ids) => {
  try {
    return Promise.all(ids.map(async (id) => {
      const response = await Category.findAll({
        where: { id },
      });
      return response;
    }));
  } catch (error) {
    return { status: 500, message: error };
  }
};

const getUserId = async (email) => {
  try {
    const [check] = await User.findAll({
      where: { email },
    });
    return check.dataValues.id; // dataValues sao os registros no db
  } catch (error) {
    return { status: 500, message: error };
  }
};

const createPostCategory = async (id, category) => {
  try {
    await PostCategory.create({
      postId: id,
      categoryId: category,
    });
  } catch (error) {
    return { status: 500, message: error };
  }
};

const create = async (title, content, categoryIds, authorization) => {
  try {
    const ids = await fetchCategoryId(categoryIds); // array of arrays
    for (let i = 0; i < ids.length; i += 1) {
      if (ids[i].length === 0) return { status: 400, message: '"categoryIds" not found' };
    }
    const { data } = Token.decodeToken(authorization); // object.data = email do usuario
    const userId = await getUserId(data);
    const post = { title, content, userId };
    const created = await BlogPost.create(post);
    await categoryIds.forEach((category) => createPostCategory(created.dataValues.id, category));
    return { status: 201, created };
  } catch (error) {
    return { status: 500, message: error };
  }
};

module.exports = { getAll, getById, create };