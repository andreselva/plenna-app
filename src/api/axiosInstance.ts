import axios from 'axios';
import { setUserGlobally } from '../Auth/Context/AuthState';
import { fetchUser } from '../Utils/AuthUtils';
import refreshInstance from './refreshInstance';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await refreshInstance.post('/auth/refresh');

                const user = await fetchUser();
                if (user) {
                    setUserGlobally(user); // atualiza o estado central
                }
                return axiosInstance(originalRequest);
            } catch {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
