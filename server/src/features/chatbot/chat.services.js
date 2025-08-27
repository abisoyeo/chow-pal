const { Menu, Order, OrderItem } = require("../../shared/database");
const paystackService = require("../paystack/paystack.services");

// HELPERS
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function initSession(req) {
  if (!req.session.state) req.session.state = "MAIN_MENU";
  if (!req.session.cart) req.session.cart = [];
  if (!req.session.currentOrderId) req.session.currentOrderId = null;
}

// MAIN MENU
function getMainMenu() {
  return `Select an option:
1 - Place an order
97 - See current order
98 - See order history
99 - Checkout
0 - Cancel order
M - Show Main Menu`;
}

// PLACE ORDER FLOW
async function getMenuItems(req) {
  req.session.state = "PLACE_ORDER";

  const items = await Menu.findAll();
  return `Please select which item to add to your cart:

${items.map((i) => `${i.id} - ${i.name} (₦${i.price})`).join("\n")}
  
Enter the number of the meal you’d like to order, or type:
- 97 to view your current order  
- 99 to checkout  
- 0 to cancel  
- M to return to the main menu`;
}

async function addItemToOrder(req, selection) {
  const item = await Menu.findByPk(selection);
  if (!item)
    return {
      error:
        "Invalid selection. Enter the number of the meal you’d like to order.",
    };

  let order;
  if (!req.session.currentOrderId) {
    order = await Order.create({
      sessionId: req.sessionID,
      status: "pending",
      total: 0,
    });
    req.session.currentOrderId = order.id;
    req.session.cart = [];
  } else {
    order = await Order.findByPk(req.session.currentOrderId);
  }

  let cartItem = req.session.cart.find((i) => i.id === item.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItem = { id: item.id, name: item.name, price: item.price, quantity: 1 };
    req.session.cart.push(cartItem);
  }

  const [orderItem, created] = await OrderItem.findOrCreate({
    where: { orderId: order.id, menuId: item.id },
    defaults: { quantity: 1, unitPrice: item.price },
  });

  if (!created) {
    orderItem.quantity += 1;
    await orderItem.save();
  }

  const total = req.session.cart.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );
  order.total = total;
  await order.save();

  req.session.cartTotal = total;

  return {
    message: `${item.name} added to your order (x${cartItem.quantity}) 
Current total: ₦${total}

Add more items (by number)
- 97 View current order
- 99 Checkout
- 0 Cancel order
- M Show menu again`,
  };
}

async function viewCurrentOrder(req) {
  if (!req.session.cart.length)
    return "No items in current order. Type 1 to see menu items and place an order.";

  return `Your cart:

${req.session.cart.map((i) => `${i.name} x${i.quantity}`).join("\n")}
Current total: ₦${req.session.cartTotal}

Add more meals you’d like to order, or type:
- 99 Checkout
- 0  Cancel order
- M  Show menu again`;
}

// CHECKOUT FLOW
async function initiateCheckout(req) {
  if (!req.session.cart.length)
    return "No order to place.  Type 1 to see menu items and place an order.";

  req.session.state = "CHECKOUT";

  return `${req.session.cart.map((i) => `${i.name} x${i.quantity}`).join("\n")}
Current total: ₦${req.session.cartTotal}

Please enter your email address to make your order: `;
}

async function checkoutOrder(req, email) {
  if (!(email && isValidEmail(email))) {
    return "Please enter a valid email address. Or type 1 to see menu items and add more items or 0 to cancel order";
  }

  const order = await Order.findByPk(req.session.currentOrderId);

  if (!order)
    return "No order found.  Type 1 to see menu items and place an order.";

  if (
    order.paymentReference &&
    order.status === "pending" &&
    order.paystackUrl
  ) {
    return `You already have a pending payment. Click here to pay: ${order.paystackUrl}`;
  }

  const url = await paystackService.initiatePayment(req, order, email);

  order.email = email;
  order.paystackUrl = url;
  await order.save();

  return `Order placed! Click here to make your payment ${url} or start a new order.`;
}

async function retryPayment(req) {
  if (!req.session.currentOrderId)
    return "No pending order to retry payment for.";

  const order = await Order.findOne({
    where: {
      id: req.session.currentOrderId,
      status: "pending",
    },
  });

  if (!order) return "No pending order to retry payment for.";

  const url = await paystackService.initiatePayment(req, order, order.email);
  return `Retry your payment here: ${url}`;
}

// CANCEL ORDER
async function cancelOrder(req) {
  if (!req.session.cart.length)
    return "No order to cancel.  Type 1 to see menu items and place an order.";

  const order = await Order.findByPk(req.session.currentOrderId);
  if (order) {
    order.status = "cancelled";
    await order.save();
  }

  req.session.cart = [];
  req.session.currentOrderId = null;
  req.session.state = "MAIN_MENU";

  return "Current order cancelled.  Type 1 to see menu items and place an order.";
}

// PAST ORDERS
async function viewPastOrders(req) {
  const orders = await Order.findAll({
    where: { sessionId: req.sessionID },
    include: { model: OrderItem, include: Menu },
    order: [["createdAt", "DESC"]],
  });

  if (!orders.length)
    return "No past orders.  Type 1 to see menu items and place an order.";

  const result = orders.map((order, idx) => {
    const items = order.OrderItems.map(
      (oi) => `${oi.Menu.name} x${oi.quantity}`
    ).join("\n");
    return `Order ${idx + 1} [${order.status}]: 
${items} 
(Total: ₦${order.total})`;
  });

  return result.join("\n\n");
}

module.exports = {
  initSession,
  getMainMenu,
  getMenuItems,
  addItemToOrder,
  viewCurrentOrder,
  retryPayment,
  initiateCheckout,
  checkoutOrder,
  cancelOrder,
  viewPastOrders,
};
