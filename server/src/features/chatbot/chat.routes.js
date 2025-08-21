const express = require("express");
const { Menu } = require("../../shared/database");

const router = express.Router();

// Track orders per userId
let currentOrders = {};

/**
 * Add a menu item to a user's current order
 */
function addToCurrentOrder(userId, menuId) {
  const order = currentOrders[userId] || [];

  const existingItem = order.find((item) => item.menuId === menuId);
  if (existingItem) {
    existingItem.quantity += 1; // increment if already exists
  } else {
    order.push({ menuId, quantity: 1 });
  }

  currentOrders[userId] = order;
}

router.post("/message", async (req, res, next) => {
  try {
    const { message, menuId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Handle adding a menu item
    if (menuId) {
      addToCurrentOrder(userId, menuId);
      return res
        .status(200)
        .json({ message: "Item added", currentOrder: currentOrders[userId] });
    }

    if (message) {
      switch (message) {
        case "1":
          // Show all menu items
          const menu = await Menu.findAll();
          return res.status(200).json(menu);

        case "97":
          // Show current order for this user
          const order = currentOrders[userId] || [];
          return res.status(200).json(order.length ? order : "None");

        case "98":
          // Placeholder for order history (DB later)
          return res.status(200).json({ orderHistory: "None" });

        case "99":
          // Checkout: show current order for this user
          const checkoutOrder = currentOrders[userId] || [];
          return res
            .status(200)
            .json(
              checkoutOrder.length
                ? { checkout: "click here to checkout", items: checkoutOrder }
                : "None"
            );

        case "0":
          // Cancel current order for this user
          currentOrders[userId] = [];
          return res.status(200).json({
            message: "Current order cancelled",
            currentOrder: currentOrders[userId],
          });

        default:
          return res.status(400).json({ error: "Unknown input" });
      }
    }

    res.status(400).json({ error: "No message or menuId provided" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
