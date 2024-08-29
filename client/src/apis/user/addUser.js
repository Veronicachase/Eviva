
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const addUser = async (data, token) => {
    try {
      
        const response = await axios.post(`${apiUrl}/users`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('User data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; 
    }
};

export default addUser;
