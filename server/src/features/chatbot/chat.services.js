const { Menu, Order } = require("../../shared/database");

/**
 * Initialize session for a new user
 */
function initSession(req) {
  if (!req.session.state) req.session.state = "MAIN_MENU";
  if (!req.session.currentOrder) req.session.currentOrder = [];
  if (!req.session.pastOrders) req.session.pastOrders = [];
}

/**
 * Get main menu options
 */
function getMainMenu() {
  return `Select an option:
1 - Place an order
97 - See current order
98 - See order history
99 - Checkout
0 - Cancel order
M - Show menu anytime`;
}

/**
 * List restaurant items from DB
 */
async function getMenuItems() {
  const items = await Menu.findAll();
  return items
    .map((item) => `${item.id} - ${item.name} (₦${item.price})`)
    .join("\n");
}

/**
 * Add item to current order in session with quantity tracking
 */
async function addItemToOrder(req, selection) {
  const item = await Menu.findByPk(selection);
  if (!item) return { error: "Invalid selection" };

  const orderItem = req.session.currentOrder.find((i) => i.id === item.id);
  if (orderItem) {
    orderItem.quantity += 1;
  } else {
    req.session.currentOrder.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }

  return {
    message: `${item.name} added to your order (x${
      orderItem ? orderItem.quantity : 1
    })`,
  };
}

/**
 * View current order with quantities
 */
function viewCurrentOrder(req) {
  if (!req.session.currentOrder.length)
    return "No items in current order. Type 1 to see menu items and place an order.";
  return req.session.currentOrder
    .map((i) => `${i.name} x${i.quantity}`)
    .join("\n");
}

/**
 * Checkout current order and save to DB
 */
async function checkoutOrder(req) {
  if (!req.session.currentOrder.length) return "No order to place.";

  // Save order to DB
  await Order.create({
    items: JSON.stringify(req.session.currentOrder),
  });

  req.session.pastOrders.push(req.session.currentOrder);
  req.session.currentOrder = [];
  req.session.state = "MAIN_MENU";
  return "Order placed! Click here to make your payment {PAYSTACK LINK} or You can start a new order.";
}

/**
 * Cancel current order
 */
function cancelOrder(req) {
  if (!req.session.currentOrder.length) return "No order to cancel";
  req.session.currentOrder = [];
  req.session.state = "MAIN_MENU";
  return "Current order cancelled";
}

/**
 * View past orders
 */
function viewPastOrders(req) {
  if (!req.session.pastOrders.length) return "No past orders";
  return req.session.pastOrders
    .map(
      (order, idx) =>
        `Order ${idx + 1}: ${order
          .map((i) => `${i.name} x${i.quantity}`)
          .join(", ")}`
    )
    .join("\n");
}

module.exports = {
  initSession,
  getMainMenu,
  getMenuItems,
  addItemToOrder,
  viewCurrentOrder,
  checkoutOrder,
  cancelOrder,
  viewPastOrders,
};
