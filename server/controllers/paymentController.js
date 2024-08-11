const { default: Stripe } = require("stripe");
const payment = require("../DatabaseAndDao/paymentDao");

// falta revisión
const postPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id, amount } = req.body;
    const paymentData = await Stripe.PaymentIntentsResource.create({
      amount,
      currency: "EUR",
      Description: "To confirm what to write here / product description",
      payment_method: id,
      confirm: true,
    });
    res.send("Payment received");
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: error.raw.message });
  }
};
