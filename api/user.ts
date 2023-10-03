import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

const publicIpAdress = "http://35.173.198.228/users/";

export async function signInAsync(
  username: string,
  password: string
): Promise<User | null> {
  try {
    const user = await fetchLogInUser(username, password);
    if (!user) {
      return null;
    }
    if (user) {
      await AsyncStorage.setItem("userId", user.id.toString());
      console.log("user från login:", user.username);
      if (user) {
        return user;
      }
    }
    return null;
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
  //const apiUrl = "http://192.168.50.201:5072/users/login";
  // const schoolApiUrl = "http://10.235.104.118/:5072/users/login";
  //const libraryApi = "http://10.27.208.168:5072/users/login";
  const url = publicIpAdress + "login";
  const requestBody = {
    username,
    password,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      console.log("response:", JSON.stringify(response));
      if (!response.ok) {
        throw new Error(`Nätverksfel - ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data as User;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export const emptyAsyncStorage = async () => {
  await AsyncStorage.setItem("userId", "");
};

export async function fetchGetUser() {
  const userId = await AsyncStorage.getItem("userId");
  if (userId) {
    const userIdAsNumber = parseInt(userId);
  } else {
    return null;
  }
  //const apiUrl = `http://192.168.50.201:5072/users/${userId}`;
  // const schoolApiUrl = `http://10.235.104.118:5072/users/${id}`;
  //const libraryApiUrl = `http://10.27.208.168:5072/users/${parseInt(userId)}`;
  // const notHomeApiUrl = "http://192.168.1.211:5072/users";
  // const denthuApiUrl = `http://192.168.1.213:5072/users/${id}`;
  const url = publicIpAdress + `${parseInt(userId)}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response from get user:", JSON.stringify(response));
      // if (!response.ok) {
      //   throw new Error();
      // }
      return response.json();
    })
    .then((user) => {
      console.log(user);
      return user as User;
    })
    .catch((error) => {
      console.error(error);
      emptyAsyncStorage();
      return null;
    });
}

function fetchCreateUserReal(user: User) {
  //const apiUrl = "http://192.168.50.201:5072/users/create";
  // const schoolApiUrl = "http://10.23.14.178:5072/users/create";
  //const libraryApiUrl = "http://10.27.208.168:5072/users/create";
  // const notHomeApiUrl = "http://192.168.1.211:5072/users/create";
  // const denthuApiUrl = "http://192.168.1.213:5072/users/create";
  const url = publicIpAdress + "create";
  const requestBody = {
    user,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(url, {
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
  // const notHomeApiUrl = `http://192.168.1.211:5072/users/${id}`;
  // const denthuApiUrl = `http://192.168.1.213:5072/users/${id}`;
  //const apiUrl = `http://192.168.50.201:5072/users/${id}`;
  //const libraryUrl = `http://10.27.208.168:5072/users/${id}`;
  const url = publicIpAdress + `${id}`;

  const requestBody = { ...user, id };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(url, {
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
