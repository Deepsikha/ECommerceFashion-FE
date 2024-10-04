import axios from 'axios';
import { getCookie } from 'cookies-next';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle server errors
      console.error('Error response:', error.response.data);
      throw error.response.data;
    }
    // Handle other types of errors (network, etc.)
    console.error('Error:', error.message);
    throw error.message;
  }
);

export default axiosInstance;