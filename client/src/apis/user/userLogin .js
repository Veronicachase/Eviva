import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const userLogin = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    console.error('Email and password are required.');
    throw new Error('Email and password are required.');
  }

  try {
    const response = await axios.post(`${apiUrl}/users/login`, credentials);

    if (response.status === 200) {
      console.log('User authenticated:', response.data);
      return response.data;
    } else {
      console.error('Authentication failed:', response.data);
      throw new Error('Authentication failed.');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error configuring the request:', error.message);
      throw new Error('Unexpected error occurred during login.');
    }
  }
};
export default userLogin;
