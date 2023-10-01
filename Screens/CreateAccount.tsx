import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

export default function CreateAccount({ navigation }: Props) {
  const { createUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = () => {
    createUser(username, password);
    navigation.navigate("Login");
  };

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
        onPress={handleCreateUser}
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
