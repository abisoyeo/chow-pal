const express = require("express");

const router = express.Router();

router.post("/message", (req, res, next) => {
  try {
    const { message } = req.body;
    const currentOrder = "";
    switch (message) {
      case "1":
        res.status(200).json({
          menu: "menulist",
        });

      case "97":
        if (currentOrder) {
          res.status(200).json({
            currentOrder: "currentOrderSummary",
          });
        } else {
          res.status(200).json({
            currentOrder: "None",
          });
        }

      case "98":
        if (orderHistory) {
          res.status(200).json({
            orderHistory: "orderHistory",
          });
        } else {
          res.status(200).json({
            orderHistory: "None",
          });
        }

      case "99":
        if (currentOrder) {
          res.status(200).json({
            checkout: "click here to checkout",
          });
        } else {
          res.status(200).json({
            checkout: "None",
          });
        }

      case "0":
        res.status(200).json({
          currentOrder: "currentOrder cancelled",
        });

      default:
        res.status(400).json({
          error: "Unknown input",
        });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/menu", (req, res) => {
  try {
    res.send("menu");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
