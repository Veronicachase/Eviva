import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const updateSettings = async (settingsId, token) => {
  try {
    const response = await axios.update(`${apiUrl}/settings/${settingsId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('settings data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

export default updateSettings;