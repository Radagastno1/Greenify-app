import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { fetchCreateGarbage, fetchGetGarbage } from "../api/garbage";
import { Garbage } from "../types";
import { useUserContext } from "./UserContext";

export type ActionType =
  | { type: "SET_GARBAGE"; payload: Garbage[] }
  | { type: "ADD_GARBAGE"; payload: Garbage }
  | { type: "GET_GARBAGE"; payload: Garbage[] };

type GarbageContextType = {
  garbage: Garbage[];
  dispatch: (action: ActionType) => void;
  addGarbage: (garbage: Garbage) => Promise<void>;
  getGarbage: (id: number) => Promise<void>;
};

const initialState: Garbage[] = [];

function garbageReducer(state: Garbage[], action: ActionType): Garbage[] {
  switch (action.type) {
    case "SET_GARBAGE":
      return action.payload;
    case "ADD_GARBAGE":
      return [...state, action.payload];
    case "GET_GARBAGE":
      return action.payload;
    default:
      return state;
  }
}

const GarbageContext = createContext<GarbageContextType | undefined>(undefined);

export function GarbageProvider({ children }: { children: ReactNode }) {
  const { user } = useUserContext();
  const [garbage, dispatch] = useReducer(garbageReducer, initialState);

  const addGarbage = async (garbage: Garbage) => {
    try {
      const result = await fetchCreateGarbage(garbage);
      dispatch({ type: "ADD_GARBAGE", payload: result });
    } catch (error) {
      console.error("Det uppstod ett fel när du lade till skräp:", error);
    }
  };

  const getGarbage = async (id: number) => {
    if (user?.id === id) {
      try {
        const result = await fetchGetGarbage(id);
        dispatch({ type: "SET_GARBAGE", payload: result });
      } catch (error) {
        console.error("Det uppstod ett fel när du hämtade skräp:", error);
      }
    }
  };

  return (
    <GarbageContext.Provider
      value={{ garbage, dispatch, addGarbage, getGarbage }}
    >
      {children}
    </GarbageContext.Provider>
  );
}

export function useGarbageContext(): GarbageContextType {
  const context = useContext(GarbageContext);
  if (!context) {
    throw new Error(
      "To use GarbageContext, you must place it inside GarbageProvider."
    );
  }
  return context;
}
