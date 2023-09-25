import React, { useState } from "react";
import { Button, Linking, Modal, Text, View } from "react-native";
import { useUserContext } from "../Contexts/UserContext";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose }) => {
  const [shared, setShared] = useState(false);
  const { user } = useUserContext();

  const initialMessage = `Jag har nu ${user?.points} poäng!: [google store play-länk här sen kanske]`;

  const shareMessage = async () => {
    try {
      const smsUri = `sms:?body=${encodeURIComponent(initialMessage)}`;
      await Linking.openURL(smsUri);
      setShared(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <Text>{shared ? "Meddelandet delat!" : initialMessage}</Text>
          {shared ? null : (
            <Button title="Dela meddelande" onPress={shareMessage} />
          )}
          <Button title="Stäng" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ShareModal;
