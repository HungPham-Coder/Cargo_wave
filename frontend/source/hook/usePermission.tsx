import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const usePermission = () => {
  const { userData } = useContext(UserContext);

  const hasPermission = (requiredPermission: string): boolean => {
    if (!userData?.roles) return false;
    const hasPerm = userData.roles.some((role) => {
      return role.permissions?.some((permission) => {
        return permission.name === requiredPermission;
      });
    });

    return hasPerm;
  };

  return { hasPermission };
};
