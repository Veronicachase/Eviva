import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const addVideo = async (data, token) => {
    try {
   
      const response = await axios.post(`${apiUrl}/videos`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Videos data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding video:', error);
      throw error;
    }
  };
  export default addVideo;