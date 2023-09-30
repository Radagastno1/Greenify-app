import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { animalImages } from "../animalImages";
import {
  createAccountAsync,
  fetchEditUser,
  fetchGetUser,
  signInAsync,
} from "../api/user";
import { User } from "../types";

export type ActionType =
  | { type: "SET_USER"; payload: User | null }
  // | { type: "GET_USER"; payload: User | null }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "CREATE_USER"; payload: User | null }
  | { type: "SIGN_IN"; payload: { username: string; password: string } }
  | { type: "SIGN_OUT" }
  | { type: "ADD_IMAGE_URL"; payload: string };

type UserContextType = {
  user: User | null;
  dispatch: (action: ActionType) => void;
  handleSignIn: (username: string, password: string) => void;
  updateUser: () => void;
  createUser: (username: string, password: string) => Promise<User | null>;
  getUser: () => Promise<void>;
};

const initialState: User | null = {
  id: 0,
  username: "",
  password: "",
  points: 0,
  memberSince: "",
  isLoggedIn: false,
  animalImageUrl: animalImages[0].imageURL,
  isNightMode: false,
  level: 0,
};

function userReducer(state: User | null, action: ActionType): User | null {
  switch (action.type) {
    case "SET_USER":
      return action.payload
        ? {
            ...action.payload,
            isLoggedIn: true,
          }
        : initialState;
    //   case "GET_USER":
    //  return state ? { ...state, ...action.payload } : null;
    case "UPDATE_USER":
      return state ? { ...state, ...action.payload } : null;
    case "CREATE_USER":
      return state ? { ...state, ...action.payload } : null;
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

  const updateUser = async () => {
    if (user) {
      try {
        const result = await fetchEditUser(user, user.id);
        if (result) {
          dispatch({ type: "UPDATE_USER", payload: result });
        }
      } catch (error) {
        console.error("Fel vid uppdatering av användaren:", error);
      }
    }
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
      animalImageUrl: "https://i.imgur.com/Xafd1eE.jpg",
      isNightMode: false,
      level: 0,
    };
    const result = await createAccountAsync(newUser);
    console.log("result from create:", result);
    dispatch({ type: "CREATE_USER", payload: result });
    console.log(user);
    return result;
  };

  const getUser = async () => {
    if (user?.id) {
      console.log("userns id i getuseer:", user.id);
      const result = await fetchGetUser(user.id);
      dispatch({ type: "SET_USER", payload: result });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, dispatch, handleSignIn, updateUser, createUser, getUser }}
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
