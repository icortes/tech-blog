const sequelize = require('../config/connection');
const { BlogPost, User } = require('../models');

const blogData = require('./blogData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  for (const blogpost of blogData) {
    await BlogPost.create({ ...blogpost });
  }
  process.exit(0);
};

seedDatabase();
