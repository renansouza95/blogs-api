module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
    PostsCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'categories',
    });
      models.Category.belongsToMany(models.BlogPost, {
        through: PostsCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
        as: 'posts',
      });
  };
  return PostsCategory;
};

// Feito com ajuda do Rafa Reis na monitoria