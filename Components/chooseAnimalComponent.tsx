import { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
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
  const { dispatch } = useUserContext();
  const allAnimalPictures = animalImages;
  console.log(allAnimalPictures);

  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [isPressed, setIsPressed] = useState(false);

  const handleImageSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
    setIsPressed(true);
  };

  const closeModal = () => {
    if (selectedImage) {
      dispatch({ type: "ADD_IMAGE_URL", payload: selectedImage });
    }

    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: 20,
        }}
      >
        {allAnimalPictures.map((a, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageSelect(a.imageURL)}
            style={{
              opacity: isPressed && selectedImage === a.imageURL ? 0.2 : 1, // Sätt opacity om bilden är vald
            }}
          >
            <Image
              source={{
                uri: a.imageURL,
              }}
              style={{ height: 200, width: 200, marginVertical: 20 }}
            />
          </TouchableOpacity>
        ))}
        <PopupButton title="Välj" onPress={closeModal} />
      </View>
    </Modal>
  );
};
