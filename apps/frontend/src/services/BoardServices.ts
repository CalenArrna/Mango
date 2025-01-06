import { fetchWithErrorHandling } from "../services/UtilityService";

export const BoardsService = {
  async fetchBoards() {
    return await fetchWithErrorHandling("/api/boards", { method: "GET" });
  },

  async createBoard(data: { title: string }) {
    return await fetchWithErrorHandling("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
};
