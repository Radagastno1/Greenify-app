import { ReactNode, createContext, useContext, useState } from "react";

export type Camera = {
  uri: string;
};

type CameraContextType = {
  camera: Camera | null;
  setCamera: (camera: Camera | null) => void;
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [camera, setCamera] = useState<Camera | null>(null);

  return (
    <CameraContext.Provider value={{ camera, setCamera }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCameraContext(): CameraContextType {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error(
      "To use CameraContext, you must place it inside CameraProvider."
    );
  }
  return context;
}
