const Applications = require("../models/applications");
//dotenv
const dotenv = require("dotenv");
dotenv.config();
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


const getApplication = (req, res) => {
  const { id } = req.params;
  
  Applications.findById(id).select("-_id").select("-__v")
  .then((doc) => {
    if(!doc) {
      throw new Error("Анкета не найдена");
    }
    Promise.all(doc.photos.value.map((photo) => {
      const readCommand = new GetObjectCommand({
        Bucket: process.env.AWS_NAME,
        Key: photo.name,
      });
      return getSignedUrl(s3ClientProfile, readCommand)
      .then((url) => {
        // console.log(url);
        photo.path = url;
        return photo;
      })
    }))
    .then((data) => {
      return res.status(201).send(doc);
    })
    // return res.status(201).send(doc);
  })
};

const sendApplication = (req, res) => {
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
    // console.log(req.body.photos);
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