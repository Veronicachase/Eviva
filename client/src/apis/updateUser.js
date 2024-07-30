import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const updateUser = async (userId, token) => {
  try {
    const response = await axios.update(`${apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('user data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default updateUser;