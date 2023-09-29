import { ReactNode, createContext, useContext, useState } from "react";

type LocationContextType = {
  location: { latitude: number; longitude: number } | null;
  setLocation: (
    location: { latitude: number; longitude: number } | null
  ) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
