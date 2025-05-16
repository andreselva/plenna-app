import axios from "axios";

const refreshInstance = axios.create({
  baseURL: 'https://plenna.me',
  withCredentials: true,
});

export default refreshInstance;
