import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";


export default function AllRecipes(){
  const { isLoggedIn, isSubscribed, user } = useSelector((state)=>state.user)
    const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (!isLoggedIn) {
    return <h1>Need to log in.</h1>;
  }
  if (!isSubscribed) {
    return <h1>Need to be subscribed.</h1>;
  }

  return (
    <div>
      <h1>All Recipes page</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}