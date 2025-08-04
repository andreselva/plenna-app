import axios from 'axios';
import refreshInstance from './refreshInstance';
import {fetchUser} from '../Utils/AuthUtils';
import {setUserGlobally} from '../Auth/Context/AuthState';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_URL_API || 'localhost:3001',
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const currentPath = window.location.pathname;
        const isOnLoginPage = currentPath === '/login';

        if (originalRequest.url.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
            && !isOnLoginPage
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
