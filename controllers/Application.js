const { application } = require("express");
const Applications = require("../models/applications");
// const Brands = require("../models/brands");
const Users = require("../models/user");

// const { generateNumber } = require("../utils");

//dotenv
const dotenv = require("dotenv");
dotenv.config();
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


const getApplication = (req, res) => {
  const { id } = req.params;
  
  Applications.findById(id).select("-_id").select("-__v")
  .then((doc) => {
    if(!doc) {
      throw new Error("Анкета не найдена");
    }
    return res.status(200).send(JSON.stringify(doc));
  })
};

const sendApplication = (req, res) => {
  Applications.findOne({phone: req.body.phone})
  .then((doc) => {
    // console.log(doc);
    if(doc) {
      throw new Error("Анкета уже была отправлена");
    } 
    const { application } = req.body;
    // console.log(req.body);
    Applications.create({
      name: application.name,
      email: application.email,
      phone: application.phone,
      city: application.city,
      brandName: application.brandName,
      category: application.category,
      description: application.description,
      productionLength: application.productionLength,
      productionProcess: application.productionProcess,
      stock: application.stock,
      size: application.size,
      dateOfFill: application.dateOfFill,
      photos: application.photos.map((photo) => {
        return {...photo, url: `http://cdn.mohen-tohen.ru/${photo.title}`}
      }),
      approved: application.approved,
    })
    .then((createdDoc) => {
      return res.status(201).send(createdDoc);
    })
  })
};

const decideApplication = (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  Applications.findById(id)
  .then((doc) => {
    if(!doc) {
      throw new Error("Анкета не найдена");
    }

    doc.approved = decision;
    doc.save();

    if(decision) {
      Users.findOne({phone: doc.phone})
      .then((userDoc) => {
        // console.log()
        if(!userDoc) {
          // console.log("create user");
          // const userName = generateNumber();
          return Users.create({name: doc.name, brandName:doc.brandName, description: doc.description, email: doc.email, cover: `http://cdn.mohen-tohen.ru/Placeholder-_-Glossary.svg`, phone: doc.phone, seller: true})
          // .then((createdDoc) => {

          // })
          // throw new Error("")
        } else {
          userDoc.seller = true;
          userDoc.save();
          // console.log("update user");
          // console.log(userDoc);

          // userDoc.seller = true;
          // userDoc.save();
        }
      })
    }


    return res.status(201).send(JSON.stringify({decision: decision}));
  })
};

module.exports = {
  getApplication,
  sendApplication,
  decideApplication,
}