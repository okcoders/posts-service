const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@0.0.0.0:5432/posts')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Post = sequelize.define('post', {
  postId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.TEXT
  },
  body: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.TEXT
  },
});

sequelize.sync()

module.exports = {
  sequelize: sequelize,
  Post: Post,
}
