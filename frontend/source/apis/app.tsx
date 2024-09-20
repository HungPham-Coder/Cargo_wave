import axios from "axios";

const BaseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

BaseApi.interceptors.request.use(
  (config) => {
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