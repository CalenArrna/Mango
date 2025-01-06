import { fetchWithErrorHandling, baseURL } from "./UtilityService";

export const AuthenticationService = {
  async isAuthenticated() {
    return await fetchWithErrorHandling(baseURL + "/auth/profile", {
      method: "GET",
    });
  },

  async login(credentials: { email: string; password: string }) {
    return await fetchWithErrorHandling(baseURL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  },

  async register(credentials: { email: string; password: string }) {
    return await fetchWithErrorHandling(baseURL + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    return await fetchWithErrorHandling(baseURL + "/auth/logout", {
      method: "POST",
    });
  },
};
