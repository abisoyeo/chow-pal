const express = require("express");
const { verifyPayment } = require("./paystack.controller");

const router = express.Router();

router.get("/callback", verifyPayment);

module.exports = router;
