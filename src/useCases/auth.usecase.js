const creatError = require("http-errors");
const users = require("../models/user.models");
const jwt = require("../lib/jwt");
const encrypt = require("../lib/encrypt");

async function login(email, password) {
  const user = await users.findOne({ email: email });

  if (!user) {
    throw creatError(401, "invalid data");
  }

  const isPasswordValid = await encrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw creatError(401, "invalid data");
  }

  const token = jwt.sign({ id: user._id });
  return token;
}

module.exports = { login };
