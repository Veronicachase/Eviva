import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { fetchUser, logout } from "../../Redux/slices";
import { Box, Button } from "@mui/material";

export default function UserProfile() {
 {/* const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser("aqui va el userId"));
  }, [dispatch]);

  if (status === "loading") return <div>Cargando...</div>;
  if (error) return <div>Error:{error}</div>;

  return (
    <Box className="boxes">
      <h1>
        {data.name} {data.surName}
      </h1>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Box>
  );*/}
}
