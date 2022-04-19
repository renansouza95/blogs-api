module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(
      models.Category, {
        as: 'blogposts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      },
    );
  };

  // PostCategory.associate = (models) => {
  //   models.BlogPost.belongsToMany(
  //     models.Category, {
  //       as: 'blogposts',
  //       through: PostCategory,
  //       foreignKey: 'categoryId',
  //       otherKey: 'postId',
  //     },
  //   );
  // };

  return PostCategory;
};