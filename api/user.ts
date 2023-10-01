import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

async function getJwtToken() {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    console.log("token som hämtas från async storage:", token);
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
    const success = await fetchLogInUser(username, password);
    if (!success) {
      return null;
    }
    const user: User | null = await authenticatedFetch(
      "http://192.168.50.201:5072/users",
      "GET"
    );
    if (user) {
      return user;
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
      const token = data?.token || "";
      AsyncStorage.setItem("jwtToken", token);
      console.log("jwt token satt i async storage , ", token);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

// url: tex 129....:5072/...   och method: tex GET eller POST   data : tex user
//så dennna ska jag använda med allt som har med useer att göra så att jwt tokenen följer med
async function authenticatedFetch(url: string, method: string, data = null) {
  const token = await getJwtToken();
  if (!token) {
    console.log("token saknas vid authentiacted fetch");
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestOptions = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Nätverksfel - ${response.status}`);
  }

  const user: User | null = await response.json();
  return user;
}

//MÅSTE GÖRA DENNA MED AUTHENTICATE FETCH ISTÄLLET
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
