import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
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

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: "https://i.imgur.com/fCMzUH7.png" }}
      />
      <View style={styles.iconContainer}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <AntDesign name="user" size={24} color="black" />
          <Text>Sign up</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <AntDesign name="camerao" size={24} color="grey" />
          <Text style={styles.textBelowIcons}>Collect garbage</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <AntDesign name="checkcircleo" size={24} color="grey" />
          <Text style={styles.textBelowIcons}>Get scores</Text>
        </View>
      </View>

      <Input
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      ></Input>
      <Input
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      ></Input>
      <CustomButton
        title="Start greenify"
        onPress={handleCreateUser}
        color="rgba(79,44,84,255)"
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
  textInput: {
    padding: 20,
    fontSize: 16,
    width: "100%",
  },
  textBelowIcons: {
    color: "grey",
  },
  icon: {
    marginRight: 10,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "black",
    marginHorizontal: 5,
    color: "grey",
  },
  iconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingtop: 20,
    paddingBottom: 50,
  },
});
