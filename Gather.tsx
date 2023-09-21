import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import LocationScreen from "./Location";

export default function Gather() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LocationScreen />

        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome name="camera" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={{
              height: 60,
              borderColor: "gray",
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
            placeholder="Select material (e.g., plastic, paper)"
          />
        </View>

        <Image
          style={styles.image}
          source={{
            uri: "https://cdn.abicart.com/shop/ws25/110325/art25/h9589/180459589-origpic-130a2e.jpg",
          }}
        />

        <CustomButton
          title="Done"
          onPress={() => {
            console.log("Knappen klickades!");
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cameraButton: {
    position: "absolute",
    top: 275,
    alignSelf: "center",
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
  },
  inputContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  image: {
    height: 100,
    width: 100,
    marginVertical: 20,
  },
});
