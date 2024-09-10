import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const addBlog = async (data, token) => {
  try {
   
    const formData = new FormData();
    
    // Añadimos los datos a formData
    formData.append('title', data.title);
    formData.append('shortDescription', data.shortDescription);
    formData.append('content', data.content);
    formData.append('date', data.date);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('topic', data.topic);
    formData.append('additionalUrl', data.additionalUrl);
    
    // Si hay una imagen, la añadimos a formData
    if (data.image) {
      formData.append('image', data.image);
    }

   
    const response = await axios.post(`${apiUrl}/Blogs`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Blog data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

export default addBlog;
