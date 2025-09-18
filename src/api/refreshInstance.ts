import axios, { AxiosHeaders } from "axios";
import {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  ensureCsrfHeader,
} from "./csrf";

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001",
  withCredentials: true,
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

refreshInstance.interceptors.request.use((config) => {
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = AxiosHeaders.from(config.headers);
  }
  const headers = config.headers;

  ensureCsrfHeader(headers);

  return config;
});

export default refreshInstance;
