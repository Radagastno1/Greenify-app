import React from "react";
import { GarbageProvider } from "./Contexts/GarbageContext";
import { LocationProvider } from "./Contexts/LocationContex";
import { UserProvider } from "./Contexts/UserContext";
import Navigator from "./Navigator";

export default function App() {
  return (
    <UserProvider>
      <GarbageProvider>
        <LocationProvider>
          <Navigator />
        </LocationProvider>
      </GarbageProvider>
    </UserProvider>
  );
}

// DATABASE
// interface UserTable {
//   id: number; // PK
//   name: string;
// }

// interface GarbageTable {
//   id: number; // PK
//   userId: number; // FK (UserTable)
// }

// // SQL JOIN QUERY --> UserDTO
// // SELECT * FROM UserTable
// // INNER JOIN GarbageTable
// // ON UserTable.id = GarbageTable.userId

// // SERVER
// interface UserDTO {
//   id: number;
//   name: string;
//   garbage: GarbageDTO[];
// }

// // UserDTO --> Appen
