import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const addBlog = async (data, token) => {
    try {
   
      const response = await axios.post(`${apiUrl}/Blogs`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Blog data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  };
  export default addBlog;