import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { fetchCreateGarbage, fetchGetGarbage } from "../api/garbage";
import { Garbage } from "../types";
import { useUserContext } from "./UserContext";

const getPoint = (material: string) => {
  if (
    material?.toLowerCase() == "plast" ||
    material?.toLowerCase() == "plastic"
  ) {
    return 100;
  } else if (material?.toLowerCase() == "glas") {
    return 1000000;
  } else if (material?.toLowerCase() === "fimp") {
    return 100;
  } else if (
    material?.toLowerCase() == "pet" ||
    material?.toLowerCase() == "pet-flaska" ||
    material?.toLowerCase() == "plastflaska"
  ) {
    return 100;
  } else if (material?.toLowerCase() == "aluminium") {
    return 500;
  }
  return 0;
};

export type ActionType =
  | { type: "SET_GARBAGE"; payload: Garbage[] }
  | { type: "ADD_GARBAGE"; payload: Garbage }
  | { type: "GET_GARBAGE"; payload: Garbage[] };

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
          points: getPoint(material),
        };

        await fetchCreateGarbage(newGarbage);
        // dispatch({ type: "ADD_GARBAGE", payload: result });
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

  function calculateTotalPoints() {
    // const { user } = useUserContext();
    const totalPoints = garbage.reduce((totalPoints, garbageItem) => {
      return totalPoints + garbageItem.points;
    }, 0);
    // if (user) {
    //   user.points = totalPoints;
    // }
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
