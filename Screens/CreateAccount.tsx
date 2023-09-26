import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";

export default function CreateAccount() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TextInput style={styles.textInput} placeholder="Username"></TextInput>
      <TextInput style={styles.textInput} placeholder="Password"></TextInput>
      <CustomButton title="Start greenify"></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    alignItems: "flex-start",
    padding: 20,
  },
});
