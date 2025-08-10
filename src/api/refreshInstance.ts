import axios from "axios";

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001',
  withCredentials: true,
});

export default refreshInstance;
