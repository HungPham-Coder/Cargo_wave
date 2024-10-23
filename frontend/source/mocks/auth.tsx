import { useEffect, useState } from "react";

// Custom event target for localStorage changes
const localStorageEventTarget = new EventTarget();

// Function to update localStorage and emit custom event
export const updateLocalStorage = (key: string, value: string | null) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
  localStorageEventTarget.dispatchEvent(new Event("localStorageChange"));
};

export const useAuth = () => {
  // Initialize state directly based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if localStorage is defined (in browser environment)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      return !!token;
    }
    return false; // Default value when localStorage is not available
  });

  useEffect(() => {
    const checkToken = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("jwt");
        setIsAuthenticated(!!token);
      }
    };

    // Event listener for custom event
    const handleStorageChange = () => {
      checkToken();
    };

    localStorageEventTarget.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      localStorageEventTarget.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);

  return isAuthenticated;
};
