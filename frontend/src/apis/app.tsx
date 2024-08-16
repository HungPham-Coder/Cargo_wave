import axios from "axios";

const BaseApi = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
});

BaseApi.interceptors.request.use(
  (config) => {
    // Get JWT stored in local
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default BaseApi;