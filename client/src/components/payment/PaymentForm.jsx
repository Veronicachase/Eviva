import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { CARD_OPTIONS } from "../../utils/variables";

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
      additionalCardholderInformation: {
        cardExpiry,
        cardCvc
      }
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("id", id);
        const response = await axios.post(
          ` ${apiUrl}/payment/create-payment-intent`,
          {
            amount: 12900,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
            <div className="FormRow">
              <CardExpiryElement options={CARD_OPTIONS} />
            </div>
            <div className="FormRow">
              <CardCvcElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
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
