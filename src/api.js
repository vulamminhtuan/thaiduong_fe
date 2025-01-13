import axios from 'axios';
const api = axios.create({
    baseURL: '${process.env.BACKEND_URL}', // URL của backend Spring Boot
    headers: {
      'Content-Type': 'application/json',
    },
  });
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Xử lý lỗi nếu cần, ví dụ như refresh token hoặc logout người dùng
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Xử lý lỗi chung
      if (error.response && error.response.status === 401) {
        // Ví dụ: Logout người dùng nếu token không hợp lệ
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default api;