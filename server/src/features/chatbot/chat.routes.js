const express = require("express");
const { handleMessage } = require("./chat.controller");

const router = express.Router();

router.post("/message", handleMessage);

module.exports = router;
