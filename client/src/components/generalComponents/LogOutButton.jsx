import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { Button } from '@mui/material'


const LogOutButton =()=>{
    const dispatch = useDispatch();
    const handleLogOut =() => {
        localStorage.removeItem('token');
        dispatch(logout());
    };
    return <Button onClick={handleLogOut}>Logout</Button>
}

export default LogOutButton