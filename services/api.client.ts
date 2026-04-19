import axios from 'axios';
import { API_CONFIG } from '@/services/config';

/**
 * Cấu hình Axios Client chuyên nghiệp.
 * Dùng cho các file *.api.ts
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bạn có thể thêm Interceptors ở đây (ví dụ: đính kèm Token)
apiClient.interceptors.request.use(
  (config) => {
    // const token = await getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
