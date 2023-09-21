import React from "react";
import { LocationProvider } from "./Contexts/LocationContex";
import { UserProvider } from "./Contexts/UserContext";
import Navigator from "./Navigator";

export default function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <Navigator />
      </LocationProvider>
    </UserProvider>
  );
}
