import * as Linking from "expo-linking";
import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";
import PopupButton from "./PopupButton";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose }) => {
  const [shared, setShared] = useState(false);
  const { user } = useUserContext();

  const initialMessage = `Jag har nu ${user?.points} poäng! Samla skräp och få skatter du med(länk).`;

  const shareMessage = async () => {
    try {
      const smsUri = `sms:?body=${encodeURIComponent(initialMessage)}`;
      await Linking.openURL(smsUri);
      setShared(true);
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setShared(false);
    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            alignItems: "center",
            width: "80%",
          }}
        >
          <Text style={{ fontSize: 20, padding: 10 }}>
            {shared ? "Meddelandet delat!" : initialMessage}
          </Text>
          {shared ? null : (
            <PopupButton title="Dela mina poäng" onPress={shareMessage} />
          )}
          <PopupButton title="Stäng" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default ShareModal;
