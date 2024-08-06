const Applications = require("../models/applications");

const getApplication = (req, res) => {
  const { id } = req.params;
  
  Applications.findById(id)
  .then((doc) => {
    if(!doc) {
      throw new Error("Анкета не найдена");
    }
    return res.status(201).send(doc);
  })
};

const sendApplication = (req, res) => {
  const bodyEntries = Object.entries(req.body);
  // console.log(bodyEntries);
  // const newObj = {};
  // bodyEntries.forEach(([key, value]) => {
  //   newObj[key] = value.value;
  // });
  // console.log(newObj);
  Applications.findOne({phone: req.body.phone.value})
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