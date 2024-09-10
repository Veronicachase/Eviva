import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";


const PUBLIC_KEY_STRIPE = import.meta.env.PUBLIC_KEY_STRIPE;


const stripeTestPromise = loadStripe(PUBLIC_KEY_STRIPE);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
