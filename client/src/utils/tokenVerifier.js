import { loginUser } from "../Redux/slices/userSlice";

export const checkAuthToken = (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = parseJwt(token);
    dispatch(loginUser({ user, token }));
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
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};
