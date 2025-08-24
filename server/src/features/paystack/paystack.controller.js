const { Order } = require("../../shared/database");
const axios = require("axios");

exports.verifyPayment = async (req, res) => {
  const reference = req.query.reference;

  if (!reference) {
    return res.status(400).send("No reference provided.");
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const transaction = response.data.data;

    if (transaction.status === "success") {
      const order = await Order.findOne({
        where: { paymentReference: reference },
      });
      order.status = "completed";
      await order.save();
      req.session.cart = [];
      req.session.currentOrderId = null;
      req.session.state = "MAIN_MENU";
      return res.redirect(`/chat?payment=success`);
    } else {
      return res.redirect(`/chat?payment=failed`);
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).send("Internal Server Error");
  }
};
