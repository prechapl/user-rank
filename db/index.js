const User = require("./User");
const conn = require("./conn");

const usernames = [
  { name: "moe", bio: "moe is fun", rank: 1 },
  { name: "larry", bio: "larry is fun", rank: 2 },
  { name: "curly", bio: "curly is fun", rank: 3 }
];

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    usernames.map(user => User.create(user));
  });
};

module.exports = syncAndSeed;
