import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { STORAGE_KEYS } from '@/constants/storage-keys';

interface RetryableRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  token: string;
}

interface ApiErrorPayload {
  message?: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorPayload>) => {
    const originalRequest = error.config as RetryableRequest;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (!originalRequest) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        const { data } = await axios.post<RefreshResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken },
        );

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.token}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data?.message ?? 'Something went wrong. Please try again.';

    return Promise.reject(new Error(errorMessage));
  },
);

export default axiosInstance;
