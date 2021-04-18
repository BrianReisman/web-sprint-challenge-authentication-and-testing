const db = require("../../data/dbConfig");

const add = (newUser) => {
  return db("users").insert(newUser, "id");
};

const findByName = (user) => {
  return db('users').where({username: user.username}).first()
}
module.exports = {
  add,
  findByName
};
