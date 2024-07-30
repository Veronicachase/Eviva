import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getUser = async (userId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('User data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export default getUser;