import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (originalRequest && !error._retry && error.response?.status === 401) {
      error._retry = true;

      try {
        const response = await apiInstance.get('/refresh-token', {
          withCredentials: true,
        });
        const accessToken = response?.data?.accessToken || null;

        useAuthStore.getState().setToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshTokenError) {
        return Promise.reject(refreshTokenError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
