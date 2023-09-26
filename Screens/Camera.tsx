import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCameraContext } from "../Contexts/CameraContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "CameraScreen">;

export default function CameraScreen({ navigation }: Props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { setCamera } = useCameraContext();
  const cameraRef = useRef<Camera | null>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setCamera({ uri });
        setPhotoUri(uri);
        savePicture();
        console.log(uri);
        navigation.goBack();
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  async function savePicture() {
    if (photoUri) {
      const fileUri = `${FileSystem.documentDirectory}your_image_name.jpg`;
      try {
        await FileSystem.moveAsync({
          from: photoUri,
          to: fileUri,
        });
        console.log("Bild sparad på:", fileUri);
      } catch (error) {
        console.error("Error saving picture:", error);
      }
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          if (ref) {
            cameraRef.current = ref;
            setCamera(null);
          }
        }}
      >
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={savePicture}>
            <Text style={styles.text}>Save Picture</Text>
          </TouchableOpacity> */}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(164,116,156)",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
