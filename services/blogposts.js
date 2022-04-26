const db = require('../models');
const Token = require('../middlewares/token');

// Feito com ajuda do Rafa Reis na monitoria
const getAll = async () => {
  try {
    const posts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { status: 200, posts };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error };
  }
};

const getById = async (id) => {
  try {
    const post = await db.BlogPost.findOne({
      where: { id },
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
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
      const response = await db.Category.findAll({
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
    const [check] = await db.User.findAll({
      where: { email },
    });
    return check.dataValues.id; // dataValues sao os registros no db
  } catch (error) {
    return { status: 500, message: error };
  }
};

const createPostCategory = async (id, category) => {
  try {
    await db.PostsCategory.create({
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
    const created = await db.BlogPost.create(post);
    await categoryIds.forEach((category) => createPostCategory(created.dataValues.id, category));
    return { status: 201, created };
  } catch (error) {
    return { status: 500, message: error };
  }
};

const destroy = async (id, authorization) => {
  try {
    const checkPost = await db.BlogPost.findOne({ where: { id } });
    if (!checkPost) return { status: 404, message: 'Post does not exist' };
    const { data } = Token.decodeToken(authorization); // object.data = email do usuario
    const userId = await getUserId(data);
    if (checkPost.userId !== userId) return { status: 401, message: 'Unauthorized user' };
    await db.BlogPost.destroy({ where: { id, userId } });
    return { status: 204 };
  } catch (error) {
    return { status: 500, message: error };
  }
};

module.exports = { getAll, getById, create, destroy };