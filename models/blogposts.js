module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    // id: { type: DataTypes.INTEGER, primaryKey: true },
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
    BlogPost.hasMany(
      models.User,
      { foreignKey: 'id', as: 'users' },
    );
  };

  return BlogPost;
};