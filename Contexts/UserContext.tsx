import { ReactNode, createContext, useContext, useState } from "react";
import { animalImages } from "../animalImages";
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
  animalImageUrl: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  addTrash: (trash: Trash) => void;
  signOut: () => void;
  addImageUrl: (imageUrl: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 0, // Lägg till övriga standardvärden här
    username: "",
    password: "",
    points: 0,
    memberSince: 0,
    isLoggedIn: false,
    trashList: [],
    animalImageUrl: animalImages[0].imageURL, 
  });

  function addTrash(trash: Trash) {
    if (user?.trashList) {
//push!?nej
      user?.trashList.push(trash);
    } else {
      const newTrashList: Trash[] = [];
      newTrashList.push(trash);
    }
  }

  function signOut() {
    setUser(null);
  }

  function addImageUrl(imageUrl: string) {
    if (user) {
      setUser({ ...user, animalImageUrl: imageUrl });
    }
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, addTrash, signOut, addImageUrl }}
    >
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
