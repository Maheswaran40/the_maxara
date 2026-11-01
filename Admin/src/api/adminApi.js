
import axios from "axios";

const adminApi = axios.create({
  baseURL:
    import.meta.env.VITE_ADMIN_API_URL ||
    "http://localhost:5000/api/admin",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default adminApi;
