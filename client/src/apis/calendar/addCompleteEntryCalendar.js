
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

/// falta 
const addCompleteCalendar = async (data, actions, token) => {
    try {
   
      const response= await axios.post(`${apiUrl}/calendar/`, data, {
       
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });
     
      actions.resetForm()
     

    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };
  export default addCompleteCalendar;