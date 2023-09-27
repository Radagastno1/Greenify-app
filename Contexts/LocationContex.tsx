import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "../types";

type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location | null) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <LocationContext.Provider
      value={{ location: location, setLocation: setLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "To use TrashContext, you must place it inside TrashProvider."
    );
  }
  return context;
}
