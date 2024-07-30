import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getVideoById = async (videoId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Video data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export default getVideoById;