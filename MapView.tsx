import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  latitude: number;
  longitude: number;
}

export default function MapViewScreen({ latitude, longitude }: Props) {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="Your Location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
  },
});
