const express = require("express");
const { getApplication, sendApplication } = require("../controllers/Application");

const router = express();

router.get("/getApplication/:id", getApplication);
router.post("/sendApplication", sendApplication)
module.exports = {
  router,
}

