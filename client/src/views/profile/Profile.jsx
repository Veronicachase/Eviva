

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";

export default function UserProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);
  <h1>Here goes the user s profile </h1>
}


