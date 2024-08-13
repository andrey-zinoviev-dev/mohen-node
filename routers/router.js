const express = require("express");
const { getApplication, sendApplication, decideApplication } = require("../controllers/Application");

const router = express();

router.get("/getApplication/:id", getApplication);
router.post("/sendApplication", sendApplication);
router.put("/decideApplication/:id", decideApplication);

module.exports = {
  router,
}

