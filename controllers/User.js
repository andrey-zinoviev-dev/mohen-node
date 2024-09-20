const Users = require("../models/user");
const { generateJWT } = require("../utils");

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
  Users.findById(payload._id).populate("favourites").populate("goods").populate("basket.good")
  .then((doc) => {
    if(!doc) {
      throw new Error("Пользователь не найден");
    }
    console.log(doc);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   // expiresIn: 3600,
    // })

    //goods
    const newGoods = Promise.all(doc.goods.map((good) => {
      const readCommand = new GetObjectCommand({
        Bucket: process.env.AWS_NAME,
        Key: good.photos[0].title,
      });
      return getSignedUrl(s3ClientProfile, readCommand, {
        expiresIn: 27000,
      })
      .then((url) => {
        good.cover = url;
        console.log(good);
        return good;
      })
    }));
    
    const newBasket = Promise.all(doc.basket.map(({ good }) => {
      const readCommand = new GetObjectCommand({
        Bucket: process.env.AWS_NAME,
        Key: good.photos[0].title,
      });

      return getSignedUrl(s3ClientProfile, readCommand, {
        expiresIn: 27000,
      })
      .then((url) => {
        good.cover = url;
        return good;
      })

    }));

    //favs
    const newFavs = Promise.all(doc.favourites.map((good) => {
      const readCommand = new GetObjectCommand({
        Bucket: process.env.AWS_NAME,
        Key: good.photos[0].title,
      });

      return getSignedUrl(s3ClientProfile, readCommand, {
        expiresIn: 27000,
      })
      .then((url) => {
        good.cover = url;
        return good;
      })

    }));

    Promise.all([newBasket, newGoods, newFavs])
    .then((data) => {
      // console.log(data);
      doc.basket = data[0];
      doc.goods = data[1];
      doc.favourites = data[2]
      // console.log(data[0]);
      return res.status(200).send(JSON.stringify(doc));
    })

    // return res.status(200).send(JSON.stringify(doc));
  })
  // return res.status(200).send(JSON.stringify({str: "user to send"}));
};

const showUserGoods = (req, res) => {
  
}

const updateBasket = (req, res) => {
  // const { payload } = ;
  const { _id } = req.user.payload;

  Users.findById(_id)
  .then((doc) => {
    // console.log(good);
    if(!doc) {
      throw new Error("Пользователь не найден")
    }

    console.log(req.body);

    const isGoodInBasket = doc.basket.find((basketGood) => {
      return basketGood._id.toString() === req.body.good.good._id;
    });

    // console.log(isGoodInBasket);

    if(!isGoodInBasket) {
      doc.basket.push({good: req.body.good.good._id, quantity: req.body.good.quantity});
    } else {
      // console.log("remove good from basket");
      doc.basket = doc.basket.filter((basketGood) => {
        return basketGood._id.toString() !== req.body.good.good._id;
      });
      
    }

    // // // console.log(doc);

    doc.save();

    return res.status(201).send(JSON.stringify({addedToBasket: isGoodInBasket ? false : true}));

  })
  .catch((err) => {
    console.log(err.message);
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
  updateFavourites,
  userLogout,
}