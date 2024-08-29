import axios from 'axios';
// ver si periodId también va aquí
const apiUrl = import.meta.env.VITE_API_URL;

const deletePeriodDate = async (calendarId, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/calendar/${calendarId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Period data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching period:', error);
    throw error;
  }
};

export default deletePeriodDate;