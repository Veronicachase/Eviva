import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const deleteVideo = async (videoId,  token) => {
  try {
    const response = await axios.delete(`${apiUrl}/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Video data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

export default deleteVideo;