const posModel = require("../model/user");

const getInfo = async (req) => {
  return await posModel.getInfo(req);
};

module.exports = {
  getInfo,
};
