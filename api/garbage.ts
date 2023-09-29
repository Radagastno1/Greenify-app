import { Garbage } from "../types";

export async function fetchCreateGarbage(garbage: Garbage): Promise<Garbage> {
  const apiUrl = "http://192.168.50.201:5072/garbage";
  const schoolApiUrl = "http://10.23.14.178:5072/garbage";
  const libraryApiUrl = "http://10.27.213.130:5072/garbage";
  const notHomeApiUrl = "http://192.168.1.211:5072/garbage";
  const requestBody = {
    garbage,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(notHomeApiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(garbage),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = (await response.json()) as Garbage;
    return result;
  } catch (error) {
    console.error("error creating garbage:", error);
    throw error; // Kasta felet vidare
  }
}

export async function fetchGetGarbage(id: number): Promise<Garbage[]> {
  const apiUrl = `http://192.168.50.201:5072/garbage/${id}`;
  const schoolApiUrl = `http://10.23.14.178:5072/garbage/${id}`;
  const libraryApiUrl = `http://10.27.213.130:5072/garbage/${id}`;
  const notHomeApiUrl = `http://192.168.1.211:5072/garbage/${id}`;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(notHomeApiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = (await response.json()) as Garbage[];
    return result;
  } catch (error) {
    console.error("error getting garbage:", error);
    throw error; // Kasta felet vidare
  }
}
