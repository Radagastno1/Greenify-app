import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
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
import CustomButton from "../Components/CustomButton";
import { useCameraContext } from "../Contexts/CameraContext";
import { useLocationContext } from "../Contexts/LocationContex";
import { Trash, useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";
import LocationScreen from "./Location";

type Props = NativeStackScreenProps<RootStackParamList, "Gather">;

export default function Gather({ navigation }: Props) {
  const { camera } = useCameraContext();
  const [imageUri, setImageUri] = useState<string | null>(camera?.uri || null);
  const [material, setMaterial] = useState<string | null>(null);
  const { location } = useLocationContext();
  const { addTrash } = useUserContext();

  useEffect(() => {
    if (camera?.uri) {
      setImageUri(camera.uri);
    }
  }, [camera?.uri]);

  const getPoint = () => {
    if (
      material?.toLowerCase() == "plast" ||
      material?.toLowerCase() == "plastic"
    ) {
      return 100;
    } else if (material?.toLowerCase() == "glas") {
      return 1000000;
    } else if (material?.toLowerCase() === "fimp") {
      return 100;
    } else if (
      material?.toLowerCase() == "pet" ||
      material?.toLowerCase() == "pet-flaska" ||
      material?.toLowerCase() == "plastflaska"
    ) {
      return 100;
    } else if (material?.toLowerCase() == "aluminium") {
      return 500;
    }
    return 0;
  };

  const handleSaveTrash = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    const trash: Trash = {
      id: parseInt(Date.now().toString().slice(-4)),
      url: imageUri ?? "unknown",
      material: material ?? "unknown",
      location: location ?? { latitude: 0, longitude: 0 },
      date: formattedDate,
      point: getPoint(),
    };

    addTrash(trash);
    console.log(trash.point);
    navigation.navigate("Profile");
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true, // Gör navigationshuvudet transparent
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LocationScreen />

        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome
            name="camera"
            size={40}
            color="white"
            onPress={() => {
              navigation.navigate("CameraScreen");
            }}
          />
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
            placeholder="Material (plast, pet, glas, tuggummi...)"
            onChangeText={(text) => setMaterial(text)}
            value={material || ""}
          />
        </View>

        <Image
          style={styles.image}
          source={{
            uri: imageUri || "default_image_uri",
          }}
        />

        <CustomButton
          title="Done"
          onPress={handleSaveTrash}
          color={"rgba(154, 192, 153, 1)"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(154, 192, 153, 0.61)",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 5,
  },
  cameraButton: {
    position: "absolute",
    top: 355,
    alignSelf: "center",
    backgroundColor: "rgba(255, 173, 2, 1)",
    borderRadius: 50,
    padding: 20,
  },
  inputContainer: {
    flex: 2,
    paddingHorizontal: 5,
  },
  image: {
    height: 80,
    width: 80,
    marginVertical: 20,
  },
});
