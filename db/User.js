const conn = require('./conn');
const Sequelize = require('sequelize');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  rank: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports = User;
