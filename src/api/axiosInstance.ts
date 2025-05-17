import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api-financial-system-production.up.railway.app',
    withCredentials: true,
});

export default axiosInstance;
