import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";


const PUBLIC_KEY_STRIPE = import.meta.env.VITE_PUBLIC_KEY_STRIPE;
if(!PUBLIC_KEY_STRIPE){
  console.error("Stripe API key is missing")
} else{ console.log("Stripe API key loaded:", PUBLIC_KEY_STRIPE)}


const stripeTestPromise = loadStripe(PUBLIC_KEY_STRIPE);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
