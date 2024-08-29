import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";

export default function UserDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);

  return <h1> User Details sucha as age, diagnosed or not, name, etc. </h1>
}




