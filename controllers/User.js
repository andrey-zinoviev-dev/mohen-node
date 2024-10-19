const { populate } = require("../models/applications");
const Users = require("../models/user");
const { generateJWT, generateNumber } = require("../utils");

//s3
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3ClientProfile = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ACCESS,
    secretAccessKey: process.env.AWS_KEY_SECRET,
  }
})

const loginUser = (req, res) => {
  // User.find({phone})
};

const getOTPCode = (req, res, next) => {
  const { phone } = req.body;
  Users.findOne({phone: `+7${phone}`})
  .then((doc) => {
    if(!doc) {
      const userName = generateNumber();
      return Users.create({phone: `+7${phone}`, name:`Пользователь ${userName}`, cover: `http://cdn.mohen-tohen.ru/Placeholder-_-Glossary.svg`})
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
    return res.status(201).send(JSON.stringify({loggedIn: true}))
    // return res.status(200).send(JSON.stringify(doc));
  })
  .catch((err) => {
    console.log(err);
  })
};

const getUser = (req, res) => {
  const { payload } = req.user;
  // Users.findById(payload._id).populate("favourites").populate("goods").populate("basket.good").populate({path: "ordersHistory", populate: {
  //   path: "parties",
  // }}).populate({path: "ordersHistory", populate: {
  //   path: "goods",
  //   populate: {
  //     path: "good"
  //   }
  // }}).populate({
  //   path: "ordersHistory",
  //   populate: {
  //     path: "goods",
  //     populate: {
  //       path: "good",
  //         populate: {
  //           path: "seller"
  //         }
  //     }
  //   }
  // })

  Users.findById(payload._id).populate("favourites").populate("goods").populate("basket.good").populate("ordersHistory").populate({
    path: "ordersHistory",
    populate: {
      path: "buyer",
    }
  }).populate({
    path: "ordersHistory",
    populate: {
      path: "goods",
      populate: {
        path: "good",
      }
    }
  }).populate({
    path: "ordersHistory",
    populate: {
      path: "goods",
      populate: {
        path: "good",
        populate: {
          path: "seller",
        }
      }
    }
  }).then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   // expiresIn: 3600,
    // })

    // //goods
    // const newGoods = Promise.all(doc.goods.map((good) => {
    //   const readCommand = new GetObjectCommand({
    //     Bucket: process.env.AWS_NAME,
    //     Key: good.photos[0].title,
    //   });
    //   return getSignedUrl(s3ClientProfile, readCommand, {
    //     expiresIn: 27000,
    //   })
    //   .then((url) => {
    //     good.cover = url;
    //     console.log(good);
    //     return good;
    //   })
    // }));

    // // console.log(doc.basket);
    
    // const newBasket = Promise.all(doc.basket.map((good) => {
    //   // console.lo   g(good);
    //   const readCommand = new GetObjectCommand({
    //     Bucket: process.env.AWS_NAME,
    //     Key: good.good.photos[0].title,
    //   });

    //   return getSignedUrl(s3ClientProfile, readCommand, {
    //     expiresIn: 27000,
    //   })
    //   .then((url) => {
    //     good.good.cover = url;
    //     return good;
    //   })

    // }));

    // //favs
    // const newFavs = Promise.all(doc.favourites.map((good) => {
    //   const readCommand = new GetObjectCommand({
    //     Bucket: process.env.AWS_NAME,
    //     Key: good.photos[0].title,
    //   });

    //   return getSignedUrl(s3ClientProfile, readCommand, {
    //     expiresIn: 27000,
    //   })
    //   .then((url) => {
    //     good.cover = url;
    //     return good;
    //   })

    // }));

    // Promise.all([newBasket, newGoods, newFavs])
    // .then((data) => {
    //   // console.log(data);
    //   doc.basket = data[0];
    //   doc.goods = data[1];
    //   doc.favourites = data[2]
    //   // console.log(data[0]);
    //   return res.status(200).send(JSON.stringify(doc));
    // })

    return res.status(200).send(JSON.stringify(doc));
  })
  // return res.status(200).send(JSON.stringify({str: "user to send"}));
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



// const showUserGoods = (req, res) => {
  
// }

const updateBasket = (req, res) => {
  // const { payload } = ;
  const { _id } = req.user.payload;

  Users.findById(_id)
  .then((doc) => {
    // console.log(good);
    if(!doc) {
      throw new Error("Пользователь не найден")
    }

    const { good, quantity } = req.body;
    // console.log(good);

    const isGoodInBasket = doc.basket.find((basketGood) => {
      // console.log(basketGood)
      return basketGood.good.toString() === good._id;
    });

    // console.log(isGoodInBasket);

    // console.log(isGoodInBasket);

    if(!isGoodInBasket) {
      doc.basket.push({good: good._id, quantity: quantity});
    } else {
      // console.log("remove good from basket");
      doc.basket = doc.basket.filter((basketGood) => {
        return basketGood.good.toString() !== good._id;
      });
      
    }

    // // // console.log(doc);

    doc.save();

    return res.status(201).send(JSON.stringify({addedToBasket: isGoodInBasket ? false : true}));

  })
  .catch((err) => {
    console.log(err.message);
  })
};

const updateBasketGood = (req, res) => {
  const { payload } = req.user;
  const { id, quantity } = req.body;

  Users.findById(payload._id).populate("basket.good")
  .then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }

    doc.basket = doc.basket.map((basketItem) => {
      return basketItem.good._id.toString() === id ? {...basketItem, quantity: basketItem.quantity + quantity} : basketItem
    });
    doc.save();
    return res.status(201).send(JSON.stringify(doc.basket.find((basketItem) => {
      return basketItem.good._id.toString() === id;
    })));
  })
};

const deleteBasketGood = (req, res) => {
  const { payload } = req.user;
  const { id } = req.body;

  Users.findById(payload._id).populate("basket.good")
  .then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }
    // console.log(id);
    doc.basket = doc.basket.filter((basketItem) => {
      return basketItem.good._id.toString() !== id;
    });

    doc.save();

    return res.status(201).send(JSON.stringify(true));
  })
}

const updateFavourites = (req, res) => {
  const { payload } = req.user;
  // console.log("update favs here", payload);
  // console.log(req.body);
  Users.findById(payload._id)
  .then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }

    const favMatch = doc.favourites.find((fav) => {
      return fav._id.toString() === req.body.id;
    });

    if(!favMatch) {
      doc.favourites.push(req.body.id);
    } else {
      const newFavs =  doc.favourites.filter((prevFav) => {
        console.log(prevFav._id.toString(), req.body.id);
        return prevFav._id.toString() !== req.body.id;
      })
      doc.favourites = newFavs;
    }
    console.log(doc.favourites);
    doc.save();
    return res.status(201).send(JSON.stringify({addedToFavs: favMatch ? false : true}))
  })
};

const userLogout = (req, res) => {
  // console.log(req.cookies);
  // console.log("logout here");
  const { token } = req.cookies;
  if(!token) {
    throw new Error ("Пользователь не найден");
  }
  return res.clearCookie("token", {
    httpOnly: true,
    // expiresIn: 3600,
  }).status(200).send(JSON.stringify(true));
}

module.exports = {
  loginUser,
  getOTPCode,
  getSellers,
  getSeller,
  getUser,
  updateBasket,
  updateBasketGood,
  deleteBasketGood,
  updateFavourites,
  userLogout,
}