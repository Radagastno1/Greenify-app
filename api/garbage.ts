import { Garbage } from "../types";

// export async function fetchCreateGarbage(garbage: Garbage): Promise<Garbage> {
//   const apiUrl = "http://192.168.50.201:5072/garbage/create";
//   const schoolApiUrl = "http://10.23.14.178:5072/garbage/create";
//   const libraryApiUrl = "http://10.27.213.130:5072/garbage/create";
//   const notHomeApiUrl = "http://192.168.1.211:5072/garbage/create";
//   const requestBody = {
//     garbage,
//   };

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await fetch(notHomeApiUrl, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(garbage),
//     });
//     console.log("response from create garbage fetch:", response);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const result = (await response.json()) as Garbage;
//     return result;
//   } catch (error) {
//     console.error("error creating garbage:", error);
//     throw error; // Kasta felet vidare
//   }
// }

export async function fetchCreateGarbage(garbage: Garbage): Promise<Garbage> {
  const notHomeApiUrl = "http://192.168.1.211:5072/garbage/create";
  const apiUrl = `http://192.168.50.201:5072/garbage/create`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const requestInfo = {
      method: "POST",
      url: apiUrl,
      headers: headers,
      body: JSON.stringify(garbage),
    };
    console.log("Request:", requestInfo); // Logga hela anropet innan begäran
    const response = await fetch(apiUrl, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const garbageCreated = (await response.json()) as Garbage;
    console.log("garbage created:", garbageCreated);
    return garbageCreated;
  } catch (error) {
    console.error("error creating garbage:", error);
    throw error; // Kasta felet vidare
  }
}

// export async function fetchGetGarbage(id: number): Promise<Garbage[]> {
//   const apiUrl = `http://192.168.50.201:5072/garbage/${id}`;
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers,
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const result = (await response.json()) as Garbage[] | [];

//     const garbageObjects = result.map((jsonItem) => {
//       console.log("ETTT JSON ITEMS MATERIAL:", jsonItem.material);
//       return new Garbage(
//         jsonItem.id,
//         jsonItem.userId,
//         jsonItem.url,
//         jsonItem.material,
//         jsonItem.latitude,
//         jsonItem.longitude,
//         jsonItem.date,
//         jsonItem.points
//       );
//     });
//     console.log("garbageobjects: ", garbageObjects);
//     return garbageObjects;
//   } catch (error) {
//     console.error("error getting garbage:", error);
//     throw error;
//   }
// }

export async function fetchGetGarbage(id: number): Promise<Garbage[]> {
  const apiUrl = `http://192.168.50.201:5072/garbage/${id}`;
  const schoolApiUrl = `http://10.23.14.178:5072/garbage/${id}`;
  const libraryApiUrl = `http://10.27.213.130:5072/garbage/${id}`;
  const notHomeApiUrl = `http://192.168.1.211:5072/garbage/${id}`;

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

    const result = (await response.json()) as Garbage[];
    console.log(result);
    return result;
  } catch (error) {
    console.error("error getting garbage:", error);
    throw error; // Kasta felet vidare
  }
}