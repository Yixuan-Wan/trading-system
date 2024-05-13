import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000,
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
  },
};
