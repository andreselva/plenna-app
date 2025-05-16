import axios from "axios";

const refreshInstance = axios.create({
  baseURL: 'https://api-financial-system-production.up.railway.app',
  withCredentials: true,
});

export default refreshInstance;
