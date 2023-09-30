import { MaterialInfo } from "../types";

export function fetchDataByMaterial(material: string): Promise<MaterialInfo> {
  const apiUrl = `http://localhost:5241/api/facts/${material}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response:", response);
      if (!response.ok) {
        throw new Error(`Nätverksfel get material - ${response.status}`);
      }
      return response.json();
    })
    .then((materialInfo) => {
      console.log("material: ", materialInfo);
      return materialInfo as MaterialInfo;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
