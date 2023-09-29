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
import { useGarbageContext } from "../Contexts/GarbageContext";
import { useLocationContext } from "../Contexts/LocationContex";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";
import { Garbage } from "../types";
import LocationScreen from "./Location";

type Props = NativeStackScreenProps<RootStackParamList, "Gather">;

export default function Gather({ navigation }: Props) {
  const { camera } = useCameraContext();
  const [imageUri, setImageUri] = useState<string | null>(camera?.uri || null);
  const [material, setMaterial] = useState<string>("");
  const { location } = useLocationContext();
  const { user } = useUserContext();
  const { addGarbage } = useGarbageContext();

  useEffect(() => {
    if (camera?.uri) {
      setImageUri(camera.uri);
    }
    console.log(user);
  }, [camera?.uri]);

  const handleSaveTrash = async () => {

    if (user?.id && location && imageUri) {
      await addGarbage(imageUri, material, location.latitude, location.longitude);

      navigation.navigate("Profile");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
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

        <View style={styles.contentContainer}>
          {imageUri ? (
            <View style={styles.imageInputContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: imageUri || "default_image_uri",
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Plast/Glas/Fimp..."
                onChangeText={(text) => setMaterial(text)}
                value={material || ""}
              />
            </View>
          ) : null}

          {imageUri ? (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Done"
                onPress={handleSaveTrash}
                color="rgba(79,44,84,255)"
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 0,
    alignItems: "center",
    flexDirection: "column",
  },
  cameraButton: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    backgroundColor: "rgb(164,116,156)",
    borderRadius: 50,
    padding: 20,
    borderWidth: 5,
    borderColor: "rgba(79,44,84,255)",
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "70%",
    width: "100%",
  },
  imageInputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: "rgba(79,44,84,255)",
    borderWidth: 2,
  },
  input: {
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "white",
    color: "black",
    flex: 1,
    fontSize: 24,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    bottom: 0,
  },
});
