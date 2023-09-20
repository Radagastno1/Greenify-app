import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LocationScreen from "./Location";

export default function Gather() {
  return (
    <View style={styles.container}>
      <LocationScreen />
      <TouchableOpacity style={styles.cameraButton}>
        <FontAwesome name="camera" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  cameraButton: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
  },
});
