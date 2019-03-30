const conn = require("./conn");
const Sequelize = require("sequelize");

const User = conn.define("user", {
  name: Sequelize.STRING,
  bio: Sequelize.STRING,
  rank: Sequelize.INTEGER
});

module.exports = User;
