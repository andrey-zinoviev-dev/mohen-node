const Applications = require("../models/applications");

const getApplication = (req, res) => {
  const { id } = req.params;

  console.log(id);

  Applications.findById(id)
  .then((doc) => {
    if(!doc) {
      throw new Error("Анкета не найдена");
    }
    return res.status(201).send(doc);
  })
};

const sendApplication = (req, res) => {
  Applications.findOne({phone: req.body.phone})
  .then((doc) => {
    // console.log(doc);
    if(doc) {
      throw new Error("Анкета уже была отправлена");
    } 
    Applications.create(req.body)
    .then((createdDoc) => {
      return res.status(201).send(createdDoc);
    })
  })
  // console.log(req.body);
  // res.status(201).send({message: "no"});
}

module.exports = {
  getApplication,
  sendApplication,
}