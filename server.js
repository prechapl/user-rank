const express = require("express");
const app = express();
const path = require("path");
const syncAndSeed = require("./db/index");
const User = require("./db/User");
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "dist", "main.js"))
);

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/users", (req, res, next) => {
  User.findAll().then(users => res.send(users));
});

app.get("/users/topRanked", (req, res, next) => {
  User.findAll().then(users => res.send(users));
});

app.listen(port, () => console.log(`listening on port ${port}`));

syncAndSeed();
