const express = require("express");
const { getApplication } = require("../controllers/getApplication");

const router = express();

router.get("/getApplication/:id", getApplication);

module.exports = {
  router,
}

