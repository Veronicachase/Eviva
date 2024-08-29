import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const updateBlog = async (blogId, token) => {
  try {
    const response = await axios.update(`${apiUrl}/blogs/${blogId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Blog data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export default updateBlog;