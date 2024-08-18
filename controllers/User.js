const Users = require("../models/user");

const loginUser = (req, res) => {
  // User.find({phone})
};

const getOTPCode = (req, res) => {
  console.log("code is requested");
  const { phone } = req.body;
  console.log(phone);
};

module.exports = {
  loginUser,
  getOTPCode,
}