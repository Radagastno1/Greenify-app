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
import { useTrashContext } from "../Contexts/TrashContext";
import { RootStackParamList } from "../Navigator";
import LocationScreen from "./Location";

type Props = NativeStackScreenProps<RootStackParamList, "Gather">;

export default function Gather({ navigation }: Props) {
  const { camera } = useCameraContext();
  const [imageUri, setImageUri] = useState<string | null>(camera?.uri || null);
  const [material, setMaterial] = useState<string | null>(null);
  const { trash, setTrash } = useTrashContext();

  useEffect(() => {
    if (camera?.uri) {
      setImageUri(camera.uri);
    }
  }, [camera?.uri]);

  const handleSaveTrash = () => {
    setTrash({
      ...trash,
      url: imageUri ?? "okänt",
      material: material ?? "okänt",
    });
    navigation.navigate("Profile");
  };

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
            size={30}
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
            placeholder="Select material (e.g., plastic, paper)"
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

        <CustomButton title="Done" onPress={handleSaveTrash} />
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
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
  },
  inputContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  image: {
    height: 80,
    width: 80,
    marginVertical: 20,
  },
});
