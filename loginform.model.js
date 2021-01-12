const mongoose = require("mongoose");
const validator = require("validator");

const formSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
  },
  age: {
    type: Number,
    min: 2,
  },
  email_id: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email id is invalid");
      }
    },
  },
  phone: {
    type: Number,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    minlength: 4,
    default: "male",
  },
  profession: {
    type: String,
  },
});

const FormData = new mongoose.model("FormData", formSchema);

module.exports = FormData;
