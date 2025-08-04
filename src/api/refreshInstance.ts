import axios from "axios";

const refreshInstance = axios.create({
  baseURL: process.env.REACT_API_URL || 'localhost:3001',
  withCredentials: true,
});

export default refreshInstance;
