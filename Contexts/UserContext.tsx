import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "./LocationContex";

export type Trash = {
  id: number;
  url: string;
  material: string;
  location: Location;
  date: string;
  //man ska få så många poäng som materialet tar för att förmultna
  point: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  points: number;
  memberSince: number;
  isLoggedIn: boolean;
  trashList: Trash[];
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  addTrash: (trash: Trash) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function addTrash(trash: Trash) {
    if (user?.trashList) {
      user?.trashList.push(trash);
    } else {
      const newTrashList: Trash[] = [];
      newTrashList.push(trash);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, addTrash }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "To use UserContext, you must place it inside UserProvider."
    );
  }
  return context;
}
