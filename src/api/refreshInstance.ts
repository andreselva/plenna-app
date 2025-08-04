import axios from "axios";

const refreshInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
});

export default refreshInstance;
