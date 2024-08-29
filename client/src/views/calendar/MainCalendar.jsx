
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";
import { motion } from 'framer-motion';

export default function MainCalendar(){
    const dispatch = useDispatch();

    useEffect(() => {
      checkAuthToken(dispatch);
    }, [dispatch]);
    return  <h1>Main calendar page</h1>
}

