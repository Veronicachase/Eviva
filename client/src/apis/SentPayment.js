import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const sendPayment = async (id) => {
  try {
    const response = await axios.post(`${apiUrl}/checkout/`, {
     id, 
     amount:1200
    
    });
    console.log(' payment data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completen payment:', error);
    throw error;
  }
};

export default sendPayment;