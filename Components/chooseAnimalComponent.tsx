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
  const { addImageUrl } = useUserContext();
  const allAnimalPictures = animalImages;

  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  const handleImageSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
  };

  const closeModal = () => {
    if (selectedImage) {
      addImageUrl(selectedImage);
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
          >
            <Image
              source={{
                uri: a.imageURL,
              }}
            />
          </TouchableOpacity>
        ))}
        <PopupButton title="Välj" onPress={closeModal} />
      </View>
    </Modal>
  );
};
