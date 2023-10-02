import { MaterialInfo } from "../types";

// export function fetchDataByMaterial(material: string): Promise<MaterialInfo> {
//   const apiUrl = `http://localhost:5241/api/facts/${material}`;
//   console.log("urlen som anänds: ", apiUrl);

//   return fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       console.log("response:", response);
//       if (!response.ok) {
//         throw new Error(`Nätverksfel get material - ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((materialInfo) => {
//       console.log("material: ", materialInfo);
//       return materialInfo as MaterialInfo;
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// }

export async function fetchDataByMaterial(
  material: string
): Promise<MaterialInfo> {
  const apiUrl = `http://192.168.50.201:5241/api/facts/${material}`;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = (await response.json()) as MaterialInfo;
    console.log(result);
    return result;
  } catch (error) {
    console.error("error getting materialinfo:", error);
    throw error;
  }
}
