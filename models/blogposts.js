module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,

  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

// como renomear tabelas: https://sebhastian.com/sequelize-timestamps/

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(
      models.User,
      { foreignKey: 'id', as: 'user' },
    );
  };

  return BlogPost;
};