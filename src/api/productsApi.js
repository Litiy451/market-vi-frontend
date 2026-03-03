import { http } from "./http";

export const productsApi = {
  async getAll() {
    const res = await http.get("/api/products");

    // ✅ вариант 1: сервер возвращает массив
    if (Array.isArray(res.data)) return res.data;

    // ✅ вариант 2: сервер возвращает объект-обёртку { data: [...] }
    if (Array.isArray(res.data?.data)) return res.data.data;

    // на всякий случай
    return [];
  },
};