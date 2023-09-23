import fetch from "cross-fetch";
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
