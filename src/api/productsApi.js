import { http } from "./http";

export const productsApi = {
  getAll: async () => {
    const response = await http.get("/api/products");
    return response.data;
  },

  searchProducts: async ({ q = "", page = 0, size = 50 }) => {
    const response = await http.get("/api/products/search", {
      params: { q, page, size }
    });
    return response.data;
  }
};