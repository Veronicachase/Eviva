import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const deleteSex = async (calendarId, sexId,  token) => {
  try {
    const response = await axios.delete(`${apiUrl}/calendar/${calendarId}/sex/${sexId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Sex data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting sex:', error);
    throw error;
  }
};

export default deleteSex;
