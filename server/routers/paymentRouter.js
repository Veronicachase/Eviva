

const express = require ("express");
const { createPaymentIntent, paymentRecord } = require ('../controllers/paymentController')
const PaymentRouter =express.Router();
//const authenticateToken = require("../middleWares/authenticateToken");
//const requireSubscription =require("../middleWares/requireSubscription");

//PaymentAndCheckoutRouter.use(authenticateToken);


PaymentRouter.post("/create-payment-intent",  createPaymentIntent);
//PaymentRouter.post("/create-payment-intent", authenticateToken,requireSubscription, createPaymentIntent);
//PaymentRouter.post("/payment-record", paymentRecord)


// Routes requiring admin permitsPaymentAndCheckoutRouterr.post("/", requireAdmin, addRecipe);


module.exports = PaymentRouter;
