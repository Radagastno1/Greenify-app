import { MaterialInfo } from "../types";

const yourIpv4AdressHere = "";

const myIpv4AdressHere = "http://192.168.50.201:";

export async function fetchDataByMaterial(
  material: string
): Promise<MaterialInfo> {
  const url = myIpv4AdressHere + `5241/api/facts/${material}`;
  //const libraryApi = `http://10.27.208.168:5241/api/facts/${material}`;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
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
