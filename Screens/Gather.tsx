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
  const [buttonActive, setButtonActive] = useState(false);
  const { location } = useLocationContext();
  const { dispatch } = useUserContext();

  useEffect(() => {
    if (camera?.uri) {
      setImageUri(camera.uri);
    }
  }, [camera?.uri]);

  useEffect(() => {
    if (imageUri && material && location) {
      setButtonActive(true);
    }
    //kolla vad i dependency listan??
  }, []);

  //DETTA KAN GÅ BORT SEN NÄR APIET HAR EN ADDTRASH METOD om den ska det
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

    dispatch({ type: "ADD_TRASH", payload: trash });
    console.log(trash.point);
    navigation.navigate("Profile");
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

        {imageUri ? (
          <View>
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

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: imageUri || "default_image_uri",
                }}
              />
            </View>
          </View>
        ) : null}

        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomButton
            title="Done"
            onPress={handleSaveTrash}
            isDisabled={buttonActive}
            color="rgba(79,44,84,255)"
          />
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
  },
  cameraButton: {
    position: "absolute",
    top: 305,
    alignSelf: "center",
    backgroundColor: "rgb(53,182,96)",
    borderRadius: 50,
    padding: 20,
  },
  inputContainer: {
    flex: 1 / 3,
    padding: 5,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 10,
    borderColor: "rgba(154, 192, 153, 1)",
    borderWidth: 6,
  },
});
