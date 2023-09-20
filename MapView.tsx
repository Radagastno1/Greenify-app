import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  latitude: number | undefined;
  longitude: number | undefined;
}

export default function MapViewScreen({ latitude, longitude }: Props) {
  const [isMapReady, setMapReady] = useState(false);

  const onMapLayout = () => {
    setMapReady(true);
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude ?? 0,
          longitude: longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLayout={onMapLayout}
      >
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: latitude ?? 0,
              longitude: longitude ?? 0,
            }}
            title="Your Location"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});
