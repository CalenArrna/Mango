import { createContext, useState, useContext } from "react";
import { AuthenticationService } from "../services/AuthenticationService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const token = await AuthenticationService.login(credentials);
      const { email, userId } = token;
      setUser({ email, userId });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    try {
      await AuthenticationService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const isAuthenticated = async () => {
    try {
      const userData = await AuthenticationService.isAuthenticated();
      setUser(userData);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
