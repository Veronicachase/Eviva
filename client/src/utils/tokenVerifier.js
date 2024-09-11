import { loginUser } from "../Redux/slices/userSlice";



export const checkAuthToken = (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  
  if (token) {
    const user = parseJwt(token);
    console.log("Dispatching loginUser with decoded token and user:", { user, token });
    dispatch(loginUser({ user, token }));
  } else{
    console.log("No token found in localStorage.");
  }
};

export const parseJwt = (token) => {
  
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
        
    );
   
    const decodedPayload = JSON.parse(jsonPayload);
    console.log("Decoded JWT payload:", decodedPayload);
    return decodedPayload;
    
  } catch (e) {
    return null;
  }
  
}
