import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Input } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
import { User, useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";
import { fetchLogInUser } from "../api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  const handleLogIn = async () => {
    // const allUsers = users;
    // const loggedInUser = allUsers.find(
    //   (u) => u.username === username && u.password === password
    // );
    console.log("handle log in anropas");
    const loggedInUser: User = await fetchLogInUser(username, password);
    console.log("logged in user:", loggedInUser);
    if (loggedInUser) {
      loggedInUser.isLoggedIn = true;
      setUser(loggedInUser);
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 100 }}>
      <Image
        source={{
          uri: "https://i.imgur.com/QYZY07a.png",
        }}
        style={{ height: 150, width: "100%", marginBottom: 50 }}
      />

      <Input
        placeholder="Användarnamn"
        // leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Lösenord"
        // leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={{ width: "100%", alignItems: "center" }}>
        <CustomButton
          title="Logga in"
          onLogin={handleLogIn}
          color="rgba(154, 192, 153, 1)"
        />
        <CustomButton
          title="Kom igång"
          onPress={() => {
            console.log("kom igång");
          }}
          color="rgba(219, 155, 77, 0.87)"
        />
        <Link
          to="/"
          style={{ color: "rgba(71, 44, 11, 0.87)", textAlign: "center" }}
        >
          Glömt lösenord?
        </Link>
      </View>
    </View>
  );
}
