const Goods = require("../models/goods");
const Users = require("../models/user");

//s3
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const s3ClientProfile = new S3Client({
//   region: process.env.AWS_REGION,
//   endpoint: process.env.AWS_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.AWS_KEY_ACCESS,
//     secretAccessKey: process.env.AWS_KEY_SECRET,
//   }
// })

const showGoods = (req, res) => {
    Goods.find({}).populate("seller")
    .then((docs) => {
        if(!docs) {
            throw new Error("Товары не найдены");
        }
        // console.log()
        // const updatedDocs = docs.map((doc) => {
        //     return {...doc, dateOfCreation: doc.createdAt.getTime()}
        // });
        // console.log(updatedDocs);
        // console.log(docs.map((doc) => {}));

        return res.status(200).send(JSON.stringify(docs));
    })
};

const showAccountGoods = (req, res) => {
    const { _id } = req.user.payload;
    Goods.find({seller: _id})
    .then((docs) => {
        if(!docs) {
            throw new Error("Товары не найдены");
        }

        return Promise.all(docs.map((doc) => {

            // const readCommand = new GetObjectCommand({
            //     Bucket: process.env.AWS_NAME,
            //     Key: doc.photos[0].title,
            // });
    
            // return getSignedUrl(s3ClientProfile, readCommand, {
            //     // expiresIn: 27000,
            // })
            // .then((url) => {
            //     doc.cover = url;
            //     return doc;
            // })
        }))
        .then(() => {
            return res.status(200).send(JSON.stringify(docs));
        })

    })
};

const showGood = (req, res) => {
    const { id } = req.params;
    Goods.findById(id).populate("seller")
    .then((doc) => {
        if(!doc) {
            throw new Error("Товар не найден");
        }

        return res.status(200).send(JSON.stringify(doc));

    })
};

const showCategory = (req, res) => {
    const { name } = req.params;
    Goods.find({
        category: name,
    }).populate("seller")
    .then((docs) => {
        if(!docs) {
            throw new Error("Товар не найден");
        }
        return res.status(200).send(JSON.stringify(docs));
    })
}

const addGood = (req, res) => {
    // console.log(req.body);
    const { _id } = req.user.payload;
    const { good } = req.body;

    // const photosArray = good.photos.map((photo) => {
    //     return {title: photo.title};
    // });

    console.log(good);
    // console.log(photosArray);
    Goods.create({title: good.title, description: good.description, colors: good.colors, category: good.category, madeToOrder: good.madeToOrder, materials: good.materials, dimensions: good.dimensions, photos: good.photos, price: good.price, seller: _id, batch: good.batch})
    .then((createdDoc) => {
        if(!createdDoc) {
            throw new Error("Что-то пошло не так при создании товара")
        }

        // const photos = createdDoc.photos.map((photo) => {
        //     return {...photo, url: `https://cdn.mohen-tohen.ru/${photo.title}`};
        // });

        // createdDoc.photos = photos;
        // createdDoc.save();

        return Users.findById(_id)
        .then((doc) => {
            doc.goods.push(createdDoc._id);
            doc.save();
                // createdDoc.save();
            return res.status(201).send(JSON.stringify(createdDoc));
        })

        // return res.status(201).send(JSON.stringify(createdDoc));

        // Promise.all(createdDoc.photos.map((photo) => {
        //     const readCommand = new GetObjectCommand({
        //         Bucket: process.env.AWS_NAME,
        //         Key: photo.title,
        //     });

        //     return getSignedUrl(s3ClientProfile, readCommand)
        //     .then((url) => {
        //         photo.url = url;
        //         return photo;
        //     })
        // }))
        // .then((data) => {
        //     Users.findById(_id)
        //     .then((doc) => {
        //         doc.goods.push(createdDoc._id);
        //         doc.save();
        //         createdDoc.save();
        //         return res.status(201).send(JSON.stringify(createdDoc));
    
        //     })
        // })



    })
    .catch((err) => {
        console.log(err);
    })
};

const editGood = (req, res) => {
    const { goodId } = req.params;
    const { good } = req.body;

    Goods.findById(goodId)
    .then((doc) => {
        Object.keys(good).forEach((key) => {
            doc[key] = good[key];
        });
        doc.save();
        return res.status(201).send(JSON.stringify(doc));
    })
};

const updateBatch = (req, res) => {
    const { id } = req.params;
    console.log(id);
    // console.log(req.body);
    // Goods.findById(id)
    // .then((doc) => {
    //     if(!doc) {
    //         throw new Error("Товар не найден");
    //     }
    //     doc.batch = req.body.size;
    //     doc.save();

    //     return res.status(201).send(JSON.stringify({updatedBatch: doc.batch}))
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
};

module.exports = {
    showGoods,
    showAccountGoods,
    showCategory,
    showGood,
    addGood,
    editGood,
    updateBatch
}