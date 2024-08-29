// Antes de enviar a producción debo robustecer mis filtros y captura de errores.

const Stripe = require("stripe")(process.env.STRIPE_SK_PRIVATE_kEY_Test);
//const paymentDao = require("../DatabaseAndDao/paymentDao");

// falta revisión
const createPaymentIntent = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Subscription to Oviva Care",
      payment_method: id,
      confirm: true,
    });
    console.log("PaymentIntent", paymentIntent);

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
  });
    console.log(clientSecret);
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

/*const paymentRecord = async(req, res) =>{
  const { userId, paymentIntentId, status, paymentMethodId, amount, currency }= req.body;
try{
  await paymentDao.savePaymentDetails({
    userId,
    paymentIntentId,
    amount,
    status,
    paymentMethodId,
    currency,
  });
  res.status(201).json({ success: true, mesage:"Payment details saved successfully"});
}catch (error){
  console.error("Error saving the paymento on database (controller)", error.message);
  res.status(500).json({error:error.message})

}
}*/

module.exports = { createPaymentIntent };
