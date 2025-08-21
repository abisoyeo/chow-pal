const chatService = require("./chat.services");

exports.handleMessage = async (req, res) => {
  const { message } = req.body;

  chatService.initSession(req);
  const state = req.session.state;
  let reply = "";

  // Convert message to uppercase in case user types 'm' or 'M'
  const input = message.trim().toUpperCase();

  // Special command: Show main menu anytime
  if (input === "M") {
    reply = await chatService.getMainMenu();
    req.session.state = "MAIN_MENU";
    return res.json({ reply });
  }

  // MAIN MENU STATE
  if (state === "MAIN_MENU") {
    switch (input) {
      case "1":
        req.session.state = "PLACE_ORDER";
        reply = await chatService.getMenuItems();
        break;
      case "97":
        reply = chatService.viewCurrentOrder(req);
        break;
      case "98":
        reply = chatService.viewPastOrders(req);
        break;
      case "99":
        reply = await chatService.checkoutOrder(req);
        break;
      case "0":
        reply = chatService.cancelOrder(req);
        break;
      default:
        reply = chatService.getMainMenu();
    }
  }
  // PLACE ORDER STATE
  else if (state === "PLACE_ORDER") {
    const selection = parseInt(input, 10);
    if (!isNaN(selection)) {
      if (selection === 99) {
        reply = await chatService.checkoutOrder(req);
      } else if (selection === 97) {
        reply = chatService.viewCurrentOrder(req);
      } else if (selection === 0) {
        reply = chatService.cancelOrder(req);
      } else {
        const result = await chatService.addItemToOrder(req, selection);
        reply = result.error
          ? result.error
          : `${result.message}\nType a number to add more items, 97 to view current orders, 99 to checkout, 0 to cancel, or M to see menu options again.`;
      }
    } else {
      reply =
        "Invalid input. Enter the item number to add it to your order, 97 to view current orders, 99 to checkout, 0 to cancel, or M to see menu options again.";
    }
  }

  res.json({ reply });
};
