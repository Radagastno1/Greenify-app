import Constants from "expo-constants";
import { Garbage } from "../types";

const isProduction = !__DEV__;
let uri = "";

if (isProduction) {
  uri = "http://35.173.198.228/garbage";
} else {
  const hostUri = Constants?.expoConfig?.hostUri;
  if (hostUri) {
    const parts = hostUri.split(":");
    if (parts.length >= 2) {
      uri = `http://${parts[0]}:80/garbage`;
      console.log("uri är: " + uri);
    } else {
      console.warn("Invalid hostUri format. Using default URI.");
    }
  }
}

export async function fetchCreateGarbage(garbage: Garbage): Promise<Garbage> {
  const createGarbageUri = uri + "/create";
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(garbage),
    };
    console.log("Request fot creating garbage:", JSON.stringify(requestInfo));
    const response = await fetch(createGarbageUri, requestInfo);

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

export async function fetchGetGarbage(userId: number): Promise<Garbage[]> {
  const getGarbageUri = uri + `/${userId}`;

  console.log("in i fetch get garbage med uri: ", getGarbageUri);

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(getGarbageUri, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = (await response.json()) as Garbage[];
    console.log("garbage som hämtas: ", result);
    return result;
  } catch (error) {
    console.error("error getting garbage:", error);
    throw error;
  }
}
