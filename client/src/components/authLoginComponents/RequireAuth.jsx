
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RequireAuth = ({ requiredSubscription = false }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isSubscribed = useSelector((state) => state.user.isSubscribed);

  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

 
  if (requiredSubscription && !isSubscribed) {
    return <Navigate to="/plans-info" replace />;
  }

  
  return <Outlet />;
};

RequireAuth.propTypes ={
  requiredSubscription:PropTypes.bool,
}
