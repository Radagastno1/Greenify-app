import { MaterialInfo } from "../types";
import Constants from "expo-constants";

export async function fetchDataByMaterial(
  material: string
): Promise<MaterialInfo> {
  //Constants.expoConfig.releaseChannel sätt strängen till tex production och beroende så anslut till lokala eller lanserade api
  const hostUri = Constants?.expoConfig?.hostUri;

  let uri = "";

  if (hostUri) {
    const parts = hostUri.split(":");
    if (parts.length >= 2) {
      uri = `http://${parts[0]}:5241`;
      console.log("uri är: " + uri);
    } else {
      console.warn("Invalid hostUri format. Using default URI.");
    }
  }

  uri = `${uri}/api/facts/${material}`;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(uri, {
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
