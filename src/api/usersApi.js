import { http } from "./http";

export const usersApi = {
  create: (data) => http.post("/api/users", data),
  getAll: () => http.get("/api/users"),
  getById: (id) => http.get(`/api/users/${id}`),
  update: (id, data) => http.put(`/api/users/${id}`, data),
  remove: (id) => http.delete(`/api/users/${id}`),
};