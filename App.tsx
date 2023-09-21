import React from "react";
import { TrashProvider } from "./Contexts/TrashContext";
import { UserProvider } from "./Contexts/UserContext";
import Navigator from "./Navigator";

export default function App() {
  return (
    <UserProvider>
      <TrashProvider>
        <Navigator />
      </TrashProvider>
    </UserProvider>
  );
}
