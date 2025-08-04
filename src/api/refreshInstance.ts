import axios from "axios";

const refreshInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8001',
  withCredentials: true,
});

export default refreshInstance;
