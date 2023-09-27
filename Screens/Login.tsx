import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
import { useUserContext } from "../Contexts/UserContext";
import { RootStackParamList } from "../Navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn } = useUserContext();

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
    });
  }, []);

  const handleLogIn = async () => {
    handleSignIn(username, password);
    navigation.navigate("Profile");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 100, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={{
            uri: "https://i.imgur.com/BKoVXXp.png",
          }}
          style={{ height: 250, width: "90%", marginBottom: 20 }}
          resizeMode="contain"
        />

        <Input
          placeholder="Användarnamn"
          onChangeText={(text) => setUsername(text)}
          defaultValue=""
        />
        <Input
          placeholder="Lösenord"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          defaultValue=""
        />

        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomButton
            title="Logga in"
            onLogin={handleLogIn}
            color="rgba(79,44,84,255)"
          />
          <CustomButton
            title="Kom igång"
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            color="rgb(164,116,156)"
          />
          <Link
            to="/"
            style={{ color: "rgb(164,116,156)", textAlign: "center" }}
          >
            Glömt lösenord?
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
