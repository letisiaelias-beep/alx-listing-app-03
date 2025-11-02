// lib/api.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export default api;
