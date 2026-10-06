import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const adminApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default adminApi;