// Update your useAuth hook to manage authentication state
import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
};
