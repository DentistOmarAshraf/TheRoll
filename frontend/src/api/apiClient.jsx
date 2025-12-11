import axios from "axios";

const API_BASE_URL = "http://localhost:5000";  // should saved in ENV

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;