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
