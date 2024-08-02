const Applications = require("../models/applications");

const getApplication = (req, res) => {
  const { id } = req.params;

  console.log(id);

  Applications.findOne({})
  .then((doc) => {
    console.log(doc);
  })
};

module.exports = {
  getApplication,
}