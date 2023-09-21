import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTrashContext } from "../Contexts/TrashContext";

interface Props {
  latitude: number | undefined;
  longitude: number | undefined;
}

export default function MapViewScreen({ latitude, longitude }: Props) {
  const [isMapReady, setMapReady] = useState(false);
  const { setTrash } = useTrashContext();
  const [nextId, setNextId] = useState(1);

  const onMapLayout = () => {
    setMapReady(true);

    const newTrash = {
      id: nextId,
      location: { latitude, longitude },
    };

    //här ska väl inte id sättas
    setNextId(nextId + 1);

    setTrash(newTrash);
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
