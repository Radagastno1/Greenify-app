import { Garbage } from "../types";

const publicIpAdress = "http://35.173.198.228/garbage/";

export async function fetchCreateGarbage(garbage: Garbage): Promise<Garbage> {
  //const apiUrl = `http://192.168.50.201:5072/garbage/create`;
  // const notHomeApiUrl = "http://192.168.1.211:5072/garbage/create";
  // const denthuApiUrl = `http://192.168.1.213:5072/garbage/create`;
  //const libraryUrl = `http://10.27.208.168:5072/garbage/create`;
  const url = publicIpAdress + "create";
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(garbage),
    };
    console.log("Request:", JSON.stringify(requestInfo));
    const response = await fetch(url, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const garbageCreated = (await response.json()) as Garbage;
    console.log("garbage created:", garbageCreated);
    return garbageCreated;
  } catch (error) {
    console.error("error creating garbage:", error);
    throw error;
  }
}

export async function fetchGetGarbage(id: number): Promise<Garbage[]> {
  //const apiUrl = `http://192.168.50.201:5072/garbage/${id}`;
  // const schoolApiUrl = `http://10.23.14.178:5072/garbage/${id}`;
  //const libraryApiUrl = `http://10.27.208.168:5072/garbage/${id}`;
  // const notHomeApiUrl = `http://192.168.1.211:5072/garbage/${id}`;
  // const denthuApiUrl = `http://192.168.1.213:5072/garbage/${id}`;
  const url = publicIpAdress + `${id}`;

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

    const result = (await response.json()) as Garbage[];
    console.log(result);
    return result;
  } catch (error) {
    console.error("error getting garbage:", error);
    throw error;
  }
}
