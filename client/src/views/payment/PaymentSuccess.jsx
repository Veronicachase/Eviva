

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../Redux/slices/userSlice";

 const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  return <div>¡Pago exitoso! Suscripción activada.</div>;
};

export default PaymentSuccess;