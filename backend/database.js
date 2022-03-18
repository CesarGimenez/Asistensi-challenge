const mongoose = require("mongoose");

const URL = "mongodb://localhost/challengedb";
mongoose
  .connect(URL)
  .then((db) => console.log("db is connect"))
  .catch((err) => console.error(err));

module.exports = mongoose;
