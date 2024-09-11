import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { CARD_OPTIONS } from "../../utils/variables";
import { useNavigate } from 'react-router-dom'
import "../../views/payment/payment.css";

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [clientSecret, setClientSecret] = useState(""); 
  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate()


  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const token = localStorage.getItem("token");  
        if (!token) {
          console.error("Token not found in localStorage");
          return;
      }
        const amount = 12900;  
        
      
        const response = await axios.post(`${apiUrl}/payment/create-payment-intent`, 
        { amount }, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const secret = response.data.clientSecret; 
        console.log("Client secret fetched:", secret); 
        console.log(secret)
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    if (!clientSecret) {
      console.error("Client secret is not available.");
      setLoading(false);
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
    });

    if (!error) {
      try {
     
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
         
            payment_method: paymentMethod.id,
          },
        });

        if (stripeError) {
          console.error("Error confirming payment:", stripeError);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {

          // Esta es la sección para guardar los detalles en la base de datos (tabla payments)

          const token = localStorage.getItem("token");

      
          
          await axios.post(`${apiUrl}/payment/payment-record`, {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            status: paymentIntent.status,
            paymentMethodId: paymentMethod.id, 
            currency: paymentIntent.currency,
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          console.log("Payment successfully processed:", paymentIntent);
          
          navigate('/payment-success')
          setSuccess(true);  
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    } else {
      console.log(error.message);
    }
    setLoading(false);  
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="container">
          <fieldset className="FormGroup">
            <div className="FormRow">
              <label>Card Number </label>
              <CardNumberElement className="cvcInput" options={CARD_OPTIONS} />
            </div>
            <div className="cvcEDContainer">
              <div className="FormRow expDate">
                <label>Expiry Date </label>
                <CardExpiryElement className="cvcInput" options={CARD_OPTIONS} />
              </div>
              <div className="FormRow cvc">
                <label>Security Code </label>
                <CardCvcElement className="cvcInput" options={CARD_OPTIONS} />
              </div>
            </div>
          </fieldset>
          <button className="btn" disabled={!stripe || loading}>
            {loading ? "Procesando..." : "Buy"}
          </button>
        </form>
      ) : (
        <div>
          <h3>Your payment has been successfully submitted, you can now access the Eviva Care full content.</h3>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
