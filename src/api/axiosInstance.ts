import axios, { Axios, AxiosError } from 'axios';
import refreshInstance from './refreshInstance';
import { setUserGlobally } from '../Auth/Context/AuthState';
import { fetchUser } from '../Utils/AuthUtils';

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

const axiosInstance = axios.create({
    baseURL: 'https://api-financial-system-production.up.railway.app',
    withCredentials: true,
});

let isRefreshing = false;
let isRedirectingToLogin = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Impede tentativa de refresh infinita
        if (originalRequest.url.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await refreshInstance.post('/auth/refresh');

                const user = await fetchUser();
                if (user) {
                    setUserGlobally(user);
                }

                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err as AxiosError);

                // Protege contra múltiplos redirecionamentos
                if (!isRedirectingToLogin) {
                    isRedirectingToLogin = true;
                    window.location.href = '/login';
                }

                return Promise.reject(err); // Impede que continue tentando
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
