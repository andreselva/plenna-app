import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://plenna.me',
    withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // const originalRequest = error.config;

//         // if (originalRequest.url.includes('/auth/refresh')) {
//         //     return Promise.reject(error);
//         // }

//         if (
//             error.response &&
//             error.response.status === 401 &&
//             !originalRequest._retry
//         ) {
//             originalRequest._retry = true;

//             try {
//                 await refreshInstance.post('/auth/refresh');

//                 const user = await fetchUser();
//                 if (user) {
//                     setUserGlobally(user); // atualiza o estado central
//                 }
//                 return axiosInstance(originalRequest);
//             } catch {
//                 window.location.href = '/login';
//             }
//         }

//         return Promise.reject(error);
//     }
// );


export default axiosInstance;
