import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { fetchCreateGarbage, fetchGetGarbage } from "../api/garbage";
import { Garbage, MaterialInfo } from "../types";
import { useUserContext } from "./UserContext";
import { fetchDataByMaterial } from "../api/material";

export type ActionType =
  | { type: "SET_GARBAGE"; payload: Garbage[] }
  | { type: "ADD_GARBAGE"; payload: Garbage }
  | { type: "GET_GARBAGE"; payload: Garbage[] }
  | { type: "GET_MATERIALINFO"; payload: MaterialInfo };

type GarbageContextType = {
  garbage: Garbage[];
  dispatch: (action: ActionType) => void;
  addGarbage: (
    url: string,
    material: string,
    latitude: number,
    longitude: number
  ) => Promise<void>;
  getGarbage: () => Promise<Garbage[]>;
  calculateTotalPoints: () => number;
  getMaterialInfo: (material: string) => Promise<MaterialInfo | undefined>;
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

  const addGarbage = async (
    url: string,
    material: string,
    latitude: number,
    longitude: number
  ) => {
    const currentDate = new Date();

    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    try {
      if (user) {
        const newGarbage: Garbage = {
          id: 0,
          userId: user?.id,
          url: url,
          material: material,
          latitude: latitude,
          longitude: longitude,
          date: formattedDate,
          points: 0,
        };

        await fetchCreateGarbage(newGarbage);
      }
    } catch (error) {
      console.error("Det uppstod ett fel när du lade till skräp:", error);
    }
  };

  const getGarbage = async (): Promise<Garbage[]> => {
    if (user) {
      try {
        const result = await fetchGetGarbage(user?.id);
        dispatch({ type: "SET_GARBAGE", payload: result });
        return result;
      } catch (error) {
        console.error("Det uppstod ett fel när du hämtade skräp:", error);
        throw error;
      }
    }
    return [];
  };

  const getMaterialInfo = async (
    material: string
  ): Promise<MaterialInfo | undefined> => {
    if (user) {
      try {
        const result = await fetchDataByMaterial(material);
        dispatch({ type: "GET_MATERIALINFO", payload: result });
        return result;
      } catch (error) {
        console.error(
          "Det uppstod ett fel när du hämtade info om material:",
          error
        );
        throw error;
      }
    }
    return undefined;
  };

  function calculateTotalPoints() {
    const totalPoints = garbage.reduce((totalPoints, garbageItem) => {
      return totalPoints + garbageItem.points;
    }, 0);

    return totalPoints;
  }

  return (
    <GarbageContext.Provider
      value={{
        garbage,
        dispatch,
        addGarbage,
        getGarbage,
        calculateTotalPoints,
        getMaterialInfo,
      }}
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
