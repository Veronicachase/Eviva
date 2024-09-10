
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const addUser = async (data) => {
    try {
      
        const response = await axios.post(`${apiUrl}/users`, data, {
           
        });
        console.log('User data:', response.data);
        console.log(apiUrl)
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; 
    }
};

export default addUser;
