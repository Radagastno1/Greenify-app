import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";

export default function CreateAccount() {
  const { createUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <CustomButton
        title="Start greenify"
        onPress={() => {
          createUser(username, password);
        }}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    alignItems: "flex-start",
    padding: 20,
  },
});
