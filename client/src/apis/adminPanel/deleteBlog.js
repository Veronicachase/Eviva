import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const deleteBlog = async (blogId, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/blogs/${blogId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Blog data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

export default deleteBlog;