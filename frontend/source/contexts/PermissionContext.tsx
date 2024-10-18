import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Permission = {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean | null; // Ensure this matches the type you expect
};

type PermissionContextType = {
  permissions: Permission[] | null; // Change to an array of Permission objects
  setPermissions: (roles: Permission[] | null) => void;
  hasPermission: (requiredRole: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<Permission[] | null>(null);

  useEffect(() => {
    // Fetch or get the permissions from localStorage
    const savedPermission = localStorage.getItem("permissions");
    if (savedPermission) {
      setPermissions(JSON.parse(savedPermission)); // Parse the JSON string into an array of Permission objects
    }
  }, []);

  const hasPermission = (requiredRole: string) => {
    if (!permissions) return false; // Return false if permissions are not loaded
    return permissions.some((permission) => permission.name === requiredRole);
  };

  return (
    <PermissionContext.Provider
      value={{ permissions, setPermissions, hasPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
