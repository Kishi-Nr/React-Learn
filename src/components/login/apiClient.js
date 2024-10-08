import axios from 'axios';
import { refreshToken } from './loginService';

// Membuat instance axios
const apiClient = axios.create({
  baseURL: 'http://116.206.212.234:4000',
});

// Tambahkan interceptor untuk menangani token yang kadaluarsa
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Jika mendapatkan error 401 (Unauthorized), refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Dapatkan token baru
        const newToken = await refreshToken();
        // Update header Authorization dengan token baru
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Ulangi request asli dengan token baru
      } catch (refreshError) {
        console.error('Refresh token gagal:', refreshError);
        // Lakukan logout atau redirect jika refresh gagal
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Redirect ke halaman login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
