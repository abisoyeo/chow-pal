const { Menu, Order, OrderItem } = require("../../shared/database");

/**
 * Initialize session for a new user
 */
function initSession(req) {
  if (!req.session.state) req.session.state = "MAIN_MENU";
  if (!req.session.cart) req.session.cart = [];
  if (!req.session.currentOrderId) req.session.currentOrderId = null;
}

/**
 * Main menu
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
 * List menu items from DB
 */
async function getMenuItems() {
  const items = await Menu.findAll();
  return items.map((i) => `${i.id} - ${i.name} (₦${i.price})`).join("\n");
}

/**
 * Add item to order (DB + session cart)
 */
async function addItemToOrder(req, selection) {
  const item = await Menu.findByPk(selection);
  if (!item) return { error: "Invalid selection" };

  // 1️⃣ If no order exists, create a new pending order
  let order;
  if (!req.session.currentOrderId) {
    order = await Order.create({
      sessionId: req.sessionID,
      status: "pending",
      total: item.price,
    });
    req.session.currentOrderId = order.id;
    req.session.cart = [];
  } else {
    order = await Order.findByPk(req.session.currentOrderId);
  }

  // 2️⃣ Check if item already in current session cart
  let cartItem = req.session.cart.find((i) => i.id === item.id);
  if (cartItem) {
    // Update quantity in DB
    const orderItem = await OrderItem.findOne({
      where: { orderId: order.id, menuId: item.id },
    });
    orderItem.quantity += 1;
    await orderItem.save();

    cartItem.quantity += 1;
  } else {
    // Add new item
    await OrderItem.create({
      orderId: order.id,
      menuId: item.id,
      quantity: 1,
      unitPrice: item.price,
    });
    req.session.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }

  return {
    message: `${item.name} added to your order (x${
      cartItem ? cartItem.quantity : 1
    })
Add more items (by number)
97 = View current order
99 = Checkout
0 = Cancel order
M = Show menu again`,
  };
}

/**
 * View current order
 */
async function viewCurrentOrder(req) {
  if (!req.session.cart.length)
    return "No items in current order. Type 1 to see menu items and place an order.";

  return `${req.session.cart.map((i) => `${i.name} x${i.quantity}`).join("\n")}
1 = Continue shopping
99 = Checkout
0 = Cancel order
M = Show menu again`;
}

/**
 * Checkout current order
 */
async function checkoutOrder(req) {
  if (!req.session.cart.length) return "No order to place.";

  const order = await Order.findByPk(req.session.currentOrderId, {
    include: { model: OrderItem, include: Menu },
  });

  if (!order) return "No order found.";

  // 3️⃣ Update order total................SHOULD BE FROM ORDER ITEM
  const total = order.OrderItems.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0
  );

  order.total = total;
  order.status = "completed"; // TESTING. Move all this to paystack payment verification
  await order.save();

  // Instead calculate total price for current orders and call paystack payment service by sending amount and user email which returns the link to sedn to cliennt

  // const url = await initiatePayment(req, total, order) // use orderId as reference
  // order.status = "completed";  // Move all this to paystack payment verification
  // req.session.cart = [];
  // req.session.currentOrderId = null;
  // req.session.state = "MAIN_MENU";
  // Also how to return a payment feedback, success/fail

  return "Order placed! Click here to make your payment {PAYSTACK LINK} or start a new order.";
}

/**
 * Cancel current order
 */
async function cancelOrder(req) {
  if (!req.session.cart.length) return "No order to cancel.";

  const order = await Order.findByPk(req.session.currentOrderId);
  if (order) {
    order.status = "cancelled";
    await order.save();
  }

  req.session.cart = [];
  req.session.currentOrderId = null;
  req.session.state = "MAIN_MENU";

  return "Current order cancelled.";
}

/**
 * View past orders
 */
async function viewPastOrders(req) {
  const orders = await Order.findAll({
    where: { sessionId: req.sessionID },
    include: { model: OrderItem, include: Menu },
    order: [["createdAt", "DESC"]],
  });

  if (!orders.length) return "No past orders.";

  const result = orders.map((order, idx) => {
    const items = order.OrderItems.map(
      (oi) => `${oi.Menu.name} x${oi.quantity}`
    ).join(", ");
    return `Order ${idx + 1} [${order.status}]: ${items} (Total: ₦${
      order.total
    })`;
  });

  return { reply: result.join("\n") };
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
