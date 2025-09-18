import axios, { AxiosHeaders } from "axios";

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001",
  withCredentials: true,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "X-CSRF-Token",
});

const readCsrfFromCookie = () => {
  const m = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
};

refreshInstance.interceptors.request.use((config) => {
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = AxiosHeaders.from(config.headers);
  }
  const headers = config.headers;

  if (!headers.has("X-CSRF-Token")) {
    const token = readCsrfFromCookie();
    if (token) headers.set("X-CSRF-Token", token);
  }

  return config;
});

export default refreshInstance;
