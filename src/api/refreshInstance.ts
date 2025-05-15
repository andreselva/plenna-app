import axios from "axios";

const refreshInstance = axios.create({
  baseURL: 'http://localhost:8001',
  withCredentials: true,
});

export default refreshInstance;
