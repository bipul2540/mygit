const monoogse = require("mongoose");

monoogse
  .connect("mongodb://localhost:27017/login-form", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected successfully.........");
  })
  .catch((err) => {
    console.log("you have error in inserting data: ", err);
  });
