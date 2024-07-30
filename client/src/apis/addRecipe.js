
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const addRecipe = async (data, token) => {
    try {
   
      const response = await axios.post(`${apiUrl}/recipes`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Recipe data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };
  export default addRecipe;