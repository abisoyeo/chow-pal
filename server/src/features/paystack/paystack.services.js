const axios = require("axios");

exports.initiatePayment = async (req, order, email) => {
  const data = {
    amount: order.total * 100,
    email: email,
    reference: order.paymentReference,
  };

  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    data,
    {
      headers,
    }
  );

  const paymentUrl = response.data.data.authorization_url;

  return paymentUrl;
};
