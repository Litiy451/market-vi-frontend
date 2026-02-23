// пример http.js
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8083",
  withCredentials: true,
});