import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";
import Content from "../../Redux/contents/contentUser";


export default function AllBlogs() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);
  return ( 
    <Content>
    <h1>All blogs</h1>
    </Content>    );
}




