
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const loginUser = async (credentials) => {
    try {
      
      const response = await axios.post(`${apiUrl}/users/login`, credentials);
      console.log('User authenticated:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
};
export default loginUser;




