import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";



export default function SelectedRecipe(){
    const dispatch = useDispatch();

    useEffect(() => {
      checkAuthToken(dispatch);
    }, [dispatch]);

    return  <h1>My selected recipe page</h1>
}