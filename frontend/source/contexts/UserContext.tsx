import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface Roles {
  id: string;
  name: string;
  isDisabled: boolean;
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

interface UserContextType {
  user: Users | undefined;
  setUser: React.Dispatch<React.SetStateAction<Users | undefined>> | undefined;
  setSavedUser: React.Dispatch<React.SetStateAction<Users | undefined>> | undefined;
}

const initialValue: UserContextType = {
  user: undefined,
  setUser: undefined,
  setSavedUser: undefined,
};

export const UserContext = createContext<UserContextType>(initialValue);

interface UserProviderProps {
  children: ReactNode;
}

interface CustomEventMap extends WindowEventMap {
  userUpdated: CustomEvent<Users>;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | undefined>(undefined);
  const saveUser = localStorage.getItem("user");

  const [savedUser, setSavedUser] = useState<Users | undefined>(JSON.parse(saveUser!));


  useEffect(() => {
    // const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, [savedUser]);

  return (
    <UserContext.Provider value={{ user, setUser, setSavedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
