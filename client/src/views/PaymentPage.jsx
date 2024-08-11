import {
  Elements,
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";

const stripePromise = loadStripe("import.meta.env.PK_STRIPE");

// Colocar este componente aparte (sección componentes de pago)

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(!error){
        const { id }=paymentMethod;
        await= (la api de makePayment.js)
    }
  };
  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <PaymentElement />
      <CardElement />
      <button>Payment</button>
    </form>
  );
};

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}
