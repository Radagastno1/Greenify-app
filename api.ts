import fetch from "cross-fetch";
import { User } from "./Contexts/UserContext";
import { FactsModel } from "./FactsModel";

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
      // Här får du användarobjektet från API-svaret
      console.log(user);
      return user as User;
    })
    .catch((error) => {
      // Hantera fel här
      console.error(error);
      throw error;
    });
}
