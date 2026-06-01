import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://socialize-backend-blue.vercel.app',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
export default api;
