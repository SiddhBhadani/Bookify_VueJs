// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Update with your backend URL
});

export default ({ app }) => {
  // Add a Vue instance property called $axios
  app.config.globalProperties.$axios = axiosInstance;

  // Add an Axios interceptors response error handler
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
};
