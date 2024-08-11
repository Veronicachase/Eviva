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
        
    }
  };
  return (
    <form onSubmit={handleSubmit} className="card card-body">
    {/* Aquí colocaremos la imagen de lo que se va a vender o el paquete. y otros detalles */}
      <PaymentElement />
      <div className="form-group">  
       <CardElement  className="form-control"/>
      </div>
    
      <button className="btn btn-success">Payment</button>
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
