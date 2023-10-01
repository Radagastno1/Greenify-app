import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getJwtToken() {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    return token;
  } catch (error) {
    console.error("Error getting JWT token:", error);
    throw error;
  }
}

export async function signInAsync(
  username: string,
  password: string
): Promise<User | null> {
  try {
    const user: User = await fetchLogInUser(username, password);
    const signedInUser = { ...user, isLoggedIn: true };
    return signedInUser;
  } catch (error) {
    console.error("An error occurred during sign in:", error);
    return null;
  }
}

export async function createAccountAsync(user: User): Promise<User | null> {
  try {
    const createdUser = await fetchCreateUserReal(user);
    if (createdUser != null) {
      return createdUser;
    }
    return null;
  } catch (error) {
    console.error("An error occurred during sign in:", error);
    return null;
  }
}

function fetchLogInUser(username: string, password: string) {
  const apiUrl = "http://192.168.50.201:5072/users/login";
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
    .then((data) => {
      AsyncStorage.setItem("jwtToken", data.Token);
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// url: tex 129....:5072/...   och method: tex GET eller POST   data : tex user
//så dennna ska jag använda med allt som har med useer att göra så att jwt tokenen följer med
async function authenticatedFetch(url: string, method: string, data = null) {
  const token = await getJwtToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestOptions = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions);
}

// function fetchLogInUser(username: string, password: string) {
//   const apiUrl = "http://192.168.50.201:5072/users/login";
//   const schoolApiUrl = "http://10.23.14.178:5072/users/login";
//   const libraryApiUrl = "http://10.27.213.130:5072/users/login";
//   const notHomeApiUrl = "http://192.168.1.211:5072/users/login";
//   const denthuApiUrl = "http://192.168.1.213:5072/users/login";
//   const requestBody = {
//     username,
//     password,
//   };

//   return fetch(apiUrl, {
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

export function fetchGetUser(id: number) {
  const apiUrl = `http://192.168.50.201:5072/users/${id}`;
  const schoolApiUrl = "http://10.23.14.178:5072/users";
  const libraryApiUrl = "http://10.27.213.130:5072/users";
  const notHomeApiUrl = "http://192.168.1.211:5072/users";
  const denthuApiUrl = `http://192.168.1.213:5072/users/${id}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response:", response);
      if (!response.ok) {
        throw new Error(`Nätverksfel get user by id- ${response.status}`);
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

function fetchCreateUserReal(user: User) {
  const apiUrl = "http://192.168.50.201:5072/users/create";
  const schoolApiUrl = "http://10.23.14.178:5072/users";
  const libraryApiUrl = "http://10.27.213.130:5072/users";
  const notHomeApiUrl = "http://192.168.1.211:5072/users";
  const denthuApiUrl = "http://192.168.1.213:5072/users/create";
  const requestBody = {
    user,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<User>;
    })
    .then((userCreated) => {
      console.log("user created:", userCreated);
    })
    .catch((error) => {
      console.error("error creating user:", error);
    });
}

export function fetchEditUser(user: User, id: number) {
  const notHomeApiUrl = `http://192.168.1.211:5072/users/${id}`;
  const denthuApiUrl = `http://192.168.1.213:5072/users/${id}`;
  const apiUrl = `http://192.168.50.201:5072/users/${id}`;

  const requestBody = { ...user, id };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      console.log("requestbody: ", requestBody);
      console.log("response when updating:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<User>;
    })
    .then((userUpdated) => {
      return userUpdated as User;
    })
    .catch((error) => {
      console.error("error updating user:", error);
    });
}
