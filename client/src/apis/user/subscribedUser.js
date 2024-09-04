import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const subscribedUser = async(userId, token) =>{
try {

const response = await axios.get(`${apiUrl}/payment/record/${userId}`, {
    headers:{
        'Authorization': `Bearer ${token}`
    }
})
const { status, amount, paymentMethodId } = response.data;

if (status === 'succeeded') {
    console.log("Payment confirmed. User is subscribed.");
  } else {
    console.log("Payment not confirmed. Status:", status);
  }

  return { status, amount, paymentMethodId };  

} catch (error) {
  console.error("Error fetching the subscription confirmation data", error);
  throw error; 
}
};


export default subscribedUser