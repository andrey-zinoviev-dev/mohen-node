const Goods = require("../models/goods");

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

const showGoods = (req, res) => {
    Goods.find({})
    .then((docs) => {
        if(!docs) {
            throw new Error("Товары не найдены");
        }

        return Promise.all(docs.map((doc) => {
            const readCommand = new GetObjectCommand({
                Bucket: process.env.AWS_NAME,
                Key: doc.photos[0].title,
            });
    
            return getSignedUrl(s3ClientProfile, readCommand, {
                expiresIn: 27000,
            })
            .then((url) => {
                doc.cover = url;
                return doc;
            })
        }))
        .then(() => {
            return res.status(200).send(JSON.stringify(docs));
        })

        // return res.status(200).send(JSON.stringify(docs));
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
            const readCommand = new GetObjectCommand({
                Bucket: process.env.AWS_NAME,
                Key: doc.photos[0].title,
            });
    
            return getSignedUrl(s3ClientProfile, readCommand, {
                expiresIn: 27000,
            })
            .then((url) => {
                doc.cover = url;
                return doc;
            })
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

        const readCommand = new GetObjectCommand({
            Bucket: process.env.AWS_NAME,
            Key: doc.photos[0].title,
        });

        return getSignedUrl(s3ClientProfile, readCommand, {
            expiresIn: 27000,
        })
        .then((url) => {
            doc.cover = url;

            // const readSellerCommand = new GetObjectCommand({

            // })
            
            const updatedPhotos = doc.photos.map((photo) => {
                const readCommand = new GetObjectCommand({
                    Bucket: process.env.AWS_NAME,
                    Key: photo.title,
                });
        
                return getSignedUrl(s3ClientProfile, readCommand, {
                    expiresIn: 27000,
                })
                .then((url) => {
                    photo.url = url;
                    return photo;
                })
            });

            Promise.all(updatedPhotos)
            .then((result) => {
                doc.photos = result;
                return res.status(200).send(JSON.stringify(doc));

            })
            // return res.status(200).send(JSON.stringify(doc));

            // return doc;
        })

    })
};

const addGood = (req, res) => {
    // console.log(req.body);
    const { _id } = req.user.payload;
    const { good } = req.body;

    const photosArray = good.photos.map((photo) => {
        return {title: photo.title};
    });
    // console.log(photosArray);
    Goods.create({title: good.title, description: good.description, material: good.material, dimensions: good.dimensions, photos: photosArray, price: good.price, seller: _id})
    .then((createdDoc) => {
        if(!createdDoc) {
            throw new Error("Что-то пошло не так при создании товара")
        }
        return res.status(201).send(JSON.stringify(createdDoc));
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    showGoods,
    showAccountGoods,
    showGood,
    addGood,
}