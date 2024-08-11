import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getSettings = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/settings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('settings data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export default getSettings;