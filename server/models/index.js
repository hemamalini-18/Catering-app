const { sequelize } = require('../db');
const { initUserModel, User } = require('./User');

// Initialize models
initUserModel(sequelize);

async function syncDatabase() {
  await sequelize.sync();
}

module.exports = {
  sequelize,
  User,
  syncDatabase,
};


