// src/utils/axios.js
import axios from 'axios';
import { showToast } from './Toast'; // ✅ use your reusable toast

// CRA uses REACT_APP_
const baseURL = process.env.REACT_APP_API_BASE_URL ? `${process.env.REACT_APP_API_BASE_URL}/` : `http://localhost:5000/api/`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true, // ✅ for cookies
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (config.data && typeof config.data === 'object' && !(config.data instanceof Blob)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const { response } = err;

    if (!response) {
      // 🌐 Network error
      showToast('Network error. Please try again later.', 'error');
      return Promise.reject(err);
    }

    const { status, data } = response;

    // Only handle global/session errors here
    if (status === 401 && data?.message === 'jwt expired') {
      showToast('Session expired. Please log in again.', 'error');
    } else if (status === 403) {
      showToast('You are not authorized to perform this action.', 'error');
    } else {
      // ❌ Do NOT show toast here for normal API errors
      // let component-level code handle it
    }

    return Promise.reject({
      error: data?.error,
      message: data?.message || err.message,
    });
  }
);

export default axiosInstance;
