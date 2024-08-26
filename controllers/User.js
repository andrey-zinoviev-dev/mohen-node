const Users = require("../models/user");
const { generateJWT } = require("../utils");

const loginUser = (req, res) => {
  // User.find({phone})
};

const getOTPCode = (req, res, next) => {
  const { phone } = req.body;
  Users.findOne({phone: `+7${phone}`})
  .then((doc) => {
    if(!doc) {
      return Users.create({phone: `+7${phone}`})
      .then((createdDoc) => {
        const token = generateJWT(createdDoc._id);
        res.cookie("token", token, {
          httpOnly: true,
          // expiresIn: 3600,
        });
        return res.status(201).send(JSON.stringify(createdDoc));
      })
    }
    const token = generateJWT(doc._id);
    
    res.cookie("token", token, {
      httpOnly: true,
      // expiresIn: 3600,
    })
    return res.status(200).send(JSON.stringify(doc));
  })
  .catch((err) => {
    console.log(err);
  })
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
};

const getUser = (req, res) => {
  const { payload } = req.user;
  Users.findById(payload._id)
  .then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   // expiresIn: 3600,
    // })
    return res.status(200).send(JSON.stringify(doc));
  })
  // return res.status(200).send(JSON.stringify({str: "user to send"}));
};

const updateBasket = (req, res) => {
  // const { payload } = ;
  const { _id } = req.user.payload;
  const { good } = req.body.good;

  Users.findById(_id)
  .then((doc) => {
    // console.log(good);
    if(!doc) {
      throw new Error("Пользователь не найден")
    }

    const isGoodInBasket = doc.basket.find((basketGood) => {
      return basketGood._id.toString() === good._id.toString();
    });

    // console.log(isGoodInBasket);

    if(!isGoodInBasket) {
      doc.basket.push(good._id);
    } else {
      // console.log("remove good from basket");
      doc.basket = doc.basket.filter((basketGood) => {
        return basketGood._id.toString() !== good._id.toString();
      });
      
    }

    // console.log(doc);

    doc.save();

    return res.status(201).send(JSON.stringify(doc.basket));

  })
  .catch((err) => {
    console.log(err.message);
  })
}

const updateFavourites = (req, res) => {
  const { payload } = req.user;
  console.log("update favs here", payload);
}

module.exports = {
  loginUser,
  getOTPCode,
  getSellers,
  getSeller,
  getUser,
  updateBasket,
  updateFavourites
}