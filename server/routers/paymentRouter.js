

const express = require ("express");
const { createPaymentIntent, addPaymentRecord  } = require ('../controllers/paymentController')
const PaymentRouter =express.Router();
const authenticateToken = require("../middleWares/authenticateToken");
const requireSubscription =require("../middleWares/requireSubscription");

//PaymentAndCheckoutRouter.use(authenticateToken);


PaymentRouter.post("/create-payment-intent", authenticateToken, createPaymentIntent);
PaymentRouter.post("/payment-record", addPaymentRecord )
//paymentRouter.get("/record", getPaymenteRecord)


// Routes requiring admin permitsPaymentAndCheckoutRouterr.post("/", requireAdmin, addRecipe);


module.exports = PaymentRouter;
