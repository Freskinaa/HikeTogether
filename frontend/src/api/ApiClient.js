import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

export class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
    });

    this.client.interceptors.request.use(async (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, params = {}) {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  async post(url, data = {}) {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put(url, data = {}) {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete(url) {
    const response = await this.client.delete(url);
    return response.data;
  }

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await this.client.post('/refresh-token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  }
}
