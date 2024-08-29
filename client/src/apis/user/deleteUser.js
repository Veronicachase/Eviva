import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const deleteUser = async (userId,  token) => {
  try {
    const response = await axios.delete(`${apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('User data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export default deleteUser;