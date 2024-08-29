import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const deleteSymptom = async (calendarId, symptomId,  token) => {
  try {
    const response = await axios.delete(`${apiUrl}/calendar/${calendarId}/symptom/${symptomId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Symptom data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting symptom:', error);
    throw error;
  }
};

export default deleteSymptom;
