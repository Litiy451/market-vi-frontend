// src/api/authApi.js
import { http } from "./http";

export const authApi = {
  login: (data) => http.post("/api/auth/login", data),
  register: (data) => http.post("/api/auth/register", data),
  logout: () => http.post("/api/auth/logout"),
  me: () => http.get("/api/auth/me"),
};