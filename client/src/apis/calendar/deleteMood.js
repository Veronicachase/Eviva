import axios from 'axios';
// ver si moodId también va aquí
const apiUrl = import.meta.env.VITE_API_URL;

const deleteMood = async (calendarId,moodId, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/calendar/${calendarId}/moods/${moodId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Mood data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting mood:', error);
    throw error;
  }
};

export default deleteMood;
