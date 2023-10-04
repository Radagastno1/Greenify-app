import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import Constants from "expo-constants";

//vet ej om detta är korrekt sätt att se om produktion eller ej
const isProduction = !__DEV__;
let uri = "";

if (isProduction) {
  //då är det den offentliga ipadressen om det är produktion då
  uri = "http://35.173.198.228/users/";
} else {
  //annars används ipadressen då för att prata med den lokala
  const hostUri = Constants?.expoConfig?.hostUri;
  if (hostUri) {
    const parts = hostUri.split(":");
    if (parts.length >= 2) {
      uri = `http://${parts[0]}:80/users`;
      console.log("uri är: " + uri);
    } else {
      console.warn("Invalid hostUri format. Using default URI.");
    }
  }
}

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
  const logInUserUri = uri + "/login";
  const requestBody = {
    username,
    password,
  };

  return fetch(logInUserUri, {
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
  const getUserByIdUri = uri + `/${parseInt(userId)}`;

  return fetch(getUserByIdUri, {
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
  const createUserUri = uri + "/create";
  const requestBody = {
    user,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(createUserUri, {
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
  const editUserUri = uri + `/${id}`;

  const requestBody = { ...user, id };

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(editUserUri, {
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
