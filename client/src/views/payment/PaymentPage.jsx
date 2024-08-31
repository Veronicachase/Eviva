import { useState, useEffect } from "react";
import logo from "../../assets/images/LogoOviva.jpg"
import StripeContainer from "../../components/payment/StripeContainer";
import { useDispatch } from "react-redux";
import { checkAuthToken } from "../../utils/tokenVerifier";
import "./payment.css";

const PaymentPage = () => {
  const [showItem, setShowItem] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);

	return (
		<div className='App'>
			<h2 className="title">Eviva Care Plan</h2>
			{showItem ? (
				<StripeContainer />
			) : (
				<div className ="imageContainer">
					
					<img className="paymentImage" src={logo } alt='Eviva' />
					<h3>Golden plan € 10.00</h3>
					<button className="btn"   onClick={() => setShowItem(true)}>Get plan</button>
				</div>
			)}
		</div>
	);
}

export default PaymentPage;

//const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");

//   // useEffect(() => {
//   //   const fetchClientSecret = async () => {

//   //     const token = localStorage.getItem("token");
//   //     const amount = 1299;
//   //     const response = await fetch(`${apiUrl}/payment/create-payment-intent`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         "Authorization": `Bearer ${token}`
//   //       },
//   //       body: JSON.stringify({ amount }),
//   //     });
//   //     const data = await response.json();
//   //     setClientSecret(data.clientSecret);
//   //   };

//   //   fetchClientSecret();
//   // }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (error) {
//       console.error("Error processing payment:", error);
//       toast.error("Error processing payment");
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       await fetch(`${apiUrl}/payments/payment-record`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({

//           paymentIntentId: paymentIntent.id,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           paymentMethodId: paymentIntent.payment_method,
//           currency: paymentIntent.currency,
//         }),
//       });
//       console.log("Payment successfully processed:", paymentIntent);
//       toast.success("Payment successfully processed");
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="card card-body">
//       <CardElement />
//       <div className="paymentImage">
//         <img src={imagePack} alt="Oviva image" />
//         <h2>Health Plan Price: €12.99</h2>
//       </div>
//       <button className="paymentButton"   disabled={!stripe || loading}>
//         {loading ? "Procesando..." : "Buy"}
//       </button>
//     </form>
//   );
// };

// const PaymentPage = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//       <ToastContainer />
//     </Elements>
//   );
// };

// export default PaymentPage;






