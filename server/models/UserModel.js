const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
  },
  { timestamps: true }
);
UserSchema.statics.signup = async function (data) {
  const { email, password, fullName } = data;
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
  if (!email || !password || !fullName) {
    throw new Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password not strong enough");
  }
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ fullName, email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fileds must ne filled.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

const User = mongoose.model("UserSchema", UserSchema);

module.exports = User;
