import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getAllCalendarEntries = async (calendarId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/calendar/${calendarId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Calendar data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar:', error);
    throw error;
  }
};

export default getAllCalendarEntries;