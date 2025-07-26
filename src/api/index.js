import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // cross-origin 요청 시 쿠키를 포함하도록 설정합니다.
  withCredentials: true,
});

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
