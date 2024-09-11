// Antes de enviar a producción debo robustecer mis filtros y captura de errores.

const Stripe = require("stripe")(process.env.PRIVATE_kEY_STRIPE);
const paymentDao = require("../DatabaseAndDao/paymentDao");

// falta revisión
const createPaymentIntent = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Subscription to Oviva Care",
    });
    console.log("PaymentIntent", paymentIntent);

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
     
    });
    console.log(clientSecret);
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};


const addPaymentRecord = async (req, res) => {
  const { userId, paymentIntentId, status, paymentMethodId, amount, currency } =
    req.body;
  try {
    await paymentDao.savePaymentDetails({
      userId,
      paymentIntentId,
      amount,
      status,
      paymentMethodId,
      currency,
     date: moment().format("YYYY-MM-DD")
      
    });
    res
      .status(201)
      .json({ success: true, mesage: "Payment details saved successfully" });
  } catch (error) {
    console.error(
      "Error saving the paymento on database (controller)",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
};

const getPaymentRecord = async (req, res) => {
  try {
    const userId = req.user.userId;
    const paymentReport = await paymentDao.getPaymentRecord( userId);
    if (paymentReport) {
      res.json(paymentReport);
    } else {
      console
        .status(404)
        .json({ message: "NO existen datos de pago para este usuario" });
    }
  } catch (error) {}
};

module.exports = { createPaymentIntent, addPaymentRecord , getPaymentRecord };
