

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";

export default function PaymentDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);
  return <h1>II should place details such as payment history, montly, annual, quit , pause, etc. </h1>
}
