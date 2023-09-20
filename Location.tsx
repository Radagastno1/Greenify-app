import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapViewScreen from "./MapView";

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Platsåtkomststatus:", status);
    if (status !== "granted") {
      return;
    }
    console.log("Före hämtning av plats");
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location as Location.LocationObject);
      console.log("location:", location);
    } catch (error) {
      console.error("Fel vid hämtning av plats:", error);
    }
    console.log("Efter hämtning av plats");
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapViewScreen
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      ) : (
        <Text style={styles.paragraph}>
          Platsinformation är ej tillgänglig.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
