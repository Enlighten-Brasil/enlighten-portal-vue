
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: (process.env.API_URL) ? process.env.API_URL : 'http://localhost:1337',
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.common["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};
