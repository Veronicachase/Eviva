import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const addCalendar = async (data, token) => {
  try {
    const response = await axios.post(`${apiUrl}/calendar/addNote`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export default addCalendar;
