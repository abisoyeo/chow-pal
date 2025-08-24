const chatService = require("./chat.services");

exports.handleMessage = async (req, res) => {
  const { message } = req.body;

  chatService.initSession(req);
  const state = req.session.state;

  const input = message.trim().toUpperCase();
  let reply = "";

  // Special command: Show main menu anytime
  if (input === "M") {
    reply = chatService.getMainMenu();
    req.session.state = "MAIN_MENU";
    return res.json({ reply });
  }

  if (state === "MAIN_MENU") {
    switch (input) {
      case "1":
        reply = await chatService.getMenuItems();
        break;
      case "97":
        reply = await chatService.viewCurrentOrder(req);
        break;
      case "98":
        reply = await chatService.viewPastOrders(req);
        break;
      case "99":
        reply = await chatService.initiateCheckout(req);
        break;
      case "0":
        reply = await chatService.cancelOrder(req);
        break;
      default:
        reply = chatService.getMainMenu();
    }
  } else if (state === "PLACE_ORDER") {
    const selection = parseInt(input, 10);
    if (!isNaN(selection)) {
      if (selection === 99) {
        reply = await chatService.initiateCheckout(req);
      } else if (selection === 97) {
        reply = await chatService.viewCurrentOrder(req);
      } else if (selection === 0) {
        reply = await chatService.cancelOrder(req);
      } else {
        const result = await chatService.addItemToOrder(req, selection);
        reply = result.error ? result.error : `${result.message}`;
      }
    } else {
      reply =
        "Invalid input. Enter a valid item number or  97 to view current orders, 99 to checkout, 0 to cancel, or M to see menu options again.";
    }
  } else if (state === "CHECKOUT") {
    const inputTrimmed = input.trim();
    if (inputTrimmed === "0") {
      reply = await chatService.cancelOrder(req);
    } else if (inputTrimmed === "1") {
      reply = await chatService.getMenuItems(req);
    } else if (inputTrimmed === "5") {
      reply = await chatService.retryPayment(req);
    } else {
      reply = await chatService.checkoutOrder(req, inputTrimmed);
    }
  }
  res.json({ reply });
};
