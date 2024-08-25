const Users = require("../models/user");

const loginUser = (req, res) => {
  // User.find({phone})
};

const getOTPCode = (req, res, next) => {
  console.log("code is requested");
  // console.log(req.body);
  const { phone } = req.body;
  Users.findOne({phone: `+7${phone}`})
  .then((doc) => {
    if(!doc) {
      return Users.create({phone: `+7${phone}`})
      .then((createdDoc) => {
        return res.status(201).send(JSON.stringify(createdDoc));
      })
      // throw new Error("Пользователь не найден");
    }
    return res.status(200).send(JSON.stringify(doc));
  })
  .catch((err) => {
    console.log(err);
  })
  // const { phone } = req.body;
  // console.log(phone);
};

const getSellers = (req, res) => {
  Users.find({seller: true})
  .then((docs) => {
    if(!docs) {
      throw new Error("Дизайнеры не найдены");
    }
    return res.status(200).send(JSON.stringify(docs));
  })
};

const getSeller = (req, res) => {
  const { id } = req.params;

  Users.findById(id).populate("goods").then((doc) => {
    if(!doc) {
      throw new Error("Дизайнер не найден");
    }
    return res.status(200).send(JSON.stringify(doc));
  })
}

module.exports = {
  loginUser,
  getOTPCode,
  getSellers,
  getSeller,
}