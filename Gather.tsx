import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
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
              marginBottom: 20,
            }}
            placeholder="Select material (e.g., plastic, paper)"
          />
          <CustomButton
            title="Done"
            onPress={() => {
              console.log("Knappen klickades!");
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
});
