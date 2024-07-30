import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getAllBlogs = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Blogs data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export default getAllBlogs;