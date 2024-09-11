import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../utils/tokenVerifier";



export default function LoggedUserOptionsPage(){
    const dispatch = useDispatch();

    useEffect(() => {
      checkAuthToken(dispatch);
    }, [dispatch]);
  
    return<h1>Page for users logged it contains options</h1>
}