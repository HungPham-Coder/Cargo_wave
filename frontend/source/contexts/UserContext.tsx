import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";

interface Permissions {
  id: string;
  name: string;
  description: string;
  isDisabled: boolean;
}

interface Roles {
  id: string;
  name: string;
  isDisabled: boolean;
  permissions?: Permissions[];
}

interface Users {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: number;
  dob: Date;
  image: string;
  roles: Roles[];
  status: number;
  description: string;
}

// Define the UserContext type with `null` instead of `undefined`
interface UserContextType {
  userData: Users | null;
  setUserData: React.Dispatch<React.SetStateAction<Users | null>>;
  setRoleData: any | null;
}

// Initial value
const initialValue: UserContextType = {
  userData: null,
  setUserData: (userDataParam) => {},
  setRoleData: (roleDataParam: any) => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

// UserProviderProps remains unchanged
interface UserProviderProps {
  children: ReactNode;
}

interface RoleDataParam {
  id: string;
  roleIds: string[];
  permissions: Permissions[];
}

const isValidRoleDataParam = (data: any): data is RoleDataParam =>
  typeof data.id === "string" &&
  Array.isArray(data.roleIds) &&
  data.roleIds.every((roleId: string) => typeof roleId === "string");

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<Users | null>(null);

  const setUserDataHandler = (userDataParam: SetStateAction<Users | null>) => {
    console.log("userDataParam", userDataParam);
    setUserData(userDataParam);
  };

  const setRoleDataHandler = (roleDataParam: {
    roleIds: string[];
    permissions: Permissions[];
  }) => {
    console.log("roleDataParam", roleDataParam);

    setUserData((prevUserData: any) => {
      if (!prevUserData) return prevUserData;

      const updatedRoles = roleDataParam.roleIds.map((roleId) => {
        const existingRole = prevUserData.roles.find(
          (role: { id: string }) => role.id === roleId
        );

        return {
          ...existingRole, 
          id: roleId, 
          permissions: roleDataParam.permissions, 
        };
      });

      return {
        ...prevUserData,
        roles: updatedRoles, 
      };
    });
  };

  const contextValue = {
    userData: userData,
    setUserData: setUserDataHandler,
    // setUserData: setUserData,
    setRoleData: setRoleDataHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
