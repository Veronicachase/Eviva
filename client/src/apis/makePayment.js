import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const makePayment = async (data, token) => {
    try {
     const { id } = paymentMethod;
      const response = await axios.post(`${apiUrl}/payment`, {
        id,
        amount:1000,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('paymente data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
      throw error;
    }
  };
  export default makePayment;