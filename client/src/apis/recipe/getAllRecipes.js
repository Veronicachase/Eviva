import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getAllRecipes = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/recipes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Recipe data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export default getAllRecipes;