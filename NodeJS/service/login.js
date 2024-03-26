const loginModel = require("../model/login");

const isUserExists = async (username) => {
  return await loginModel.isUserExists(username);
};
const login = async (req) => {
  return await loginModel.login(req);
};

module.exports = { isUserExists, login };
