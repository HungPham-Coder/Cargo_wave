import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const usePermission = () => {
  const { userData } = useContext(UserContext);

  const hasPermission = (requiredPermission: string): boolean => {
    if (!userData?.roles) return false;

    console.log("requiredPermission", requiredPermission);

    const hasPerm = userData.roles.some((role) => {
      console.log("Role:", role); 
      console.log("Permissions:", role.permissions);
      
      return role.permissions?.some((permission) => {
        console.log("Checking permission:", permission.name);
        return permission.name === requiredPermission;
      });
    });

    return hasPerm;
  };

  return { hasPermission };
};
