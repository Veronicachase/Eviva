import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const updateCalendar = async (calendarId, token) => {
  try {
    const response = await axios.update(`${apiUrl}/calendars/${calendarId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Calendar data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating calendar:', error);
    throw error;
  }
};

export default updateCalendar;