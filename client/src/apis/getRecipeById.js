import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getRecipeById = async (recipeId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/recipes/${recipeId}`, {
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

export default getRecipeById;