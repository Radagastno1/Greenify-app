import { ReactNode, createContext, useContext, useState } from "react";

export type Location = {
  longitude: number | undefined;
  latitude: number | undefined;
};

export type Trash = {
  id: number;
  url: string;
  material: string;
  location: Location;
};

type TrashContextType = {
  trash: Trash | null;
  setTrash: (trash: Trash | null) => void;
};

const TrashContext = createContext<TrashContextType | undefined>(undefined);

export function TrashProvider({ children }: { children: ReactNode }) {
  const [trash, setTrash] = useState<Trash | null>(null);

  return (
    <TrashContext.Provider value={{ trash: trash, setTrash: setTrash }}>
      {children}
    </TrashContext.Provider>
  );
}

export function useTrashContext(): TrashContextType {
  const context = useContext(TrashContext);
  if (!context) {
    throw new Error(
      "To use TrashContext, you must place it inside TrashProvider."
    );
  }
  return context;
}
