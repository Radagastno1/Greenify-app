import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { animalImages } from "../animalImages";
import { fetchCreateUserReal, fetchLogInUser } from "../api";
import { Trash, User } from "../types";

export type ActionType =
  | { type: "SET_USER"; payload: User | null }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "CREATE_USER"; payload: User | null }
  | { type: "ADD_TRASH"; payload: Trash }
  | { type: "SIGN_IN"; payload: { username: string; password: string } }
  | { type: "SIGN_OUT" }
  | { type: "ADD_IMAGE_URL"; payload: string };

type UserContextType = {
  user: User | null;
  dispatch: (action: ActionType) => void;
  handleSignIn: (username: string, password: string) => void;
  updateUser: (partialUser: Partial<User>) => void;
  createUser: (username: string, password: string) => Promise<User | null>;
};

const initialState: User | null = {
  id: 0,
  username: "",
  password: "",
  points: 0,
  memberSince: "",
  isLoggedIn: false,
  trashList: [],
  animalImageUrl: animalImages[0].imageURL,
  isNightMode: false,
};

async function signInAsync(
  username: string,
  password: string
): Promise<User | null> {
  try {
    const user: User = await fetchLogInUser(username, password);
    const signedInUser = { ...user, isLoggedIn: true };
    return signedInUser;
  } catch (error) {
    console.error("An error occurred during sign in:", error);
    return null;
  }
}

async function createAccountAsync(user: User): Promise<User | null> {
  try {
    const createdUser = await fetchCreateUserReal(user);
    if (createdUser != null) {
      return createdUser;
    }
    return null;
  } catch (error) {
    console.error("An error occurred during sign in:", error);
    return null;
  }
}

function userReducer(state: User | null, action: ActionType): User | null {
  switch (action.type) {
    case "SET_USER":
      return action.payload
        ? { ...action.payload, isLoggedIn: true }
        : initialState;
    case "UPDATE_USER":
      return state ? { ...state, ...action.payload } : null;
    case "CREATE_USER":
      return state ? { ...state, ...action.payload } : null;
    case "ADD_TRASH":
      if (state) {
        const updatedTrashList = [...state.trashList, action.payload];
        const totalPoints = updatedTrashList.reduce(
          (acc, trash) => acc + trash.point,
          0
        );
        const updatedUser = {
          ...state,
          trashList: updatedTrashList,
          points: totalPoints,
        };
        return updatedUser;
      } else {
        return null;
      }
    case "SIGN_OUT":
      return state ? { ...state, isLoggedIn: false } : null;
    case "ADD_IMAGE_URL":
      return state ? { ...state, animalImageUrl: action.payload } : null;
    default:
      return state;
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(userReducer, initialState);

  const handleSignIn = async (username: string, password: string) => {
    console.log("handlesign in anropas");
    const result = await signInAsync(username, password);
    console.log("result from login:", result);
    dispatch({ type: "SET_USER", payload: result });
    console.log(user);
  };

  const updateUser = (partialUser: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: partialUser });
  };

  const createUser = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const newUser: User = {
      id: 5,
      username: username,
      password: password,
      points: 0,
      memberSince: new Date().toISOString(),
      isLoggedIn: false,
      trashList: [],
      animalImageUrl: "https://i.imgur.com/Xafd1eE.jpg",
      isNightMode: false,
    };
    const result = await createAccountAsync(newUser);
    console.log("result from create:", result);
    dispatch({ type: "CREATE_USER", payload: result });
    console.log(user);
    return result;
  };

  return (
    <UserContext.Provider
      value={{ user, dispatch, handleSignIn, updateUser, createUser }}
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
