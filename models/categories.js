module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(
      models.PostCategory,
      { foreignKey: 'categoryId', as: 'postscategories' },
    );
  };

  return Category;
};