import { useState } from "react";
import {
  Elements,
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";
import sendPayment from "../apis/SentPayment";

const stripePromise = loadStripe("import.meta.env.PK_STRIPE");

// Colocar este componente aparte (sección componentes de pago)

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      sendPayment(id);
    }
    elements.getElement(CardElement).clear();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      {/* Aquí colocaremos la imagen de lo que se va a vender o el paquete. y otros detalles */}
      <PaymentElement />
      {/* Aquí colocaremos otros detalles como precio etc */}

      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button className="btn btn-success" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border text-Light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
        Payment
      </button>
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
