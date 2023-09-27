import fetch from "cross-fetch";
import { FactsModel } from "./FactsModel";
import { User } from "./types";

export function fetchDataByMaterial(material: string) {
  const apiUrl = `http://ec2-16-16-24-47.eu-north-1.compute.amazonaws.com/api/facts/${material.toLowerCase()}`;

  return fetch(apiUrl)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log(response);
        throw new Error(`Nätverksfel - ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data as FactsModel;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchLogInUser(username: string, password: string) {
  const apiUrl = "http://192.168.50.201:5072/users/login";
  const schoolApiUrl = "http://10.23.14.178:5072/users/login";
  const libraryApiUrl = "http://10.27.213.130:5072/users/login";
  const notHomeApiUrl = "http://192.168.1.211:5072/users/login";
  const requestBody = {
    username,
    password,
  };

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      console.log("response:", response);
      if (!response.ok) {
        throw new Error(`Nätverksfel - ${response.status}`);
      }
      return response.json();
    })
    .then((user) => {
      console.log(user);
      return user as User;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchCreateUserReal(user: User) {
  const apiUrl = "http://192.168.50.201:5072/users/create";
  const schoolApiUrl = "http://10.23.14.178:5072/users";
  const libraryApiUrl = "http://10.27.213.130:5072/users";
  const notHomeApiUrl = "http://192.168.1.211:5072/users";
  const requestBody = {
    user,
  };

  const headers = {
    "Content-Type": "application/json", // Set the content type to JSON
    // Add other headers here if required
  };

  return fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(user), // Convert the user object to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<User>; // Parse the response JSON
    })
    .then((userCreated) => {
      // Handle the user creation success
      console.log("User created:", userCreated);
      // Perform any additional actions as needed
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      // Perform error handling and display appropriate messages to the user
    });
}
// export function fetchCreateUser(user: User) {
//   const apiUrl = "http://192.168.50.201:5072/users";
//   const schoolApiUrl = "http://10.23.14.178:5072/users";
//   const libraryApiUrl = "http://10.27.213.130:5072/users";
//   const elinasApiUrl = "http://192.168.1.211:5072/users";
//   const requestBody = {
//     user,
//   };

//   return fetch(libraryApiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(requestBody),
//   })
//     .then((response) => {
//       console.log("response:", response);
//       if (!response.ok) {
//         throw new Error(`Nätverksfel - ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((user) => {
//       console.log(user);
//       return user as User;
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// }
