import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { useUserContext } from "../Contexts/UserContext";
import { animalImages } from "../animalImages";
import PopupButton from "./PopupButton";

interface ChooseAnimalProps {
  visible: boolean;
  onClose: () => void;
}

export const ChooseAnimalComponent: React.FC<ChooseAnimalProps> = ({
  visible,
  onClose,
}) => {
  const { dispatch, updateUser, user } = useUserContext();
  const allAnimalPictures = animalImages;

  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [isPressed, setIsPressed] = useState(false);

  const handleImageSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
    setIsPressed(true);
  };

  const handleUpdateUser = async () => {
    if (user && selectedImage) {
      user.animalImageUrl = selectedImage;
      await updateUser();
    }
  };

  const closeModal = () => {
    if (selectedImage) {
      dispatch({ type: "ADD_IMAGE_URL", payload: selectedImage });
    }
    handleUpdateUser();

    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 50, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View style={styles.imageContainer}>
            {allAnimalPictures.map((a, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImageSelect(a.imageURL)}
                style={[
                  styles.imageWrapper,
                  {
                    opacity:
                      isPressed && selectedImage === a.imageURL ? 0.2 : 1,
                  },
                ]}
              >
                <Image
                  source={{
                    uri: a.imageURL,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View>
          <PopupButton title="Välj" onPress={closeModal} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    margin: 5,
  },
  image: {
    height: 150,
    width: 150,
  },
});
