import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true, // ensures that cookies are sent
});

export default axiosInstance;
