import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";
import { users } from "../MockedUsers";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const handleLogIn = async () => {
    const allUsers = users;
    const loggedInUser = allUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (loggedInUser) {
      loggedInUser.isLoggedIn = true;
      setUser(loggedInUser);
      navigation.navigate("Profile");
    }
  };

  return (
    <View>
      <Input
        label="username"
        placeholder="Användarnamn"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        label="password"
        placeholder="Lösenord"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomButton title="Logga in" onPress={handleLogIn} />
    </View>
  );
}
