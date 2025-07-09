import axios from 'axios';

// const backendUrl = 'http://localhost:8000';
const backendUrl = 'https://mutualy-backend-mb9z.vercel.app';


const axiosInstance = axios.create({
  baseURL: backendUrl,
});

export default axiosInstance;
