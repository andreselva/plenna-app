import axios, {
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import refreshInstance from "./refreshInstance";
import { fetchUser } from "../Utils/AuthUtils";
import { setUserGlobally } from "../Auth/Context/AuthState";
import {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  ensureCsrfHeader,
} from "./csrf";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const mustSendCsrf = (config: InternalAxiosRequestConfig): boolean => {
  const method = (config.method || "get").toLowerCase();
  const url = config.url || "";
  const isMutable = method !== "get" && method !== "head";
  const forceOnPaths = ["/auth/refresh", "/auth/logout"];
  return isMutable || forceOnPaths.some((p) => url.includes(p));
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001",
  withCredentials: true,
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

axiosInstance.interceptors.request.use((config: RetryableConfig) => {
  if (mustSendCsrf(config)) {
    const headers = (config.headers = AxiosHeaders.from(config.headers));
    ensureCsrfHeader(headers);
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error || !error.config) return Promise.reject(error);

    const originalRequest = error.config as RetryableConfig;
    const currentPath = window.location.pathname;

    const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"];
    const isOnPublicRoute = PUBLIC_ROUTES.some((p) => currentPath.startsWith(p));

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isOnPublicRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              originalRequest._retry = true;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshInstance.post("/auth/refresh");

        const user = await fetchUser();
        if (user) setUserGlobally(user);

        processQueue(null, "ok");
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        if (!isOnPublicRoute) window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
