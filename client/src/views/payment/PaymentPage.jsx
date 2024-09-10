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

